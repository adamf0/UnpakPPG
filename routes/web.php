<?php

use App\Http\Controllers\ImportController;
use App\Http\Controllers\PencarianController;
use App\Http\Controllers\PendaftaranController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [PencarianController::class, 'pencarianPage'])->name('pencarian');
Route::get('/pendaftaran', [PendaftaranController::class, 'pendaftaranPage'])->name('pendaftaran');
Route::get('/import', [ImportController::class, 'Index']);