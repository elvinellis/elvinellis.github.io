import re

pattern = 'href="(.*?\.jpg)"'
f = open('bali')
string = f.read()
pattern = re.compile(pattern, re.VERBOSE)

res = pattern.findall(string)
if res is not None:
    for item in res:
        print 'img(src="' + item + '")'
