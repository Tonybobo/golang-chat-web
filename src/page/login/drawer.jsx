import {
	Drawer,
	Box,
	Avatar,
	Typography,
	TextField,
	Button
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export default function RegisterDrawer() {
	const error = useSelector((state) => state.users.registerError);
	const open = useSelector((state) => state.users.open);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		dispatch(
			register({
				username: data.get('username'),
				password: data.get('password'),
				passwordConfirm: data.get('passwordConfirm'),
				email: data.get('email')
			})
		)
			.unwrap()
			.then(() => {
				navigate('/');
			});
	};
	return (
		<Drawer
			onClose={() => dispatch(closeDrawer())}
			sx={{ m: 2, p: 2, borderRadius: 1 }}
			elevation={16}
			anchor="bottom"
			open={open}>
			<Box
				sx={{
					borderRadius: 1,

					height: '300px',
					mt: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					m: 2,
					p: 2
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				{error ? (
					<Typography
						sx={{ color: 'red', mt: 2, mb: 0 }}
						component="subtitle2"
						variant="subtitle2">
						{error}
					</Typography>
				) : null}
				<Box component="form" onSubmit={handleSubmit} noValidate>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="passwordConfirm"
						label="Password Confirm"
						type="password"
						id="passwordConfirm"
						autoComplete="current-password"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="email"
						label="Email"
						type="email"
						id="email"
						autoComplete="email"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Register
					</Button>
				</Box>
			</Box>
		</Drawer>
	);
}
