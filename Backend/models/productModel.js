const { ProductModel } = require('./utils/schemaLoader');

const createProduct = async (data) => {
    const product = new ProductModel(data);
    return await product.save();
};

const getProducts = async () => {
    return await ProductModel.find();
};

const getTopProducts = async () => {
    return await ProductModel.find({ overallrating: { $gt: 4 } }) 
        .sort({ overallrating: -1 }) 
        .limit(9); 
};

const getPopularProducts = async () => {
    return await ProductModel.find({ qtysold: { $gt: 0 } }) 
        .sort({ qtysold: -1 }) 
        .limit(9); 
};


const findProductById = async (id) => {
    return await ProductModel.findOne({ _id: id});
};

const findProductByCategory = async (category) => {
    return await ProductModel.find({ category });
};

const findProductsByName = async (name) => {
    const regex = new RegExp(name, 'i');
    return await ProductModel.find({ name: { $regex: regex } });
};

const updateProduct = async (id, data) => {
    return await ProductModel.findOneAndUpdate({ _id: id },data, { new: true });
};

const deleteProduct = async (id) => {
    return await ProductModel.findOneAndDelete({ _id: id });
};

module.exports = { createProduct, getProducts, getTopProducts, getPopularProducts, findProductById, findProductByCategory, findProductsByName, updateProduct, deleteProduct };