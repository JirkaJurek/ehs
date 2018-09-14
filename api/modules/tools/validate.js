'use strict'

const Joi = require('joi');

const postAddTool = {
    body: {
        supplier: Joi.string(),
        categories: Joi.string(),
        name: Joi.string(),
        revizion: Joi.string(),
        startWork: Joi.date(),
        seriesNumber: Joi.string(),
        internal: Joi.string(),
        external: Joi.string(),
        externalMaintenance: Joi.number(),
        nextRevision: Joi.date(),
        comment: Joi.string(),
        employee: Joi.string(),
        revisions: Joi.string(),
        repair: Joi.string(),
        price: Joi.number(),
        filter1: Joi.string(),
        filter2: Joi.string(),
        filter3: Joi.string(),
        files: Joi.string(),
        guaranteeInto: Joi.date(),
        supplierId: Joi.number(),
        uploadFile: Joi.object(),
    }
}

module.exports = {
    postAddTool
}
