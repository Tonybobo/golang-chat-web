import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function GroupMember() {
	const dispatch = useDispatch();
	useEffect(() => {});
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
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
					</ListItemAvatar>
					<ListItemText primary="Brunch this weekend?" />
				</ListItem>
				<Divider variant="inset" component="li" />
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
					</ListItemAvatar>
					<ListItemText primary="Summer BBQ" />
				</ListItem>
				<Divider variant="fullWidth" component="li" />
			</List>
		</Box>
	);
}
