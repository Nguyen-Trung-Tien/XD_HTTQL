import { useState } from 'react';

function ProductForm({ onCreate }) {
	const [form, setForm] = useState({
		name: '',
		category: '',
		price: '',
		stock: '',
		status: 'Còn hàng',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!form.name || !form.category || !form.price || !form.stock) {
			alert('Vui lòng điền đầy đủ thông tin!');
			return;
		}

		const newProduct = {
			...form,
			id: Date.now(),
			stock: parseInt(form.stock),
		};

		onCreate?.(newProduct);

		setForm({
			name: '',
			category: '',
			price: '',
			stock: '',
			status: 'Còn hàng',
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white shadow-md rounded-2xl p-8 w-full max-w-md mx-auto'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
				Tạo sản phẩm mới
			</h2>

			<div className='space-y-4'>
				<div>
					<label className='block text-sm text-gray-600 mb-1'>
						Tên sản phẩm
					</label>
					<input
						type='text'
						name='name'
						value={form.name}
						onChange={handleChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Danh mục</label>
					<input
						type='text'
						name='category'
						value={form.category}
						onChange={handleChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Giá</label>
					<input
						type='text'
						name='price'
						value={form.price}
						onChange={handleChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>
						Số lượng trong kho
					</label>
					<input
						type='number'
						name='stock'
						value={form.stock}
						onChange={handleChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Trạng thái</label>
					<select
						name='status'
						value={form.status}
						onChange={handleChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
						<option value='Còn hàng'>Còn hàng</option>
						<option value='Sắp hết'>Sắp hết</option>
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
