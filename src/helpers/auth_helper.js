import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {GetAccountByID} from "../models/account";

export class AuthHelper{
  
  static hash(tohash) {
    return bcryptjs.hashSync(tohash, bcryptjs.genSaltSync(10))
  }//end hash
  
  static compare(str, hash) {
    return bcryptjs.compareSync(str, hash);
  }//end compare

  static signToken = (toSign) => jwt.sign(toSign, "my private key", {algorithm: 'HS256'});

  static verifyToken = (token) => jwt.verify(token, "my private key", {algorithm: 'HS256'});

  static validate = async (dT, request) => { //dt => decodedToken
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
}