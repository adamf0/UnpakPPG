<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\LaporDiriController;
use App\Http\Controllers\PencarianController;
use App\Http\Controllers\PendaftaranController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [PencarianController::class, 'pencarianPage'])->name('pencarian');
Route::get('/pendaftaran', [PendaftaranController::class, 'pendaftaranPage'])->name('pendaftaran');
Route::get('/import', [ImportController::class, 'Index']);

Route::get('/login', [AuthController::class, 'authPage']);
Route::post('/dologin', [AuthController::class, 'doLogin']);

Route::get('/dashboard', [DashboardController::class, 'dashboardPage']);

Route::get('/laporDiri', [LaporDiriController::class, 'Index']);
Route::get('/laporDiri/edit/{id}', [LaporDiriController::class, 'Edit']);