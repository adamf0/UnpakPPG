<?php

use App\Http\Controllers\TesController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [TesController::class, 'pencarianPage'])->name('pencarian');
Route::get('/pendaftaran', [TesController::class, 'pendaftaranPage'])->name('pendaftaran');