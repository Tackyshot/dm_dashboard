import {Schema, model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const mockUser = {
  id: "1234",
  username: "testuser",
  password: bcryptjs.hashSync("password", bcryptjs.genSaltSync(10)),
  email: "testuser@fakeemail.com"
};

export const AccountSchema = new Schema({
  username: String,
  password: String,
  email: String
});

export const AccountModel = model("Account", AccountSchema);

//todo: replace mock with actual mongodb call
// export const GetAccountByID = async (id) => (await AccountModel.findOne({_id: id}));
export const GetAccountByID = async (id) => (id === mockUser.id ? mockUser : null);

//todo: replace mock with actual mongodb call
// export const GetAccountByUser = async (user) => (await AccountModel.findOne({username: user}));
export const GetAccountByUser = async (user) => (user === mockUser.username ? mockUser : null);

// -- Example util methods for the Account Schema based in MongoDB
export const GetAccountByEmail = async (email) => (await AccountModel.findOne({email: email}));

export const UpdateAccountByUser = async (user, data) => (await AccountModel.updateOne(user, data));

export const CreateAccount = async (user) => (await AccountModel.create(user));