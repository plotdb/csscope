
css = new csscope.manager!
css.load "/css/dev/sample.css"
  .then ->
    console.log it
    css.load "/css/dev/sample.css"
  .then ->
    console.log it
