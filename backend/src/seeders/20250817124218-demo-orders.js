"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Lấy danh sách sản phẩm
    const [products] = await queryInterface.sequelize.query(
      `SELECT id, name, price FROM stocks`
    );
    if (!products.length) return;

    const shipperIds = [1, 2, 3, 4, 5];

    // Lấy khách hàng
    const [customers] = await queryInterface.sequelize.query(
      `SELECT id, name, lat, lng, address, phoneNumber, email FROM Customers`
    );

    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }

    function randomOrderItems(orderId) {
      const numItems = 1 + Math.floor(Math.random() * 5); // 1-5 sản phẩm
      const used = new Set();
      let items = [];

      for (let i = 0; i < numItems; i++) {
        let product;
        do {
          product = products[Math.floor(Math.random() * products.length)];
        } while (used.has(product.id));
        used.add(product.id);
        const price = Number(product.price.replace(/\D/g, "")) || 100000;
        const quantity = 1 + Math.floor(Math.random() * 10);
        items.push({
          orderId,
          productId: product.id,
          name: product.name,
          price,
          quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return items;
    }

    const orders = [];
    const orderItems = [];
    let orderNumber = 1;

    // Mỗi khách 3–5 đơn
    for (let i = 0; i < customers.length; i++) {
      const numOrders = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < numOrders; j++) {
        const orderDate = randomDate(
          new Date("2024-01-01"),
          new Date("2025-09-01")
        );
        const shippedAt = new Date(orderDate.getTime() + 2 * 60 * 60 * 1000);
        const deliveredAt = new Date(
          orderDate.getTime() + 2 * 24 * 60 * 60 * 1000
        );
        const shippingFee = 30000;
        const shipperId =
          shipperIds[Math.floor(Math.random() * shipperIds.length)];

        const orderId = orders.length + 1;
        const items = randomOrderItems(orderId);
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        orders.push({
          orderNumber: "DH-" + String(orderNumber++).padStart(5, "0"),
          customerId: customers[i].id,
          customerName: customers[i].name,
          customerEmail: customers[i].email,
          customerPhone: customers[i].phoneNumber,
          shippingAddress: customers[i].address,
          shippingLat: customers[i].lat,
          shippingLng: customers[i].lng,
          paymentMethod: "momo",
          status: "delivered",
          subtotal,
          shippingFee,
          total: subtotal + shippingFee,
          shipperId,
          createdAt: orderDate,
          updatedAt: deliveredAt,
          shippedAt,
          deliveredAt,
        });

        orderItems.push(...items);
      }
    }

    // Thêm 50 đơn random cho khách ngẫu nhiên
    for (let i = 0; i < 50; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const orderDate = randomDate(
        new Date("2024-01-01"),
        new Date("2025-07-01")
      );
      const shippedAt = new Date(orderDate.getTime() + 2 * 60 * 60 * 1000);
      const deliveredAt = new Date(
        orderDate.getTime() + 2 * 24 * 60 * 60 * 1000
      );
      const shippingFee = 30000;
      const shipperId =
        shipperIds[Math.floor(Math.random() * shipperIds.length)];

      const orderId = orders.length + 1;
      const items = randomOrderItems(orderId);
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      orders.push({
        orderNumber: "DH-" + String(orderNumber++).padStart(5, "0"),
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phoneNumber,
        shippingAddress: customer.address,
        shippingLat: customer.lat,
        shippingLng: customer.lng,
        paymentMethod: "momo",
        status: "delivered",
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
        shipperId,
        createdAt: orderDate,
        updatedAt: deliveredAt,
        shippedAt,
        deliveredAt,
      });

      orderItems.push(...items);
    }

    // Insert Orders
    await queryInterface.bulkInsert("Orders", orders, {});

    // Lấy id thực tế từ DB
    const [insertedOrders] = await queryInterface.sequelize.query(
      `SELECT id FROM Orders ORDER BY id ASC`
    );

    let idx = 0;
    for (let i = 0; i < orderItems.length; i++) {
      orderItems[i].orderId = insertedOrders[idx].id;
      if (
        i + 1 === orderItems.length ||
        orderItems[i + 1].orderId !== orderItems[i].orderId
      ) {
        idx++;
      }
    }

    await queryInterface.bulkInsert("OrderItems", orderItems, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderItems", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
