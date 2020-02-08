import {GetAccountByUser} from "../models/account";
import {AuthHelper} from "../helpers/AuthHelper";
import blacklist from 'blacklist';
// import DbManager from '../dbManager';
// import {Models} from 'gf-db-manager';

// const {GetAccountByUser} = Models;

exports.plugin = {
  name: 'login',
  register: (server, options) => {
    server.route({
      method: 'POST',
      path: '/auth/{action?}',
      config: {
        auth: {
          strategy: 'default',
          mode: 'optional',
        }
      },
      handler: async (req, h) => {
        const {action} = req.params;

        if(!action) return h.response('no action provided').code(400);

        switch (action) {
          case "login":
            return await doLogin(req, h);
          case "register":
            return await doRegister(req, h);
          case "logout":
            return await doLogout(req, h);
          case "validate":
            return await doValidate(req, h);
        }


      }
    })
  }
};

const doLogin = async (req, h) => {
  const {username, password} = req.payload;

  try {
    let account = await GetAccountByUser(username);

    if(account) {
      if(AuthHelper.compare(password, account.password)){
        //password and account valid, create session
        let acc = blacklist(account, {password: true});
        let token = AuthHelper.signToken(acc);
        let res = h.response({jwt: token, user: acc});

        if(res){
          res.type('application/JSON');
          res.header('Authorization', token);

          return res;
        }

        return 'ok';
      }
    }

    return h.response('no user').code(401);
  }
  catch (e) {
    throw e;
  }
};

const doRegister = async (req, h) => {
  //todo: add code that registers a user
};

const doLogout = async (req, h) => {
  //todo: add code that invalidates a user session.
};

const doValidate = async (req, h) =>{
  if(req.auth.credentials._id){
    const res = h.response({user: req.auth.credentials});
    res.type('application/JSON');

    return res
  }
};