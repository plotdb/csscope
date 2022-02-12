require! <[jsdom]>
csscope = require "../dist/index"

win = new jsdom.JSDOM("<!DOCTYPE html><html><body></body></html>").window
csscope.env win
ret = csscope "hi", """
h1 { color: white }
:root { --gap: 1em }
g-1 { margin: var(--gap); }
"""
console.log ret

