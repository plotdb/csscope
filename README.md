# csscope

add custom scope to any css. Use browser thus only works in browsers.


## Usage

include `csscope.js`, then convert css via following:

    var scopedCSS = csscope("desired-scope-name", "your-css-code")
    scopedCSS = csscope({css: "your-css-code", scope: "desired-scope-name"}) # option in object

or, create a converter to convert:

    scoper = new csscope.converter();
    var scopedCSS = scoper.convert({ ... });


## Todo

Test against all major browsers.


## License

MIT
