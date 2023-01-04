var streamingS3 = require('streaming-s3'),
fs = require('fs');

var fStream = fs.createReadStream(__dirname + '/video.mp4');

let accessKey = "AKIAZ2OL7XHFDX2CFBFV";
let secretKey= "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"

var uploader = new streamingS3(fStream, {accessKeyId: accessKey, secretAccessKey: secretKey},
{
    Bucket: 'file-mover-prototype-bucket',
    Key: 'video.mp4',
    ContentType: 'video/mp4'
  }
);

uploader.on('data', function(bytesRead) {
  console.log(bytesRead, ' bytes read.');
});

uploader.on('part', function(number) {
  console.log('Part ', number, ' uploaded.');
});

// All parts uploaded, but upload not yet acknowledged.
uploader.on('uploaded', function(stats) {
  console.log('Upload stats: ', stats);
});

uploader.on('finished', function(resp, stats) {
  console.log('Upload finished: ', resp);
});

uploader.on('error', function(e) {
  console.log('Upload error: ', e);
});

uploader.begin();