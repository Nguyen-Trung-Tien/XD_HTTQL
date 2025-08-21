import { useEffect, useState } from 'react';
import { getAllProducts, editProduct } from '../../API/products/productsApi';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import upload_area from '../../assets/assets';

function ProductForm() {
	const { id } = useParams();

	// single source of truth for the form
	const [previewUrl, setPreviewUrl] = useState('');
	const [editing, setEditing] = useState(false);

	const [form, setForm] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		image: '',
		status: 'Còn hàng',
	});

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { products } = await getAllProducts();
				const selectedProduct = products.find((p) => p.id === parseInt(id)); // lấy đúng sản phẩm theo ID
				setForm({
					name: selectedProduct.name,
					category: selectedProduct.category,
					price: selectedProduct.price,
					description: selectedProduct.description,
					status: selectedProduct.status,
				});
				setPreviewUrl(selectedProduct.image);
			} catch (err) {
				console.error(err);
			}
		};
		fetchProduct();
	}, [id]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setForm((prev) => ({ ...prev, image: file })); // lưu File để gửi lên BE
			setPreviewUrl(URL.createObjectURL(file)); // tạo preview cho ảnh mới
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setEditing(true);

			const formData = new FormData();

			// use the unified form state
			formData.append('name', form.name);
			formData.append('category', form.category);
			formData.append('description', form.description);
			formData.append('price', String(form.price));
			formData.append('status', form.status);
			formData.append('image', form.image);

			const data = await editProduct(id, formData);

			if (data.success) {
				toast.success(data.message);
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
							src={previewUrl || upload_area}
							alt=''
							className='mt-2 h-16 rounded cursor-pointer'
						/>
						<input onChange={handleImageChange} type='file' id='image' hidden />
					</label>
				</div>
				<div>
					<label className='block text-sm text-gray-600 mb-1'>
						Tên sản phẩm
					</label>
					<input
						type='text'
						onChange={(e) =>
							setForm((prev) => ({ ...prev, name: e.target.value }))
						}
						value={form.name}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Danh mục</label>
					<input
						type='text'
						onChange={(e) =>
							setForm((prev) => ({ ...prev, category: e.target.value }))
						}
						value={form.category}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Giá</label>
					<input
						type='number'
						name='price'
						onChange={(e) =>
							setForm((prev) => ({ ...prev, price: e.target.value }))
						}
						value={form.price}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div className='flex gap-2 mt-4'>
					<label className='flex flex-col gap-1 text-sm text-gray-600 mb-1'>
						<label className='block text-sm text-gray-600 mb-1'>Mô tả</label>
						<textarea
							onChange={(e) =>
								setForm((prev) => ({ ...prev, description: e.target.value }))
							}
							value={form.description}
							className='w-[384px] h-[128px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</label>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Trạng thái</label>
					<select
						name='status'
						value={form.status}
						onChange={(e) =>
							setForm((prev) => ({ ...prev, status: e.target.value }))
						}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
						<option value='Còn hàng'>Còn hàng</option>
						<option value='Hết hàng'>Hết hàng</option>
					</select>
				</div>

				<button
					type='submit'
					className='w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
					{editing ? 'Đang chỉnh sửa...' : 'Chỉnh sửa sản phẩm'}
				</button>
			</div>
		</form>
	);
}

export default ProductForm;
