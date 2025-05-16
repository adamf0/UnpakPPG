<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class LaporDiriController extends Controller
{
    public function Index(){
        return Inertia::render("LaporDiri/Index",[]);
    }
    public function Edit(){
        return Inertia::render("LaporDiri/Edit",[]);
    }
}
