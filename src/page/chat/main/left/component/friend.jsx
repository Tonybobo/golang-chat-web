import { ListItem, ListItemButton, Avatar, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Friends({ uid, username, avatar, name, type }) {
	const open = useSelector((state) => state.chats.open);
	const handleSelectFriends = () => {
		console.log(uid, username, avatar, name, type);
	};
	return (
		<ListItem
			onClick={handleSelectFriends}
			key={uid}
			disablePadding
			sx={{ display: 'block' }}>
			<ListItemButton
				sx={{
					minHeight: 48,
					justifyContent: open ? 'initial' : 'center',
					px: 2.5
				}}>
				<Avatar
					sx={{
						minWidth: 0,
						mr: open ? 3 : 'auto',
						justifyContent: 'center'
					}}
					alt={username}
					src={avatar}
				/>
				<ListItemText
					primary={username}
					secondary={name}
					sx={{ opacity: open ? 1 : 0 }}
				/>
			</ListItemButton>
		</ListItem>
	);
}
