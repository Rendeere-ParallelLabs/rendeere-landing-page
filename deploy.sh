#!/bin/bash
# Exit immediately if a command fails
set -e

PROJECT_DIR="/home/Insu1/rendeere-landing-page"
APP_NAME="rendeere" # PM2 process name for your landing page

LOG_PREFIX="[DEPLOY_SCRIPT]"
CURRENT_DATETIME=$(date +"%Y-%m-%d %H:%M:%S")

echo "$LOG_PREFIX $CURRENT_DATETIME - =================================================="
echo "$LOG_PREFIX $CURRENT_DATETIME - Starting deployment for $APP_NAME..."
echo "$LOG_PREFIX $CURRENT_DATETIME - Project directory: $PROJECT_DIR"

cd "$PROJECT_DIR" || { echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: Could not access directory $PROJECT_DIR. Aborting."; exit 1; }

echo "$LOG_PREFIX $CURRENT_DATETIME - Updating code from main branch..."
# Discard local changes (if any) before pulling
git reset --hard HEAD
# Force update to the latest version of the remote 'main' branch
git fetch origin main
git reset --hard origin/main || {
    echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: git fetch/reset failed. Aborting deployment."
    exit 1
}
echo "$LOG_PREFIX $CURRENT_DATETIME - Code updated successfully."

echo "$LOG_PREFIX $CURRENT_DATETIME - Installing dependencies (npm install)..."
# If you use 'bun' for development, consider using 'bun install' here.
npm install || {
    echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: npm install failed. Aborting deployment."
    exit 1
}
echo "$LOG_PREFIX $CURRENT_DATETIME - Dependencies installed."

echo "$LOG_PREFIX $CURRENT_DATETIME - Building the application (npm run build)..."
# If you use 'bun' for development, consider using 'bun run build' here.
npm run build || {
    echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: npm run build failed. Aborting deployment."
    exit 1
}
echo "$LOG_PREFIX $CURRENT_DATETIME - Application successfully built in the 'out' folder."

# --- PM2 management for zero (or minimal) downtime deployment ---
echo "$LOG_PREFIX $CURRENT_DATETIME - Managing PM2 process for $APP_NAME..."

# Check if the app is already running
pm2 describe "$APP_NAME" > /dev/null 2>&1
IS_RUNNING=$?

if [ $IS_RUNNING -eq 0 ]; then
    echo "$LOG_PREFIX $CURRENT_DATETIME - Application $APP_NAME is running. Trying graceful reload..."
    # pm2 reload will try to reload without downtime. If it fails, pm2 restart is the fallback.
    pm2 reload "$APP_NAME" --update-env || {
        echo "$LOG_PREFIX $CURRENT_DATETIME - WARN: pm2 reload $APP_NAME failed. Trying restart..."
        pm2 restart "$APP_NAME" --update-env || {
            echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: pm2 restart $APP_NAME also failed."
            echo "$LOG_PREFIX $CURRENT_DATETIME - Site might be down. Check PM2 logs: pm2 logs $APP_NAME"
            exit 1
        }
    }
else
    echo "$LOG_PREFIX $CURRENT_DATETIME - Application $APP_NAME is not running or doesn't exist. Starting it for the first time..."
    # Start the app using 'serve' directly, as it is in PM2's PATH.
    # If 'serve' is not in PM2's PATH, you might need the full path:
    # pm2 start "$(npm bin -g)/serve -s out -l 3020" --name "$APP_NAME"
    pm2 start "serve -s out -l 3020" --name "$APP_NAME" || {
        echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: Failed to start $APP_NAME with PM2."
        echo "$LOG_PREFIX $CURRENT_DATETIME - Check PM2 logs: pm2 logs $APP_NAME"
        exit 1
    }
fi

# Small pause so PM2 stabilizes the process
sleep 5

# Check final status
pm2 describe "$APP_NAME" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    # You need 'jq' for this: sudo apt-get install jq
    STATUS=$(pm2 JList | jq -r --arg name "$APP_NAME" '.[] | select(.name==$name) | .pm2_env.status')
    if [ "$STATUS" == "online" ]; then
        echo "$LOG_PREFIX $CURRENT_DATETIME - SUCCESS! Application $APP_NAME is online."
    else
        echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: Application $APP_NAME is in status: $STATUS."
        echo "$LOG_PREFIX $CURRENT_DATETIME - Deployment failed. Check logs: pm2 logs $APP_NAME"
        exit 1
    fi
else
    echo "$LOG_PREFIX $CURRENT_DATETIME - ERROR: Could not get the status of $APP_NAME after deployment."
    exit 1
fi

echo "$LOG_PREFIX $CURRENT_DATETIME - Deployment completed."
echo "$LOG_PREFIX $CURRENT_DATETIME - =================================================="

# Save PM2 config so processes restart if the server does
pm2 save

exit 0
