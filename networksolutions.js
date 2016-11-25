var casper = require('casper').create({
    pageSettings: {
        loadImages: true,//The script is much faster when this field is set to false
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});

var ip = casper.cli.get('ip');

// Both of these can be found by logging into your account and looking at the url bar
var accountID = "PLACE YOUR ACOUNT ID HERE"
var instanceID = "PLACE YOUR INSTANCE HERE"
var domainName = "PLACE YOUR DOMAIN HERE - NO WWW"

//First step is to open NS
casper.start().thenOpen("https://www.networksolutions.com/manage-it/index.jsp", function() {
    console.log("Login Page opened");
});

//Now we have to populate username and password, and submit the form
casper.then(function(){
    console.log("Login using username and password");
    console.log(ip);
    this.evaluate(function(){
        document.getElementsByName("userLoginName")[0].value="USERNAME";
        document.getElementsByName("password")[0].value="PASSWORD";
	document.getElementsByClassName('login-button')[0].click();
    });
});

casper.thenOpen("https://www.networksolutions.com/manage-it/domain-detail.jsp?actionFlag=&accountId="+accoundID+"&instanceId="+instanceID, function() {
    console.log("DNS Page opened");
});

casper.thenOpen("https://www.networksolutions.com/manage-it/adnssummary.jsp?accountId="+accountID+"&instanceId="+instanceID, function() {
    console.log("DNS2 Page opened");
});

casper.thenOpen("https://www.networksolutions.com/manage-it/edita.jsp?refreshFromModel=true&accountId="+accountID+"&instanceId="+instanceID+"&domainName="+domainName, function() {
    console.log("DNS3 Page opened");
});

// Plugin IP and update
casper.then(function(){
    console.log("Updating IP");
    this.evaluate(function(ipAddr){
        document.getElementsByName("0-ipAddressInput")[0].value=ipAddr;
        document.getElementsByName("1-ipAddressInput")[0].value=ipAddr;
        document.getElementsByName("2-ipAddressInput")[0].value=ipAddr;
        document.getElementsByName('method-addEditARec')[0].click();
    }, ip);
});

// Confirm
casper.then(function(){
    console.log("Confirming change");
    this.evaluate(function(){
        document.getElementsByName('method-confirmEditRR')[0].click();
    });
});


casper.run();
