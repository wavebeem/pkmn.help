#!/usr/bin/env bash
set -eu

cd img

for file in pkmn-*.png; do
  echo "Fixing $file..."
  mogrify \
    -background none \
    -gravity center \
    -extent 68x68 \
    -scale "400%" \
    "$file"
done
