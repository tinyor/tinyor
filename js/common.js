/* ******** COMMON ******** */
function byId(name)								{return document.getElementById(name);}
function byTag(object,name)						{return object.getElementsByTagName(name);}
function byName(name)							{return document.getElementsByName(name);}
function byClass(object,name)					{return object.getElementsByClassName(name);}

function getBody()								{return document.body||document.documentElement;}
function getFrame(object)						{return (object.contentWindow)?object.contentWindow:(object.contentDocument.document)?object.contentDocument.document:object.contentDocument;}

function nextNode(object)						{while(object){object=object.nextSibling;if(object&&object.nodeType==1&&object.tagName.indexOf("/")<0)break;}return object;}
function previousNode(object)					{while(object){object=object.previousSibling;if(object&&object.nodeType==1&&object.tagName.indexOf("/")<0)break;}return object;}
function removeNode(object)						{object.parentNode.removeChild(object);}

function parentTag(object,name)					{for(var i=0;i<10;i++){if(object){var tag=object.tagName.toLowerCase();if(tag==name)return object;else object=object.parentNode;}else return false;}return object;}
function removeTag(string)						{var value="";var record=true;for(var i=0;i<string.length;i++){var char=string.charAt(i);if(record==true){if(char=="<"&&string.indexOf(">",i)>0)record=false;else value+=char;}if(record==false&&char==">")record=true;}return value;}
function outerHTML(object)						{if(object.outerHTML)return object.outerHTML;var div=document.createElement("div");div.appendChild(object.cloneNode(true));return div.innerHTML;}

function redirect(url)							{window.location.href=url;}
function reForm(object)							{return object.innerHTML.replace("<!--", "").replace("-->", "");}

function getScroll(remain)						{if(!remain)return Math.max(document.body.scrollTop,document.documentElement.scrollTop);else{var a=Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);var b=Math.max(document.body.scrollTop, document.documentElement.scrollTop);var c=screen.height;return a-b-c;}}
function getValue(name)							{var node=document.getElementsByName(name);if(node.length==0)return;var type=node[0].type;var result=[];if(type=="radio"||type=="checkbox"){for(var i=0;i<node.length;i++)if(node[i].checked==true)result.push(node[i].value);}else result.push(node[0].value);return result.join(",");}
function getQuery(name)							{var url=window.location.href;url="&"+url.substr(url.indexOf("?")+1);var a=url.indexOf("&"+name+"=");if(a<0)return "";else var a=url.indexOf("=",a+1)+1;var b=url.indexOf("&",a);if(b==-1)b=url.length;var v=url.substring(a,b);if(v==undefined)v="";return decodeURIComponent(v);}
function getScrollTop()							{return Math.max(document.documentElement.scrollTop, document.body.scrollTop);}
function getScrollLeft()						{return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);}
function getWindowWidth()						{return document.documentElement.clientWidth||document.body.clientWidth;}
function getWindowHeight()						{return document.documentElement.clientHeight||document.body.clientHeight;}

/* ******** STRING ******** */
function firstCase(value)						{var node=value.split(" ");for(var i=0;i<node.length;i++)node[i]=node[i].charAt(0).toUpperCase()+node[i].slice(1).toLowerCase();return node.join(" ");}

/* ******** ARRAY ******** */
function insertArray(array1,array2,index)		{var array3=array1.slice();array3.splice.apply(array3,[index,0].concat(array2));return array3;}
function removeArray(array,index)				{return array.splice(index,1);}
function sortArray(array,order,index)			{var a1=array.slice();var a2=(order=="asc"||order=="az")?a1.sort(function(a,b){return a-b}):a1.sort(function(a,b){return b-a});if(index!=true)return a2;var length=array.length;var a3=new Array(length-1);for(var i=0;i<length;i++)a3[i]=a2.indexOf(array[i]);return a3;}
function minArray(array)						{return array.indexOf(Math.min.apply(null, array));}
function maxArray(array)						{return array.indexOf(Math.max.apply(null, array));}
function combineObject(object1,object2)			{var object3={};for(var i in object1){object3[i]=object1[i]};for(var i in object2){object3[i]=object2[i]};return object3;}

