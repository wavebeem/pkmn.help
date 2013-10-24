#!/bin/bash
files=(
    favicon.ico
    main.js
    index.html
    style.css
)

lessc style.less > style.css

rm -rf dist
mkdir dist
cp -v "${files[@]}" dist/
cd dist
www pkmn
