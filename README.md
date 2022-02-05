# AutoDNS
Designed to change the A records in Network Solutions & GoDaddy Domain names, when the IP on the server changes. Designed to run on a single shell script, the provider update scripts can be run manually:
 - casperjs networksolutions.js/godaddy.js --ip="YOUR NEW IP"
 
OR In crontab, put the following line in, replacing your path location of the files:
 - */5     *       *       *       *       /root/Scripts/AutoDNS/monitorIP.sh

Uses a simple bash script to check against ip.txt for changes in the IP; if there's a change, run the casper script with the passed IP to update your DNS A records. Place these files on the server and run a cron job. 
 - For Network Solutions, edit the networksolutions.js file, and input your username, password, domain name, account ID, and instance ID (doesn't change). 
 - For Godaddy, edit the godaddy.js file, and input your user ID, password & domain name.
 - Change the path location in monitorIP.sh to reflect where your files are.

# Requirements
   - CasperJS
   - Curl
   - Cron

<a href="https://wwww.healthhelpchat.com/suicide-hotlines/" title="Suicide prevention hotline">Suicide Hotlines</a>
