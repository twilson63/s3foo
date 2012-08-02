var s3 = require('fortknox'),
fs = require('fs'),
wrench = require('wrench'),
prompt = require('prompt');

// Get AMAZON_ACCESS_KEY and AMAZON_SECRET_ACCESS_KEY
if(process.env.AMAZON_ACCESS_KEY_ID) {
  var config = {
    key: process.env.AMAZON_ACCESS_KEY_ID,
    secret: process.env.AMAZON_SECRET_ACCESS_KEY
  }
  prompt.start();
  prompt.get(['bucket'], function(err, result){
    function createWeb(client, cb) {
      client.createBucket(function() {
        console.log('created Bucket');
        client.createWebSite(function() {
          console.log('created Site');
          client.activatePolicy(function(){
            console.log('activated Policy');
            cb()
          });
        });
      });
    }

    config.bucket = result.bucket;
    client = s3.createClient(config);

    createWeb(client, function(){
      var files = wrench.readdirSyncRecursive('.');
      files.forEach(function(name){
        client.putFile(name, '/' + name, {}, function(err, resp) {
          if(err){ console.log(err); }
          if(resp) { console.log(name + ' = ' + resp.statusCode); }
        });
      });
    });
  });
}
else {
  console.log('AMAZON_ACCESS_KEY_ID and AMAZON_SECRET_ACCESS_KEY are required!');
}