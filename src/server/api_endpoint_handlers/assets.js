import fs from 'fs';
import {get_mime_type, get_asset} from '../helpers/asset_helpers';

exports.plugin = {
  name: 'login',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/assets/{asset_type}/{file_name}.{ext}',
      config: {
        auth: {
          strategy: 'default',
          mode: 'optional',
        }
      },
      handler: async (req, { response }) => {
        const {asset_type, file_name, ext} = req.params;

        if(!asset_type) return response('no asset type provided').code(400);
        if(!file_name) return response('no file name provided').code(400);
        if(!ext) return response('no file extension provided').code(400);

        const asset = get_asset(asset_type, file_name, ext);

        if (!!asset) return response(asset).type(get_mime_type(ext)).code(200);
        else return response(`no asset found with the name: ${file_name}.${ext}`).code(404);
      }
    });
  }
};
