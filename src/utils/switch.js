import {
	MessageLeft,
	MessageRight
} from '../page/chat/main/center/component/message';
import {
	AudioMessageLeft,
	AudioMessageRight
} from '../page/chat/main/center/component/AudioMessage';

import {
	ImageMessageLeft,
	ImageMessageRight
} from '../page/chat/main/center/component/ImageMessage';

import {
	VideoMessageLeft,
	VideoMessageRight
} from '../page/chat/main/center/component/VideoMessage';
import {
	FileMessageLeft,
	FileMessageRight
} from '../page/chat/main/center/component/FileMessage';

export const SwitchComponent = (message, uid) => {
	switch (message.contentType) {
		case 1:
			if (message.from.uid !== uid) {
				return (
					<MessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						content={message.content}
					/>
				);
			}
			return (
				<MessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					sender={message.from}
					content={message.content}
				/>
			);
		case 2:
			if (message.from.uid !== uid) {
				return (
					<FileMessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						content={message.content}
						url={message.url}
					/>
				);
			}
			return (
				<FileMessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					content={message.content}
					url={message.url}
				/>
			);
		case 3:
			if (message.from.uid !== uid) {
				return (
					<ImageMessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						url={message.url}
					/>
				);
			}
			return (
				<ImageMessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					url={message.url}
				/>
			);
		case 4:
			if (message.from.uid !== uid) {
				return (
					<AudioMessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						url={message.url}
					/>
				);
			}
			return (
				<AudioMessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					url={message.url}
				/>
			);
		case 5:
			if (message.from.uid !== uid) {
				return (
					<VideoMessageLeft
						timeStamp={message.createdAt}
						key={message.createdAt}
						sender={message.from}
						url={message.url}
					/>
				);
			}
			return (
				<VideoMessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					url={message.url}
				/>
			);
		default:
			return (
				<MessageRight
					timeStamp={message.createdAt}
					key={message.createdAt}
					sender={message.from}
					url={message.url}
					content={message.content}
				/>
			);
	}
};
