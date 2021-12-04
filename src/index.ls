csp = (a, b, c, d) ->
  if !csp.default => csp.default = new csp.converter!
  csp.default.convert a, b, c, d

csp.id = (o) -> o.id or o.url or "#{o.name}@#{o.version}/#{o.path}"
# lib spec:
#  - id ( can be autogen )
#  - url
#  - name, version, path
#  - scope
#  - inited: true if style is active.
#  - code: css code for this lib
csp._cache = {}
csp.cache = (o) ->
  if typeof(o) == \string => o = {url: o}
  if !o.id => o.id = csp.id o
  if r = csp._cache[o.id] => return r
  return csp._cache[o.id] = {} <<< o

csp.converter = (opt={}) ->
  @scope-test = opt.scope-test
  @node = document.createElement("style")
  @iframe = ifr = document.createElement("iframe")
  ifr.setAttribute \title, "for csscope parsing"
  ifr.style <<< display: \none
  ifr.src = \about:blank
  document.body.appendChild ifr
  @iframe.contentDocument.body.appendChild @node
  @_idx = 0 # use for comment refreshing
  @

csp.converter.prototype = Object.create(Object.prototype) <<< do
  # get all names that we need to scope. For now only animationName is needed
  get-names: (rules, defs = {}) ->
    for rule in rules =>
      if rule.name => defs[rule.name] = true
      else if rule.cssRules => @get-names(rule.cssRules, defs)
    return defs
  # scope: css selector rule from user
  # scope-test: rule for identifying if some node is scoped ( as the root element of a scope )
  _convert: (rules, scope-rule, name, scope-test, defs = {}) ->
    ret = ""
    for rule in rules =>
      # rule with animationName defined
      if rule.style and defs[rule.style.animationName] =>
        rule.style.animationName = "#{name}__#{rule.style.animationName}"
      # general rule
      if rule.selectorText =>
        if !scope-test =>
          # vue favor ( affect child even if scoped)
          sel = rule
            .selectorText.split(',').map(->it.trim!)
            .map(-> if it == ":scope" => scope-rule else "#scope-rule #it")
            .join(',')
        else
          # css module favor ( only in scope )
          sel = rule.selectorText.split(',').map(->it.trim!)
            .map ->
              if it == ":scope" => return scope-rule
              [h,...t] = it.split(' ').map(->it.trim!).filter(->it)
              [h1,h2] = if /^[a-zA-Z]/.exec(h) => [h,''] else ['',h]
              "#scope-rule :not(#scope-test) #it," +
              "#scope-rule > #h1:not(#scope-test)#h2 #{t.join(' ')}"
            .join(',')

        ret += """
        #sel {
          #{Array.from(rule.style).map(-> "#it:#{rule.style[it]}#{if rule.style.getPropertyPriority(it) == 'important' => '!important' else ''}").join(';')}
        }
        """
        rule.selectorText = sel
      # animation
      else if rule.name =>
        sel = rule.name.split(',').map(->it.trim!).map(-> "#{name}__#it").join(',')
        rule.name = sel
        ret += """
        @keyframes #{sel} {
          #{Array.from(rule.cssRules).map(-> it.cssText).join(\\n)}
        }
        """
      # recursive definition
      else if rule.cssRules =>
        code = @_convert(rule.cssRules, scope-rule, name, scope-test, defs)
        ret += """
        @media #{rule.conditionText} {
          #{code}
        }
        """
    return ret


  convert: (a, b, c, d) ->
    {name, css, rule, scope-test} = opt = if typeof(a) == \object => a else {name: a, css: b, rule: c, scope-test: d}
    if !rule => rule = ".#name"
    if !name => name = rule
    if !scope-test => scope-test = @scope-test
    rules = if typeof(css) == \object => css
    else
      # if css == textContent, rules won't be updated and will be the patched rules
      # but we need a raw, plain rules, so we simply add a different comment to force update
      @node.textContent = (css or '') + "/*#{@_idx++}*/"
      @node.sheet.rules
    defs = @get-names rules, {}
    return @_convert(rules, rule, name, scope-test, defs) or ''

csp.manager = (o = {}) ->
  @attr-name = "csscope"
  @_cache = {}
  @converter = new csp.converter!
  @counter = 0
  @registry(o.registry or "/assets/lib/")
  @init!
  @

csp.manager.prototype = Object.create(Object.prototype) <<< do
  cache: (o) ->
    if typeof(o) == \string => o = {url: o}
    if !o.id => o.id = csp.id o
    if r = @_cache[o.id] => return r
    if csp._cache[o.id] => return @_cache[o.id] = that
    return @_cache[o.id] = {} <<< o

  _url: (o) ->
    return if typeof(o) == \string => o
    else if o.url => that
    else @_reg o

  registry: (v) ->
    if typeof(v) == \string =>
      if v[* - 1] == \/ => v = v.substring(0, v.length - 1)
      @_reg = ((v) -> (o) -> "#{v}/#{o.name}/#{o.version or 'main'}/#{o.path or 'index.min.js'}") v
    else @_reg = v

  init: ->
    if @inited => return
    @inited = true
    @style-node = document.createElement \style
    @style-node.setAttribute \type, \text/css
    @style-node.setAttribute \data-name, "csscope.manager"
    @style-content = []
    document.body.appendChild @style-node

  scope: (node, urls = []) ->
    ret = @get urls
    node.classList.add.apply node.classList, ret.map(-> it.scope)
    return ret

  get: (urls = []) ->
    (if Array.isArray(urls) => urls else [urls])
      .map ~> @_url it
      .map ~> @cache it
      .filter -> it.scope

  load: (urls, scope-test) ->
    urls = (if Array.isArray(urls) => urls else [urls]).map ~> @_url it
    Promise
      .all(
        urls.map (url) ~>
          lib = @cache url
          if lib.inited => return Promise.resolve!
          if lib.scope and lib.code =>
            Promise.resolve!
              .then ~>
                lib.inited = true
                @style-content.push lib.code
          else
            ld$.fetch url, {method: "GET"}, {type: \text}
              .then (css) ~>
                lib <<< code: css, inited: true
                if !lib.scope => lib.scope = "csp-#{@counter++}-#{Math.random!toString(36)substring(2,7)}"
                ret = @converter.convert {css, name: lib.scope, scope-test}
                @style-content.push ret

      )
      .then ~> @style-node.textContent = @style-content.join(\\n)
      .then ~> @get urls

if module? => module.exports = csp
else if window? => window.csscope = csp
