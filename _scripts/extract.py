#! /usr/bin/python
import re

pattern = 'href="(.*?\.jpg)"'
f = open('t')
string = f.read()
pattern = re.compile(pattern, re.IGNORECASE)

res = pattern.findall(string)
if res is not None:
    for item in res:
        print '\t\timg(src="' + item.replace("s1600", "s500") + '")'

#test1=""; $(".share-panel-url").each(function(index){test1 += this.value.replace("https://youtu.be/", "") + ","}); test1
