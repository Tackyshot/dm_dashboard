import fs from 'fs';

export const get_asset = function (asset_type, file_name, ext) {
  const path = `${__dirname}/../assets/${asset_type}/${file_name}.${ext}`;
  const file = fs.readFileSync(path);

  return file;
};

export const get_mime_type = function (file_ext) {
  const mime_types = {
    jpg: "img/jpeg",
    jpeg: "img/jpeg",
    png: "img/png",
    js: "text/javascript",
    html: "text/html",
    json: "application/json",
  };

  return !!mime_types[file_ext] ? mime_types[file_ext] : null;
};

export const authorize_asset = function(jwt, {asset_type, file_name, ext}) {
  //todo: validate that user has permissions for the asset in question
  return true;
};

export const validate_asset_type = function(asset_type) {
  //todo: compare asset_type with enumerated list of allowed types here. return boolean
  return true;
};

export const validate_file_ext = function (file_ext) {
  //todo: compare asset_type with enumerated list of allowed file extensions here. return boolean
  return true;
};