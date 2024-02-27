#!/usr/bin/bash

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

cd $HOME

sudo rm -rf $HOME/homebrew/plugins/GPD-WinControl

echo "installing GPD-WinControl"

temp=$(mktemp -d)

# GPD-WinControl
curl -L $(curl -s https://api.github.com/repos/honjow/GPD-WinControl/releases/latest | grep "browser_download_url" | cut -d '"' -f 4) -o $temp/GPD-WinControl.tar.gz
sudo tar -xzf GPD-WinControl.tar.gz -C $HOME/homebrew/plugins

rm  $temp/GPD-WinControl.tar.gz
sudo systemctl restart plugin_loader.service
