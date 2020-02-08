import {get_asset} from '../helpers/asset_helpers';

exports.plugin = {
  name: "catchall",
  register: (server, options) => {
    server.route({
      path:"/{any*}",
      method: "GET",
      config: {
        auth: {
          strategy: 'default',
          mode: 'optional',
        }
      },
      handler: (req, h) => h.response(get_asset('html', 'index', 'html')).type('text/html').code(200)
    });
  }
};