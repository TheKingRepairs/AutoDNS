var casper = require('casper').create({
    pageSettings: {
        loadImages: true,//The script is much faster when this field is set to false
        loadPlugins: true,
        userAgent: '"Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0"'
    }
});

var ip = casper.cli.get('ip');

// Both of these can be found by logging into your account and looking at the url bar
var domainName = "DOMAINNAME.COM"   //"PLACE YOUR DOMAIN HERE - NO WWW, YES .COM"

// First step is to open GODADDY
casper.start().thenOpen("https://sso.godaddy.com/", function() {
    console.log("Login Page opened");
});

// Now we have to populate username and password, and submit the form
casper.then(function(){
    console.log("Login using username and password");
    console.log(ip);
    this.evaluate(function(){
        document.getElementById("username").value="USERID"
        document.getElementById("password").value="PASSWORD"
	document.getElementById("submitBtn").click();
    });
});

casper.thenOpen("https://dcc.godaddy.com/manage/"+domainName+"/dns", function() {
    console.log("DNS Page opened");
    casper.wait(4000);
});


// Plugin IP and update
casper.then(function(){
    console.log("Updating IP");
    this.evaluate(function(){
	document.getElementsByClassName('uxicon uxicon-pencil ng-scope')[0].click();
    });
    this.wait(2000);
    this.evaluate(function(ipAddr){
	$($('[ng-model="editRecord.data"]')[0]).val(ipAddr);
    }, ip);
    this.wait(2000);
    this.evaluate(function(){
	angular.element($($('[ng-model="editRecord.data"]')[0])).triggerHandler('input');
	document.getElementsByClassName('btn btn-primary')[0].click();
    });
});

casper.run();
