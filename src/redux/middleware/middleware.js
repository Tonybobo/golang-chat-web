import {
	IP_PORT,
	API_VERSION,
	MESSAGE_TRANS_TYPE,
	AUDIO_ONLINE,
	VIDEO_ONLINE
} from '../../utils/Constant';

import protobuf from '../../proto/proto';
import { appendFriendMsg, appendMsg } from '../actions/chat';
import Peer from 'simple-peer';
import { receiveAudioCall } from './webrtc';

let peer;

let socket = null;

const socketMiddleware = () => {
	const connection = (store, uid) => {
		socket = new WebSocket(
			'ws://' + IP_PORT + API_VERSION + '/socket.io?uid=' + uid
		);
		// // websocket handlers
		socket.onmessage = onMessage(store);
		socket.onclose = onClose(store);
		socket.onopen = onOpen(store);
	};
	const onOpen = (store) => (event) => {
		let data = {
			type: 'heartbeat',
			content: 'ping'
		};
		let message = protobuf.lookup('protocol.Message');
		const messagePB = message.create(data);
		socket.send(message.encode(messagePB).finish());
		setInterval(() => socket.send(message.encode(messagePB).finish()), 10000);
	};

	const onClose = (store) => () => {
		connection();
	};
	const onMessage = (store) => (event) => {
		let messageProto = protobuf.lookup('protocol.Message');
		// read buffer and decode message
		let reader = new FileReader();
		reader.readAsArrayBuffer(event.data);
		reader.addEventListener('load', (event) => {
			let messageBuffer = messageProto.decode(
				//Array buffer need to be 8bit unsigned integer
				new Uint8Array(event.target.result)
			);
			if (messageBuffer.type === MESSAGE_TRANS_TYPE) {
				const content = JSON.parse(messageBuffer.content);
				console.log(content);
				switch (content.type) {
					case 'offer':
						if (messageBuffer.contentType === AUDIO_ONLINE) {
							let caller = {
								fromUsername: messageBuffer.fromUsername,
								from: messageBuffer.from,
								content: messageBuffer.content
							};
							store.dispatch(receiveAudioCall(caller));
						}
						if (messageBuffer.contentType === VIDEO_ONLINE) {
							let caller = {
								fromUsername: messageBuffer.fromUsername,
								from: messageBuffer.from,
								content: messageBuffer.content
							};
							store.dispatch(receiveAudioCall(caller));
						}

						break;
					default:
						break;
				}
				return;
			}

			if (messageBuffer.type === 'heartbeat') return;
			store.dispatch(appendFriendMsg(messageBuffer));
		});
	};
	let message = protobuf.lookup('protocol.Message');
	return (store) => (next) => (action) => {
		switch (action.type) {
			case 'users/login/fulfilled':
				if (socket !== null) {
					socket.close();
				}
				connection(store, action.payload.data.uid);
				next(action);
				break;

			case 'panel/sendMsg':
				const messagePB = message.create(action.payload);
				socket.send(message.encode(messagePB).finish());
				store.dispatch(appendMsg(action.payload));
				break;

			case 'panel/audioCall':
				const { users } = store.getState().users;
				const { selectUser } = store.getState().chats;
				navigator.mediaDevices
					.getUserMedia({
						audio: true
					})
					.then((stream) => {
						peer = new Peer({
							initiator: true,
							trickle: false,
							stream: stream
						});

						peer.on('signal', (data) => {
							let request = {
								contentType: AUDIO_ONLINE,
								fromUsername: users.username,
								from: users.uid,
								to: selectUser.uid,
								type: MESSAGE_TRANS_TYPE,
								content: JSON.stringify(data)
							};
							let buffer = message.create(request);
							socket.send(message.encode(buffer).finish());
						});
					});
				next(action);
				break;

			default:
				return next(action);
		}
	};
};

export default socketMiddleware();
