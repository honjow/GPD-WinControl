#!/usr/bin/bash

set -e

if [ "$EUID" -eq 0 ]; then
  echo "Please do not run as root"
  exit
fi

echo "installing GPD-WinControl"

temp=$(mktemp -d)

plugin_dir="$HOME/homebrew/plugins/GPD-WinControl"
mkdir -p $plugin_dir

use_jq=false
if [ -x "$(command -v jq)" ]; then
  use_jq=true
fi

RELEASE=$(curl -s 'https://api.github.com/repos/mengmeet/PowerControl/releases/latest')

if [[ $use_jq == true ]]; then
  echo "Using jq"
  MESSAGE=$(echo "$RELEASE" | jq -r '.message')
  RELEASE_VERSION=$(echo "$RELEASE" | jq -r '.tag_name')
  RELEASE_URL=$(echo "$RELEASE" | jq -r '.assets[0].browser_download_url')
else
  MESSAGE=$(echo $RELEASE | grep "message" | cut -d '"' -f 4)
  RELEASE_URL=$(echo $RELEASE | grep "browser_download_url" | cut -d '"' -f 4)
  RELEASE_VERSION=$(echo $RELEASE | grep "tag_name" | cut -d '"' -f 4)
fi

if [[ "$MESSAGE" != "null" ]]; then
  echo "error: $MESSAGE" >&2
  exit 1
fi

if [ -z "$DOWNLOAD_URL" ]; then
  echo "Failed to get latest release" >&2
  exit 1
fi

echo "Downloading GPD-WinControl $RELEASE_VERSION"
curl -L "$RELEASE_URL" -o "$temp/GPD-WinControl.tar.gz"

sudo tar -xzf "$temp/GPD-WinControl.tar.gz" -C $temp
sudo rsync -av $temp/GPD-WinControl/ $plugin_dir --delete --progress

rm $temp/GPD-WinControl.tar.gz
sudo systemctl restart plugin_loader.service
