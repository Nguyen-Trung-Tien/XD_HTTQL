import { useEffect, useState } from 'react';
import upload_area from '../../assets/assets';

const ProductDetail = ({ productData }) => {
	const [product, setProduct] = useState(productData);

	useEffect(() => {
		setProduct(productData);
	}, [productData]);

	if (!product) return <div className='p-6'>Không tìm thấy sản phẩm.</div>;

	const priceFormatted = product.price
		? new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
		  }).format(Number(product.price))
		: '-';

	const createdAt = product.createdAt ? new Date(product.createdAt) : null;

	const warehouseAddress = product.warehouseAddress || '-';

	const imageSrc = product.image || upload_area;

	return (
		<div className='w-full'>
			<div className='w-full max-w-3xl mx-auto'>
				<div className='bg-white rounded-xl overflow-hidden'>
					<div className='flex flex-col md:flex-row'>
						<div className='md:w-1/2 p-6'>
							<div className='aspect-square rounded-lg overflow-hidden bg-gray-100'>
								<img
									src={imageSrc}
									alt={product.name}
									className='w-full h-full object-cover'
								/>
							</div>
						</div>

						<div className='md:w-1/2 p-6'>
							<div className='flex justify-between items-start'>
								<div>
									<h1 className='text-xl font-bold text-gray-900 mb-1'>
										{product.name}
									</h1>
									<p className='text-sm text-gray-500'>
										Danh mục: {product.category || '-'}
									</p>
								</div>
								<span
									className={`px-3 py-1 rounded-full text-center text-xs font-semibold ${
										product.status === 'Hết hàng'
											? 'bg-red-100 text-red-800'
											: 'bg-green-100 text-green-800'
									}`}>
									{product.status}
								</span>
							</div>

							<div className='mt-6'>
								<div className='text-3xl font-bold text-gray-900 mb-4'>
									{priceFormatted}
								</div>

								<div className='space-y-4'>
									<div className='bg-gray-50 rounded-lg p-4'>
										<div className='grid grid-cols-2 gap-4'>
											<div>
												<p className='text-sm text-gray-500'>
													Số lượng trong kho
												</p>
												<p className='font-medium'>
													{product.stock
														? `${product.stock} ${product.unit}`
														: '-'}
												</p>
											</div>
											<div>
												<p className='text-sm text-gray-500'>Vị trí</p>
												<p className='font-medium'>{warehouseAddress}</p>
											</div>
										</div>
									</div>

									<div className='border-t border-gray-200 pt-4'>
										<h3 className='text-sm font-medium text-gray-900 mb-2'>
											Mô tả
										</h3>
										<p className='text-gray-700 text-sm'>
											{product.description || '-'}
										</p>
									</div>

									<div className='border-t border-gray-200 pt-4'>
										<div className='flex items-center justify-between text-sm text-gray-500'>
											<span>Ghi chú: {product.note || '-'}</span>
											<span>
												{createdAt ? createdAt.toLocaleString() : '-'}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
