<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application for file storage.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Below you may configure as many filesystem disks as necessary, and you
    | may even configure multiple disks for the same driver. Examples for
    | most supported storage drivers are configured here for reference.
    |
    | Supported drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'visibility' => 'public',
            'throw' => true,
            'report' => false,
        ],

        'paktaIntegritas' => [
            'driver' => 'local',
            'root' => public_path('paktaIntegritas'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'biodataMahasiswa' => [
            'driver' => 'local',
            'root' => public_path('biodataMahasiswa'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'ijazah' => [
            'driver' => 'local',
            'root' => public_path('ijazah'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'transkripS1' => [
            'driver' => 'local',
            'root' => public_path('transkripS1'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'ktp' => [
            'driver' => 'local',
            'root' => public_path('ktp'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'foto' => [
            'driver' => 'local',
            'root' => public_path('foto'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'suratKeteranganSehat' => [
            'driver' => 'local',
            'root' => public_path('suratKeteranganSehat'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'suratKeteranganBerkelakuanBaik' => [
            'driver' => 'local',
            'root' => public_path('suratKeteranganBerkelakuanBaik'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'suratBebasNarkoba' => [
            'driver' => 'local',
            'root' => public_path('suratBebasNarkoba'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],
        'npwp' => [
            'driver' => 'local',
            'root' => public_path('npwp'),
            'visibility' => 'public',
            'serve' => true,
            'throw' => true,
            'report' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
            'report' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
