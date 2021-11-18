// Generated by LiveScript 1.6.0
(function(){
  var csp, slice$ = [].slice;
  csp = function(a, b, c, d){
    if (!csp['default']) {
      csp['default'] = new csp.converter();
    }
    return csp['default'].convert(a, b, c, d);
  };
  csp.id = function(o){
    return o.id || o.url || o.name + "@" + o.version + "/" + o.path;
  };
  csp._cache = {};
  csp.cache = function(o){
    var r;
    if (typeof o === 'string') {
      o = {
        url: o
      };
    }
    if (!o.id) {
      o.id = rsp.id(o);
    }
    if (r = csp._cache[o.id]) {
      return r;
    }
    return csp._cache[o.id] = import$({}, o);
  };
  csp.converter = function(opt){
    var ifr;
    opt == null && (opt = {});
    this.scopeTest = opt.scopeTest;
    this.node = document.createElement("style");
    this.iframe = ifr = document.createElement("iframe");
    ifr.setAttribute('title', "for csscope parsing");
    ifr.style.display = 'none';
    ifr.src = 'about:blank';
    document.body.appendChild(ifr);
    this.iframe.contentDocument.body.appendChild(this.node);
    return this;
  };
  csp.converter.prototype = import$(Object.create(Object.prototype), {
    getNames: function(rules, defs){
      var i$, len$, rule;
      defs == null && (defs = {});
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        if (rule.name) {
          defs[rule.name] = true;
        } else if (rule.cssRules) {
          this.getNames(rule.cssRules, defs);
        }
      }
      return defs;
    },
    _convert: function(rules, scopeRule, name, scopeTest, defs){
      var ret, i$, len$, rule, sel, code;
      defs == null && (defs = {});
      ret = "";
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        if (rule.style && defs[rule.style.animationName]) {
          rule.style.animationName = name + "__" + rule.style.animationName;
        }
        if (rule.selectorText) {
          if (!scopeTest) {
            sel = rule.selectorText.split(',').map(fn$).map(fn1$).join(',');
          } else {
            sel = rule.selectorText.split(',').map(fn2$).map(fn3$).join(',');
          }
          ret += "" + sel + " {\n  " + Array.from(rule.style).map(fn4$).join(';') + "\n}";
          rule.selectorText = sel;
        } else if (rule.name) {
          sel = rule.name.split(',').map(fn5$).map(fn6$).join(',');
          rule.name = sel;
          ret += "@keyframes " + sel + " {\n  " + Array.from(rule.cssRules).map(fn7$).join('\n') + "\n}";
        } else if (rule.cssRules) {
          code = this._convert(rule.cssRules, scopeRule, name, scopeTest, defs);
          ret += "@media " + rule.conditionText + " {\n  " + code + "\n}";
        }
      }
      return ret;
      function fn$(it){
        return it.trim();
      }
      function fn1$(it){
        if (it === ":scope") {
          return scopeRule;
        } else {
          return scopeRule + " " + it;
        }
      }
      function fn2$(it){
        return it.trim();
      }
      function fn3$(it){
        var ref$, h, t, h1, h2;
        if (it === ":scope") {
          return scopeRule;
        }
        ref$ = it.split(' ').map(function(it){
          return it.trim();
        }).filter(function(it){
          return it;
        }), h = ref$[0], t = slice$.call(ref$, 1);
        ref$ = /^[a-zA-Z]/.exec(h)
          ? [h, '']
          : ['', h], h1 = ref$[0], h2 = ref$[1];
        return (scopeRule + " :not(" + scopeTest + ") " + it + ",") + (scopeRule + " > " + h1 + ":not(" + scopeTest + ")" + h2 + " " + t.join(' '));
      }
      function fn4$(it){
        return it + ":" + rule.style[it] + (rule.style.getPropertyPriority(it) === 'important' ? '!important' : '');
      }
      function fn5$(it){
        return it.trim();
      }
      function fn6$(it){
        return name + "__" + it;
      }
      function fn7$(it){
        return it.cssText;
      }
    },
    convert: function(a, b, c, d){
      var opt, ref$, name, css, rule, scopeTest, ret, defs;
      ref$ = opt = typeof a === 'object'
        ? a
        : {
          name: a,
          css: b,
          rule: c,
          scopeTest: d
        }, name = ref$.name, css = ref$.css, rule = ref$.rule, scopeTest = ref$.scopeTest;
      if (!rule) {
        rule = "." + name;
      }
      if (!name) {
        name = rule;
      }
      if (!scopeTest) {
        scopeTest = this.scopeTest;
      }
      this.node.textContent = css;
      ret = "";
      defs = this.getNames(this.node.sheet.rules, {});
      ret = this._convert(this.node.sheet.rules, rule, name, scopeTest, defs);
      return ret;
    }
  });
  csp.manager = function(o){
    o == null && (o = {});
    this.attrName = "csscope";
    this._cache = {};
    this.converter = new csp.converter();
    this.counter = 0;
    this.registry(o.registry || "/assets/lib/");
    this.init();
    return this;
  };
  csp.manager.prototype = import$(Object.create(Object.prototype), {
    cache: function(o){
      var r, that;
      if (typeof o === 'string') {
        o = {
          url: o
        };
      }
      if (!o.id) {
        o.id = csp.id(o);
      }
      if (r = this._cache[o.id]) {
        return r;
      }
      if (that = csp._cache[o.id]) {
        return this._cache[o.id] = that;
      }
      return this._cache[o.id] = import$({}, o);
    },
    _url: function(o){
      var that;
      return typeof o === 'string'
        ? o
        : (that = o.url)
          ? that
          : this._reg(o);
    },
    registry: function(v){
      if (typeof v === 'string') {
        if (v[v.length - 1] === '/') {
          v = v.substring(0, v.length - 1);
        }
        return this._reg = function(v){
          return function(o){
            return v + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || 'index.min.js');
          };
        }(v);
      } else {
        return this._reg = v;
      }
    },
    init: function(){
      if (this.inited) {
        return;
      }
      this.inited = true;
      this.styleNode = document.createElement('style');
      this.styleNode.setAttribute('type', 'text/css');
      this.styleNode.setAttribute('data-name', "csscope.manager");
      this.styleContent = [];
      return document.body.appendChild(this.styleNode);
    },
    scope: function(node, urls){
      var ret;
      urls == null && (urls = []);
      ret = this.get(urls);
      node.classList.add.apply(node.classList, ret.map(function(it){
        return it.scope;
      }));
      return ret;
    },
    get: function(urls){
      var this$ = this;
      urls == null && (urls = []);
      return (Array.isArray(urls)
        ? urls
        : [urls]).map(function(it){
        return this$._url(it);
      }).map(function(it){
        return this$.cache(it);
      }).filter(function(it){
        return it.scope;
      });
    },
    load: function(urls, scopeTest){
      var this$ = this;
      urls = (Array.isArray(urls)
        ? urls
        : [urls]).map(function(it){
        return this$._url(it);
      });
      return Promise.all(urls.map(function(url){
        var lib;
        lib = this$.cache(url);
        if (lib.scope) {
          return Promise.resolve();
        }
        return ld$.fetch(url, {
          method: "GET"
        }, {
          type: 'text'
        }).then(function(css){
          var ret;
          this$.scope[url] = lib.scope = "csp-" + (this$.counter++) + "-" + Math.random().toString(36).substring(2).substring(5);
          ret = this$.converter.convert({
            css: css,
            name: this$.scope[url],
            scopeTest: scopeTest
          });
          return this$.styleContent.push(ret);
        });
      })).then(function(){
        return this$.styleNode.textContent = this$.styleContent.join('\n');
      }).then(function(){
        return this$.get(urls);
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = csp;
  } else if (typeof window != 'undefined' && window !== null) {
    window.csscope = csp;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
