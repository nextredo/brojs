#! /usr/bin/env bash
# Creates a screenshot of a webpage
# Uses Puppeteer (which uses headless Chromium)

# Install dependencies
apt update
apt install -y nodejs npm

# Install Puppeteer
mkdir my-puppeteer-app && cd my-puppeteer-app
npm init -y
npm install -g puppeteer

# Install chromium
npm puppeteer browsers install chrome --install-deps

# Run the screenshotter
node ./runner.js


# TODO
# - install nodejs / npm from source?
# - install chromium-browser from apt? don't think so

# Unsure about this one
