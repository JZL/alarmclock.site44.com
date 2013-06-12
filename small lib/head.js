//head.core
(function(b,p){function e(g){l[l.length]=g}function q(g){j.className=j.className.replace(RegExp("\\b"+g+"\\b"),"")}function m(g,c){for(var b=0,a=g.length;b<a;b++)c.call(g,g[b],b)}function r(){j.className=j.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var g=b.innerWidth||j.clientWidth,a=b.outerWidth||b.screen.width;d.screen.innerWidth=g;d.screen.outerWidth=a;e("w-"+g);m(c.screens,function(a){g>a?(c.screensCss.gt&&e("gt-"+a),c.screensCss.gte&&e("gte-"+
a)):g<a?(c.screensCss.lt&&e("lt-"+a),c.screensCss.lte&&e("lte-"+a)):g===a&&(c.screensCss.lte&&e("lte-"+a),c.screensCss.eq&&e("e-q"+a),c.screensCss.gte&&e("gte-"+a))});var a=b.innerHeight||j.clientHeight,f=b.outerHeight||b.screen.height;d.screen.innerHeight=a;d.screen.outerHeight=f;d.feature("portrait",a>g);d.feature("landscape",a<g)}function s(){b.clearTimeout(t);t=b.setTimeout(r,100)}var n=b.document,f=b.navigator,u=b.location,j=n.documentElement,l=[],c={screens:[240,320,480,640,768,800,1024,1280,
1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:10}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},section:"-section",page:"-page",head:"head"};if(b.head_conf)for(var a in b.head_conf)b.head_conf[a]!==p&&(c[a]=b.head_conf[a]);var d=b[c.head]=function(){d.ready.apply(null,arguments)};d.feature=function(a,b,c){if(!a)return j.className+=" "+l.join(" "),l=[],d;"[object Function]"===Object.prototype.toString.call(b)&&(b=b.call());e((b?"":"no-")+a);d[a]=!!b;c||(q("no-"+
a),q(a),d.feature());return d};d.feature("js",!0);a=f.userAgent.toLowerCase();f=/mobile|midp/.test(a);d.feature("mobile",f,!0);d.feature("desktop",!f,!0);a=/(chrome|firefox)[ \/]([\w.]+)/.exec(a)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||[];f=a[1];a=parseFloat(a[2]);switch(f){case "msie":f="ie";a=n.documentMode||a;break;case "firefox":f="ff";break;case "ipod":case "ipad":case "iphone":f=
"ios";break;case "webkit":f="safari"}d.browser={name:f,version:a};d.browser[f]=!0;for(var k=0,v=c.browsers.length;k<v;k++)for(var h in c.browsers[k])if(f===h){e(h);for(var w=c.browsers[k][h].max,i=c.browsers[k][h].min;i<=w;i++)a>i?(c.browserCss.gt&&e("gt-"+h+i),c.browserCss.gte&&e("gte-"+h+i)):a<i?(c.browserCss.lt&&e("lt-"+h+i),c.browserCss.lte&&e("lte-"+h+i)):a===i&&(c.browserCss.lte&&e("lte-"+h+i),c.browserCss.eq&&e("eq-"+h+i),c.browserCss.gte&&e("gte-"+h+i))}else e("no-"+h);"ie"===f&&9>a&&m("abbr article aside audio canvas details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" "),
function(a){n.createElement(a)});m(u.pathname.split("/"),function(a,b){if(2<this.length&&this[b+1]!==p)b&&e(this.slice(1,b+1).join("-").toLowerCase()+c.section);else{var d=a||"index",f=d.indexOf(".");0<f&&(d=d.substring(0,f));j.id=d.toLowerCase()+c.page;b||e("root"+c.section)}});d.screen={height:b.screen.height,width:b.screen.width};r();var t=0;b.addEventListener?b.addEventListener("resize",s,!1):b.attachEvent("onresize",s)})(window);

