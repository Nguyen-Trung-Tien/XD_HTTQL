import { useEffect, useState } from 'react';
import { editProduct } from '../../API/products/productsApi';
import { toast } from 'react-toastify';
import upload_area from '../../assets/assets';
import { useNavigate } from 'react-router';

const EditProduct = ({ productData }) => {
	const id = productData?.id;
	const [preview, setPreview] = useState('');
	const [editing, setEditing] = useState(false);

	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		image: '',
		status: 'Còn hàng',
	});

	useEffect(() => {
		if (productData) {
			setForm({
				name: productData.name,
				category: productData.category,
				price: productData.price,
				description: productData.description,
				status: productData.status,
				image: productData.image,
			});
			setPreview(productData.image);
		}
	}, [productData]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setForm((prev) => ({ ...prev, image: file }));
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setEditing(true);

			const formData = new FormData();
			formData.append('name', form.name);
			formData.append('category', form.category);
			formData.append('description', form.description);
			formData.append('price', String(form.price));
			formData.append('status', form.status);

			if (form.image instanceof File) {
				formData.append('image', form.image);
			}

			const data = await editProduct(id, formData);

			if (data.success) {
				toast.success(data.message);
				navigate('/products');
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setEditing(false);
		}
	};

	return (
		<div className='w-full max-w-2xl mx-auto'>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div className='grid grid-cols-2 gap-6'>
					<div className='col-span-2'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Ảnh sản phẩm
						</label>
						<div className='flex items-center justify-center'>
							<label htmlFor='edit-product-image' className='cursor-pointer'>
								<div className='relative h-40 w-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors'>
									<img
										src={preview || upload_area}
										alt=''
										className='absolute inset-0 w-full h-full object-cover rounded-lg'
									/>
									<div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-8 w-8'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
											/>
										</svg>
										<p className='mt-2 text-xs'>Tải ảnh lên</p>
									</div>
								</div>
								<input
									type='file'
									id='edit-product-image'
									onChange={handleImageChange}
									className='hidden'
									accept='image/*'
								/>
							</label>
						</div>
					</div>

					<div className='col-span-2'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Tên sản phẩm
						</label>
						<input
							type='text'
							value={form.name}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, name: e.target.value }))
							}
							className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
							placeholder='Nhập tên sản phẩm'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Danh mục
						</label>
						<input
							type='text'
							value={form.category}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, category: e.target.value }))
							}
							className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
							placeholder='Nhập danh mục'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Giá
						</label>
						<input
							type='number'
							value={form.price}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, price: e.target.value }))
							}
							className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
							placeholder='Nhập giá'
						/>
					</div>

					<div className='col-span-2'>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Mô tả
						</label>
						<textarea
							value={form.description}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, description: e.target.value }))
							}
							rows='4'
							className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
							placeholder='Nhập mô tả sản phẩm'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Trạng thái
						</label>
						<select
							value={form.status}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, status: e.target.value }))
							}
							className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'>
							<option value='Còn hàng'>Còn hàng</option>
							<option value='Hết hàng'>Hết hàng</option>
						</select>
					</div>

					<div className='col-span-2'>
						<button
							type='submit'
							className='w-full py-3 px-4 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200'>
							{editing ? 'Đang chỉnh sửa...' : 'Lưu thay đổi'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
