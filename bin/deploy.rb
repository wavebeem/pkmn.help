#!/usr/bin/env ruby

CF_DISTRO = "E3U8PXS6FWX8U8"
S3_PROD = "s3://pkmn.help/"
S3_DEV = "s3://dev2.mockbrian.com/"

FILES = %W[
  favicon.ico
  top.svg
  search.svg
  clear.svg
  bundle.js
  bundle.min.css
  index.html
]

def run(*cmd)
  system(*cmd).tap do |x|
    if x.nil?
      fail "failed to execute: #{cmd}"
    end
  end
end

def s3_sync(dir, bucket)
  run "aws", "s3", "sync",
    "--acl", "public-read",
    dir, bucket
end

def cf_invalidate(distro, path)
  run "aws", "cloudfront", "create-invalidation",
    "--distribution-id", distro,
    "--paths", path
end

def release_prod
  puts "Syncing to #{S3_PROD}"
  s3_sync "./", S3_PROD
  puts "Invalidating Cloudfront"
  cf_invalidate CF_DISTRO, "/*"
end

def release_dev
  puts "Syncing to #{S3_DEV}"
  s3_sync "./", S3_DEV
end

def build
  run "npm", "run", "build:js"
  run "npm", "run", "build:css"
  run "rm", "-rf", "dist"
  run "mkdir", "dist"
  run "cp", "-v", *FILES, "dist/"
end

build
Dir.chdir("dist") do
  if ARGV.include? "-p"
    release_prod
  else
    release_dev
  end
end
