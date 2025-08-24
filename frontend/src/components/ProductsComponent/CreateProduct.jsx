import { useState } from 'react';
import { createProduct } from '../../API/products/productsApi';
import { toast } from 'react-toastify';
import upload_area from '../../assets/assets';

const ProductForm = () => {
	const [name, setName] = useState('');
	const [image, setImage] = useState(false);
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [unit, setUnit] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('Còn hàng');
	const [adding, setAdding] = useState(false);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			setAdding(true);

			if (
				!name ||
				!category ||
				!price ||
				!unit ||
				!description ||
				!status ||
				!image
			) {
				toast.error('Vui lòng điền đầy đủ thông tin!');
				return;
			}

			const stock = 0;

			const formData = new FormData();

			formData.append('name', name);
			formData.append('category', category);
			formData.append('description', description);
			formData.append('unit', unit);
			formData.append('stock', stock);
			formData.append('price', String(price));
			formData.append('status', status);
			formData.append('image', image);

			const data = await createProduct(formData);

			if (data.success) {
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setAdding(false);
		}
	};

	return (
		<div className='flex'>
			<div>
				<button
					onClick={() => window.history.back()}
					className='mt-6 ml-6 font-medium text-sm bg-white px-4 py-2 rounded-full text-blue-600 hover:text-blue-800'>
					&larr; Quay lại
				</button>
			</div>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded-2xl mt-6 p-8 w-full max-w-md mx-[450px]'>
				<h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
					Thêm sản phẩm mới
				</h2>

				<div className='space-y-4'>
					<div>
						<label className='block text-sm text-gray-600 mb-1'>Ảnh</label>
						<label htmlFor='image'>
							<img
								src={!image ? upload_area : URL.createObjectURL(image)}
								alt=''
								className='mt-2 h-16 rounded cursor-pointer'
							/>
							<input
								onChange={(e) => setImage(e.target.files[0])}
								type='file'
								id='image'
								hidden
							/>
						</label>
					</div>
					<div>
						<label className='block text-sm text-gray-600 mb-1'>
							Tên sản phẩm
						</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>

					<div>
						<label className='block text-sm text-gray-600 mb-1'>Danh mục</label>
						<input
							type='text'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>

					<div>
						<label className='block text-sm text-gray-600 mb-1'>Giá</label>
						<input
							type='number'
							name='price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>

					<div>
						<label className='block text-sm text-gray-600 mb-1'>Đơn vị</label>
						<input
							type='text'
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>

					<div className='flex gap-2 mt-4'>
						<label className='flex flex-col gap-1 block text-sm text-gray-600 mb-1'>
							<label className='block text-sm text-gray-600 mb-1'>Mô tả</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className='w-[384px] h-[100px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
							/>
						</label>
					</div>

					<div>
						<label className='block text-sm text-gray-600 mb-1'>
							Trạng thái
						</label>
						<select
							name='status'
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
							<option value='Còn hàng'>Còn hàng</option>
							<option value='Hết hàng'>Hết hàng</option>
						</select>
					</div>

					<button
						type='submit'
						className='w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
						{adding ? 'Đang tạo...' : 'Tạo sản phẩm'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