//head.load
(function(f,w){function m(){}function g(a,b){if(a){"object"===typeof a&&(a=[].slice.call(a));for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}}function v(a,b){var c=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&c===a}function k(a){return v("Function",a)}function h(a){a=a||m;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var c in a)a[c]&&(b={name:c,url:a[c]});else b=a.split("/"),b=b[b.length-1],c=b.indexOf("?"),b={name:-1!==c?b.substring(0,c):b,url:a};
return(a=p[b.name])&&a.url===b.url?a:p[b.name]=b}function q(a){var a=a||p,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==r)return!1;return!0}function s(a,b){b=b||m;a.state===r?b():a.state===x?d.ready(a.name,b):a.state===y?a.onpreload.push(function(){s(a,b)}):(a.state=x,z(a,function(){a.state=r;b();g(l[a.name],function(a){h(a)});j&&q()&&g(l.ALL,function(a){h(a)})}))}function z(a,b){var b=b||m,c;/\.css[^\.]*$/.test(a.url)?(c=e.createElement("link"),c.type="text/"+(a.type||"css"),c.rel="stylesheet",
c.href=a.url):(c=e.createElement("script"),c.type="text/"+(a.type||"javascript"),c.src=a.url);c.onload=c.onreadystatechange=function(a){a=a||f.event;if("load"===a.type||/loaded|complete/.test(c.readyState)&&(!e.documentMode||9>e.documentMode))c.onload=c.onreadystatechange=c.onerror=null,b()};c.onerror=function(){c.onload=c.onreadystatechange=c.onerror=null;b()};c.async=!1;c.defer=!1;var d=e.head||e.getElementsByTagName("head")[0];d.insertBefore(c,d.lastChild)}function i(){e.body?j||(j=!0,g(A,function(a){h(a)})):
(f.clearTimeout(d.readyTimeout),d.readyTimeout=f.setTimeout(i,50))}function t(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",t,!1),i()):"complete"===e.readyState&&(e.detachEvent("onreadystatechange",t),i())}var e=f.document,A=[],B=[],l={},p={},E="async"in e.createElement("script")||"MozAppearance"in e.documentElement.style||f.opera,C,j,D=f.head_conf&&f.head_conf.head||"head",d=f[D]=f[D]||function(){d.ready.apply(null,arguments)},y=1,x=3,r=4;d.load=E?function(){var a=arguments,b=a[a.length-
1],c={};k(b)||(b=null);g(a,function(d,e){d!==b&&(d=n(d),c[d.name]=d,s(d,b&&e===a.length-2?function(){q(c)&&h(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!C)return B.push(function(){d.load.apply(null,a)}),d;c?(g(b,function(a){if(!k(a)){var b=n(a);b.state===w&&(b.state=y,b.onpreload=[],z({url:b.url,type:"cache"},function(){b.state=2;g(b.onpreload,function(a){a.call()})}))}}),s(n(a[0]),k(c)?c:function(){d.load.apply(null,b)})):s(n(a[0]));return d};d.js=d.load;d.test=
function(a,b,c,e){a="object"===typeof a?a:{test:a,success:b?v("Array",b)?b:[b]:!1,failure:c?v("Array",c)?c:[c]:!1,callback:e||m};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):e();return d};d.ready=function(a,b){if(a===e)return j?h(b):A.push(b),d;k(a)&&(b=a,a="ALL");if("string"!==typeof a||!k(b))return d;var c=p[a];if(c&&c.state===r||"ALL"===a&&q()&&j)return h(b),d;(c=l[a])?c.push(b):l[a]=[b];
return d};d.ready(e,function(){q()&&g(l.ALL,function(a){h(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===e.readyState)i();else if(e.addEventListener)e.addEventListener("DOMContentLoaded",t,!1),f.addEventListener("load",i,!1);else{e.attachEvent("onreadystatechange",t);f.attachEvent("onload",i);var u=!1;try{u=null==f.frameElement&&e.documentElement}catch(F){}u&&u.doScroll&&function b(){if(!j){try{u.doScroll("left")}catch(c){f.clearTimeout(d.readyTimeout);d.readyTimeout=f.setTimeout(b,50);
return}i()}}()}setTimeout(function(){C=!0;g(B,function(b){b()})},300)})(window);