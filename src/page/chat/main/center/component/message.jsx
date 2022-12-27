import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from '@mui/material';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default function Messages() {
	return (
		<InfiniteScroll>
			<List
				sx={{
					width: '100%'
				}}>
				<ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
						<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
					</ListItemAvatar>
				</ListItem>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
					</ListItemAvatar>
				</ListItem>
			</List>
		</InfiniteScroll>
	);
}
