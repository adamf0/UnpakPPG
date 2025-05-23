<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\LaporDiriController;
use App\Http\Controllers\PencarianController;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\SearchController;
use App\Http\Middleware\CheckSession;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

// Route::get('/testing', function () {
//     return Hash::make("Q/piD]/2{bvJlFd/K8[y4tEm`}{`xxoV");
// });

Route::get('/', [PencarianController::class, 'pencarianPage'])->name('pencarian');
Route::get('/pendaftaran', [PendaftaranController::class, 'pendaftaranPage'])->name('pendaftaran');
Route::get('/import', [ImportController::class, 'Index']);

Route::get('/login', [AuthController::class, 'authPage'])->name("authPage");
Route::post('/dologin', [AuthController::class, 'doLogin']);
Route::get('/dologout', [AuthController::class, 'doLogout']);

Route::middleware([CheckSession::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboardPage']);

    Route::get('/laporDiri', [LaporDiriController::class, 'Index']);
    Route::get('/laporDiri/edit/{id}', [LaporDiriController::class, 'Edit']);
    Route::get('/laporDiri/detail/{id}', [LaporDiriController::class, 'Detail']);

    Route::get('/search', [SearchController::class, 'Index']);
});