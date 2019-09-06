/*
 * Plutonium - Vanilla JavaScript - Background Image Switch [http://plutonium.dev]
 * This code is a Plutonium Development component.
 * (c) 2019 Jesse Dalessio - https://plutonium.dev
 * Released under the MIT license
*/

//The component code (contains zero global namespace pollution)
(function(){
	
	//library methods
	var _LIB = new function(){
		const _T = this;
		this.$uids = {};
		
		//get a unique id
		this.getUid = function(){
			while (true) {
				let uid = _get();
				if (!_T.$uids[uid]) return (_T.$uids[uid]=uid);
			}
			function _get() {
				let uid = Math.random().toString(36).substr(2, 8).toUpperCase();
				return uid.replace(/^\d/,'Z');
			}
		}
		
		//asynchronous reference manager (setTimeout, requestAnimationFrame, and future functionality as needed)
		this.asyncRefs = function() {
			const _T = this;
			const refs = {};
			
			this.add = function(id, type, obj) {
				_T.cancel(id);
				refs[id] = {
					obj:obj,
					type:type
				}
			}
						
			this.cancel = function(id) {
				let ref = refs[id]; if (ref) {
					if (ref.type==='setTimeout') clearTimeout(ref.obj);
					else if (ref.type==='requestAnimationFrame') cancelAnimationFrame(ref.obj);
					delete refs[id];
				}
			}
		}
	}
	
	//create the component on document ready
	document.addEventListener("DOMContentLoaded", function() {
		var _COMP_NAME = "background-image-switch";
		var curData;
		document.body.querySelectorAll('div[data-pu-'+_COMP_NAME+']').forEach(function (rootElm) {new _comp(rootElm);});
		
		//background image switch component object
		function _comp(rootElm) {
			var rootData = JSON.parse(rootElm.getAttribute('data-pu-'+_COMP_NAME)||"{}");
			var containerElm = document.querySelector(rootData.target.querySelector||'body');
			var asyncRefs = new _LIB.asyncRefs();
			var sheet = document.styleSheets[document.styleSheets.length-1];
			var animate = rootData.animate;
			rootData.$uid = _LIB.getUid();
			rootData.$isRoot = true;
			rootData.target = rootData.target||{};
			rootElm.classList.add("pu-"+_COMP_NAME+'-comp', "pu-"+_COMP_NAME+"-comp-"+rootData.$uid);
			document.head.appendChild(document.createElement('style'));
			rootData.css.forEach(function (item) {sheet.insertRule(item, sheet.rules.length);});
			_add_images();
			
			//add the images (default and link images)
			function _add_images() {
				_add(rootElm, rootData);
				rootElm.querySelectorAll(".link").forEach(function(linkElm, index) {
					var data =  JSON.parse(linkElm.getAttribute("data-pu-link")||"{}");
					data.$uid = 'link'+index;
					_add(linkElm, data);
				});
											
				function _add(refElm, data) {
					if (data.image) {
						refElm.$PU_background_image_switch_data = data;
						var imageElm = data.imageElm = document.createElement("DIV");
						data.preload = new Image().src = data.image;
						imageElm.classList.add("pu-"+_COMP_NAME+'-image', "pu-"+_COMP_NAME+'-image-'+data.$uid, "pu-"+_COMP_NAME+'-image-'+data.name);
						sheet.insertRule(".pu-"+_COMP_NAME+"-image-"+data.$uid+'{display:none;position:fixed;width:100%;height:100%;top:0px;left:0px;background-image:url('+data.image+') !important;}');
						if (animate) {
							var rule = ".pu-"+_COMP_NAME+"-image-"+data.$uid+'{transition:';
							var sep=''; var initVals = ''; for (var i in animate) { 
								if (i!=='props') {
									var props = animate[i].props||animate.props;
									rule += sep+i+' '+Object.keys(props).map(function(key){return props[key]}).join(' '); 
									initVals += i+':'+animate[i].from+';';
									data.$duration = Math.max(data.$duration||0, parseFloat(props.duration||0)*1000);
									sep=",";
								}
							}
							console.log()
							sheet.insertRule(rule+';'+initVals+'}', sheet.rules.length);
						}
						containerElm.insertBefore(imageElm, containerElm.firstChild);
						data.$isRoot?_show(data):refElm.addEventListener("mouseenter", function(){_show(data)});
						refElm.addEventListener("mouseleave", function(e) {
							var stickyElm = rootData.target.sticky?document.querySelector(rootData.target.sticky===true?".pu-"+_COMP_NAME+"-comp-"+rootData.$uid:rootData.target.sticky):null;
							var toLinkElm = e.toElement; while (toLinkElm && toLinkElm!=stickyElm && (!toLinkElm.getAttribute||!toLinkElm.getAttribute('data-pu-link'))) toLinkElm = toLinkElm.parentNode;
							if (!toLinkElm) _show(rootData);
						});
					}
					
					function _show(data) {
						data.imageElm.style.display = "block";
						asyncRefs.cancel("hide");
						asyncRefs.add("show", "requestAnimationFrame", requestAnimationFrame(function() {
							//note: force reflow (reflow plus requestAnimationFrame ensures the transition will be triggered)
							data.imageElm.offsetWidth;
							_set_transition_vals(data, 'to');
						}));
						if (curData && curData!=data) _hide(curData);
						curData = data;
						
						function _hide(data) {
							_set_transition_vals(data, 'from');
							asyncRefs.add("hide", "setTimeout", setTimeout(function() {
								data.imageElm.style.display = "none";
							}, data.$duration));
						}
						
						function _set_transition_vals(data, type) {
							for (var i in (animate||{})) {
								if (i!='props') data.imageElm.style[i] = animate[i][type];
							}
						}
					}
				}
			}
		}
	});
})();


















