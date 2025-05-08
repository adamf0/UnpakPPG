<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TesController extends Controller
{
    public function pencarianPage(){
        return Inertia::render("PencarianPage",['activeMenu'=>'Pencarian']);
    }
    public function pendaftaranPage(){
        return Inertia::render("PendaftaranPage",['activeMenu'=>'Pendaftaran']);
    }
}
