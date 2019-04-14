"use strict";

var sql = require("./sql");
const saveFile = require("save-file");
const fs = require("fs");
const mime = require("mime-types");
const { head } = require("ramda");

module.exports.showById = async id => {
  return head(await sql.showById(id));
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
    return uploadFile(files);
  }
};

async function uploadFile(file) {
  let name = `${createName()}.${mime.extension(file.mimetype)}`;
  const dbPromise = sql.add({
    name: file.name,
    path: `/files/${name}`,
    absolutePath: `${process.cwd()}/web/public/files/${name}`,
    size: file.size,
    mimetype: file.mimetype
  });
  file.on("data", async d => {
    await saveFile(d, `../../web/public/files/${name}`);
  });

  return dbPromise;
}

function createName() {
  const name = Math.random()
    .toString(36)
    .substr(-9);
  return fs.existsSync(`web/public/files/${name}`) ? createName() : name;
}
