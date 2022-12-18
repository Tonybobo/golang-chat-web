import { useEffect, useState } from 'react';
import {
	Avatar,
	List,
	Autocomplete,
	TextField,
	IconButton
} from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { closeAppDrawer } from '../../../../../redux/chatSlice';
import Friends from './friend';
import { unwrapResult } from '@reduxjs/toolkit';
import Typography from '@mui/material/Typography';
import UserModal from './userModal';
import {
	addFriend,
	getFriends,
	searchUsersAndGroups,
	selectFirstFriends
} from '../../../../../redux/actions/chat';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme)
	})
}));

export default function LeftDrawer() {
	const open = useSelector((state) => state.chats.open);
	const user = useSelector((state) => state.users.users);
	const searchOption = useSelector((state) => state.chats.search);
	const friends = useSelector((state) => state.chats.friends);

	const [search, setSearch] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const dispatch = useDispatch();
	const handleDrawerClose = () => {
		dispatch(closeAppDrawer());
	};

	useEffect(() => {
		dispatch(getFriends())
			.then(unwrapResult)
			.then(() => {
				dispatch(selectFirstFriends());
			});
	}, [dispatch]);

	const openSearch = () => {
		setSearch(!search);
	};
	const handleModalOpen = () => setOpenModal(true);
	const handleModalClose = (callback) => setOpenModal(callback());

	const handleSearchOption = (event) => {
		if (event.target.value !== '')
			dispatch(searchUsersAndGroups(event.target.value));
	};
	const handleAddFriend = (friendId, type) => {
		dispatch(addFriend({ friendId, type }));
	};

	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				{!search && (
					<>
						<Avatar
							onClick={handleModalOpen}
							sizes="small"
							alt={user.username}
							src={user.avatar}
						/>

						<UserModal open={openModal} handleModalClose={handleModalClose} />
						<div style={{ height: 'auto' }}>
							<Typography variant="body2">{user.username}</Typography>
							<Typography sx={{ color: 'grey' }} variant="caption">
								{user.name}
							</Typography>
						</div>

						<div style={{ display: 'flex' }}>
							<SearchIcon
								fontSize="medium"
								sx={{ marginRight: 1 }}
								onClick={openSearch}
							/>
							<ChevronLeftIcon
								fontSize="medium"
								sx={{ marginLeft: 1 }}
								onClick={handleDrawerClose}
							/>
						</div>
					</>
				)}
				{search && (
					<>
						<Autocomplete
							sx={{ width: 200 }}
							onInputChange={handleSearchOption}
							size="small"
							freeSolo
							id="free-solo-2-demo"
							disableClearable
							options={searchOption}
							filterOptions={(x) => x}
							getOptionLabel={(option) => {
								// Value selected with enter, right from the input

								if (typeof option === 'string') {
									return option;
								}
								// Add "xxx" option created dynamically
								if (option.name) {
									return option.name;
								}

								// Regular option
								return option.username;
							}}
							renderOption={(props, option) => (
								<li
									key={option.uid}
									{...props}
									style={{ display: 'flex', justifyContent: 'space-between' }}>
									<img
										src={option.avatar}
										style={{
											width: '30px',
											height: '30px',
											marginRight: '10px',
											borderRadius: '50%'
										}}
										alt={option.username || option.name}
									/>
									{option.username || option.name}
									<IconButton
										onClick={() => handleAddFriend(option.uid, option.type)}>
										<AddIcon />
									</IconButton>
								</li>
							)}
							renderInput={(params) => (
								<TextField
									size="small"
									{...params}
									label="Search Friends"
									InputProps={{
										...params.InputProps,
										type: 'search'
									}}
								/>
							)}
						/>
						<CancelIcon sx={{ marginLeft: 1 }} onClick={openSearch} />
					</>
				)}
			</DrawerHeader>
			<Divider />
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
				{friends?.map((friend) => (
					<Friends
						key={friend.uid}
						uid={friend.uid}
						username={friend.username}
						avatar={friend.avatar}
						name={friend.name}
						type={friend.type}
					/>
				))}
			</List>
		</Drawer>
	);
}
