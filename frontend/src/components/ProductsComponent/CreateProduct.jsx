import { useEffect, useState } from 'react';
import { getAllProducts, createProduct } from '../../API/products/productsApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function ProductForm({ onCreate }) {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { allProducts } = await getAllProducts();
				setProducts(allProducts);
			} catch (err) {
				console.error(err);
			}
		};
		fetchProduct();
	}, []);

	const [form, setForm] = useState({
		price: '',
		status: 'Còn hàng',
	});
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState('');
	const [stockError, setStockError] = useState('');

	const uniqueCategories = [...new Set(products.map((item) => item.category))];

	const inventory = products
		.filter((item) => item.name === name)
		.map((product) => product.stock);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleChangeStock = (e) => {
		const value = e.target.value;
		setStock(value);

		const inventoryStock = inventory[0] || 0;

		if (parseInt(value) > inventoryStock) {
			setStockError('Số lượng nhập vào vượt quá hàng tồn kho!');
		} else {
			setStockError('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !category || !form.price || !stock) {
			alert('Vui lòng điền đầy đủ thông tin!');
			return;
		}

		if (stockError) {
			alert('Vui lòng kiểm tra lại số lượng!');
			return;
		}

		const newProduct = {
			...form,
			name,
			category,
			stock: parseInt(stock),
			price: parseFloat(form.price),
		};

		try {
			const product = await createProduct(newProduct);

			onCreate?.(product);

			setForm({
				price: '',
				status: 'Còn hàng',
			});

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
					<label className='block text-sm text-gray-600 mb-1'>
						Tên sản phẩm
					</label>
					<select
						onChange={(e) => setName(e.target.value)}
						className='w-full mt-2 px-3 py-2 border border-gray-300 outline-none rounded-lg'>
						<option selected disabled>
							-- Chọn sản phẩm --
						</option>
						{products.map((product, index) => {
							return (
								<option key={index} value={product.name}>
									{product.name}
								</option>
							);
						})}
					</select>
				</div>

				<div>
					<label className='block text-sm text-gray-600 mb-1'>Danh mục</label>
					<select
						onChange={(e) => setCategory(e.target.value)}
						className='w-full mt-2 px-3 py-2 border border-gray-300 outline-none rounded-lg'>
						<option selected disabled>
							-- Chọn danh mục --
						</option>
						{uniqueCategories.map((category, index) => (
							<option key={index} value={category}>
								{category}
							</option>
						))}
					</select>
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
					<label className='block text-sm text-gray-600 mb-1'>Số lượng</label>
					<input
						type='number'
						name='stock'
						value={stock}
						onChange={handleChangeStock}
						className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
							stockError
								? 'border-red-500 focus:ring-red-400'
								: 'border-gray-300 focus:ring-blue-400'
						}`}
					/>
					{stockError && (
						<p className='text-red-500 text-sm mt-1'>{stockError}</p>
					)}
				</div>

				<div className='flex gap-2 mt-4'>
					<label className='flex gap-1 block text-sm text-gray-600 mb-1'>
						<p>Số lượng trong kho: </p>
						{inventory}
					</label>
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
					Tạo sản phẩm
				</button>
			</div>
		</form>
	);
}

export default ProductForm;
