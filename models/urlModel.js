var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
mongoose.set('debug', true);

var urlSchema = new Schema({
    _id: {type: String, default: shortid.generate },
    url: String
    
})

var urls = mongoose.model('Url', urlSchema)

module.exports = urls