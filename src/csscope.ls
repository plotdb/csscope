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
  convert: (a, b) ->
    {css, scope} = opt = if typeof(a) == \object => a else {css: b, scope: a}
    @node.textContent = css
    ret = ""
    for rule in @node.sheet.rules =>
      sel = rule.selectorText.split(',').map(->it.trim!).map(-> "#scope #it").join(',')
      rule.selectorText = sel
      ret += rule.cssText
    return ret

if module? => module.exports = csscope
if window? => window.csscope = csscope
