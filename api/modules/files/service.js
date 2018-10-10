"use strict";

var sql = require("./sql");
const saveFile = require("save-file");
const fs = require("fs");
const mime = require('mime-types')

module.exports.showById = id => {
  // return sql.showById(id);
};

module.exports.list = data => {
  return sql.list(data);
};

module.exports.upload = files => {
  if (files.length) {
    files.forEach(file => {
      uploadFile(file);
    });
  } else {
    uploadFile(files);
  }
};

function uploadFile(file) {
  let name = `${createName()}.${mime.extension(file.mimetype)}`;

  sql.add({
        name: file.name,
        path: `/files/${name}`,
        absolutePath: `${process.cwd()}/web/public/files/${name}`,
        size: file.size,
        mimetype: file.mimetype,
  })
  
  file.on("data", d => {
    saveFile(d, `../../web/public/files/${name}`);
  });
}

function createName() {
    const name = Math.random().toString(36).substr(-9)
    return fs.existsSync(`web/public/files/${name}`) ? createName() : name;
}


