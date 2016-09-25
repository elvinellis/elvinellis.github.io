import fileinput
import re

doublequote = re.compile(r'(\s+)"([^"]*)"(\s+)', re.MULTILINE)
apos = re.compile(r'([a-zA-Z0-9])\'([a-zA-Z\."\s])', re.MULTILINE)
emdash = re.compile(r'([a-zA-Z0-9]*) \- ([a-zA-Z0-9]*)', re.MULTILINE)
ellipsis = re.compile(r'([a-zA-Z0-9^.]*)\.\.\.([\s+|"])', re.MULTILINE)
multiply = re.compile(r'([0-9]+) x ([0-9]+)', re.MULTILINE)
fraction = re.compile(r'([0-9]+)/([0-9]+)', re.MULTILINE)
#&frasl;
for c in fileinput.input():
    if ".story" in c or c.strip().startswith('|'):
        #print c
        t = ellipsis.sub(r"\1&hellip;\2", c)
        t = doublequote.sub(r"\1&ldquo;\2&rdquo;\3", t)
        t = apos.sub(r"\1&#8217;\2", t)
        t = emdash.sub(r"\1 &mdash; \2", t)
        t = multiply.sub(r"\1&times;\2", t)
        t = fraction.sub(r"\1&frasl;\2", t)
        print t
    else:
        print c
    

