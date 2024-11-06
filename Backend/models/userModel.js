const { UserModel } = require('./utils/schemaLoader');

const createUser  = async (data) => {
    const user = new UserModel(data);
    return await user.save();
};

const getUsers = async () => {
    return await UserModel.find();
};

const findUserByPhone = async (phone) => {
    return await UserModel.findOne({ phone });
};

const findUserById = async (id) => {
    return await UserModel.findOne({ _id: id });
};

const updateUser = async (id, data) => {
    return await UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteUser = async (id) => {
    return await UserModel.findOneAndDelete({ _id: id });
};

module.exports = { createUser, getUsers, findUserByPhone, findUserById, updateUser, deleteUser };