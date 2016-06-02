/**
 * Created by mac on 16/6/1.
 */

    /*****************为一些基本数据类型添加一些常用方法******************/

    ///**********************************
    /// String prototypes
    ///**********************************
    //去掉字符串2变的空格
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }

    ///**********************************
    /// Array prototypes
    ///**********************************

    //数组去重, 值类型和引用类型均可判断
    Array.prototype.unique = function(){
        this.sort();
        var re=[this[0]];

        if(typeof this[0] == "object"){
            for(var i = 1; i < this.length; i++) {
                if( this[i].equals(re[re.length-1]) == false) {
                    re.push(this[i]);
                }
            }
        }else{
            for(var i = 1; i < this.length; i++) {
                if( this[i] !== re[re.length-1]) {
                    re.push(this[i]);
                }
            }
        }


        return re;
    }

    //删除数组的某项,只针对数组里面为引用类型
    Array.prototype.remove = function(item){
        var index = this.indexOf(item);
        if(index >= 0){
            this.splice(index,1);
            return true;
        }
        return false;
    }

    //根据索引删除数组的某项
    Array.prototype.removeAt = function(index){
        if (index != undefined && index >= 0){
            this.splice(index, 1);
            return true;
        }
        return false;
    }

    //检测数组是否包含key为value的项
    Array.prototype.containsByKey = function(key,value){
        if (key && typeof key == 'string' && (value || value == 0)) {
            for (var i = 0; i < this.length; i++) {
                var currentObj = this[i];

                if(typeof currentObj[key] == "string"){
                    if (currentObj[key] == value) {
                        return true;
                    }
                }
                if(typeof currentObj[key] == "object"){
                    if (currentObj[key].equals(value) == true) {
                        return true;
                    }
                }


            }
        }
        return false;
    }

    //检测数组是否包含某一个对象
    Array.prototype.contains = function(item){
        if (typeof item != 'undefined') {
            return this.find(item, true) != undefined;
        }
        return false;
    }

    //数组的复制
    Array.prototype.clone = function(){
        return this.concat();
    }


    ///**********************************
    /// Object prototypes
    ///**********************************
    //对象的复制
    Object.prototype.clone = function(){
        var copy = this.constructor();

        for(var attr in this){
            if (this.hasOwnProperty(attr)) {
                copy[attr] = this[attr];
            }
        }
        return copy;
    }

    //对象的相等
    Object.prototype.equals = function(x){
        var p;
        for (p in this) {
            if (typeof (x[p]) == 'undefined') { return false; }
        }

        for (p in this) {
            if (this[p]) {
                switch (typeof (this[p])) {
                    case 'object':
                        if (!this[p].equals(x[p])) { return false; } break;
                    case 'function':
                        if (typeof (x[p]) == 'undefined' ||
                            (p != 'equals' && this[p].toString() != x[p].toString()))
                            return false;
                        break;
                    default:
                        if (this[p] != x[p]) { return false; }
                }
            } else {
                if (x[p])
                    return false;
            }
        }

        for (p in x) {
            if (typeof (this[p]) == 'undefined') { return false; }
        }

        return true;
    }


    ///**********************************
    /// Date prototypes
    ///**********************************

    //2个字符串时间的比较
    // d1 < d2 --->true  else false
    Date.prototype.compare = function(d1,d2){
        var tmp1 = null;
        var tmp2 = null;
        if(typeof d1 == "string"){
            tmp1 = new Date(d1.replace(/-/g,"/"));
        }else{
            tmp1 = d1;
        }

        if(typeof d1 == "string"){
            tmp2 = new Date(d2.replace(/-/g,"/"));
        }else{
            tmp2 = d2;
        }

        if(tmp1 < tmp2){
            return true;
        }
        return false;
    }

    /*****************常用的js方法******************/
    var jsCoreMethod = {
        //获取当前元素的绝对left
        getAbsoluteLeft:function(el){
            var o = el;
            var oLeft = o.offsetLeft;
            var oParent = null;
            while(o.offsetParent!=null) {
                oParent = o.offsetParent;
                oLeft += oParent.offsetLeft;
                o = oParent;
            }
            return oLeft;
        },
        //获取当前元素的绝对top
        getAbsoluteTop:function(el){
            var o = el;
            var oTop = o.offsetTop;
            while(o.offsetParent!=null) {
                oParent = o.offsetParent;
                oTop += oParent.offsetTop;
                o = oParent;
            }
            return oTop;
        },
        //获取当前url后面的参数
        getQueryString:function(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURIComponent(r[2]); return null;
        },
        //一个数组里面按照时间字段来排序的方法
        sortByDate:function(data,field){
            if(data == undefined || data.length == 0 ){
                return null;
            }

            var arr  =[];
            if(typeof data[0][field] == "string"){
                for(var i =0;i<data.length;i++){
                    data[i]._tmpSortField = new Date(data[i][field].replace(/-/g,'/'));
                    arr.push(data[i]);
                }
                arr.sort(function(a,b){
                    return a._tmpSortField - b._tmpSortField;
                })
                return arr;
            }
            else if(data[0][field] instanceof Date){
                data.sort(function(a,b){
                    return a[field] - b[field];
                })
                return data;
            }
            else{
                return data;
            }
        },
        //获取 num1 到 num2 的随机整数
        getRandom:function(num1,num2){
            var choices = num2 - num1 + 1;
            return Math.floor(Math.random() * choices + num1);
        },
        string2Json:function(str){
            if(str){
                return JSON.parse(str);
            }
            return {};
        },
        json2String:function(json){
            if(json){
                return JSON.stringify(json);
            }
            return "";
        }

    }

