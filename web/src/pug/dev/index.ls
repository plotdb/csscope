
view = new ldview do
  root: document.body

node = document.createElement \div
view.get('root').appendChild node
shadow = node.attachShadow {mode: \open}
console.log shadow
shadow.innerHTML = """
<style type="text/css">
@import '/css/dev/index.css';
span { background: #0f0 }
</style>
<span style="color:var(--color)">hello world!</span><textarea/>
"""

ret = document.querySelector \span
console.log ret
document.addEventListener \click, -> console.log it.target
document.addEventListener \keydown, -> console.log it.target, it.keyCode
document.addEventListener \input, -> console.log it.target
