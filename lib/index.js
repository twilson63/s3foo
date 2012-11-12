var s3 = require('fortknox'),
fs = require('fs'),
wrench = require('wrench'),
prompt = require('prompt');
log = console.log;

// Get AMAZON_ACCESS_KEY and AMAZON_SECRET_ACCESS_KEY
if(process.env.AMAZON_ACCESS_KEY_ID) {
  var config = {
    key: process.env.AMAZON_ACCESS_KEY_ID,
    secret: process.env.AMAZON_SECRET_ACCESS_KEY
  }
  log('s3foo 1.0 - distributes static sites to s3');
  prompt.start();
  prompt.get(['bucket'], function(err, result){
    if (err) { console.log(err); return; }
    config.bucket = result.bucket;
    createSite(s3.createClient(config), function(err, client) {
      if(err) { console.log(err); return; }
      function upload(name){
        if( fs.statSync(name).isDirectory() ) { return; }
        client.putFile(name, '/' + name, {}, logResp);

        function logResp(err, resp) {
          if(err) { console.log(err); return; }
          if(resp) { console.log(name + ' = ' + resp.statusCode); }
        }
      };
      wrench.readdirSyncRecursive('.').forEach(upload);
    });
  });
}
else {
  console.log('AMAZON_ACCESS_KEY_ID and AMAZON_SECRET_ACCESS_KEY are required!');
}

function createSite(client, done) {
  client.createBucket(function(err, resp) {
    if(err) { console.log(err); return; }
    client.createWebSite(function(err){
      if(err) { console.log(err); return; }
      client.activatePolicy(function(err){
        if(err) { console.log(err); return; }
        done(err, client);
      });
    });
  });
};
