import {Schema, model} from 'mongoose';

export const AccountSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
});

export const AccountModel = model("Account", AccountSchema);

export const GetAccountByID = async (id) => (await AccountModel.findOne({_id: id}));

export const GetAccountByUser = async (user) => (await AccountModel.findOne({username: user}));

export const GetAccountByEmail = async (email) => (await AccountModel.findOne({email: email}));

export const UpdateAccountByUser = async (user, data) => (await AccountModel.updateOne(user, data));

export const CreateAccount = async (user) => (await AccountModel.create(user));