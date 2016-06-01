/**
 * Created by mac on 15/12/13.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    age:String
});

module.exports = mongoose.model('User',userSchema);