scope = new csscope.converter {scope-test: '[scope]'}
styles = ld$.find 'style' .map (n) ->
  s = n.getAttribute(\scope)
  m = ld$.create name: 'style', attr: {type: "text/css"}
  ret = scope.convert("#s", n.textContent)
  console.log ret
  m.textContent = ret
  return [n,m]
toggle = ->
  is-on = view.get('toggle').classList.contains \on
  styles.map (ns) ->
    ld$.remove ns.0
    ld$.remove ns.1
    document.body.appendChild ns[if is-on => 1 else 0]
    
view = new ldView do
  root: document.body
  action: click: do
    toggle: ({node}) ->
      node.classList.toggle \on
      toggle!

cssmgr = new csscope.manager!

# https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css
urls = <[
  https://unpkg.com/purecss@2.0.6/build/pure-min.css
  https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css
]>

cssmgr.load urls
  .then ->
    libs = view.getAll('csslib')
    libs.map (d,i) ->
      cssmgr.scope d, urls[i]
