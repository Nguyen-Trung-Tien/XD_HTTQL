import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
	return (
		<>
			<Header />
			<div className='flex h-[calc(100vh - 64px)]'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
