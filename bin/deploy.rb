#!/usr/bin/env ruby
require "optparse"
require "fileutils"

OPTS = OptParse.getopts "p", "d"
PROD = OPTS["p"]
DRY_RUN = OPTS["d"]

if DRY_RUN
  include FileUtils::DryRun
else
  include FileUtils::Verbose
end

CF_DISTRO = "E3U8PXS6FWX8U8"
S3_PROD = "s3://pkmn.help/"
S3_DEV = "s3://dev2.mockbrian.com/"

def run(*cmd)
  if DRY_RUN
    puts cmd.join(" ")
  else
    system(*cmd).tap do |x|
      if x.nil?
        fail "failed to execute: #{cmd}"
      end
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
  rm_rf "dist"
  mkdir "dist"
  cp "build/favicon.ico", "dist/"
  run "npm", "run", "-s", "build:bundle"
end

build

chdir "dist" do
  if PROD
    release_prod
  else
    release_dev
  end
end
