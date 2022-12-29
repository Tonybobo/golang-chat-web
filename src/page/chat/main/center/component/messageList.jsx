import { List } from '@mui/material';
import { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { getMoreMessages } from '../../../../../redux/actions/chat';
import { MessageLeft, MessageRight } from './message';

export default function MessageList() {
	const { users } = useSelector((state) => state.users);
	const { message } = useSelector((state) => state.chats);
	const [pages, setPages] = useState(1);
	const [more, setMore] = useState(true);
	const dispatch = useDispatch();

	const handleGetMoreMessage = () => {
		setPages(
			pages + 1,
			dispatch(getMoreMessages(pages)).then(() => {
				if (pages >= message.pages) setMore(false);
			})
		);
	};

	return (
		<div
			id="userList"
			style={{
				height: 700,
				overflow: 'auto'
			}}>
			<InfiniteScroll
				dataLength={message?.messages.length}
				refreshFunction={handleGetMoreMessage}
				pullDownToRefresh={more}
				pullDownToRefreshThreshold={20}
				// pullDownToRefreshContent={
				// 	<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
				// }
				// releaseToRefreshContent={
				// 	<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
				// }
				hasMore={more}>
				<List
					sx={{
						width: '100%'
					}}>
					{message?.messages.map((message) =>
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
				</List>
			</InfiniteScroll>
		</div>
	);
}
