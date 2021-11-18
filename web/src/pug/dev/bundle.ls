ret = csscope.cache "/css/dev/index.css"
csp = new csscope.manager!
csp.load "/css/dev/index.css"
  .then -> console.log \ok
