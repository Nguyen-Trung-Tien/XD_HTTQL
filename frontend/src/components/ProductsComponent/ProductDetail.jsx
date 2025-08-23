import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getAllProducts } from '../../API/products/productsApi';
import upload_area from '../../assets/assets';

const ProductDetail = () => {
	const { id } = useParams();

	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { products } = await getAllProducts();
				const selected = products.find((p) => p.id === parseInt(id));
				setProduct(selected || null);
			} catch (err) {
				console.error(err);
			}
		};

		if (id) fetchProduct();
	}, [id]);

	if (!product) return <div className='p-6'>Không tìm thấy sản phẩm.</div>;

	const priceFormatted = product.price
		? new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
		  }).format(Number(product.price))
		: '-';

	const createdAt = product.createdAt ? new Date(product.createdAt) : null;

	const location = product.location || product.warehouseAddress || '-';

	const imageSrc = product.image || upload_area;

	return (
		<div className='relative w-full'>
			<button
				onClick={() => window.history.back()}
				className='absolute left-6 inline-flex items-center gap-2 font-medium text-sm bg-white px-4 py-2 rounded-full text-blue-600 hover:text-blue-800 shadow-sm'>
				&larr; Quay lại
			</button>

			<div className='max-w-5xl mx-auto p-6 mt-6'>
				<div className='bg-white shadow-lg rounded-xl overflow-hidden'>
					<div className='p-8 lg:flex lg:gap-8 items-center'>
						<div className='flex-shrink-0 mx-auto lg:mx-0'>
							<img
								src={imageSrc}
								alt={product.name}
								className='w-48 h-48 lg:w-64 lg:h-64 object-cover rounded-md border'
							/>
						</div>

						<div className='mt-6 lg:mt-0 flex-1'>
							<div className='flex items-start justify-between'>
								<div>
									<h2 className='text-3xl font-semibold text-gray-800'>
										{product.name}
									</h2>
									<p className='text-sm text-gray-500 mt-1'>
										Danh mục: {product.category || '-'}
									</p>
								</div>

								<div className='text-right'>
									<div
										className={
											product.status === 'Hết hàng'
												? 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800'
												: 'inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'
										}>
										{product.status}
									</div>
								</div>
							</div>

							<div className='mt-6 grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-gray-700'>
								<div>
									<div className='text-gray-500'>Giá</div>
									<div className='font-medium text-base'>{priceFormatted}</div>
								</div>
								<div>
									<div className='text-gray-500'>Số lượng</div>
									<div className='font-medium text-base'>
										{product.stock ?? '-'}
									</div>
								</div>

								<div>
									<div className='text-gray-500'>Kho</div>
									<div className='font-medium'>{location}</div>
								</div>
								<div>
									<div className='text-gray-500'>Ghi chú</div>
									<div className='font-medium'>{product.note || '-'}</div>
								</div>
							</div>

							<div className='mt-6 text-gray-700'>
								<div className='text-gray-500 text-sm'>Mô tả</div>
								<div className='mt-2 text-base'>
									{product.description || '-'}
								</div>
							</div>

							<div className='mt-6 text-sm text-gray-500'>
								Ngày tạo: {createdAt ? createdAt.toLocaleString() : '-'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
