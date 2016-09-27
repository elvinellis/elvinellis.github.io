#! /bin/bash
cd ..
cp _site/*.html .
cd js
uglifyjs --compress --mangle -- photoset.js exposure.js > exposure.min.js
cd ..
git add -u
