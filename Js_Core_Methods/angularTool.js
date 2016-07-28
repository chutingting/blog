/**
 * Created by mac on 16/6/6.
 */

angular.module('app').factory("tools",function($http,$state,$rootScope){

    var Tools = function(){

        var that = this;

        this.templateType = [{name:"全部",code:""}];

        this.getData = function(url,cb){
            $http.get(url).success(function(d){
                d = d.list1;
                if(d.status.code == "1"){
                    if(d.data){
                        cb(d.data);
                    }else{
                        alert("查询成功,但是数据为空!");
                    }
                } else{
                    alert(d.status.message);
                }
            })
        }

        this.postData = function(url,data,cb){
            $http({
                method:"POST",
                url:url,
                data:data
            }).success(function(d){
                if(d.status.code == "1"){
                    cb(d.data);
                }
                else{
                    alert(d.status.message);
                }
            })
        }

        //获取选中项
        this.getSelectedItems = function(data){
            var res = [];
            for(var i=0;i<data.length;i++){
                if(data[i].ck){
                    res.push(data[i]);
                }
            }
            return res;
        }

        //选择全部
        this.setSelectAll = function(data,tag){
            for(var i=0;i<data.length;i++){
                data[i].ck = tag;
            }
        }

        //选择单个
        this.setChooseOne = function(data,cb){
            var len = data.length;
            var slen = this.getSelectedItems(data).length;

            var tagAll = false;
            if(len != slen){
                tagAll = false;
            }else{
                tagAll = true;
            }
            cb(tagAll);
        }

        this.getTemplate = function(){
            this.templateType = [];
        }

        //初始化枚举数据
        this.init = function(){
            this.getTemplate();
        }
    }

    return new Tools();
})