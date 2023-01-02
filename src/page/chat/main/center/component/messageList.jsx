import InfiniteScroll from 'react-infinite-scroller';
import { useSelector, useDispatch } from 'react-redux';
import { getMoreMessages } from '../../../../../redux/actions/chat';
import { MessageLeft, MessageRight } from './message';
import { Box } from '@mui/material';

export default function MessageList() {
	const { users } = useSelector((state) => state.users);

	const { messages, pages, totalPages, selectUser } = useSelector(
		(state) => state.chats
	);

	const dispatch = useDispatch();
	console.log(messages);
	const handleLoadMore = () => {
		dispatch(getMoreMessages(pages + 1));
	};

	return (
		<Box
			component="div"
			sx={{
				height: '300px',
				overflow: 'auto',
				paddingTop: 3,
				'&::-webkit-scrollbar': {
					width: 5
				},
				'&::-webkit-scrollbar-thumb': {
					borderRadius: 2
				}
			}}>
			<InfiniteScroll
				loadMore={handleLoadMore}
				isReverse={true}
				hasMore={pages < totalPages}
				useWindow={false}
				loader={<h4>Loading...</h4>}>
				{selectUser.type === 1 &&
					messages.map((message) =>
						message.fromUserId === users.uid ? (
							<MessageRight
								content={message.content}
								key={message.createdAt}
								timeStamp={message.createdAt}
							/>
						) : (
							<MessageLeft
								content={message.content}
								key={message.createdAt}
								timeStamp={message.createdAt}
							/>
						)
					)}
				{selectUser.type === 2 &&
					messages.map((message) =>
						message.fromUserId === users.uid ? (
							<MessageRight
								content={message.content}
								key={message.createdAt}
								sender={message.from}
								timeStamp={message.createdAt}
							/>
						) : (
							<MessageLeft
								content={message.content}
								key={message.createdAt}
								sender={message.from}
								timeStamp={message.createdAt}
							/>
						)
					)}
			</InfiniteScroll>
		</Box>
	);
}
