import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupMembers } from '../../../../../redux/actions/chat';

export default function GroupMember() {
	const dispatch = useDispatch();
	const { selectUser } = useSelector((state) => state.chats);
	useEffect(() => {
		dispatch(getGroupMembers());
	}, [dispatch]);
	return (
		<Box sx={{ height: 100, width: '100%' }}>
			<List
				style={{ maxHeight: '100%', overflow: 'auto' }}
				sx={{
					'&::-webkit-scrollbar': {
						width: 5
					},
					'&::-webkit-scrollbar-thumb': {
						borderRadius: 2
					}
				}}>
				{selectUser.members?.map((member) => (
					<>
						<ListItem key={member.uid} alignItems="flex-start">
							<ListItemAvatar>
								<Avatar alt={member.username} src={member.avatar} />
							</ListItemAvatar>
							<ListItemText
								sx={{ marginLeft: 2 }}
								primary={member.username}
								secondary={member.name}
							/>
						</ListItem>
						<Divider variant="fullWidth" component="li" />
					</>
				))}
			</List>
		</Box>
	);
}
