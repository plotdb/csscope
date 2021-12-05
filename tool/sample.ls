require! <[jsdom]>
csscope = require "../dist/index"

win = new jsdom.JSDOM("<!DOCTYPE html><html><body></body></html>").window
csscope.env win
ret = csscope "hi", "h1 { color: white }"
console.log ret

