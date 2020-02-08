import fs from 'fs';
import Hapi from 'hapi';
import {AuthHelper} from "./helpers/AuthHelper";
import mongoose from 'mongoose';

class Server {
  server;

  constructor() {
    this.server = Hapi.server({
      port: 3001,
      host: 'localhost'
    });

  }//end constructor

  async initRoutes() {
    let routes = fs.readdirSync(`${__dirname}/api_endpoint_handlers`).filter(route => {if(route.charAt(0) !== '.') return route});

    await this.server.register(require('hapi-auth-jwt2'));

    this.server.auth.strategy('default', 'jwt', {
      key: "my private key",
      validate: AuthHelper.validate,
      verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
    });

    routes.forEach(async (route) => {
      await this.server.register(require(`${__dirname}/api_endpoint_handlers/${route}`));
    });

    return this;
  }//end addroutes

  async start() {
    await this.server.start();
    
    console.log("Server running on", this.server.info.uri);
  }//end start
}
