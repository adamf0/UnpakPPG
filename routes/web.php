<?php

use App\Http\Controllers\PencarianController;
use App\Http\Controllers\PendaftaranController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [PencarianController::class, 'pencarianPage'])->name('pencarian');
Route::post('/check-data', [PencarianController::class, 'GetDataPendaftaran'])->name('getPencarian');

Route::get('/pendaftaran', [PendaftaranController::class, 'pendaftaranPage'])->name('pendaftaran');
Route::get('/info-pendaftaran/{uuid}/{type}', [PendaftaranController::class, 'GetDataPendaftaran'])->name('getPendaftaran');
Route::post('/create', [PendaftaranController::class, 'CreateForm'])->name('createPendaftaran');
Route::post('/save-biodata', [PendaftaranController::class, 'SaveBiodata'])->name('savePendaftaran');
Route::post('/save-berkas', [PendaftaranController::class, 'SaveBerkasTambahan'])->name('saveBerkasPendaftaran');