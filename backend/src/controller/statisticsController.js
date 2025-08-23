const { Order, OrderItem, Customer, Product, sequelize } = require('../models');
const { Op } = require('sequelize');


// Hàm trợ giúp để lấy ngày bắt đầu dựa trên khoảng thời gian
const getStartDate = (period) => {
    const now = new Date();
    if (period === 'week') {
        const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return new Date(firstDayOfWeek.setHours(0, 0, 0, 0));
    } else if (period === 'month') {
        return new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'year') {
        return new Date(now.getFullYear(), 0, 1);
    }
    // Mặc định là 'hôm nay'
    return new Date(now.setHours(0, 0, 0, 0));
};

module.exports = {
    // ...
};