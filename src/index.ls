var win, doc
fetch = if window? => window.fetch else if module? and require? => require "node-fetch" else null
semver = if window? => window.semver else if modeul? and require? => require "@plotdb/semver" else null

is-scope = -> /^:scope[ .:\[#]|^:scope$/.exec it
_fetch = (u, c) ->
  (ret) <- fetch u, c .then _
  if ret and ret.ok => return ret.text!
  if !ret => return Promise.reject(new Error("404") <<< {name: \lderror, id: 404})
  ret.clone!text!then (t) ->
    i = ret.status or 404
    e = new Error("#i #t") <<< {name: \lderror, id: i, message: t}
    try
      if (j = JSON.parse(t)) and j.name == \lderror => e <<< j <<< {json: j}
    catch err
    return Promise.reject e

csp = (a, b, c, d) ->
  if !csp.default => csp.default = new csp.converter!
  csp.default.convert a, b, c, d

csp.env = -> [win, doc] := [it, it.document]
csp.id = (o) ->
  o.id or o.url or "#{if o.ns => "#{o.ns}:" else ''}#{o.name}@#{o.version or 'main'}:#{o.path or 'index.html'}"
csp.scope = (o) ->
  # legacy scope generator. to be deleted
  #"csp-#{@counter++}-#{Math.random!toString(36)substring(2,7)}"
  o.scope or ('_' + btoa(csp.id(o)).replace(/=/g,'_'))

# lib spec:
#  - id ( can be autogen )
#  - url
#  - name, version, path
#  - scope
#  - inited: true if style is active.
#  - code: css code for this lib
csp._cache = {}
csp._ver = {map: {}, list: {}}
csp.cache = (o) ->
  if typeof(o) == \string => o = {url: o}
  if !o.id => o.id = csp.id o
  if @_cache[o.id] => return that
  if o.id and !o.name =>
    ret = /^(\S+)@(\S+):(\S+)$/.exec(o.id)
    if !ret => [n,v,p] = [o.id, '', '']
    else [n,v,p] = [ret.1, ret.2, ret.3]
  else [n,v,p] = [o.name, o.version or '', o.path or '']
  if /^[0-9.]+$/.exec v =>
    if @_ver.map{}[n][v] => v = that
    if @_cache[csp.id({name: n, version: v, path: p})] => return that
    for i from 0 til @_ver.list[][n].length =>
      ver = @_ver.list[n][i]
      if !semver.fit(ver, v) => continue
      @_ver.map[n][v] = ver
      o.id = csp.id {name: n, version: ver, path: p}
      if @_cache[o.id] => return that
  if !(v in @_ver.list[][n]) => @_ver.list[n].push v
  return @_cache[o.id] = o

csp.converter = (opt={}) ->
  @scope-test = opt.scope-test
  @node = doc.createElement("style")
  @iframe = ifr = doc.createElement("iframe")
  ifr.setAttribute \title, "for csscope parsing"
  ifr.style <<< display: \none
  ifr.src = \about:blank
  doc.body.appendChild ifr
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
      # we have to parse `animation` if `animationName` doesn't exist,
      # which is possible for nodejs environment.
      # TODO: our current implementation may be wrong in some edge cases.
      # for more information:
      #   https://www.w3.org/TR/css-animations-1/#example-f4782312
      if rule.style =>
        if defs[rule.style.animationName] =>
          rule.style.animationName = "#{name}__#{rule.style.animationName}"
        else if rule.style.animation =>
          matched = false
          rule.style.animation = rule.style.animation.split(' ').map(->
            if matched or !defs[it] => return it
            matched = true
            return "#{name}__#{it}"
          ).join(' ')

      # general rule
      if rule.selectorText =>
        if !scope-test =>
          # vue favor ( affect child even if scoped)
          sel = rule
            .selectorText.split(',').map(->it.trim!)
            .map(-> if is-scope it => it.replace(/^:scope/, scope-rule) else "#scope-rule #it")
            .join(',')
        else
          # css module favor ( only in scope )
          sel = rule.selectorText.split(',').map(->it.trim!)
            .map ->
              if is-scope(it) => return it.replace(/^:scope/, scope-rule)
              [h,...t] = it.split(' ').map(->it.trim!).filter(->it)
              [h1,h2] = if /^[a-zA-Z]/.exec(h) => [h,''] else ['',h]
              "#scope-rule :not(#scope-test) #it," +
              "#scope-rule > #h1:not(#scope-test)#h2 #{t.join(' ')}"
            .join(',')
        ret += """#sel{#{rule.style.cssText}}"""
        # turns out that we don't have to iterate all styles - cssText just works for that
        /*
        ret += """
        #sel {
          #{Array.from(rule.style).map(-> "#it:#{rule.style.getPropertyValue(it)}#{if rule.style.getPropertyPriority(it) == 'important' => '!important' else ''}").join(';')}
        }
        """
        */
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
      @node.sheet.cssRules
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
    if @_cache[o.id] => return that
    return @_cache[o.id] = csp.cache o

  _ref: (o) ->
    return if typeof(o) == \string => o
    else if o.url => that
    else if @_reg.fetch => @_reg.fetch o
    else @_reg o

  registry: (v) ->
    if typeof(v) == \string =>
      if v[* - 1] == \/ => v = v.substring(0, v.length - 1)
      @_reg = ((v) -> (o) -> "#{v}/#{o.name}/#{o.version or 'main'}/#{o.path or 'index.min.css'}") v
    else @_reg = v

  init: ->
    if @inited => return
    @inited = true
    @style-node = doc.createElement \style
    @style-node.setAttribute \type, \text/css
    @style-node.setAttribute \data-name, "csscope.manager"
    @style-content = []
    doc.body.appendChild @style-node

  scope: (node, urls = []) ->
    ret = @get urls
    node.classList.add.apply node.classList, ret.map(-> it.scope)
    return ret

  get: (libs = []) ->
    (if Array.isArray(libs) => libs else [libs])
      .map ~> @cache it
      .filter -> it.scope

  bundle: (libs, scope-test) ->
    libs = if Array.isArray(libs) => libs else [libs]
    hash = {}
    libs
      .map (o) ~> @cache o
      .filter -> it and it.id
      .map -> hash[it.id] = it
    libs = [v for k,v of hash]
    @load libs, scope-test, true .then (libs) -> libs.map(->it.code).join(\\n)

  load: (libs, scope-test, bundle) ->
    libs = (if Array.isArray(libs) => libs else [libs]).map (o) ~> @cache o
    code = []
    Promise
      .all(
        libs.map (o) ~>
          if o.inited => return Promise.resolve!
          # predefined libs with code + scope, but not inited. code must be scoped.
          if o.scope and o.code =>
            o.inited = true
            code.push o.code
            return Promise.resolve!

          ref = @_ref o
          p = if ref.then => ref.then ~>
            @cache(o <<< id: undefined, version: it.version)
            return it
          else _fetch ref, {method: \GET} .then -> {content: it}
          p.then ({content}) ~>
            o <<<
              inited: true
              scope: csp.scope o
              code: @converter.convert {css: content, name: o.scope, scope-test}
            code.push o.code
      )
      .then ~>
        if bundle => return libs
        @style-content.push.apply @style-content, code
        @style-node.textContent = @style-content.join(\\n)
        @get libs

csp.env if self? => self else globalThis
if module? => module.exports = csp
else if window? => window.csscope = csp
