import { ListItem, ListItemButton, Avatar, ListItemText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriend } from '../../../../../redux/actions/chat';

export default function Friends({
	uid,
	username,
	avatar,
	name,
	type,
	userId,
	notice
}) {
	const open = useSelector((state) => state.chats.open);
	const dispatch = useDispatch();

	return (
		<ListItem
			onClick={() =>
				dispatch(selectFriend({ uid, username, avatar, name, type , userId , notice}))
			}
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
