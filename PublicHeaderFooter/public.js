
var public = function(){

	var that = this;

	this.baseFileArr = [];
	this.otherFileArr = [];

	this.completedBaseCount = {count:0};
	this.completedOtherCount = {count:0};

	this.headerHtml = "";
	this.footerHtml = "";

	this.shareFlag = false;

	this.loadBaseFile = function(){
		this.loadFile(this.baseFileArr,this.completedBaseCount);
		this.checkFileCompleted(this.completedBaseCount,this.baseFileArr,function(){
			console.log("基础资源文件加载完毕!");
			that.renderHeaderFooter();
			that.loadOtherFile();
		});
	}

	this.loadOtherFile = function(){
		this.loadFile(this.otherFileArr,this.completedOtherCount);
		this.checkFileCompleted(this.completedOtherCount,this.otherFileArr,function(){
			console.log("其他资源文件加载完毕, 开始添加头部, 尾部!");
		});
	}

	this.checkFileCompleted = function(tag,arr,cb){
		if(tag.count == arr.length){
			cb();
			return;
		}
		var arg = arguments;
		window.setTimeout(function(){
			arg.callee.apply(that,arg);
		},100);
	}

	this.loadFile = function(arr,tag){
		for(var i=0;i<arr.length;i++){
			var filePath = arr[i];
			if(!filePath){
				return;
			}
			var _dom = null;
			if(filePath.indexOf('.js') != "-1" || filePath.indexOf('.json') != "-1"){
				_dom = document.createElement('script');
				_dom.setAttribute("src",filePath);
				_dom.onload = function(){
					if(tag){
						tag.count++;
					}
				}
			}
			else if(filePath.indexOf('.css') != "-1"){
				_dom = document.createElement('link');
				_dom.setAttribute("rel","stylesheet");
				_dom.setAttribute("type","text/css");
				_dom.setAttribute("href",filePath);
				_dom.onload = function(o){
					if(tag){
						tag.count++;
					}
				}
			}
			if(_dom){
				document.getElementsByTagName("head")[0].appendChild(_dom);
			}
		}
	}

	this.setHeaderFooter = function(headerHtml,footerhtml){
		this.headerHtml = headerHtml;
		this.footerHtml = footerhtml;
	}

	this.setBaseFile = function(val){
		this.baseFileArr = val;
	}
	this.setOtherFile = function(val){
		this.otherFileArr = val;
	}

	this.renderHeaderFooter = function(){
		$("body").prepend($(this.headerHtml));
		$("body").append($(this.footerHtml));
	}

	this.share = function(){
		// 分享代码
		window._bd_share_config={
			"common":{
				"bdSnsKey":{},
				"bdText":document.title,
				"bdDesc":"一个前端工作者的学习笔记",
				"bdMini":"1",
				"bdMiniList":["qzone","tsina","tqq","renren","weixin","sqq"],
				//"bdPic":"http://www.loveqiao.cn/images/qrcode.png?v1",
				"bdStyle":"0",
				"bdSize":"16"
			},
			"slide":{"type":"slide","bdImg":"1","bdPos":"right","bdTop":"250"},
		};
	}

	this.init = function(option){
		this.setBaseFile(option.baseFile);
		this.setOtherFile(option.otherFile);
		this.setHeaderFooter(option.header,option.footer);
		if(option.share){
			this.otherFileArr.push('http://bdimg.share.baidu.com/static/api/js/share.js');
		}
		this.loadBaseFile();
		if(option.share){
			this.share();
		}
	}
}
