#!/bin/bash
export DISPLAY=:0
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

OLD_IP=`cat /root/Scripts/AutoDNS/ip.txt`

NEW_IP=$(curl -s icanhazip.com)

if [ $NEW_IP != $OLD_IP ]; then
	/usr/local/bin/casperjs /root/Scripts/AutoDNS/networksolutions.js --ip="$NEW_IP"
	/usr/local/bin/casperjs /root/Scripts/AutoDNS/godaddy.js --ip="$NEW_IP"
fi

echo $NEW_IP > /root/Scripts/AutoDNS/ip.txt
