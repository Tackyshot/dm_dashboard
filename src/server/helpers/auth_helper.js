import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {GetAccountByID} from "../models/account";

export const hash = (tohash) => {
  return bcryptjs.hashSync(tohash, bcryptjs.genSaltSync(10))
};

export const compare = (str, hash) => {
  return bcryptjs.compareSync(str, hash);
};

export const signToken = (toSign) => jwt.sign(toSign, "my private key", {algorithm: 'HS256'});

export const verifyToken = (token) => jwt.verify(token, "my private key", {algorithm: 'HS256'});

export const validate = async (dT, request) => { //dt => decodedToken
  try{
    let acc = await GetAccountByID(dT._id);

    if(acc._id == dT._id && dT.email == acc.email && dT.username == acc.username){
      return {isValid: true};
    }

    return {isValid: false};
  }
  catch (err) {
    console.error('validation error:', err);
  }
};