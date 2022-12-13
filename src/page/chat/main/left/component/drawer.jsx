import { useEffect, useState } from 'react';
import {
	Avatar,
	List,
	Autocomplete,
	TextField,
	Modal,
	Box,
	IconButton
} from '@mui/material';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import {
	closeAppDrawer,
	getFriends,
	searchUsersAndGroups
} from '../../../../../redux/chatSlice';
import Friends from './friend';
import { unwrapResult } from '@reduxjs/toolkit';
import Typography from '@mui/material/Typography';
import { updateUserInfo } from '../../../../../redux/userSlice';

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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column'
};

export default function LeftDrawer() {
	const open = useSelector((state) => state.chats.open);
	const user = useSelector((state) => state.users.users);
	const searchOption = useSelector((state) => state.chats.search);
	const loading = useSelector((state) => state.users.loading);
	const [friends, setFriends] = useState([]);
	const [search, setSearch] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [editInfo, setEditInfo] = useState({
		username: user.username,
		name: user.name,
		email: user.email
	});
	const [file, setFile] = useState('');
	const dispatch = useDispatch();
	const handleDrawerClose = () => {
		dispatch(closeAppDrawer());
	};

	useEffect(() => {
		dispatch(getFriends())
			.then(unwrapResult)
			.then((originalPromiseResult) => {
				setFriends([...originalPromiseResult.data]);
			});
	}, [dispatch]);

	const openSearch = () => {
		setSearch(!search);
	};
	const handleModalOpen = () => setOpenModal(true);
	const handleModalClose = () => setOpenModal(false);

	const handleSearchOption = (search) => {
		if (search !== '') dispatch(searchUsersAndGroups(search));
	};
	const handleUpload = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]));
	};
	const handleEditInfoChange = (e) => {
		const { name, value } = e.target;
		setEditInfo((editInfo) => ({ ...editInfo, [name]: value }));
	};

	const handleSubmitInfo = () => {
		dispatch(updateUserInfo(editInfo))
			.unwrap()
			.then(() => setOpenModal(false));
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
						<Modal
							open={openModal}
							onClose={handleModalClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
							<Box sx={style}>
								<Box
									sx={{
										display: 'flex'
									}}>
									<Avatar
										sx={{
											width: '50px',
											height: '50px',
											marginRight: 2
										}}
										src={file}
										alt="avatar"
									/>
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="label">
										<input
											type="file"
											accept="image/*"
											onChange={handleUpload}
											hidden
										/>
										<PhotoCamera />
									</IconButton>
								</Box>
								<Box
									sx={{
										marginY: 2,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										flexDirection: 'column'
									}}>
									<TextField
										margin="dense"
										size="small"
										id="outlined-read-only-input"
										label="Username"
										disabled
										defaultValue={user.username}
									/>
									<TextField
										margin="dense"
										size="small"
										id="outlined-read-only-input"
										label="Name"
										name="name"
										onChange={handleEditInfoChange}
										defaultValue={user.name}
									/>
									<TextField
										margin="dense"
										size="small"
										id="outlined-read-only-input"
										label="Email"
										name="email"
										type="email"
										onChange={handleEditInfoChange}
										defaultValue={user.email}
									/>
									<LoadingButton
										onClick={handleSubmitInfo}
										loading={loading}
										sx={{ marginY: 1 }}
										variant="outlined">
										Update
									</LoadingButton>
								</Box>
							</Box>
						</Modal>
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
							onInputChange={(event) => {
								handleSearchOption(event.target.value);
							}}
							size="small"
							freeSolo
							id="free-solo-2-demo"
							disableClearable
							options={searchOption}
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
								<li key={option.uid} {...props}>
									{option.avatar ? (
										<img
											src={option.avatar}
											style={{
												width: '30px',
												height: '30px',
												marginRight: '10px'
											}}
											alt={option.username || option.name}
										/>
									) : null}
									{option.username || option.name}
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
					/>
				))}
			</List>
		</Drawer>
	);
}