/* ******** DATE ******** */
function getElapse(today,year,month,day)		{if(today==undefined||today=="")today=calendar();if(year==undefined||year=="")year=0;if(month==undefined||month=="")month=0;if(day==undefined||day=="")day=0;today=today.toString();var date=new Date;date.setFullYear(Number(today.substr(0,4))+Number(year),Number(today.substr(4,2)-1)+Number(month),Number(today.substr(6,2))+Number(day));var day=date.getDate().toString();day=(day.length<2)?"0"+day:day;var month=(date.getMonth()+1).toString();month=(month.length<2)?"0"+month:month;var year=date.getFullYear().toString();return Number(year+month+day);}
function compareDate(a,b)						{a=a.toString();b=b.toString();var i=new Date();var j=new Date();i.setFullYear(a.substr(0,4),Number(a.substr(4,2)-1),Number(a.substr(6,2)));j.setFullYear(b.substr(0,4),Number(b.substr(4,2)-1),Number(b.substr(6,2)));return parseInt((j-i)/(24*3600*1000));}
function getCalendar(a,b)						{var date=new Date();if(a){a=a.toString();date.setFullYear(a.substr(0,4),Number(a.substr(4,2)-1),(Number(a.substr(6,2))+Number(b)));}var day=date.getDate().toString();day=(day.length<2)?"0"+day:day;var month=(date.getMonth()+1).toString();month=(month.length<2)?"0"+month:month;var year=date.getFullYear().toString();return Number(year+month+day);}
function getClock()								{var date=new Date();var second=date.getSeconds().toString();second=(second.length<2)?"0"+second:second;var minute=date.getMinutes().toString();minute=(minute.length<2)?"0"+minute:minute;var hour=date.getHours().toString();hour=(hour.length<2)?"0"+hour:hour;return hour+minute+second;}
function getTime()								{var date=new Date();return date.getTime()}
function toCalendar(value)						{value=value.toString();var year=value.substr(0,4);var month=value.substr(4,2);var day=value.substr(6,2);if(month.substr(0,1)=="0")month=" "+month.substr(1,1);if(day.substr(0,1)=="0")day=" "+day.substr(1,1);return year+"."+month+"."+day;}
function toClock(value)							{value=value.toString();var hour=number(value.substr(0,2));var prefix="AM";if(hour>11){prefix="PM";hour-=12;}if(hour==0)hour=12;if(hour<10)hour=" "+hour;return prefix+hour+":"+value.substr(2,2);}
function toMobile(value)						{value=value.toString().replace(/-/g,"");if(!value)return"";return value.substr(0,3)+"-"+value.substr(3,(value.length-7))+"-"+value.substr((value.length-4),4);}

