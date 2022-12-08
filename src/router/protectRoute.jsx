import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute() {
	const user = useSelector((state) => state.users.users);

	if (Object.keys(user).length === 0) return <Navigate to="/" />;

	return <Outlet />;
}
