define("magix/magix",function(){var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,r=/[#?].*$/,n="",i=/([^=&?\/#]+)=?([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,s=0,c="/",f="vframe",u=function(){},l={tagName:f,rootId:"magix_vf_root",execError:u},v={}.hasOwnProperty,h=function(e){return function(t,r,n){switch(arguments.length){case 0:n=e;break;case 1:n=b.isObject(t)?g(e,t):p(e,t)?e[t]:null;break;case 2:null===r?(delete e[t],n=r):e[t]=n=r}return n}},d=function(e){var t=this;t.c=[],t.x=e||5,t.b=t.x+3},m=function(e){return new d(e)},p=function(e,t){return e?v.call(e,t):0},g=function(e,t,r){for(var n in t)r&&p(r,n)||(e[n]=t[n]);return e};g(d.prototype,{get:function(e){var t,r=this,n=r.c;return e=a+e,p(n,e)&&(t=n[e],t.f>=1&&(t.f++,t.t=s++,t=t.v)),t},set:function(e,t){var r=this,n=r.c;e=a+e;var i=n[e];if(!p(n,e)){if(n.length>=r.b){n.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var o=r.b-r.x;o--;)i=n.pop(),delete n[i.k]}i={},n.push(i),n[e]=i}return i.k=e,i.v=t,i.f=1,i.t=s++,i},del:function(e){e=a+e;var t=this.c,r=t[e];r&&(r.f=-1e5,r.v=n,delete t[e])},has:function(e){return e=a+e,p(this.c,e)}});var y=m(20),x=m(),w=function(e,t,r,n,i,a){for(b.isArray(e)||(e=[e]),t&&(b.isArray(t)||t.callee)||(t=[t]),n=0;e.length>n;n++)try{a=e[n],i=a&&a.apply(r,t)}catch(o){l.execError(o)}return i},b={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:p,safeExec:w,noop:u,config:h(l),start:function(e){var t=this;g(l,e),t.libRequire(l.iniFile,function(r){l=g(l,r,e),l.tagNameChanged=l.tagName!=f;var n=l.progress;t.libRequire(["magix/router","magix/vom"],function(e,r){e.on("!ul",r.locChged),e.on("changed",r.locChged),n&&r.on("progress",n),t.libRequire(l.extensions,e.start)})})},keys:Object.keys||function(e){var t=[];for(var r in e)p(e,r)&&t.push(r);return t},local:h({}),path:function(i,a){var s=i+"\n"+a,f=x.get(s);if(!f){if(o.test(a))f=a;else if(i=i.replace(r,n).replace(t,n)+c,a.charAt(0)==c){var u=o.test(i)?8:0,l=i.indexOf(c,u);f=i.substring(0,l)+a}else f=i+a;for(;e.test(f);)f=f.replace(e,"$1/");x.set(s,f)}return f},pathToObject:function(e,t){var s=y.get(e);if(!s){s={};var f={},u=n;r.test(e)?u=e.replace(r,n):~e.indexOf("=")||(u=e);var l=e.replace(u,n);if(u&&o.test(u)){var v=u.indexOf(c,8);u=-1==v?c:u.substring(v)}l.replace(i,function(e,r,n){if(t)try{n=decodeURIComponent(n)}catch(i){}f[r]=n}),s[a]=u,s.params=f,y.set(e,s)}return s},objectToPath:function(e,t){var r,n=e[a],i=[],o=e.params;for(var s in o)r=o[s],t&&encodeURIComponent(r),i.push(s+"="+r);return i.length&&(n=n+"?"+i.join("&")),n},listToMap:function(e,t){var r,n,i,a={};if(b.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(r=0;i>r;r++)n=e[r],a[t?n[t]:n]=t?n:1;return a},cache:m},C=Object.prototype.toString;return g(b,{libRequire:function(e,t){b.isArray(e)||(e=[e]),e?require(e,t):t&&t()},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==C.call(e)},isString:function(e){return"[object String]"==C.call(e)},isNumber:function(e){return"[object Number]"==C.call(e)},isRegExp:function(e){return"[object RegExp]"==C.call(e)},extend:function(e,t,r,n){e.superclass=t.prototype,t.prototype.constructor=t;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,b.mix(e.prototype,r),b.mix(e,n),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e,t){var r,n,i,a,o,s=window,c="",f="pathname",u=e.has,l=e.mix,v=document,h=/^UTF-8$/i.test(v.charset||v.characterSet||"UTF-8"),d=e.config(),m=e.cache(),p=e.cache(),g=/#.*$/,y=/^[^#]*#?!?/,x="params",w=d.nativeHistory,b=function(t,r,n){if(t){n=this[x],e.isArray(t)||(t=t.split(","));for(var i=0;t.length>i&&!(r=u(n,t[i]));i++);}return r},C=function(){return u(this,f)},M=function(){return u(this,"view")},E=function(e,t,r){return t=this,r=t[x],r[e]},T=function(t){var r=e.pathToObject(t,h),n=r[f];return n&&o&&(r[f]=e.path(s.location[f],n)),r},O=l({getView:function(t,r){if(!i){i={rs:d.routes||{},nf:d.notFoundView};var n=d.defaultView;if(!n)throw Error("unset defaultView");i.home=n;var a=d.defaultPathname||c;i.rs[a]=n,i[f]=a}var o;t||(t=i[f]);var s=i.rs;return o=e.isFunction(s)?s.call(d,t,r):s[t],{view:o?o:i.nf||i.home,pathname:o||w?t:i.nf?t:i[f]}},start:function(){var e=O,t=s.history;a=w&&t.pushState,o=w&&!a,a?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||s.location.href;var r=O,n=m.get(e);if(!n){var i=e.replace(g,c),a=e.replace(y,c),o=T(i),u=T(a),v={};l(v,o[x]),l(v,u[x]),n={get:E,href:e,srcQuery:i,srcHash:a,query:o,hash:u,params:v},m.set(e,n)}if(t&&!n.view){var h;h=w?n.hash[f]||n.query[f]:n.hash[f];var d=r.getView(h,n);l(n,d)}return n},getChged:function(e,t){var r=e.href,n=t.href,i=r+"\n"+n,a=p.get(i);if(a||(i=n+"\n"+i,a=p.get(i)),!a){var o,s,c;a={params:{}},s=e[f],c=t[f],s!=c&&(a[f]={from:s,to:c},o=1),s=e.view,c=t.view,s!=c&&(a.view={from:s,to:c},o=1);var u,l=e[x],v=t[x];for(u in l)s=l[u],c=v[u],l[u]!=v[u]&&(o=1,a[x][u]={from:s,to:c});for(u in v)s=l[u],c=v[u],l[u]!=v[u]&&(o=1,a[x][u]={from:s,to:c});a.occur=o,a.isParam=b,a.isPathname=C,a.isView=M,p.set(i,a)}return a},route:function(){var e=O,t=e.parseQH(0,1),i=n||{params:{},href:"~"},a=!n;n=t;var o=e.getChged(i,t);o.occur&&(r=t,e.fire("changed",{location:t,changed:o,force:a}))},navigate:function(t,n,i){var s=O;if(!n&&e.isObject(t)&&(n=t,t=c),n&&(t=e.objectToPath({params:n,pathname:t},h)),t){var v=T(t),d={};if(d[x]=l({},v[x]),d[f]=v[f],d[f]){if(o){var m=r.query;if(m&&(m=m[x]))for(var p in m)u(m,p)&&!u(d[x],p)&&(d[x][p]=c)}}else{var g=l({},r[x]);d[x]=l(g,d[x]),d[f]=r[f]}var y,w=e.objectToPath(d);y=a?w!=r.srcQuery:w!=r.srcHash,y&&(a?(s.poped=1,history[i?"replaceState":"pushState"](null,null,w),s.route()):(l(d,r,d),d.srcHash=w,d.hash={params:d[x],pathname:d[f]},s.fire("!ul",{loc:r=d}),w="#!"+w,i?location.replace(w):location.hash=w))}}},t);return O.useState=function(){var e=O,t=location.href;$(s).on("popstate",function(){var r=location.href==t;(e.poped||!r)&&(e.poped=1,e.route())},!1)},O.useHash=function(){$(s).on("hashchange",O.route,!1)},O}),define("magix/body",["magix/magix"],function(e){var t,r=e.has,n=e.listToMap(""),i=document.body,a={},o=String.fromCharCode(26),s="mx-owner",c="mx-ie",f={},u=65536,l=function(e){return e.id||(e.id="mx-e-"+u--)},v=function(e,t,r){return r?e.setAttribute(t,r):r=e.getAttribute(t),r},h={process:function(e){for(var n=e.target||e.srcElement;n&&1!=n.nodeType;)n=n.parentNode;var a=n,u=e.type,h=f[u]||(f[u]=RegExp("(?:^|,)"+u+"(?:,|$)"));if(!h.test(v(n,c))){for(var d,m,p="mx-"+u,g=[];a&&a!=i&&(d=v(a,p),m=v(a,c),!d&&!h.test(m));)g.push(a),a=a.parentNode;if(d){var y,x=d.indexOf(o);x>-1&&(y=d.slice(0,x),d=d.slice(x));var w=v(a,s)||y;if(!w)for(var b=a,$=t.all();b&&b!=i;){if(r($,b.id)){v(a,s,w=b.id);break}b=b.parentNode}if(!w)throw Error("miss "+s+":"+d);var C=t.get(w),M=C&&C.view;M&&M.processEvent({info:d,se:e,st:u,tId:l(n),cId:l(a)})}else for(var E;g.length;)E=g.shift(),m=v(E,c),h.test(m)||(m=m?m+","+u:u,v(E,c,m))}},on:function(e,r){var o=this;if(a[e])a[e]++;else{t=r,a[e]=1;var s=n[e];s?o.unbubble(0,i,e):i["on"+e]=function(e){e=e||window.event,e&&o.process(e)}}},un:function(e){var t=this,r=a[e];if(r>0){if(r--,!r){var o=n[e];o?t.unbubble(1,i,e):i["on"+e]=null}a[e]=r}}};return h.unbubble=function(e,t,r){var n=e?"undelegate":"delegate";$(t)[n]("[mx-"+r+"]",r,h.process)},h}),define("magix/event",["magix/magix"],function(e){var t=function(e){return"~"+e},r=e.safeExec,n={fire:function(e,n,i,a){var o=t(e),s=this,c=s[o];if(c){n||(n={}),n.type||(n.type=e);for(var f,u,l=c.length,v=l-1;l--;)f=a?l:v-l,u=c[f],(u.d||u.r)&&(c.splice(f,1),v--),u.d||r(u.f,n,s)}i&&delete s[o]},on:function(r,n,i){var a=t(r),o=this[a]||(this[a]=[]);e.isNumeric(i)?o.splice(i,0,{f:n}):o.push({f:n,r:i})},un:function(e,r){var n=t(e),i=this[n];if(i)if(r){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==r&&!a.d){a.d=1;break}}else delete this[n]}};return n}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e,t,r){var n,i,a,o=document,s=65536,c=e.safeExec,f=[].slice,u=e.mix,l=e.config("tagName"),v=e.config("rootId"),h=!e.config("tagNameChanged"),d=e.has,m="mx-view",p=h?"mx-defer":"mx-vframe",g="alter",y="created",x=function(e){return"object"==typeof e?e:o.getElementById(e)},w=function(e,t,r){return r=x(e),r?r.getElementsByTagName(t):[]},b=function(e){return o.createElement(e)},$=function(e){return e.id||(e.id="magix_vf_"+s--)},C=function(e,t,r){if(e=x(e),t=x(t),e&&t)if(e!==t)try{r=t.contains?t.contains(e):16&t.compareDocumentPosition(e)}catch(n){r=0}else r=1;return r},M=/<script[^>]*>[\s\S]*?<\/script>/gi,E=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return u(E,{root:function(e,t){if(!n){a=t;var r=x(v);r||(r=b(l),r.id=v,o.body.insertBefore(r,o.body.firstChild)),n=new E(v),e.add(n)}return n}}),u(u(E.prototype,t),{mountView:function(t,n,i){var o=this,s=x(o.id);if(s._bak?s._chgd=1:(s._bak=1,s._tmpl=s.innerHTML.replace(M,"")),o.unmountView(),t){var f=e.pathToObject(t),l=f.pathname,v=--o.sign;e.libRequire(l,function(e){if(v==o.sign){var t=o.owner;r.prepare(e);var h=new e({owner:o,id:o.id,$:x,path:l,vom:t,location:a});o.view=h,h.on("interact",function(e){e.tmpl||(s._chgd&&(s.innerHTML=s._tmpl),o.mountZoneVframes(0,0,1)),h.on("rendered",function(){o.mountZoneVframes(0,0,1)}),h.on("prerender",function(){o.unmountZoneVframes(0,1)||o.cAlter()}),h.on("inited",function(){o.viewInited=1,o.fire("viewInited",{view:h}),i&&c(i,h,o)})},0),n=n||{},h.load(u(n,f.params,n))}})}},unmountView:function(){var e=this;if(e.view){i||(i={}),e.unmountZoneVframes(0,1),e.cAlter(i),e.view.destroy();var t=x(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,i=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,r){var n=this,i=n.owner,a=i.get(e);return a||(a=new E(e),a.pId=n.id,d(n.cM,e)||n.cC++,n.cM[e]=1,i.add(a)),a.mountView(t,r),a},mountZoneVframes:function(e,t){var r=this,n=e||r.id;r.unmountZoneVframes(n,1);var i=w(n,l),a=i.length,o={};if(a)for(var s,c,f,u,v=0;a>v;v++)if(s=i[v],c=$(s),!d(o,c)&&(f=s.getAttribute(m),u=!s.getAttribute(p),u=u==h,u||f)){r.mountVframe(c,f,t);for(var g,y=w(s,l),x=0,b=y.length;b>x;x++)g=y[x],f=g.getAttribute(m),u=!g.getAttribute(p),u=u==h,u||f||(o[$(g)]=1)}r.cCreated()},unmountVframe:function(e,t){var r=this;e=e||r.id;var n=r.owner,i=n.get(e);if(i){var a=i.fcc;i.unmountView(),n.remove(e,a),r.fire("destroy");var o=n.get(i.pId);o&&d(o.cM,e)&&(delete o.cM[e],o.cC--,t||o.cCreated())}},unmountZoneVframes:function(e,t){var r,n,i,a=this;if(e){var o=a.cM,s={};for(i in o)C(i,e)&&(s[i]=1);r=s}else r=a.cM;for(i in r)n=1,a.unmountVframe(i,1);return t||a.cCreated(),n},invokeView:function(e){var t,r=this,n=r.view,i=f.call(arguments,1);return r.viewInited&&n[e]&&(t=c(n[e],i,n)),t},cCreated:function(e){var t=this;if(t.cC==t.rC){var r=t.view;r&&!t.fcc&&(t.fcc=1,delete t.fca,r.fire(y,e),t.fire(y,e));var n=t.owner;n.vfCreated();var i=t.id,a=n.get(t.pId);a&&!d(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.cCreated(e))}},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var r=t.view,n=t.id;r&&(t.fca=1,r.fire(g,e),t.fire(g,e));var i=t.owner,a=i.get(t.pId);a&&d(a.rM,n)&&(a.rC--,delete a.rM[n],a.cAlter(e))}},locChged:function(t,r){var n=this,i=n.view;if(i&&i.sign&&i.rendered){var a=i.olChanged(r),o={location:t,changed:r,prevent:function(){this.cs=[]},toChildren:function(t){t=t||[],e.isString(t)&&(t=t.split(",")),this.cs=t}};a&&c(i.locationChange,o,i);for(var s,f=o.cs||e.keys(n.cM),u=0,l=f.length,v=n.owner;l>u;u++)s=v.get(f[u]),s&&s.locChged(t,r)}}}),E}),define("magix/view",["magix/magix","magix/event","magix/body"],function(e,t,r){var n=e.safeExec,i=e.has,a=",",o=[],s=e.noop,c=e.mix,f={render:1,renderUI:1},u="~",l=function(e){return function(){var t,r=this,n=r.notifyUpdate();return n&&(t=e.apply(r,arguments)),t}},v=e.cache(20),h=/\smx-(?!view|defer|owner)[a-z]+\s*=\s*['"]/g,d=String.fromCharCode(26),m=function(){this.render()},p={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},g=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,y=/(\w+):([^,]+)/g,x=/([$\w]+)<([\w,]+)>/,w=function(e){var t=this;c(t,e),t.sign=1};w.prepare=function(e){var t=this,r=e.superclass;if(r&&t.prepare(r.constructor),!e[u]){e[u]=1,e.extend=t.extend;var n,o,c,v,h,m=e.prototype,p={};for(var g in m)if(i(m,g))if(n=m[g],o=g.match(x))for(c=o[1],v=o[2],v=v.split(a),h=v.length-1;h>-1;h--)o=v[h],p[o]=1,m[c+d+o]=n;else i(f,g)&&n!=s&&(m[g]=l(n));v&&(m.$evts=p)}},c(c(w.prototype,t),{render:s,locationChange:s,init:s,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,r=arguments,a=e.sign,s=i(e,"template"),c=function(i){if(a==e.sign){s||(e.template=e.wrapMxEvent(i)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),n(e.init,r,e),e.fire("inited",0,1),n(e.render,o,e);var c=!t&&!e.rendered;c&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!s?e.fetchTmpl(c):c()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(h,"$&"+this.id+d)},setViewHTML:function(e){var t,r=this;r.beginUpdate(),r.sign&&(t=r.$(r.id),t&&(t.innerHTML=e)),r.endUpdate()},observeLocation:function(t){var r,n=this;n.$ol||(n.$ol={keys:[]}),r=n.$ol;var i=r.keys;e.isObject(t)&&(r.pn=t.pathname,t=t.keys),t&&(r.keys=i.concat((t+"").split(a))),n.locationChange==s&&(n.locationChange=m)},olChanged:function(e){var t=this,r=t.$ol;if(r){var n=0;if(r.pn&&(n=e.isPathname()),!n){var i=r.keys;n=e.isParam(i)}return n}return 1},destroy:function(){var e=this;e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1),e.sign=0},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var r=e.info,i=e.se,a=v.get(r);a||(a=r.match(g),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(y,function(e,t,r){a.p[t]=r}),v.set(r,a));var o=a.n+d+i.type,s=t[o];if(s){var f=p[a.f];f&&f.call(p,i),n(s,c({currentId:e.cId,targetId:e.tId,type:e.st,domEvent:i,params:a.p},p),t)}}},delegateEvents:function(e){var t=this,n=t.$evts,i=e?r.un:r.on,a=t.vom;for(var o in n)i.call(r,o,a)}});var b,C="?t="+Date.now(),M={},E={};return w.prototype.fetchTmpl=function(e){var t=this,r="template"in t;if(r)e(t.template);else if(i(M,t.path))e(M[t.path]);else{var a=t.path.indexOf("/");if(!b){var o=t.path.substring(0,a);b=require.s.contexts._.config.paths[o]}var s=t.path.substring(a+1),c=b+s+".html",f=E[c],u=function(r){e(M[t.path]=r)};f?f.push(u):(f=E[c]=[u],$.ajax({url:c+C,success:function(e){n(f,e),delete E[c]},error:function(e,t){n(f,t),delete E[c]}}))}},w.extend=function(t,r,i){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),r&&n(r,arguments,this)};return o.extend=a.extend,e.extend(o,a,t,i)},w}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e,t,r){var n=t.has,i=t.mix,a=0,o=0,s=0,c=0,f={},u={},l=t.mix({all:function(){return f},add:function(e){n(f,e.id)||(a++,f[e.id]=e,e.owner=l,l.fire("add",{vframe:e}))},get:function(e){return f[e]},remove:function(e,t){var r=f[e];r&&(a--,t&&o--,delete f[e],l.fire("remove",{vframe:r}))},vfCreated:function(){if(!c){o++;var e=o/a;e>s&&l.fire("progress",{percent:s=e},c=1==e)}},root:function(){return e.root(l,u)},locChged:function(e){var t,r=e.loc;if(r?t=1:r=e.location,i(u,r),!t){var n=l.root(),a=e.changed;a.isView()?n.mountView(r.view):n.locChged(r,a)}}},r);return l}),define("mxext/mmanager",["magix/magix","magix/event"],function(e,t){var r=e.has,n=e.safeExec,i=e.mix,a=function(t){var r=this;r.$mClass=t,r.$mCache=e.cache(),r.$mCacheKeys={},r.$mMetas={}},o=[].slice,s={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},c=function(e,t,r){return function(){return e.apply(t,[t,r].concat(o.call(arguments)))}},f=function(e,t){if(t)for(var r=e.length-1;r>-1;r--)f(e[r]);else{var n=e.$mm;!e.fromCache&&n.used>0&&(e.fromCache=!0),n.used++}};i(a,{create:function(e){if(!e)throw Error("MManager.create:modelClass ungiven");return new a(e)}});var u={ALL:1,ONE:2,ORDER:4},l=Date.now||function(){return+new Date},v=function(e){this.$host=e,this.$doTask=!1,this.$reqModels={}},h="_before",d="_after";return i(v.prototype,{send:function(t,i,a,o){var s=this;if(s.$doTask)return s.next(function(){this.send(t,i,a,o)}),s;s.$doTask=!0;var v=s.$host,h=v.$mCache,d=v.$mCacheKeys,m=s.$reqModels;e.isArray(t)||(t=[t]);var p,g,y,x=t.length,w=0,b=Array(x),$=[],C={},M=[],E=e.isArray(i);E&&($=Array(i.length));for(var T,O=function(e,t,o,c){if(!s.$destroy){w++,delete m[e.id];var T=e.$mm,O=T.cacheKey;if(b[t]=e,o)p=!0,y=!0,g=o,C.msg=o,C[t]=o;else if(y=!1,!O||O&&!h.has(O)){O&&h.set(O,e),T.doneAt=l();var A=T.after,P=T.meta;A&&n(A,[e,P]),v.fireAfter(P.name,[e])}if(a==u.ONE){var V=E?i[t]:i;V&&(f(e),$[t]=n(V,[y?C:null,e,C],s))}else if(a==u.ORDER){M[t]={m:e,e:y,s:o};for(var k,I,j=M.i||0;k=M[j];j++)I=E?i[j]:i,f(k.m),k.e&&(C.msg=k.s),$[j]=n(I,[k.e?C:null,k.m,C].concat($),s),k.e&&(C[j]=k.s,M.e=1);M.i=j}if(w>=x&&(p||(C=null),a==u.ALL?(f(b,1),b.unshift(C),$[0]=C,$[1]=n(i,b,s)):$.unshift(C),s.$ntId=setTimeout(function(){s.doNext($)},30)),O&&r(d,O)){var N=d[O].q;delete d[O],n(N,[c,o],e)}}},A=0;t.length>A;A++){if(T=t[A],!T)throw Error("miss attrs:"+t);var P,V=v.getModel(T,o),k=V.cacheKey;P=V.entity;var I=c(O,P,A);k&&r(d,k)?d[k].q.push(I):V.needUpdate?(m[P.id]=P,k&&(d[k]={q:[],e:P}),P.request(I)):I()}return s},fetchAll:function(e,t){return this.send(e,t,u.ALL)},saveAll:function(e,t){return this.send(e,t,u.ALL,1)},fetchOrder:function(e,t){var r=o.call(arguments,1);return this.send(e,r.length>1?r:t,u.ORDER)},saveOrder:function(e,t){var r=o.call(arguments,1);return this.send(e,r.length>1?r:t,u.ORDER,1)},saveOne:function(e,t){var r=o.call(arguments,1);return this.send(e,r.length>1?r:t,u.ONE,1)},fetchOne:function(e,t){var r=o.call(arguments,1);return this.send(e,r.length>1?r:t,u.ONE)},abort:function(){var e=this;clearTimeout(e.$ntId);var t=e.$host,i=e.$reqModels,a=t.$mCacheKeys;if(i)for(var o in i){var s=i[o],c=s.$mm.cacheKey;if(c&&r(a,c)){var f=a[c];delete a[c],n(f,[!0,s,"aborted"],s)}s.abort()}e.$reqModels={},e.$queue=[],e.$doTask=!1},next:function(e){var t=this;if(t.$queue||(t.$queue=[]),t.$queue.push(e),!t.$doTask){var r=t.$latest||[];t.doNext.apply(t,[r])}return t},doNext:function(e){var t=this;t.$doTask=!1;var r=t.$queue;if(r){var i=r.shift();i&&n(i,e,t)}t.$latest=e},destroy:function(){var e=this;e.$destroy=!0,e.abort()}}),i(a.prototype,{registerModels:function(t){var r=this,n=r.$mMetas;e.isArray(t)||(t=[t]);for(var i,a,o=0;t.length>o;o++){if(i=t[o],a=i.name,i&&!a)throw Error("miss name attribute");if(n[a])throw Error("already exist:"+a);n[a]=i}},registerMethods:function(e){var t=this;i(t,e)},createModel:function(t){var r=this,i=r.getModelMeta(t),a=new r.$mClass;a.set(i,s),a.$mm={used:0};var o=t.before||i.before;r.fireBefore(i.name,[a]),e.isFunction(o)&&n(o,[a,i,t]);var c=t.after||i.after;a.$mm.after=c;var f=t.cacheKey||i.cacheKey;return e.isFunction(f)&&(f=n(f,[i,t])),a.$mm.cacheKey=f,a.$mm.meta=i,a.set(t,s),a.setUrlParams(i.urlParams),a.setPostParams(i.postParams),a.setUrlParams(t.urlParams),a.setPostParams(t.postParams),a},getModelMeta:function(t){var r,n=this,i=n.$mMetas;r=e.isString(t)?t:t.name;var a=i[r];if(!a)throw Error("Not found:"+t.name);return a},getModel:function(e,t){var r,n,i=this;return t||(r=i.getCachedModel(e)),r||(n=!0,r=i.createModel(e)),{entity:r,cacheKey:r.$mm.cacheKey,needUpdate:n}},saveAll:function(e,t){return new v(this).saveAll(e,t)},fetchAll:function(e,t){return new v(this).fetchAll(e,t)},saveOrder:function(){var e=new v(this);return e.saveOrder.apply(e,arguments)},fetchOrder:function(){var e=new v(this);return e.fetchOrder.apply(e,arguments)},saveOne:function(){var e=new v(this);return e.saveOne.apply(e,arguments)},fetchOne:function(){var e=new v(this);return e.fetchOne.apply(e,arguments)},createMRequest:function(){return new v(this)},clearCacheByKey:function(e){var t=this,r=t.$mCache;r.del(e)},clearCacheByName:function(e){for(var t=this,r=t.$mCache,n=r.c,i=0;n.length>i;i++){var a=n[i],o=a.v,s=o&&o.$mm;if(s){var c=s.meta.name;c==e&&r.del(s.cacheKey)}}},getModelUrl:function(e){var t=this,r=t.getModelMeta(e);return r.url?r.url:void 0},listenBefore:function(e,r){t.on.call(this,e+h,r)},listenAfter:function(e,r){t.on.call(this,e+d,r)},unlistenBefore:function(e,r){t.un.call(this,e+h,r)},unlistenAfter:function(e,r){t.un.call(this,e+d,r)},fireBefore:function(e,r){t.fire.call(this,e+h,r)},fireAfter:function(e,r){t.fire.call(this,e+d,r)},getCachedModel:function(t){var r,i,a=this,o=a.$mCache,s=null;if(e.isString(t)?r=t:(i=a.getModelMeta(t),r=t.cacheKey||i.cacheKey,e.isFunction(r)&&(r=n(r,[i,t]))),r){var c=a.$mCacheKeys,f=c[r];if(f)s=f.e;else if(s=o.get(r)){i||(i=s.$mm.meta);var u=t.cacheTime||i.cacheTime||0;e.isFunction(u)&&(u=n(u,[i,t])),u>0&&l()-s.$mm.doneAt>u&&(a.clearCacheByKey(r),s=null)}}return s}}),a}),define("mxext/model",["magix/magix"],function(e){var t=function(t,r){var n=this,i=function(){i.superclass.constructor.apply(this,arguments),r&&e.safeExec(r,arguments,this)};return e.mix(i,n,{prototype:!0}),e.extend(i,n,t)},r=+new Date,n=function(e){e&&this.set(e),this.id="m"+r--},i=encodeURIComponent;return e.mix(n,{GET:"GET",POST:"POST",extend:t}),e.mix(n.prototype,{sync:e.noop,parse:function(e){return e},getPostParams:function(){return this.getParams(n.POST)},getUrlParams:function(){return this.getParams(n.GET)},getParams:function(t){var r=this;t=t?t.toUpperCase():n.GET;var a,o="$"+t,s=r[o],c=[];if(s)for(var f in s)if(a=s[f],e.isArray(a))for(var u=0;a.length>u;u++)c.push(f+"="+i(a[u]));else c.push(f+"="+i(a));return c.join("&")},setUrlParamsIf:function(e,t){this.setParams(e,t,n.GET,!0)},setPostParamsIf:function(e,t){var r=this;r.setParams(e,t,n.POST,!0)},setParams:function(t,r,i,a){i=i?i.toUpperCase():n.GET;var o=this;o.$types||(o.$types={}),o.$types[i]=!0;var s="$"+i;if(o[s]||(o[s]={}),e.isObject(t))for(var c in t)a&&o[s][c]||(o[s][c]=t[c]);else t&&(a&&o[s][t]||(o[s][t]=r))},setPostParams:function(e,t){var r=this;r.setParams(e,t,n.POST)},setUrlParams:function(e,t){this.setParams(e,t,n.GET)},reset:function(){var t=this,r=t.$types;if(r){for(var n in r)e.has(r,n)&&delete t["$"+n];delete t.$types}var i=t.$keys,a=t.$attrs;if(i){for(var o=0;i.length>o;o++)delete a[i[o]];delete t.$keys}},get:function(e){var t=this,r=!arguments.length,n=t.$attrs;return n?r?n:n[e]:null},set:function(t,r,n){var i=this;if(i.$attrs||(i.$attrs={}),n&&!i.$keys&&(i.$keys=[]),e.isObject(t)){e.isObject(r)||(r={});for(var a in t)n&&i.$keys.push(a),e.has(r,a)||(i.$attrs[a]=t[a])}else t&&(n&&i.$keys.push(t),i.$attrs[t]=r)},request:function(t,r){t||(t=function(){});var n=this;n.$abort=!1;var i=function(i,a){if(!n.$abort)if(i)t(i,a,r);else{if(a){var o=n.parse(a);e.isObject(o)||(o={data:o}),n.set(o,null,!0)}t(i,a,r)}};n.$trans=n.sync(i,r)},abort:function(){var e=this,t=e.$trans;t&&t.abort&&t.abort(),delete e.$trans,e.$abort=!0},isAborted:function(){return this.$abort}}),n}),define("mxext/view",["magix/magix","magix/view","magix/router"],function(e,t,r){var n=window,i=function(e){n.clearTimeout(e),n.clearInterval(e)},a=function(e){s(e.destroy,[],e)},o=0,s=e.safeExec,c=e.has,f=t.extend({mxViewCtor:e.noop,navigate:function(){r.navigate.apply(r,arguments)},manage:function(t,r){var n=this,s=arguments,c=!0;1==s.length&&(r=t,t="res_"+o++,c=!1),n.$res||(n.$res={});var f;e.isNumber(r)?f=i:r&&r.destroy&&(f=a);var u={hasKey:c,res:r,destroy:f};return n.$res[t]=u,r},getManaged:function(e){var t=this,r=t.$res;if(t.sign,r&&c(r,e)){var n=r[e],i=n.res;return i}return null},removeManaged:function(e){var t=this,r=null,n=t.$res;if(n)if(c(n,e))r=n[e].res,delete n[e];else for(var i in n)if(n[i].res===e){r=n[i].res,delete n[i];break}return r},destroyManaged:function(e){var t=this,r=t.$res;if(r){for(var n in r){var i=r[n],a=i.res,o=i.destroy,s=!1;o&&(o(a),s=!0),i.hasKey||delete r[n],t.fire("destroyManaged",{resource:a,processed:s})}"destroy"==e.type&&delete t.$res}},destroyMRequest:function(){var e=this,t=e.$res;if(t)for(var r in t){var n=t[r],i=n.res;i&&i.fetchOne&&i.fetchAll&&(i.destroy(),delete t[r])}}},function(){var e=this;e.on("interact",function(){e.on("rendercall",e.destroyMRequest),e.on("prerender",e.destroyManaged),e.on("destroy",e.destroyManaged)}),e.mxViewCtor()});return f});