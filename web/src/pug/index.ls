scope = new csscope.converter {scope-test: '[scope]'}
styles = ld$.find 'style' .map (n) ->
  s = n.getAttribute(\scope)
  m = ld$.create name: 'style', attr: {type: "text/css"}
  ret = scope.convert("#s", n.textContent)
  m.textContent = ret
  return [n,m]
toggle = ->
  is-on = view.get('toggle').classList.contains \on
  styles.map (ns) ->
    ld$.remove ns.0
    ld$.remove ns.1
    document.body.appendChild ns[if is-on => 1 else 0]

# css rule list
iframe = document.createElement \iframe
iframe.style <<< pointerEvents: \none, border: 0, width: 0, height: 0, opacity: 0
document.body.appendChild iframe
style = iframe.contentDocument.createElement \style
style.setAttribute \type, \text/css
style.textContent = "div { color: red }"
iframe.contentDocument.body.appendChild style
ret = scope.convert "css-rule-list", style.sheet.rules
m = ld$.create name: 'style', attr: {type: "text/css"}
m.textContent = ret
document.body.appendChild m
    

view = new ldView do
  root: document.body
  action: click: do
    toggle: ({node}) ->
      node.classList.toggle \on
      toggle!

unpkg = ({name, version, path}) ->
  url = "https://unpkg.com/#{name}#{if version => '@' + version else ''}/#{path or ''}"
  fetch url
    .then (response) ->
      ret = /^https:\/\/unpkg.com\/([^@]+)@([^/]+)\//.exec(response.url) or []
      v = ret.2
      response.text!then -> {version: v or version, content: it}

cssmgr = new csscope.manager registry: unpkg

# use plain url
# https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css
urls = <[
  https://unpkg.com/purecss@2.0.6/build/pure-min.css
  https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css
]>

# use module definition and custom registry
libs = [
  {name: "purecss", version: "2.0.6", path: "build/pure-min.css"}
  {name: "materialize-css", version: "1.0.0", path: "dist/css/materialize.min.css"}
]

cssmgr.load libs
  .then ->
    nodes = view.getAll('csslib')
    nodes.map (d,i) ->
      cssmgr.scope d, libs[i]
