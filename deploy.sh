#!/bin/bash

echo -e '\e[1m\e[34mDeploying admin panel ...\e[0m\n'
cd /Sites/admin-panel

# Source NVM script (assuming it's in your home directory)
source ~/.nvm/nvm.sh
git stash
echo -e '\e[1m\e[34mPulling code from github...\e[0m\n'
git pull origin staging
echo -e '\e[1m\e[34mFetch from github done !\e[0m\n'

# Install project dependencies and build
npm install
npm run build
pm2 delete super-admin
pm2 start npm --name super-admin -- start

echo -e '\e[1m\e[34m admin panel deployment process completed!\e[0m\n'