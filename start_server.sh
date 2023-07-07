#!/bin/bash

# This code will run on the instance containing this app
# Please start services the app needs to work properly

npm run build
pm2 start ecosystem.config.cjs