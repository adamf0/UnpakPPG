<?php

use App\Http\Controllers\LaporDiriApiController;
use App\Http\Controllers\PencarianControllerApi;
use App\Http\Controllers\PendaftaranControllerApi;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::post('/check-data', [PencarianControllerApi::class, 'GetDataPendaftaran'])->name('getPencarian');
Route::get('/info-pendaftaran/{uuid}/{type}', [PendaftaranControllerApi::class, 'GetData'])->name('getPendaftaran');
Route::post('/create', [PendaftaranControllerApi::class, 'CreateForm'])->name('createPendaftaran');
Route::post('/save-biodata', [PendaftaranControllerApi::class, 'SaveBiodata'])->name('savePendaftaran');
Route::post('/save-berkas', [PendaftaranControllerApi::class, 'SaveBerkasTambahan'])->name('saveBerkasPendaftaran');

Route::post('/laporDiri', [LaporDiriApiController::class, 'Index'])->name('getLaporDiri');
Route::delete('/laporDiri/{uuid}', [LaporDiriApiController::class, 'Delete']);
Route::get('/laporDiri/{uuid}', [LaporDiriApiController::class, 'Detail']);
Route::post('/laporDiri/export', [LaporDiriApiController::class, 'Export']);