import InfiniteScroll from 'react-infinite-scroller';
import { useSelector, useDispatch } from 'react-redux';
import { getMoreMessages } from '../../../../../redux/actions/chat';
import { MessageLeft, MessageRight } from './message';
import { Box } from '@mui/material';

export default function MessageList() {
	const { users } = useSelector((state) => state.users);

	const { messages, pages, totalPages } = useSelector((state) => state.chats);

	const dispatch = useDispatch();

	const handleLoadMore = () => {
		dispatch(getMoreMessages(pages + 1));
	};

	return (
		<Box
			component="div"
			sx={{
				height: '300px',
				overflow: 'auto',
				paddingTop: 2,
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
				{messages.map((message) =>
					message.from.uid === users.uid ? (
						<MessageRight
							content={message.content}
							sender={message.from}
							timeStamp={message.createdAt}
							key={message.createdAt}
						/>
					) : (
						<MessageLeft
							content={message.content}
							sender={message.from}
							timeStamp={message.createdAt}
							key={message.createdAt}
						/>
					)
				)}
			</InfiniteScroll>
		</Box>
	);
}
