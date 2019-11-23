#!/usr/bin/env bash
set -eu

cd build
convert favicon.png -scale 16 favicon-16.png
convert favicon.png -scale 32 favicon-32.png
convert favicon-*.png favicon.ico
