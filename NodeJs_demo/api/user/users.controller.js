
var User = require('./userModel');
var Q = require("q");

//注意接受参数的2种形式

//post : req.body.name
//get  : req.params.ids
//批量处理数据关键字  $in

exports.answer = function(req,res){
    var _name = req.body.name;
    var _age = req.body.age;
    var user = new User({name:_name,age:_age});

    user.save(function(err,data){
        if(err){
            return res.status(200).json({rc:false,data:err});
        }
        else{
            return res.status(200).json({rc:true,data:user});
        }
    })
}

exports.removeByIds = function(req,res){
    var ids = req.params.ids.split(',');
    User.remove({_id:{$in:ids}},function(err){
        if(err){
            return res.status(200).json({rc:false,data: err});
        } else{
            return res.status(200).json({rc:true,data: "批量删除成功!"});
        }
    })
}