# 0.2.0

 - fix typo in comment
 - add `:scope` handling to support styling of element in scope root.


# 0.1.0

 - bug fix: scoped css should not affect child scope, unless enabled explicitly.
 - add `scope-test` option so user can specify how to identify a scope root.
 - additional comment.
 - upgrade dependency and remove useless package.


# 0.0.3

 - bug fix: manually generate css text since fields like `name`, `selectorText` in CSSStyleSheet are read-only.
   - overwriting `name`, `selectorText` randomly works in Chrome but is not reliable.

# 0.0.2

 - add support to animation names.
 - add support to (nested) media queries.

