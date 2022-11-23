 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, b64img, blockLoader, c, cssLoader, decache, defer, escape, hashfile, libLoader, md5, scriptLoader, url, version) {
      pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
if(!libLoader) {
  libLoader = {
    js: {url: {}},
    css: {url: {}},
    root: function(r) { libLoader._r = r; },
    _r: "/assets/lib",
    _v: "",
    version: function(v) { libLoader._v = (v ? "?v=" + v : ""); }
  }
  if(version) { libLoader.version(version); }
}

pug_mixins["script"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
var filename = "/js/pack/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".js";
hashfile({type: "js", name: name, files: urls});
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", filename + libLoader._v, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
};
pug_mixins["css"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
var filename = "/css/pack/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".css";
hashfile({type: "css", name: name, files: urls});
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", filename + libLoader._v, true, true)) + "\u003E";
}
};
if (!(libLoader || scriptLoader)) {
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
if(!decache) { decache = (version? "?v=" + version : ""); }
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
scriptLoader.config = (config ? config : {});
if (!scriptLoader.url[url]) {
scriptLoader.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
if(!cssLoader) { cssLoader = {url: {}}; }
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
cssLoader.config = (config ? config : {});
if (!cssLoader.url[url]) {
cssLoader.url[url] = true;
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }







}
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
pug_mixins["nbr"] = pug_interp = function(count){
var block = (this && this.block), attributes = (this && this.attributes) || {};
for (var i = 0; i < count; i++)
{
pug_html = pug_html + "\u003Cbr\u003E";
}
};
var b64img = {};
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIA"
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};













