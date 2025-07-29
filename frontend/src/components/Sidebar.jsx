import { NavLink } from 'react-router-dom';
function Sidebar() {
	const menuItems = [
		{
			id: 'dashboard',
			name: 'Tổng quan',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
				</svg>
			),
		},
		{
			id: 'products',
			name: 'Sản phẩm',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
				</svg>
			),
		},
		{
			id: 'inventory',
			name: 'Tồn kho',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'></path>
				</svg>
			),
		},
		{
			id: 'orders',
			name: 'Đơn hàng',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'></path>
				</svg>
			),
		},
		{
			id: 'shippers',
			name: 'Shipper',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'></path>
				</svg>
			),
		},
		{
			id: 'stats',
			name: 'Thống kê',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'></path>
				</svg>
			),
		},
	];

	return (
		<>
			{/* Desktop Sidebar */}
			<div className='flex flex-col w-64  bg-card shadow-card'>
				<div className='hidden md:flex md:flex-shrink-0'>
					<div className='flex flex-col flex-1 overflow-y-auto'>
						<nav className='flex-1 px-2 space-y-1'>
							{menuItems.map((item) => (
								<NavLink
									key={item.id}
									className={({ isActive }) =>
										`flex items-center w-full px-4 py-3 rounded-md hover:bg-primaryLight/10 group ${
											isActive ? 'bg-primaryLight/10' : 'bg-white'
										}`
									}
									to={`${item.id === 'dashboard' ? '/' : `/${item.id}`}`}>
									<span
										className={'mr-3 text-primary group-hover:text-primary'}>
										{item.icon}
									</span>
									<span>{item.name}</span>
								</NavLink>
							))}
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
