<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class LaporDiriController extends Controller
{
    public function Index(){
        return Inertia::render("LaporDiri/Index",[]);
    }
    public function Edit($uuid){
        return Inertia::render("LaporDiri/Edit",["uuid"=>$uuid]);
    }
    public function Detail($uuid){
        return Inertia::render("LaporDiri/Detail",["uuid"=>$uuid]);
    }
}