pug_html = pug_html + "\u003Chtml\u003E\u003Chead\u003E";
pug_mixins["css"]("/assets/lib/bootstrap/main/dist/css/bootstrap.min.css");
pug_mixins["css"]("/assets/lib/@loadingio/bootstrap.ext/main/index.min.css");
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\" scope=\"v2\"\u003E.hint{background:#5f9}\u003C\u002Fstyle\u003E\u003Cstyle type=\"text\u002Fcss\" scope=\"v1\"\u003E.hint{background:#f95}:scope\u003E.scope-test{background:#9bf}\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv class=\"w-1024 rwd mx-auto my-4\"\u003E\u003Cdiv class=\"d-flex align-items-center\"\u003E\u003Ch1 class=\"m-0 flex-grow-1\"\u003Ehello\u003C\u002Fh1\u003E\u003Cdiv class=\"d-flex align-items-center\"\u003E\u003Cdiv class=\"switch\" ld=\"toggle\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"ml-2\"\u003Eenable scoping\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"v1 border rounded border p-2\""+pug_attr("scope", true, true, true)) + "\u003E\u003Cdiv class=\"hint border my-2 px-4 py-2 shadow-sm rounded\"\u003E\u003Ch2 class=\"mb-0\"\u003Escope v1\u003C\u002Fh2\u003E\u003Cdiv\u003Eshould be \u003Cspan class=\"text-danger\"\u003Ered\u003C\u002Fspan\u003E when scoping\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"v2 border rounded m-2 p-2\""+pug_attr("scope", true, true, true)) + "\u003E\u003Cdiv class=\"hint border my-2 px-4 py-2 shadow-sm rounded\"\u003E\u003Ch2 class=\"mb-0\"\u003Escope v2\u003C\u002Fh2\u003E\u003Cdiv\u003Eshould be \u003Cspan class=\"text-success\"\u003Egreen\u003C\u002Fspan\u003E when scoping\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"scope-test p-2 rounded\"\u003Ebackground should be cyan if \u003Ccode\u003E:scope\u003C\u002Fcode\u003E work correctly when scoping\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Ch3\u003ELibrary Scoping\u003C\u002Fh3\u003E\u003Cp\u003Eloading external libraries ( pure css, materialize css, etc ) and apply in different parts of the same DOM tree.\u003C\u002Fp\u003E\u003Cdiv class=\"d-flex align-items-center\"\u003E\u003Cdiv class=\"flex-grow-1 card mr-4\"\u003E\u003Cdiv class=\"card-body\" ld=\"csslib\" data-name=\"0\"\u003E\u003Cdiv\u003EPure CSS Only\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex align-items-center\"\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003Clabel\u003EMaterializeCSS\u003C\u002Flabel\u003E\u003Cdiv\u003E\u003Ca class=\"waves-effect waves-light btn\"\u003ESave\u003C\u002Fa\u003E\u003Ca class=\"waves-effect waves-light btn\"\u003E\u003Ci class=\"material-icon left\"\u003E\u003C\u002Fi\u003E Cancel\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003Clabel\u003EPure CSS\u003C\u002Flabel\u003E\u003Cdiv\u003E\u003Cbutton class=\"pure-button pure-button-primary\"\u003ESave\u003C\u002Fbutton\u003E\u003Cbutton class=\"pure-button\"\u003ECancel\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003Clabel\u003ESemantic UI\u003C\u002Flabel\u003E\u003Cdiv\u003E\u003Cbutton class=\"ui primary button\"\u003ESave\u003C\u002Fbutton\u003E\u003Cbutton class=\"ui button\"\u003ECancel\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"flex-grow-1 card ml-4\"\u003E\u003Cdiv class=\"card-body\" ld=\"csslib\" data-name=\"1\"\u003E\u003Cdiv\u003EMaterialize CSS Only\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex align-itms-center\"\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003Clabel\u003EMaterializeCSS\u003C\u002Flabel\u003E\u003Cdiv\u003E\u003Ca class=\"waves-effect waves-light btn\"\u003ESave\u003C\u002Fa\u003E\u003Ca class=\"waves-effect waves-light btn\"\u003E\u003Ci class=\"material-icon left\"\u003E\u003C\u002Fi\u003E Cancel\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003Clabel\u003EPure CSS\u003C\u002Flabel\u003E\u003Cdiv\u003E\u003Cbutton class=\"pure-button pure-button-primary\"\u003ESave\u003C\u002Fbutton\u003E\u003Cbutton class=\"pure-button\"\u003ECancel\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003Clabel\u003ESemantic UI\u003C\u002Flabel\u003E\u003Cdiv\u003E\u003Cbutton class=\"ui primary button\"\u003ESave\u003C\u002Fbutton\u003E\u003Cbutton class=\"ui button\"\u003ECancel\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Ch3\u003EScoping by CSSRuleList\u003C\u002Fh3\u003E\u003Cp\u003Einstead of CSS Text, csscope can also scope CSSRuleList directly.\u003C\u002Fp\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"css-rule-list card-body\"\u003E\u003Cdiv\u003Ethis text should be red if CSSRuleList support works\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["script"]("/assets/lib/@loadingio/ldquery/main/index.min.js");
pug_mixins["script"]("/assets/lib/ldview/main/index.min.js");
pug_mixins["script"]("/assets/lib/@plotdb/csscope/dev/index.min.js");
pug_html = pug_html + "\u003Cscript type=\"module\"\u003Evar scope,styles,toggle,iframe,ref$,style,ret,m,view,unpkg,cssmgr,urls,libs;scope=new csscope.converter({scopeTest:\"[scope]\"});styles=ld$.find(\"style\").map(function(e){var t,s,n;t=e.getAttribute(\"scope\");s=ld$.create({name:\"style\",attr:{type:\"text\u002Fcss\"}});n=scope.convert(t+\"\",e.textContent);s.textContent=n;return[e,s]});toggle=function(){var t;t=view.get(\"toggle\").classList.contains(\"on\");return styles.map(function(e){ld$.remove(e[0]);ld$.remove(e[1]);return document.body.appendChild(e[t?1:0])})};iframe=document.createElement(\"iframe\");ref$=iframe.style;ref$.pointerEvents=\"none\";ref$.border=0;ref$.width=0;ref$.height=0;ref$.opacity=0;document.body.appendChild(iframe);style=iframe.contentDocument.createElement(\"style\");style.setAttribute(\"type\",\"text\u002Fcss\");style.textContent=\"div { color: red }\";iframe.contentDocument.body.appendChild(style);ret=scope.convert(\"css-rule-list\",style.sheet.rules);m=ld$.create({name:\"style\",attr:{type:\"text\u002Fcss\"}});m.textContent=ret;document.body.appendChild(m);view=new ldView({root:document.body,action:{click:{toggle:function(e){var t;t=e.node;t.classList.toggle(\"on\");return toggle()}}}});unpkg=function(e){var t,n,s,r;t=e.name,n=e.version,s=e.path;r=\"https:\u002F\u002Funpkg.com\u002F\"+t+(n?\"@\"+n:\"\")+\"\u002F\"+(s||\"\");return fetch(r).then(function(e){var t,s;t=\u002F^https:\\\u002F\\\u002Funpkg.com\\\u002F([^@]+)@([^\u002F]+)\\\u002F\u002F.exec(e.url)||[];s=t[2];return e.text().then(function(e){return{version:s||n,content:e}})})};cssmgr=new csscope.manager({registry:unpkg});urls=[\"https:\u002F\u002Funpkg.com\u002Fpurecss@2.0.6\u002Fbuild\u002Fpure-min.css\",\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmaterialize\u002F1.0.0\u002Fcss\u002Fmaterialize.min.css\"];libs=[{name:\"purecss\",version:\"2.0.6\",path:\"build\u002Fpure-min.css\"},{name:\"materialize-css\",version:\"1.0.0\",path:\"dist\u002Fcss\u002Fmaterialize.min.css\"}];cssmgr.load(libs).then(function(){var e;e=view.getAll(\"csslib\");return e.map(function(e,t){return cssmgr.scope(e,libs[t])})});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "b64img" in locals_for_with ?
        locals_for_with.b64img :
        typeof b64img !== 'undefined' ? b64img : undefined, "blockLoader" in locals_for_with ?
        locals_for_with.blockLoader :
        typeof blockLoader !== 'undefined' ? blockLoader : undefined, "c" in locals_for_with ?
        locals_for_with.c :
        typeof c !== 'undefined' ? c : undefined, "cssLoader" in locals_for_with ?
        locals_for_with.cssLoader :
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "defer" in locals_for_with ?
        locals_for_with.defer :
        typeof defer !== 'undefined' ? defer : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "md5" in locals_for_with ?
        locals_for_with.md5 :
        typeof md5 !== 'undefined' ? md5 : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 