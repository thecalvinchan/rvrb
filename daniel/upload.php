<?php
require './Aws/aws-autoloader.php';

$bucket   = $S3_BUCKET_NAME;
$keyname1 = 'mp3-uploads';
$filepath = './Aws/LICENSE.md';


// Instantiate the class
$s3 = new AmazonS3($_AWS_ACCESS_KEY_ID, $_AWS_SECRET_ACCESS_KEY);

// 1. Create object from a file.
$response = $s3->create_object(
    $bucket,
    $keyname1,
    array('fileUpload' => $filepath)
    );

// Success?
print_r($response->isOK());
if ($response->isOK())
{
    echo "First upload successful!";
}

// 2. Create object from a string.
$response = $s3->create_object(
    $bucket,
    $keyname2,
    array(
       'body'        => 'This is object content',
       'acl'         => AmazonS3::ACL_PUBLIC,
       'contentType' => 'text/plain',
       'storage'     => AmazonS3::STORAGE_REDUCED,
       'headers'     => array( // raw headers
                          'Cache-Control' => 'max-age',
                          'Content-Encoding' => 'gzip',
                          'Content-Language' => 'en-US',
                          'Expires' => 'Thu, 01 Dec 2020 16:00:00 GMT',
          ),
    	  'meta'     => array(
                          'param1' => 'value 1',
                          'param2' => 'value 2'
          )
    )
    );

// Success?
print_r($response->isOK());
if ($response->isOK())
{
    echo "Second upload successful!";
}
else
{
    print_r($response);
}