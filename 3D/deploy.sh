node_modules/.bin/gulp deploy

# Give the user some time to abort the script
echo Will run on device in 3 seconds...
sleep 1
printf .
sleep 1
printf .
sleep 1
printf ".\n"

(cd cordova && cordova run --device)