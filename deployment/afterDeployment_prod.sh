#!bin/bash

#install node and bower modules
cd /var/www/postbank/pbinnovationsblog_prod
npm install
bower install --allow-root

#run gulp task to build CSS / JS (at the moment without concatinating, minifiying etc)
gulp build_prod

#restart node server
#cd /var/www
#forever stop postbank/pbinnovationsblog/server/server.js
#forever start postbank/pbinnovationsblog/server/server.js
