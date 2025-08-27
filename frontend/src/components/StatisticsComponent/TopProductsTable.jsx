import React from 'react';

const TopProductsTable = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 10 Sản phẩm Bán chạy nhất</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên sản phẩm</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng đã bán</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((product, index) => (
                            <tr key={product.productId} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 text-gray-700">{product.name}</td>
                                <td className="px-6 py-4 text-gray-700">{product.totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopProductsTable;