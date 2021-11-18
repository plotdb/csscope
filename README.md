# csscope

add custom scope to any css. Use browser thus only works in browsers.


## Usage

install via npm:

    npm install --save @plotdb/csscope


then, include `csscope.js`, and convert css as follow:

    scopedCSS = csscope("desired-scope-name", "your-css-code")

or, with object as option:

    scopedCSS = csscope({css: "your css code", name: "desired-scope-name", scopeTest: "..."})

or, create a converter to convert:

    scope = new csscope.converter({ scopeTest: '...' });
    var scopedCSS = scope.convert({ ... });


options:

 - name: scope name. should be a valid name for CSS class and CSS animation name.
 - rule: optional. rule for matching the given scope name. by default `.your-scope-name`
 - scopeTest: optional. selector for testing boundary of scope.
 - css: css code to scope.


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


## Scope Root

To style element of scope root, simply use `:scope` pseudo class:

    :scope { background: #000; color: #fff}

csscope will replace `:scope` with the corresponding scope selector.


## Pre bundling (WIP)

Generate js / css files and use `csscope.cache` to preload assets. 

Load from JS:

    csscope.cache({inited: false, code: 'scoped-css-code', scope: 'scope-name'});

Load from CSS:

    script csscope.cache({inited: true, scope: 'scope-name'});
    style: include bundle.css



## Todo

Test against all major browsers.


## License

MIT
