#!/bin/bash

echo Please enter EC2 address:
read address

echo Starting deployment to aws

echo Compiling backend
tsc

cd client

echo Compiling frontend
ng build --prod

cd ..

echo Zipping application
zip -r application.zip ./ -x *.DS_Store .git/\* node_modules/\* client/node_modules/\*

echo Copying application to EC2
scp -i ~/ownprojects/work-time-tracker-key.pem -r ./application.zip $address:~/

echo Loggin with SSH to EC2
ssh -i "~/ownprojects/work-time-tracker-key.pem" $address << HERE
 echo Logged to EC2

 rm -rf work_time_tracker
 unzip application.zip -d work_time_tracker

 cd work_time_tracker

 export NODE_ENV=development
 npm i

 echo Setting env variables and starting application
 export NODE_ENV=production

 echo Printing env variables for checking
 env

 echo Starting app!
 pm2 delete all
 pm2 start dist/src/index.js
HERE

echo Script completed