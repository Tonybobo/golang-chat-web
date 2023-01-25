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
import { calling, receiveAudioCall, setCallAccepted } from './webrtc';

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
				console.log(messageBuffer);

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
					case 'answer':
						let caller = {
							fromUsername: messageBuffer.fromUsername,
							from: messageBuffer.from,
							content: messageBuffer.content
						};
						store.dispatch(setCallAccepted(caller));
						peer.signal(content);
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
		const { users } = store.getState().users;
		const { selectUser, caller } = store.getState().chats;
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
				store.dispatch(calling());
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

						peer.on('stream', (remoteStream) => {
							let video = document.getElementById('remoteVideo');
							video.srcObject = remoteStream;
							video.play();
						});
					});
				break;

			case 'panel/answerAudioCall':
				//set call accepted == true
				store.dispatch(setCallAccepted());
				const { content } = caller;
				let signal = JSON.parse(content);
				navigator.mediaDevices
					.getUserMedia({
						audio: true,
						video: false
					})
					.then((stream) => {
						peer = new Peer({ initiator: false, trickle: false, stream });

						peer.on('signal', (data) => {
							let response = {
								contentType: AUDIO_ONLINE,
								fromUsername: users.username,
								from: users.uid,
								to: selectUser.uid,
								type: MESSAGE_TRANS_TYPE,
								content: JSON.stringify(data)
							};
							let buffer = message.create(response);
							socket.send(message.encode(buffer).finish());
						});
						peer.on('stream', (remoteStream) => {
							let video = document.getElementById('remoteVideo');
							video.srcObject = remoteStream;
							video.play();
						});
						peer.signal(signal);
					});
				break;
			case 'panel/leaveCall':
				let video = document.getElementById('remoteVideo');
				video.srcObject.getVideoTracks().forEach((track) => {
					track.stop();
					video.srcObject.removeTrack(track);
				});
				console.log(video);
				console.log('destroy peer connection');
				peer.destroy();
				next(action);
				break;
			default:
				return next(action);
		}
	};
};

export default socketMiddleware();
