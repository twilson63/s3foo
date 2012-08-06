# s3foo

s3foo is a command-line app, that pushes contents of the current folder to a s3 bucket and enables the bucket as a website.

## install

``` sh
npm install s3foo -g
```

## usage

``` sh
cd [website]
s3foo
#prompt: bucket: myapp.w3foo.com
```

## configuration

Make sure that you have your AMAZON_ACCESS_KEY_ID and AMAZON_SECRET_ACCESS_KEY setup as environment variables.

``` sh
export AMAZON_ACCESS_KEY_ID=XXXXX
export AMAZON_SECRET_ACCESS_KEY=XXXX
``` 

