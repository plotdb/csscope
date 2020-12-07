csscope = (a,b) ->
  if !csscope.default => csscope.default = new csscope.converter!
  csscope.default.convert a, b

csscope.converter = ->
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
  _convert: (rules, scope, defs = {}) ->
    for rule in rules =>
      if rule.style and defs[rule.style.animationName] =>
        rule.style.animationName = "#{scope}__#{rule.style.animationName}"
      if rule.selectorText =>
        sel = rule.selectorText.split(',').map(->it.trim!).map(-> "#scope #it").join(',')
        rule.selectorText = sel
      else if rule.name =>
        sel = rule.name.split(',').map(->it.trim!).map(-> "#{scope}__#it").join(',')
        rule.name = sel
      else if rule.cssRules => @_convert(rule.cssRules, scope, defs)


  convert: (a, b) ->
    {css, scope} = opt = if typeof(a) == \object => a else {css: b, scope: a}
    @node.textContent = css
    ret = ""
    defs = @get-names(@node.sheet.rules, {})
    @_convert(@node.sheet.rules, scope, defs)
    for rule in @node.sheet.rules => ret += rule.cssText
    return ret

if module? => module.exports = csscope
if window? => window.csscope = csscope
