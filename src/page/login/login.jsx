import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer, openDrawer } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import RegisterDrawer from './drawer';
import { login } from '../../redux/actions/user';

const theme = createTheme();

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector((state) => state.users.loginError);
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		dispatch(
			login({ username: data.get('username'), password: data.get('password') })
		)
			.unwrap()
			.then(() => {
				navigate('/panel/' + data.get('username'));
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					onClick={() => dispatch(closeDrawer())}
					sx={{
						mt: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
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
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Login
						</Button>
					</Box>
				</Box>
				<Box>
					<Grid
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}>
						{/* <Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid> */}
						<Grid item>
							<Button onClick={() => dispatch(openDrawer())} variant="text">
								Register
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<RegisterDrawer />
		</ThemeProvider>
	);
}
