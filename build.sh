#!/bin/bash
set -e

echo "Installing Hugo v0.146.0..."
mkdir -p ~/.local/bin

# Download Hugo if not already present or wrong version
if [ ! -f ~/.local/bin/hugo ] || ! ~/.local/bin/hugo version | grep -q "v0.146.0"; then
    curl -L https://github.com/gohugoio/hugo/releases/download/v0.146.0/hugo_extended_0.146.0_Linux-64bit.tar.gz -o /tmp/hugo.tar.gz
    tar -xzf /tmp/hugo.tar.gz -C /tmp
    mv /tmp/hugo ~/.local/bin/hugo
    chmod +x ~/.local/bin/hugo
    rm -f /tmp/hugo.tar.gz
fi

echo "Hugo version:"
~/.local/bin/hugo version

echo "Building site..."
~/.local/bin/hugo --gc

echo "Build complete! Generated files:"
ls -lh public/ | head -5
