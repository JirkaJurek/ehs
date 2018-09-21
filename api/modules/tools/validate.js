'use strict'

const Joi = require('joi');

const postAddTool = {
    body: {
        supplier: Joi.string(),
        categories: Joi.array(),
        name: Joi.string(),
        revizion: Joi.string(),
        startWork: Joi.string(),
        seriesNumber: Joi.string(),
        internal: Joi.string(),
        external: Joi.string(),
        revisionInterval: Joi.object(),
        // měl by se dopočítávat poslední revize + revisionInterval
        //nextRevision: Joi.string(),
        comment: Joi.string(),
        employee: Joi.object(),
        revisions: Joi.string(),
        repair: Joi.string(),
        price: Joi.string(),
        filter1: Joi.string(),
        filter2: Joi.string(),
        filter3: Joi.string(),
        files: Joi.string(),
        guaranteeInto: Joi.string(),
        uploadFile: Joi.object(),
    }
}

const postAddToolRevision = {
    body: {
        date: Joi.string(),
        description: Joi.string(),
        when_date: Joi.string(),
        who: Joi.string(),
    }
}

module.exports = {
    postAddTool,
    postAddToolRevision
}
