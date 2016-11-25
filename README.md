# AutoDNS
Designed to change the A records in Network Solutions Domain name, when the IP on the server changes. 

Uses a simple bash script to check against ip.txt for changes in the IP; if there's a change, run the casper script with the passed IP to update your Network Solutions account. Place these files on the server and run a cron job. Edit the networksolutions.js file, and input your username, password, domain name, account ID, and instance ID (doesn't change).

# Requirements
   - PhantomJS
   - CasperJS
   - Python
  
