var streamingS3 = require('streaming-s3'),
request = require('request');


    const uploadStream = (url) => {
        console.log(url,process.env.ACCESS_KEY,process.env.SECRET_KEY,"<==THis is int he uploder file==>")
        // var fStream = fs.createReadStream('./uploads/' + 'test.mp4');
        var rStream = request.get(url);
        let accessKey = process.env.ACCESS_KEY
        let secretKey =  process.env.SECRET_KEY
        
        var uploader = new streamingS3(rStream, {accessKeyId: accessKey, secretAccessKey: secretKey},
            {
                Bucket: 'file-mover-prototype-bucket',
                Key: 'check',
                ContentType: 'application/octet-stream'
            },
                {
                    // concurrentParts: 2,
                    waitTime: 10000,
                    retries: 1,
                    maxPartSize: 10 * 1024 * 1024
                }
            );
            
            uploader.on('data', function(bytesRead) {
                // console.log(bytesRead, ' bytes read.');
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
    
}

module.exports = uploadStream;


