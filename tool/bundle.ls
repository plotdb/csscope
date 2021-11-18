require! <[fs ../dist/csscope.min.js puppeteer-core]>

css = fs.read-file-sync "../web/static/css/dev/index.css" .toString!
lib = fs.read-file-sync "../dist/csscope.min.js" .toString!

func = (args) ->
  script = document.createElement(\script)
  script.appendChild document.createTextNode(args.lib)
  document.body.appendChild script
  cvtr = new csscope.converter!
  scope = "name-version-path"
  code = cvtr.convert {css: args.css, name: scope, scope-test: "[scope]"}
  return {code: code, scope}

puppeteer-core.launch(
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)
  .then (browser) ->
    browser.new-page!
  .then (page) ->
    args = {lib, css}
    page.evaluate(func, args)
  .then (ret) ->
    payload = {url: "/css/dev/index.css"} <<< ret
    fs.write-file-sync "bundle.js", """
    csscope.cache(#{JSON.stringify(payload)});
    """
    process.exit!

