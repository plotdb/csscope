// Generated by LiveScript 1.6.0
(function(){
  var csscope, slice$ = [].slice;
  csscope = function(a, b, c, d){
    if (!csscope['default']) {
      csscope['default'] = new csscope.converter();
    }
    return csscope['default'].convert(a, b, c, d);
  };
  csscope.converter = function(opt){
    opt == null && (opt = {});
    this.scopeTest = opt.scopeTest;
    this.node = document.createElement("style");
    this.iframe = document.createElement("iframe");
    this.iframe.setAttribute('title', "for csscope css parsing");
    this.iframe.style.display = 'none';
    this.iframe.src = 'about:blank';
    document.body.appendChild(this.iframe);
    this.iframe.contentDocument.body.appendChild(this.node);
    return this;
  };
  csscope.converter.prototype = import$(Object.create(Object.prototype), {
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
  csscope.manager = function(opt){
    opt == null && (opt = {});
    this.attrName = "csscope";
    this.converter = new csscope.converter();
    this.counter = 0;
    if (opt.registry) {
      this.registry(opt.registry);
    }
    this.init();
    return this;
  };
  csscope.manager.prototype = import$(Object.create(Object.prototype), {
    _reg: function(arg$){
      var name, version, path;
      name = arg$.name, version = arg$.version, path = arg$.path;
      return "/assets/lib/" + name + "/" + (version || 'latest') + "/" + (path || '');
    },
    registry: function(it){
      var ref$;
      this._reg = it || '';
      if (typeof this._reg === 'string') {
        if (this._reg && (ref$ = this._reg)[ref$.length - 1] !== '/') {
          return this._reg += '/';
        }
      }
    },
    getUrl: function(it){
      return it.url != null
        ? it.url
        : it.name != null ? typeof this._reg === 'function'
          ? this._reg({
            name: it.name,
            version: it.version,
            path: it.path
          })
          : this._reg + "/" + name + "/" + (version || 'latest') + "/" + (path || '') : it;
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
        return this$.getUrl(it);
      }).map(function(it){
        return {
          url: it,
          scope: this$.scope[it]
        };
      }).filter(function(it){
        return it.scope;
      });
    },
    load: function(urls, scopeTest){
      var this$ = this;
      urls = (Array.isArray(urls)
        ? urls
        : [urls]).map(function(it){
        return this$.getUrl(it);
      });
      return Promise.all(urls.map(function(url){
        this$.scope[url] = "csp-" + (this$.counter++) + "-" + Math.random().toString(36).substring(2).substring(5);
        return ld$.fetch(url, {
          method: "GET"
        }, {
          type: 'text'
        }).then(function(css){
          var ret;
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
    module.exports = csscope;
  } else if (typeof window != 'undefined' && window !== null) {
    window.csscope = csscope;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
