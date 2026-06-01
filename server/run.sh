#!/bin/bash

# Build the plugin
cd src/plugins/editorjs
rm -rf dist
npm run build
cd ../../..

# Verify the output structure
ls -la src/plugins/editorjs/dist/server/
ls -la src/plugins/editorjs/dist/admin/

# Check if index files exist
cat src/plugins/editorjs/dist/server/index.js
cat src/plugins/editorjs/dist/admin/index.js

# Start Strapi
rm -rf .strapi .cache
npm run develop