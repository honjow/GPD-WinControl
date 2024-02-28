#!/usr/bin/bash

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

set -e

echo "installing GPD-WinControl"

plugin_dir="$HOME/homebrew/plugins/GPD-WinControl"
mkdir -p $plugin_dir

temp=$(mktemp -d)

# GPD-WinControl
curl -L $(curl -s https://api.github.com/repos/honjow/GPD-WinControl/releases/latest | grep "browser_download_url" | cut -d '"' -f 4) -o $temp/GPD-WinControl.tar.gz
sudo tar -xzf $temp/GPD-WinControl.tar.gz -C $temp

sudo rsync -av $temp/GPD-WinControl/ $plugin_dir --delete --progress

rm  $temp/GPD-WinControl.tar.gz
sudo systemctl restart plugin_loader.service
