csscope = (a,b) ->
  if !csscope.default => csscope.default = new csscope.converter!
  csscope.default.convert a, b

csscope.converter = (opt={}) ->
  @scope-test = opt.scope-test
  @node = document.createElement("style")
  @iframe = document.createElement("iframe")
  @iframe.style <<< display: \none
  @iframe.src = \about:blank
  document.body.appendChild @iframe
  @iframe.contentDocument.body.appendChild @node
  @

csscope.converter.prototype = Object.create(Object.prototype) <<< do
  # get all names that we need to scope. For now only animationName is needed
  get-names: (rules, defs = {}) ->
    for rule in rules =>
      if rule.name => defs[rule.name] = true
      else if rule.cssRules => @get-names(rule.cssRules, defs)
    return defs
  # scope: css selector rule from user
  # scope-test: rule for identifying if some node is scoped ( as the root element of a scope )
  _convert: (rules, scope, scope-test, defs = {}) ->
    ret = ""
    for rule in rules =>
      # rule with animationName defined
      if rule.style and defs[rule.style.animationName] =>
        rule.style.animationName = "#{scope}__#{rule.style.animationName}"
      # general rule
      if rule.selectorText =>
        if !scope-test =>
          # vue favor ( affect child even if scoped)
          sel = rule
            .selectorText.split(',').map(->it.trim!)
            .map(-> if it == ":scope" => scope else "#scope #it")
            .join(',')
        else
          # css module favor ( only in scope )
          sel = rule.selectorText.split(',').map(->it.trim!)
            .map ->
              if it == ":scope" => return scope
              [h,...t] = it.split(' ').map(->it.trim!).filter(->it)
              [h1,h2] = if /^[a-zA-Z]/.exec(h) => [h,''] else ['',h]
              "#scope :not(#scope-test) #it," +
              "#scope > #h1:not(#scope-test)#h2 #{t.join(' ')}"
            .join(',')

        ret += """
        #sel {
          #{Array.from(rule.style).map(-> "#it:#{rule.style[it]}").join(';')}
        }
        """
        rule.selectorText = sel
      # animation
      else if rule.name =>
        sel = rule.name.split(',').map(->it.trim!).map(-> "#{scope}__#it").join(',')
        rule.name = sel
        ret += """
        @keyframes #{sel} {
          #{Array.from(rule.cssRules).map(-> it.cssText).join(\\n)}
        }
        """
      # recursive definition
      else if rule.cssRules =>
        code = @_convert(rule.cssRules, scope, scope-test, defs)
        ret += """
        @media #{rule.conditionText} {
          #{code}
        }
        """
    return ret


  convert: (a, b, c) ->
    {css, scope, scope-test} = opt = if typeof(a) == \object => a else {css: b, scope: a, scope-test: c}
    if !scope-test => scope-test = @scope-test
    @node.textContent = css
    ret = ""
    defs = @get-names(@node.sheet.rules, {})
    ret = @_convert(@node.sheet.rules, scope, scope-test, defs)
    return ret

csscope.manager = ->
  @attr-name = "csscope"
  @converter = new csscope.converter!
  @counter = 0
  @init!
  @

csscope.manager.prototype = Object.create(Object.prototype) <<< do
  init: ->
    if @inited => return
    @inited = true
    @style-node = document.createElement \style
    @style-node.setAttribute \type, \text/css
    @style-node.setAttribute \data-name, "csscope.manager"
    @style-content = []
    document.body.appendChild @style-node

  scope: (node, url) ->
    ret = @get url
    node.classList.add.apply node.classList, ret

  get: (url) ->
    url = if Array.isArray(url) => url else [url]
    url.map(~>@scope[it]).filter(->it)

  load: (urls, scope-test) ->
    urls = if Array.isArray(urls) => urls else [urls]
    Promise
      .all(
        urls.map (url) ~>
          @scope[url] = "csp-#{@counter++}-#{Math.random!toString(36)substring(2)substring(5)}"
          ld$.fetch url, {method: "GET"}, {type: \text}
            .then (css) ~>
              ret = @converter.convert {css, scope: ".#{@scope[url]}", scope-test}
              @style-content.push ret
      )
      .then ~> @style-node.textContent = @style-content.join(\\n)
      .then ~> @get urls

if module? => module.exports = csscope
if window? => window.csscope = csscope
