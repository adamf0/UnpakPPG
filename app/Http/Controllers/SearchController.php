<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function Index(){
        return Inertia::render("Search/Index",[]);
    }
}
