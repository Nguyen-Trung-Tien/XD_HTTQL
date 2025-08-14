'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      customerName: {
        type: Sequelize.STRING
      },
      customerEmail: {
         type: Sequelize.STRING 
      },
      customerId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Customers',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
      customerPhone: {
        type: Sequelize.STRING
      },
      shippingAddress: {
        type: Sequelize.STRING
      },
      shippingLat: {
        type: Sequelize.FLOAT
      },
      shippingLng: {
        type: Sequelize.FLOAT
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.FLOAT
      },
      subtotal:{
        type : Sequelize.FLOAT
      },
      shippingFee:{
        type: Sequelize.FLOAT
      },
      shippedAt: {
        type: Sequelize.DATE
      },
      deliveredAt: {
        type: Sequelize.DATE
      },
      shipperId: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
