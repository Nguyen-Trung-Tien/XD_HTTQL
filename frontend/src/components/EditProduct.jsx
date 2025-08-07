import { useEffect, useState } from 'react';
import { getAllProducts, editProduct } from '../API/products/productsApi';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

function ProductForm() {
	const inventoryItems = [
		{
			id: 'SP001',
			name: 'Điện thoại X Pro',
			category: 'Điện tử',
			stock: 45,
			price: 23000000,
			status: 'in-stock',
			location: 'Kho A',
			lastUpdated: '2023-10-15',
		},
		{
			id: 'SP002',
			name: 'Laptop Ultra Pro',
			category: 'Điện tử',
			stock: 12,
			price: 35000000,
			status: 'in-stock',
			location: 'Kho B',
			lastUpdated: '2023-10-18',
		},
		{
			id: 'SP003',
			name: 'Tai nghe không dây',
			category: 'Phụ kiện',
			stock: 78,
			price: 3000000,
			status: 'in-stock',
			location: 'Kho A',
			lastUpdated: '2023-10-20',
		},
		{
			id: 'SP004',
			name: 'Đồng hồ thông minh',
			category: 'Thiết bị đeo',
			stock: 5,
			price: 7000000,
			status: 'low-stock',
			location: 'Kho C',
			lastUpdated: '2023-10-22',
		},
		{
			id: 'SP005',
			name: 'Máy ảnh DSLR',
			category: 'Điện tử',
			stock: 0,
			price: 18000000,
			status: 'out-of-stock',
			location: 'Kho B',
			lastUpdated: '2023-10-10',
		},
	];

	const navigate = useNavigate();
	const { id } = useParams();

	const [originalStock, setOriginalStock] = useState(0);
	const [form, setForm] = useState({
		name: '',
		category: '',
		price: '',
		stock: '',
		status: 'Còn hàng',
	});
	const [stockError, setStockError] = useState('');

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const data = await getAllProducts();
				const selectedProduct = data.find((p) => p.id === parseInt(id)); // lấy đúng sản phẩm theo ID
				setForm({
					name: selectedProduct.name,
					category: selectedProduct.category,
					price: selectedProduct.price,
					stock: 0, // mặc định số thay đổi
					status: selectedProduct.status,
				});
				setOriginalStock(selectedProduct.stock); // lưu số lượng cũ
			} catch (err) {
				console.error(err);
			}
		};
		fetchProduct();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'stock') {
			const change = parseInt(value);
			const inventory =
				inventoryItems.find((item) => item.name === form.name)?.stock || 0;

			if (change > inventory) {
				setStockError('Số lượng nhập vào vượt quá hàng tồn kho!');
			} else {
				setStockError('');
			}
		}

		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const change = parseInt(form.stock);

		if (isNaN(change)) {
			alert('Số lượng không hợp lệ');
			return;
		}

		if (stockError) {
			alert('Vui lòng kiểm tra lại số lượng!');
			return;
		}

		const productInventory = inventoryItems.find(
			(item) => item.name === form.name
		);
		const availableStock = productInventory?.stock || 0;

		const newStock = originalStock + change;

		const updateData = {
			price: parseFloat(form.price),
			stock: newStock,
			status: form.status,
		};

		try {
			await editProduct(id, updateData);
			productInventory.stock = availableStock - change;
			toast.success('Cập nhật sản phẩm thành công');
			navigate('/products');
		} catch (err) {
			console.error(err);
			alert('Có lỗi khi cập nhật sản phẩm');
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white shadow-md rounded-2xl p-8 w-full max-w-md mx-auto'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
				Chỉnh sửa sản phẩm
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
						disabled
						className='w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg'
					/>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Danh mục</label>
					<input
						type='text'
						name='category'
						value={form.category}
						disabled
						className='w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg'
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
						Số lượng muốn thêm hoặc bớt
					</label>
					<input
						type='number'
						name='stock'
						value={form.stock}
						onChange={handleChange}
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
							stockError
								? 'border-red-500 focus:ring-red-400'
								: 'border-gray-300 focus:ring-blue-400'
						}`}
					/>
					<p className='text-sm text-gray-500 mt-1'>
						Số lượng trong kho:{' '}
						{inventoryItems.find((item) => item.name === form.name)?.stock ?? 0}
					</p>
					{stockError && (
						<p className='text-red-500 text-sm mt-1'>{stockError}</p>
					)}
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Trạng thái</label>
					<select
						name='status'
						value={form.status}
						onChange={handleChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
						<option value='Còn hàng'>Còn hàng</option>
						<option value='Hết hàng'>Hết hàng</option>
					</select>
				</div>

				<button
					type='submit'
					className='w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
					Gửi
				</button>
			</div>
		</form>
	);
}

export default ProductForm;