/* ******** NUMBER ******** */
function getNumber(value)						{return (value)?Number(value.toString().replace(/[^0-9.]/gi,"")):0;}
function getComma(value)						{return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
function getPercent(a,b,c)						{var p=a*100/b;if(p<0)p=0;else if(p>100)p=100;if(!c)p=Math.round(p);else p=Number(p.toFixed(c));return p;}
function getRandom(min,max)						{return Math.floor(Math.random()*(max-min)+min);}

/* ******** COLOR ******** */
function rgbToHex(r,g,b)						{return "#"+("000000"+((r<<16)|(g<<8)|b).toString(16)).slice(-6);}

/* ******** MOUSE & TOUCH ******** */
function reserveMouse()							{document.onmouseup=function(){releaseMouse()};document.onmouseout=function(event){event=event||window.event;var x=event.clientX;var y=event.clientY;var maxX=document.documentElement.clientWidth||document.body.clientWidth;var maxY=document.documentElement.clientHeight||document.body.clientHeight;if(x<=0||x>=maxX||y<=0||y>=maxY)releaseMouse();};document.onselectstart=function(){return false};document.onmousedown=function(){return false}}
function releaseMouse()							{document.onselectstart=document.onmousedown=document.onmouseup=document.onmousemove=document.onmouseout=null;}
function touchEvent(event,prevent,id)			{event=event||window.event;var type=event.type;var touch=type.indexOf("touch")>-1?true:false;if(touch==true){if(prevent==true&&event.cancelable==true)event.preventDefault();var e=event.changedTouches;if(id!=undefined){for(var i=0;i<e.length;i++)if(e[i].identifier==id)break;if(i==e.length)return;}else var i=0;var e=event.changedTouches[i];event.x=event.clientX=e.clientX;event.y=event.clientY=e.clientY;event.id=e.identifier;event.object=document.elementFromPoint(e.clientX,e.clientY);}else{if((event.which||event.button)!=1)return;event.x=event.clientX;event.y=event.clientY;event.object=event.target||event.srcElement;}if((type=="mousedown"||type=="touchstart")&&(!event.object))return;return event;}

/* ******** COORD ******** */
function offsetX(object)						{var x=0;while(object){x+=object.offsetLeft+parseInt(getComputedStyle(object,null).getPropertyValue("border-left-width"))||0;object=object.offsetParent;}return x;}
function offsetY(object)						{var y=0;while(object){y+=object.offsetTop+parseInt(getComputedStyle(object,null).getPropertyValue("border-top-width"))||0;object=object.offsetParent}return y;}
function elementX(object,event)					{return event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-offsetX(object);}
function elementY(object,event)					{return event.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-offsetY(object);}

/* ******** VERIFY ******** */
function isNumber(value)						{return /^([0-9])+$/.test(value);}
function isPassword(value)						{return /^([\x20-\x7e]{4,32})$/.test(value);}
function isNickname(value)						{return /^([a-zA-Z0-9ㄱ-힣]{2,12})$/.test(value);}
function isMail(value)							{return /^([_0-9a-zA-Z-.]{1,32})@([_0-9a-zA-Z-]{1,32})+(\.[0-9a-zA-Z]{2,4})*(\.[0-9a-zA-Z]{2,16})$/.test(value);}
function isPhone(value)							{return /^([0-9]{7,11})$/.test(value.replace(/-/g,""));}
function isMobile(value)						{return /^(01[0|1|6|7|8|9]\d{7,8})$/.test(value.replace(/-/g,""));}
function isPreview()							{var url=window.URL||window.webkitURL;try{if(typeof(url.createObjectURL)=="function")return true;else return false;}catch(error){}return false;}
function isAlphabet(value)						{return /^([a-zA-Z ])+$/.test(value);}
function isKorean(value)						{for(var i=0;i<value.length;i++){var char=value.charAt(i);if(/^([가-힣ㄱ-ㅎㅏ-ㅣ])$/.test(char)==false)return false;}return true;}
function isMobileDevice()						{if(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i.test(navigator.userAgent.toLowerCase()))return true;return false;}

/* ******** COOKIE ******** */
function setCookie(name,value,day)				{var date=new Date;date.setTime(date.getTime()+(day*24*60*60*1000));var expire="expires="+date.toUTCString();document.cookie=name+"="+value+";"+expire+";path=/";}
function getCookie(name)						{var array=document.cookie.split(";");for(var i=0;i<array.length;i++){var value=array[i].split("=");value[0]=value[0].substr(value[0].indexOf(" ")+1);if(value[0]==name)return value[1];}return "";}
	
String.prototype.replaceAll = function(a,b){return this.replace(new RegExp(a,"g"),b);}

if(!("classList" in Element.prototype)) {
	Object.defineProperty(Element.prototype, "classList", {
		get : function() {
			let object = this;
			let array = object.className.split(" ");
			let result = function() {
				object.className = array.join(" ");
				return object.className;
				};
			return {
				add	: function() {
					for(argument of arguments)
						if(array.indexOf(argument) == -1)
							array.push(argument);
					return result();
					},
				remove : function() {
					for(argument of arguments){
						let i = array.indexOf(argument);
						if(i > -1) array.splice(i, 1);
						}
					return result();
					},
				toggle : function(name) {
					let i = array.indexOf(name);
					return (i == -1) ? this.add(name) : this.remove(name);
					},
				replace : function(oldName, newName) {
					let i = array.indexOf(oldName);
					if(i > -1) array[i] = newName;
					return result();
					}
				};
			}
		});
	};
	
if(!("IntersectionObserver" in window)) {
	function IntersectionObserver(callback, option){
		var self = {
			node		: [],
			callback	: callback,
			option		: option,
			this		: this,
			event		: false,
			timer		: undefined
			};

		IntersectionObserver.prototype.observe = function(node){
			if(self.node.indexOf(node) == -1)
				self.node.push(node);

			if(self.event == false && self.node.length > 0){
				self.event = true;
				window.addEventListener("scroll", doCheck);
				if(self.timer) clearTimeout(self.timer);
				self.timer = setTimeout(doCheck, 100);
				}
			}

		IntersectionObserver.prototype.unobserve = function(node){
			var index = self.node.indexOf(node);
			if(index > -1) self.node.splice(index, 1);
			if(self.node.length == 0){
				window.removeEventListener("scroll", doCheck);		
				self.event = false;
				}
			}

		var isView = function(rect){
			var width = self.width;
			var height = self.height;
			var top = rect.top >= 0 && rect.top < height;
			var bottom = rect.bottom >= 0 && rect.bottom < height;
			var left = rect.left >= 0 && rect.left < width;
			var right = rect.right >= 0 && rect.right < width;
			// return (top || bottom) && (left || right);
			return (top || bottom);
			}

		var doCheck = function(){
			console.log("check");
			var node = self.node;
			var width = self.width = getWindowWidth();
			var height = self.height = getWindowHeight();
			var entries = {};
			var threshold = self.option.threshold || 0;
			var ratio = 1;
			var getValue = function(value, max){
				return (value < 0) ? 0 : (value > max) ? max : value;
				};

			for(var i = 0; i < node.length; i++){
				var rect = node[i].getBoundingClientRect();		// reflow
				if(isView(rect)){
					var top = getValue(rect.top, height);
					var bottom = getValue(rect.bottom, height);
					var left = getValue(rect.left, width);
					var right = getValue(rect.right, width);
					ratio = ((bottom - top) / rect.height).toFixed(2);
					// ratio = (((right - left) * (bottom - top)) / (rect.width * rect.height)).toFixed(2);
					if(threshold <= ratio){
						entries[i] = {
							target	: node[i],
							intersectionRatio : ratio,
							isIntersecting : true
							};
						}
					}
				}

			var length = Object.keys(entries).length;
			if(length > 0)
				self.callback(entries, self.this);
			}
		}
	};
