<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PencarianController extends Controller
{
    public function pencarianPage(){
        return Inertia::render("PencarianPage",['activeMenu'=>'Pencarian']);
    }
}
