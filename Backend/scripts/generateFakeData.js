const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const { constants } = require('../utils/constants'); // Adjust this path as needed
const Product = require('../models/schemas/productSchema'); // Adjust path to where your product schema is exported

// Generate a single fake product with the specified user ID
function generateFakeProduct() {
    return {
        user: new mongoose.Types.ObjectId('6729b21ed2134028c4edbea3'), // Fixed user ID
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })),
        category: faker.commerce.department(),
        description: faker.lorem.sentence(),
        stock: faker.number.int({ min: 0, max: 100 }), // Updated for faker v7+
        image: faker.image.url(), // Updated for faker v7+
        qtysold: faker.number.int({ min: 0, max: 500 }), // Updated for faker v7+
        overallrating: parseFloat((Math.random() * 5).toFixed(1))
    };
}

// Generate an array of fake products
function generateFakeProducts(count = 10) {
    return Array.from({ length: count }, () => generateFakeProduct());
}

// Example usage: generate and log 10 fake products
const fakeProducts = generateFakeProducts(20);
console.log(fakeProducts);
