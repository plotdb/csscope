# csscope

add custom scope to any css. Use browser thus only works in browsers.


## Usage

include `csscope.js`, then convert css via following:

    var scopedCSS = csscope("desired-scope-name", "your-css-code")
    scopedCSS = csscope({css: "your-css-code", scope: "desired-scope-name", scopeText: "..."}) # option in object

or, create a converter to convert:

    scoper = new csscope.converter({ scopeTest: '... ' });
    var scopedCSS = scoper.convert({ ... });

## Scope Testing

`scopeTest` is a css selector rule for which if certain node matches then it's the root of a scope.

This is used to identify scope boundary in DOM, according how users label and identify the root element of scopes by their implementation.

For example, following DOM ( in Pug ) use `[ld-scope]` to separate each scope:

    div(ld-scope,scope-id="0a2c92a0e7e82")
      h2 This is the root scope.
      div(ld-scope,scope-id="4c26846e44f68")
        h2 This is a child scope.

when we specify `scopeTest` option, we can ensure that the style for `h2` element in the parent won't affect `h2` element in its child.

`scopeTest` is by default `undefined` (or by default the value specified in option when calling `csscope.converter` constructor), in this case there is no scope boundary so all parent rules penetrate into their children.
 

## Todo

Test against all major browsers.


## License

MIT
