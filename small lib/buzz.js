(function(d,c,a){"undefined"!==typeof module&&module.exports?module.exports=a():"function"===typeof c.define&&c.define.amd?define(d,[],a):c[d]=a()})("buzz",this,function(){var d={defaults:{autoplay:!1,duration:5E3,formats:[],loop:!1,placeholder:"--",preload:"metadata",volume:80,document:document},types:{mp3:"audio/mpeg",ogg:"audio/ogg",wav:"audio/wav",aac:"audio/aac",m4a:"audio/x-m4a"},sounds:[],el:document.createElement("audio"),sound:function(c,a){function k(e){for(var a=[],b=e.length-1,f=0;f<=
b;f++)a.push({start:e.start(f),end:e.end(f)});return a}function b(e,a){var b=g.createElement("source");b.src=a;d.types[a.split(".").pop()]&&(b.type=d.types[a.split(".").pop()]);e.appendChild(b)}a=a||{};var g=a.document||d.defaults.document,h=0,j=[],m={},f=d.isSupported();this.load=function(){if(!f)return this;this.sound.load();return this};this.play=function(){if(!f)return this;this.sound.play();return this};this.togglePlay=function(){if(!f)return this;this.sound.paused?this.sound.play():this.sound.pause();
return this};this.pause=function(){if(!f)return this;this.sound.pause();return this};this.isPaused=function(){return!f?null:this.sound.paused};this.stop=function(){if(!f)return this;this.setTime(0);this.sound.pause();return this};this.isEnded=function(){return!f?null:this.sound.ended};this.loop=function(){if(!f)return this;this.sound.loop="loop";this.bind("ended.buzzloop",function(){this.currentTime=0;this.play()});return this};this.unloop=function(){if(!f)return this;this.sound.removeAttribute("loop");
this.unbind("ended.buzzloop");return this};this.mute=function(){if(!f)return this;this.sound.muted=!0;return this};this.unmute=function(){if(!f)return this;this.sound.muted=!1;return this};this.toggleMute=function(){if(!f)return this;this.sound.muted=!this.sound.muted;return this};this.isMuted=function(){return!f?null:this.sound.muted};this.setVolume=function(e){if(!f)return this;0>e&&(e=0);100<e&&(e=100);this.volume=e;this.sound.volume=e/100;return this};this.getVolume=function(){return!f?this:this.volume};
this.increaseVolume=function(e){return this.setVolume(this.volume+(e||1))};this.decreaseVolume=function(e){return this.setVolume(this.volume-(e||1))};this.setTime=function(e){if(!f)return this;this.whenReady(function(){this.sound.currentTime=e});return this};this.getTime=function(){if(!f)return null;var e=Math.round(100*this.sound.currentTime)/100;return isNaN(e)?d.defaults.placeholder:e};this.setPercent=function(e){return!f?this:this.setTime(d.fromPercent(e,this.sound.duration))};this.getPercent=
function(){if(!f)return null;var e=Math.round(d.toPercent(this.sound.currentTime,this.sound.duration));return isNaN(e)?d.defaults.placeholder:e};this.setSpeed=function(e){if(!f)return this;this.sound.playbackRate=e;return this};this.getSpeed=function(){return!f?null:this.sound.playbackRate};this.getDuration=function(){if(!f)return null;var e=Math.round(100*this.sound.duration)/100;return isNaN(e)?d.defaults.placeholder:e};this.getPlayed=function(){return!f?null:k(this.sound.played)};this.getBuffered=
function(){return!f?null:k(this.sound.buffered)};this.getSeekable=function(){return!f?null:k(this.sound.seekable)};this.getErrorCode=function(){return f&&this.sound.error?this.sound.error.code:0};this.getErrorMessage=function(){if(!f)return null;switch(this.getErrorCode()){case 1:return"MEDIA_ERR_ABORTED";case 2:return"MEDIA_ERR_NETWORK";case 3:return"MEDIA_ERR_DECODE";case 4:return"MEDIA_ERR_SRC_NOT_SUPPORTED";default:return null}};this.getStateCode=function(){return!f?null:this.sound.readyState};
this.getStateMessage=function(){if(!f)return null;switch(this.getStateCode()){case 0:return"HAVE_NOTHING";case 1:return"HAVE_METADATA";case 2:return"HAVE_CURRENT_DATA";case 3:return"HAVE_FUTURE_DATA";case 4:return"HAVE_ENOUGH_DATA";default:return null}};this.getNetworkStateCode=function(){return!f?null:this.sound.networkState};this.getNetworkStateMessage=function(){if(!f)return null;switch(this.getNetworkStateCode()){case 0:return"NETWORK_EMPTY";case 1:return"NETWORK_IDLE";case 2:return"NETWORK_LOADING";
case 3:return"NETWORK_NO_SOURCE";default:return null}};this.set=function(e,a){if(!f)return this;this.sound[e]=a;return this};this.get=function(e){return!f?null:e?this.sound[e]:this.sound};this.bind=function(e,a){if(!f)return this;e=e.split(" ");for(var b=this,c=function(e){a.call(b,e)},g=0;g<e.length;g++){var d=e[g],k=d,d=k.split(".")[0];j.push({idx:k,func:c});this.sound.addEventListener(d,c,!0)}return this};this.unbind=function(e){if(!f)return this;e=e.split(" ");for(var a=0;a<e.length;a++)for(var b=
e[a],g=b.split(".")[0],c=0;c<j.length;c++){var d=j[c].idx.split(".");if(j[c].idx==b||d[1]&&d[1]==b.replace(".",""))this.sound.removeEventListener(g,j[c].func,!0),j.splice(c,1)}return this};this.bindOnce=function(a,b){if(!f)return this;var c=this;m[h++]=!1;this.bind(a+"."+h,function(){m[h]||(m[h]=!0,b.call(c));c.unbind(a+"."+h)});return this};this.trigger=function(a){if(!f)return this;a=a.split(" ");for(var b=0;b<a.length;b++)for(var c=a[b],d=0;d<j.length;d++){var k=j[d].idx.split(".");if(j[d].idx==
c||k[0]&&k[0]==c.replace(".","")){var h=g.createEvent("HTMLEvents");h.initEvent(k[0],!1,!0);this.sound.dispatchEvent(h)}}return this};this.fadeTo=function(a,b,c){function g(){setTimeout(function(){k<a&&j.volume<a?(j.setVolume(j.volume+=1),g()):k>a&&j.volume>a?(j.setVolume(j.volume-=1),g()):c instanceof Function&&c.apply(j)},h)}if(!f)return this;b instanceof Function?(c=b,b=d.defaults.duration):b=b||d.defaults.duration;var k=this.volume,h=b/Math.abs(k-a),j=this;this.play();this.whenReady(function(){g()});
return this};this.fadeIn=function(a,b){return!f?this:this.setVolume(0).fadeTo(100,a,b)};this.fadeOut=function(a,b){return!f?this:this.fadeTo(0,a,b)};this.fadeWith=function(a,b){if(!f)return this;this.fadeOut(b,function(){this.stop()});a.play().fadeIn(b);return this};this.whenReady=function(a){if(!f)return null;var b=this;0===this.sound.readyState?this.bind("canplay.buzzwhenready",function(){a.call(b)}):a.call(b)};if(f&&c){for(var l in d.defaults)d.defaults.hasOwnProperty(l)&&(a[l]=a[l]||d.defaults[l]);
this.sound=g.createElement("audio");if(c instanceof Array)for(var n in c)c.hasOwnProperty(n)&&b(this.sound,c[n]);else if(a.formats.length)for(var p in a.formats)a.formats.hasOwnProperty(p)&&b(this.sound,c+"."+a.formats[p]);else b(this.sound,c);a.loop&&this.loop();a.autoplay&&(this.sound.autoplay="autoplay");this.sound.preload=!0===a.preload?"auto":!1===a.preload?"none":a.preload;this.setVolume(a.volume);d.sounds.push(this)}},group:function(c){function a(){for(var a=d(null,arguments),g=a.shift(),h=
0;h<c.length;h++)c[h][g].apply(c[h],a)}function d(a,c){return a instanceof Array?a:Array.prototype.slice.call(c)}c=d(c,arguments);this.getSounds=function(){return c};this.add=function(a){a=d(a,arguments);for(var g=0;g<a.length;g++)c.push(a[g])};this.remove=function(a){a=d(a,arguments);for(var g=0;g<a.length;g++)for(var h=0;h<c.length;h++)if(c[h]==a[g]){c.splice(h,1);break}};this.load=function(){a("load");return this};this.play=function(){a("play");return this};this.togglePlay=function(){a("togglePlay");
return this};this.pause=function(b){a("pause",b);return this};this.stop=function(){a("stop");return this};this.mute=function(){a("mute");return this};this.unmute=function(){a("unmute");return this};this.toggleMute=function(){a("toggleMute");return this};this.setVolume=function(b){a("setVolume",b);return this};this.increaseVolume=function(b){a("increaseVolume",b);return this};this.decreaseVolume=function(b){a("decreaseVolume",b);return this};this.loop=function(){a("loop");return this};this.unloop=
function(){a("unloop");return this};this.setTime=function(b){a("setTime",b);return this};this.set=function(b,c){a("set",b,c);return this};this.bind=function(b,c){a("bind",b,c);return this};this.unbind=function(b){a("unbind",b);return this};this.bindOnce=function(b,c){a("bindOnce",b,c);return this};this.trigger=function(b){a("trigger",b);return this};this.fade=function(b,c,d,k){a("fade",b,c,d,k);return this};this.fadeIn=function(b,c){a("fadeIn",b,c);return this};this.fadeOut=function(b,c){a("fadeOut",
b,c);return this}},all:function(){return new d.group(d.sounds)},isSupported:function(){return!!d.el.canPlayType},isOGGSupported:function(){return!!d.el.canPlayType&&d.el.canPlayType('audio/ogg; codecs="vorbis"')},isWAVSupported:function(){return!!d.el.canPlayType&&d.el.canPlayType('audio/wav; codecs="1"')},isMP3Supported:function(){return!!d.el.canPlayType&&d.el.canPlayType("audio/mpeg;")},isAACSupported:function(){return!!d.el.canPlayType&&(d.el.canPlayType("audio/x-m4a;")||d.el.canPlayType("audio/aac;"))},
toTimer:function(c,a){var d,b,g;d=Math.floor(c/3600);d=isNaN(d)?"--":10<=d?d:"0"+d;b=a?Math.floor(c/60%60):Math.floor(c/60);b=isNaN(b)?"--":10<=b?b:"0"+b;g=Math.floor(c%60);g=isNaN(g)?"--":10<=g?g:"0"+g;return a?d+":"+b+":"+g:b+":"+g},fromTimer:function(c){var a=c.toString().split(":");a&&3==a.length&&(c=3600*parseInt(a[0],10)+60*parseInt(a[1],10)+parseInt(a[2],10));a&&2==a.length&&(c=60*parseInt(a[0],10)+parseInt(a[1],10));return c},toPercent:function(c,a,d){d=Math.pow(10,d||0);return Math.round(100*
c/a*d)/d},fromPercent:function(c,a,d){d=Math.pow(10,d||0);return Math.round(a/100*c*d)/d}};return d});