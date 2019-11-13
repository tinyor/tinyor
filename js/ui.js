document.addEventListener("DOMContentLoaded", uiReady);
// window.addEventListener("load", uiReady);

function uiReady(){
	uiLoadImage();
	}
	
function uiLoadImage(){
	var img = document.querySelectorAll("img[data-src]");
	var j = img.length;

	var option = {
		threshold : 0.25
		};

	var observer = new IntersectionObserver(function(entries, observer){
		for(var i in entries){
			var entry = entries[i];
			var object = entry.target;
			if(entry.isIntersecting){
				object.src = object.getAttribute("data-src");
				object.removeAttribute("data-src");
				observer.unobserve(object);
				}
			}
		}, option);

	for(var i = 0; i < j; i++)
		observer.observe(img[i]);

	window.addEventListener("DOMNodeInserted", function(event){
		if(event.target.nodeType != 1) return;
		var img = event.target.querySelectorAll("img[data-src]");
		for(var i = 0; i < img.length; i++)
			observer.observe(img[i]);
		});
	}




/* ******** UI-POPUP & UI-TOAST ******** */

function uiToast(value, delay){
	var body = document.body || document.documentElement;
	var div = document.createElement("div");
	if(delay == undefined) delay = 1000;
	div.setAttribute("class", "ui-toast");
	div.innerHTML = value;
	body.appendChild(div);
	
	setTimeout(function(){
		div.className = "ui-toast focus";
		}, 100);
		
	setTimeout(function(){
		div.className = "ui-toast";
		}, 2000);
	
	setTimeout(function(){
		div.parentNode.removeChild(div);	
		}, 2500);
	}	

function uiAlert(object){
	if(typeof(object) != "object") object = {message : object};
	object.type = "alert";
	uiPopup(object);
	}

function uiConfirm(object){
	if(typeof(object) != "object") return;
	object.type = "confirm";
	uiPopup(object);
	}

function uiPopup(value){
	if(typeof(value) == "boolean"){
		var popup = uiPopup.queue.pop();
		if(value == true){
			if(popup.focus) popup.focus.focus();
			if(popup.callback) popup.callback(value);
			}
		popup.object.parentNode.removeChild(popup.object);
		return;
		}

	if(!uiPopup.queue) uiPopup.queue = [];

	var title = (value.title == undefined) ? "" : "<h4>" + value.title + "</h4>";
	var message = (value.message == undefined) ? "" : "<p>" + value.message + "</p>";
	var ok = (value.button == undefined) ? (value.ok == undefined) ? "확인" : value.ok : value.button;
	var cancel = (value.cancel == undefined) ? "취소" : value.cancel;
	var button = "<button onclick='uiPopup(true)'>" + ok + "</button>";
	if(value.type == "confirm") button += "<button onclick='uiPopup(false)'>" + cancel + "</button>";

	var contents = title + message + button;

	var body = document.body || document.documentElement;
	var hidden = (uiPopup.queue.length == 0) ? true : false;
	var prev = uiPopup.queue[uiPopup.queue.length - 1];
	if(prev && prev.type == "custom") hidden = true;

	var div = document.createElement("div");
	div.setAttribute("class", "ui-popup focus");
	div.innerHTML = "<span class='" + hidden + "' onclick=\"uiPopup(false)\"></span><table><tr><td><div class='box'>" + contents + "</div></td></tr></table>";
	body.appendChild(div);

	uiPopup.queue.push({
		object		: div,
		type		: value.type,
		focus		: value.focus,
		callback 	: value.callback
		});
	}





/* ******** UI-AJAX ******** */

function uiAjax(object){
	var preset = {
		url		: undefined,
		method	: "GET",
		enctype	: "application/x-www-form-urlencoded",
		async	: true,
		cache	: false,
		timeout	: 8000,
		data	: undefined,
		success : undefined,
		error	: function(e){
			uiAlert("네트워크 연결에 실패하였습니다. (에러코드 : " + e + ")");
			},
		finally	: undefined
		};
		
	if(!object.url) return;
	var object = combineObject(preset, object);
	if(!uiAjax.queue) uiAjax.queue = [];

	if(object.cache == false){
		object.url += (object.url.indexOf("?") == -1) ? "?" : "&";
		object.url += "random=" + Math.random();
		}
	object.method = object.method.toUpperCase();
	
	var url = object.url.split("?")[0];
	if(uiAjax.queue.indexOf(url) != -1) return;
	uiAjax.queue.push(url);

	var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveObject("Microsoft.XMLHTTP");
	console.log("request : " + uiAjax.queue);

	request.onreadystatechange = function(){
		if(this.readyState == 4){
			clearTimeout(request.timer);
			removeArray(uiAjax.queue, uiAjax.queue.indexOf(url));
			if(this.status == 200){
				if(object.success)
					object.success(this.responseText)
				}
			else if(object.error) object.error(this.status);
			if(object.finally) object.finally();
			}
		}

	request.timer = setTimeout(function(){
		if(request) request.abort();
		removeArray(uiAjax.queue, uiAjax.queue.indexOf(url));
		}, object.timeout);

	request.open(object.method, object.url, object.async);
	request.setRequestHeader("Content-Type", object.enctype);
	request.send(object.data);
	}





/* ******** HELPER ******** */

function uiBack(){
	history.back();
	}


function uiButton(object, name){
	if(name == undefined)
		return (object.className.indexOf("focus") > -1) ? true : false;
	if(name == "") removeClass(object, "focus");
	else if(name == "focus"){
		addClass(object, "focus");
		return object.innerHTML;
		}
	}
	

function getForm(object){
	var query = [];
	var input = byTag(object, "input");
	for(var i = 0; i < input.length; i++){
		var type = input[i].type;
		var name = encodeURIComponent(input[i].name);
		var value = encodeURIComponent(input[i].value);
		var isChecked = (input[i].checked) ? true : false;
		if((type == "text" || type == "file" || type == "hidden" || type == "password" || (type == "checkbox" || type == "radio") && isChecked) && name)
			query.push(name + "=" + value);
		}
	return query.join("&");
	}
	
	
	
function uiInput(object){
	var isAlphabet = function(event){
		var event = event || window.event;
		var code = event.charCode;
		if(!((code > 64 && code < 91) || (code > 96 && code < 123))) return false;
		}
		
	var input = byTag(object, "input");
	for(var i = 0; i < input.length; i++){
		var type = input[i].getAttribute("data-type");
		if(type == "alphabet")
			input[i].onkeypress = isAlphabet;
		}
	}