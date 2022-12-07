import { createBrowserRouter } from 'react-router-dom';
import Panel from '../page/chat/panel';
import Login from '../page/login/login';

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
		path: '/panel',
		element: <Panel />
	}
]);

export default router;
