require! <[jsdom]>
csscope = require "../dist/index"

win = new jsdom.JSDOM("<!DOCTYPE html><html><body></body></html>").window
csscope.env win

# we need additional care for animation with JSDOM. 
ret = csscope "hi", """
@keyframes blah {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
h1 { animation: 1s linear blah }
"""

console.log ret

