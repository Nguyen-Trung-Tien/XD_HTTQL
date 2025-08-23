"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Lấy danh sách sản phẩm
    const [products] = await queryInterface.sequelize.query(
      `SELECT id, name, price FROM Products`
    );
    if (!products.length) return;

    const shipperIds = [1, 2, 3, 4, 5];
    const customers = [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567",
        address: "Lê Lợi, Quận 1, TP.HCM",
        lat: 10.774,
        lng: 106.7,
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0912345678",
        address: "Trần Hưng Đạo, Quận 5, TP.HCM",
        lat: 10.7628,
        lng: 106.691,
      },
      {
        id: 3,
        name: "Phạm Văn C",
        email: "phamvanc@example.com",
        phone: "0923456789",
        address: "Nguyễn Huệ, Quận 1, TP.HCM",
        lat: 10.7759,
        lng: 106.701,
      },
      {
        id: 4,
        name: "Lê Thị D",
        email: "lethid@example.com",
        phone: "0934567890",
        address: "Hai Bà Trưng, Quận 3, TP.HCM",
        lat: 10.7808,
        lng: 106.7,
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        email: "hoangvane@example.com",
        phone: "0945678901",
        address: "Điện Biên Phủ, Bình Thạnh, TP.HCM",
        lat: 10.7982,
        lng: 106.705,
      },
      {
        id: 6,
        name: "Đặng Thị F",
        email: "dangthif@example.com",
        phone: "0956789012",
        address: "Võ Văn Kiệt, Quận 6, TP.HCM",
        lat: 10.7479,
        lng: 106.657,
      },
      {
        id: 7,
        name: "Bùi Văn G",
        email: "buivang@example.com",
        phone: "0967890123",
        address: "Phạm Văn Đồng, Thủ Đức, TP.HCM",
        lat: 10.8354,
        lng: 106.73,
      },
      {
        id: 8,
        name: "Phan Thị H",
        email: "phanthih@example.com",
        phone: "0978901234",
        address: "Nguyễn Văn Cừ, Quận 5, TP.HCM",
        lat: 10.7632,
        lng: 106.683,
      },
      {
        id: 9,
        name: "Ngô Thị I",
        email: "ngothii@example.com",
        phone: "0989012345",
        address: "Pasteur, Quận 3, TP.HCM",
        lat: 10.8391,
        lng: 106.767,
      },
      {
        id: 10,
        name: "Trịnh Văn J",
        email: "trinhvanj@example.com",
        phone: "0990123456",
        address: "Lý Thường Kiệt, Quận 10, TP.HCM",
        lat: 10.7741,
        lng: 106.657,
      },
    ];

    function randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    }

    const orders = [];
    const orderItems = [];
    let orderNumber = 1;

    // Hàm random sản phẩm cho đơn
    function randomOrderItems(orderId) {
      const numItems = 1 + Math.floor(Math.random() * 3); // 1-3 sản phẩm
      const used = new Set();
      let items = [];

      for (let i = 0; i < numItems; i++) {
        let product;
        do {
          product = products[Math.floor(Math.random() * products.length)];
        } while (used.has(product.id));
        used.add(product.id);
        const price = Number(product.price.replace(/\D/g, "")) || 100000;
        const quantity = 1 + Math.floor(Math.random() * 5);
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

    // Mỗi khách ít nhất 2 đơn
    for (let i = 0; i < customers.length; i++) {
      for (let j = 0; j < 2; j++) {
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

        // Tạo order trước để lấy id (tạm thời id là orders.length+1)
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
          customerPhone: customers[i].phone,
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
        // Gán orderId tạm thời (sau khi insert sẽ đúng)
        orderItems.push(...items);
      }
    }

    // Thêm 10 đơn random cho khách bất kỳ
    for (let i = 0; i < 10; i++) {
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
        customerPhone: customer.phone,
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

    // Insert Orders trước để lấy id thực tế
    await queryInterface.bulkInsert("Orders", orders, {});

    // Lấy lại id thực tế từ DB
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
