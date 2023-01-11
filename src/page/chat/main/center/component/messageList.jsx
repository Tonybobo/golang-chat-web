import InfiniteScroll from 'react-infinite-scroller';
import { useSelector, useDispatch } from 'react-redux';
import { getMoreMessages } from '../../../../../redux/actions/chat';

import { Box } from '@mui/material';
import { SwitchComponent } from '../../../../../utils/switch';

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
				{messages.map((message) => SwitchComponent(message, users.uid))}
			</InfiniteScroll>
		</Box>
	);
}
