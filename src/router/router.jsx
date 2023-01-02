import { createBrowserRouter } from 'react-router-dom';
import Panel from '../page/chat/panel';
import Login from '../page/login/login';
import ProtectedRoute from './protectRoute';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/',
		element: <Login />
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: 'panel/:uid',
				element: <Panel />
			}
		]
	}
]);

export default router;
