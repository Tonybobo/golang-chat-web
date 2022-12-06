import { createBrowserRouter } from 'react-router-dom';
import Login from '../page/login/login';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />
	}
]);

export default router;
