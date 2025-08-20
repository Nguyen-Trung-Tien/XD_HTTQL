import { useState } from 'react';
import { createProduct } from '../../API/products/productsApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import upload_area from '../../assets/assets';

function ProductForm() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [image, setImage] = useState(false);
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('Còn hàng');

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			if (!name || !category || !price || !description || !status) {
				alert('Vui lòng điền đầy đủ thông tin!');
				return;
			}

			const stock = 0;

			const formData = new FormData();

			formData.append('name', name);
			formData.append('category', category);
			formData.append('description', description);
			formData.append('stock', stock);
			formData.append('price', price);
			formData.append('status', status);
			formData.append('image', image);

			await createProduct(formData);

			toast.success('Thêm sản phẩm thành công');

			navigate('/products');
		} catch (error) {
			console.error('Error creating product:', error);
			alert('Có lỗi xảy ra khi tạo sản phẩm!');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white shadow-md rounded-2xl p-8 w-full max-w-md mx-auto'>
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
							required
						/>
					</label>
				</div>
				<div>
					<label className='block text-sm text-gray-600 mb-1'>
						Tên sản phẩm
					</label>
					<input
						type='text'
						onChange={(e) => setName(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Danh mục</label>
					<input
						type='text'
						onChange={(e) => setCategory(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Giá</label>
					<input
						type='text'
						name='price'
						onChange={(e) => setPrice(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div className='flex gap-2 mt-4'>
					<label className='flex flex-col gap-1 block text-sm text-gray-600 mb-1'>
						<label className='block text-sm text-gray-600 mb-1'>Mô tả</label>
						<textarea
							onChange={(e) => setDescription(e.target.value)}
							className='w-[384px] h-[128px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</label>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Trạng thái</label>
					<select
						name='status'
						onChange={(e) => setStatus(e.target.value)}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
						<option value='Còn hàng'>Còn hàng</option>
						<option value='Hết hàng'>Hết hàng</option>
					</select>
				</div>

				<button
					type='submit'
					className='w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
					Tạo sản phẩm
				</button>
			</div>
		</form>
	);
}

export default ProductForm;
