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

    //删除数组的某项, 值类型和引用类型均可
    Array.prototype.remove = function(item){

        if(!item){
            return false;
        }

        if(typeof item != "object"){
            var index = this.indexOf(item);
            if(index >= 0){
                this.splice(index,1);
                return true;
            }
            return false;
        }else{
            var _index = -1;
            for(var i=0;i<this.length;i++){
                if(item.equals(this[i]) == true){
                    _index = i;
                    break;
                }
            }

            return this.removeAt(_index);
        }

    }

    //根据索引删除数组的某项
    Array.prototype.removeAt = function(index){
        if (index != undefined && index >= 0){
            this.splice(index, 1);
            return true;
        }
        return false;
    }

    //检测数组是否包含key为value的项,只针对引用类型
    Array.prototype.containsByKey = function(key,value){
        if (key && typeof key == 'string' && (value || value == 0)) {
            var bl = false;
            for (var i = 0; i < this.length; i++) {
                var currentObj = this[i];
                if (currentObj[key].equals(value) == true) {
                    bl = true;
                    break;
                }
            }
            return bl;
        }
        return false;
    }

    //检测数组是否包含某一个数据类型或者对象类型
    Array.prototype.contains = function(item){
        if(!item){
            return false;
        }

        var bl = false;
        if (typeof item != 'object') {
            this.indexOf(item) == -1 ? bl = false: bl= true;
        }
        else{
            var bl = false;
            for(var i=0;i<this.length;i++){
                if(this[i].equals(item)){
                    bl = true;
                    break;
                }
            }
        }
        return bl;
    }

    //数组的复制,值类型和引用类型均可
    Array.prototype.cloneArray = function(){

        if(this.length == 0){
            return [];
        }
        var res = [];
        for(var i =0;i<this.length;i++){
            if(typeof this[i] != "object"){
                res.push(this[i]);
            }else{
                res.push(this[i].clone());
            }
        }

        return res;
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
    Date.prototype.compare = function(d1){
        var tmp1 = null;
        if(typeof d1 == "string"){
            tmp1 = new Date(d1.replace(/-/g,"/"));
        }else{
            tmp1 = d1;
        }

        if(Date.parse(this) > Date.parse(tmp1)){
            return true;
        }
        return false;
    }

    Date.prototype.format = function(){
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    }


    ///**********************************
    /// 常用的js方法
    ///**********************************
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
        arraySortByDate:function(data,field,desc){
            if(data == undefined || data.length == 0 ){
                return null;
            }

            var arr  =[];
            if(typeof data[0][field] == "string"){
                for(var i =0;i<data.length;i++){
                    data[i]._tmpSortField = new Date(data[i][field].replace(/-/g,'/'));
                    arr.push(data[i]);
                }
                if(desc){
                    arr.sort(function(a,b){
                        return a._tmpSortField - b._tmpSortField;
                    })
                }else{
                    arr.sort(function(a,b){
                        return b._tmpSortField - a._tmpSortField;
                    })
                }

                return arr;
            }
            else{
                var res = data.cloneArray();
                if(desc){
                    res.sort(function(a,b){
                        return a[field] - b[field];
                    })
                }else{
                    res.sort(function(a,b){
                        return b[field] - a[field];
                    })
                }

                return res;
            }
        },
        arraySortByNumber:function(data,field,desc){
            if(data == undefined || data.length == 0 ){
                return null;
            }
            var res = data.cloneArray();
            if(desc){
                res.sort(function(a,b){
                    return a[field] - b[field];
                })
            }else{
                res.sort(function(a,b){
                    return b[field] - a[field];
                })
            }

            return res;
        },
        arraySortByChar:function(data,field,desc){

            if(data == undefined || data.length == 0 ){
                return null;
            }
            var res = data.cloneArray();
            if(desc){
                res.sort(function(a,b){
                    return a[field].localeCompare(b[field]);
                })
            }else{
                res.sort(function(a,b){
                    return b[field].localeCompare(a[field]);
                })
            }

            return res;
        },
        /*
         * 一个数组里面按照字段来排序的方法
         * @data  数据源
         * @field 排序字段
         * @desc  升序为true 降序为true
         * @overwrite 排序结果是否影响数据源,默认为不影响
         * */
        arraySortByField:function(data,field,desc,overwrite){
            if(data == undefined || data.length == 0 ){
                return null;
            }

            var res = null;
            if(!overwrite){
                res = data.cloneArray();
            }else{
                res = data;
            }

            var tmp = res[0][field];
            //除去日期对象,其他对象类型不排序
            if(typeof tmp == "object" && tmp instanceof Date != true){
                return data;
            }

            //日期判断
            if(typeof tmp == "object" && tmp instanceof Date){
                res = this.arraySortByDate(res,field,desc);
            }else{
                //数字判断
                if(typeof tmp == "number"){
                    res = this.arraySortByNumber(res,field,desc);
                }
                if(typeof tmp == "string"){
                    //date判断
                    if(!/invalid/i.test(new Date(tmp))){
                        res = this.arraySortByDate(res,field,desc);
                    }
                    //字符串判断
                    else{
                        res = this.arraySortByChar(res,field,desc);
                    }
                }
            }

            return res;
        },
        //获取 num1 到 num2 的随机整数
        getRandom:function(num1,num2){
            var choices = num2 - num1 + 1;
            return Math.floor(Math.random() * choices + num1);
        },
        convertStringJson:function(val){
            if(!val){
                return null;
            }
            if(typeof val != "object"){
                return JSON.parse(val);
            }
            else{
                return JSON.stringify(val);
            }
        },
        getLocalStorage:function(key){
            if(!window.localStorage){
                alert("您的浏览器不支持localStorage");
                return
            }
            return window.localStorage.getItem(key);
        },
        setLocalStorage:function(key,val){
            if(!window.localStorage){
                alert("您的浏览器不支持localStorage");
                return
            }
            window.localStorage.setItem(key,val);
        }
    }

