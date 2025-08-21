import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../API/products/productsApi';
import { toast } from 'react-toastify';

function ProductList() {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState('Tất cả');
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const data = await getAllProducts(page, 8);
				setProducts(data.products);
				setTotalPages(data.totalPages);
			} catch (err) {
				console.error(err);
			}
		};
		fetchProduct();
	}, [page]);

	const getStatusColor = (status) => {
		switch (status) {
			case 'Còn hàng':
				return 'bg-green-100 text-green-800';
			case 'Sắp hết':
				return 'bg-yellow-100 text-yellow-800';
			case 'Hết hàng':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const handleDelete = async (id) => {
		const confirm = window.confirm('Bạn có muốn xóa sản phẩm này?');
		if (!confirm) return;

		try {
			await deleteProduct(id);
			setProducts((prev) => prev.filter((product) => product.id !== id));
			toast.success('Xóa sản phẩm thành công');
			navigate('/products');
		} catch (error) {
			console.error(error);
		}
	};

	const filteredProducts = products
		.filter((product) => {
			switch (filter) {
				case 'Tất cả':
					return true;
				case 'Còn hàng':
					return product.status === 'Còn hàng';
				case 'Hết hàng':
					return product.status === 'Hết hàng';
				default:
					return true;
			}
		})
		.filter((product) => {
			if (!search) return true;
			else return product.name.toLowerCase().includes(search.toLowerCase());
		});

	return (
		<div className='p-6 bg-blue-50 min-h-screen'>
			<h1 className='text-2xl font-bold text-textPrimary mb-6'>
				Danh sách sản phẩm
			</h1>

			<div className='flex items-center gap-4 mb-4 justify-between'>
				<div className='flex space-x-2'>
					<button
						onClick={() => setFilter('Tất cả')}
						className={`px-3 py-1 text-sm rounded-md ${
							filter === 'Tất cả'
								? 'gradient-bg text-white'
								: 'bg-white text-textSecondary hover:bg-gray-200'
						} transition-colors`}>
						Tất cả
					</button>

					<button
						onClick={() => setFilter('Còn hàng')}
						className={`px-3 py-1 text-sm rounded-md ${
							filter === 'Còn hàng'
								? 'gradient-bg text-white'
								: 'bg-white text-textSecondary hover:bg-gray-200'
						} transition-colors`}>
						Còn hàng
					</button>

					<button
						onClick={() => setFilter('Hết hàng')}
						className={`px-3 py-1 text-sm rounded-md ${
							filter === 'Hết hàng'
								? 'gradient-bg text-white'
								: 'bg-white text-textSecondary hover:bg-gray-200'
						} transition-colors`}>
						Hết hàng
					</button>
				</div>

				<div className='w-full md:w-auto flex space-x-2'>
					<div className='relative flex-grow'>
						<input
							onChange={(e) => setSearch(e.target.value)}
							value={search}
							type='text'
							placeholder='Tìm kiếm sản phẩm...'
							className='w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all'
						/>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<svg
								className='h-5 w-5 text-textSecondary'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								/>
							</svg>
						</div>
					</div>

					<NavLink
						to={'/products/create'}
						className='px-4 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm'>
						Thêm
					</NavLink>
				</div>
			</div>

			<div className='bg-card shadow-card rounded-lg p-6'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-border'>
						<thead className="bg-gray-50">
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									#
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									Sản phẩm
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									Danh mục
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									Giá
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									Kho
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									Trạng thái
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase'>
									Hành động
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-border'>
							{filteredProducts.map((product, index) => (
								<tr key={product.id}>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-textPrimary'>
										{(page - 1) * 8 + index + 1}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-textPrimary'>
										{product.name}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-textPrimary'>
										{product.category}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-textPrimary'>
										{product.price}đ
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-textPrimary'>
										{product.stock} chiếc
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span
											className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
												product.stock === 0 ? 'Hết hàng' : 'Còn hàng'
											)}`}>
											{product.stock === 0 ? 'Hết hàng' : 'Còn hàng'}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm'>
										<div className='flex space-x-2'>
											<button
												onClick={() => navigate('/products/detail')}
												className='p-1 text-primary hover:text-accent transition-colors'>
												<svg
													className='w-5 h-5'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
													/>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
													/>
												</svg>
											</button>
											<button
												onClick={() => navigate(`/products/edit/${product.id}`)}
												className='p-1 text-primary hover:text-accent transition-colors'>
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
														d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
												</svg>
											</button>
											<button
												onClick={() => handleDelete(product.id)}
												className='p-1 text-red-500 hover:text-red-700 transition-colors'>
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
														d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path>
												</svg>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className='flex justify-center gap-2 mt-5 flex-wrap'>
				<button
					onClick={() => setPage(1)}
					disabled={page === 1}
					className='px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50'>
					First
				</button>
				<button
					onClick={() => setPage(page - 1)}
					disabled={page === 1}
					className='px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50'>
					Prev
				</button>
				{page >= 2 && (
					<button
						onClick={() => setPage(page - 1)}
						className='px-3 py-1 rounded-lg bg-gray-200 text-gray-700'>
						{page - 1}
					</button>
				)}
				<button
					className={`px-4 py-1 rounded-lg font-medium transition-colors duration-200 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow`}>
					{page}
				</button>
				{page < totalPages && (
					<button
						onClick={() => setPage(page + 1)}
						className='px-3 py-1 rounded-lg bg-gray-200 text-gray-700'>
						{page + 1}
					</button>
				)}
				<button
					onClick={() => setPage(page + 1)}
					disabled={page === totalPages}
					className='px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50'>
					Next
				</button>
				<button
					onClick={() => setPage(totalPages)}
					disabled={page === totalPages}
					className='px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50'>
					Last
				</button>
			</div>
		</div>
	);
}

export default ProductList;
