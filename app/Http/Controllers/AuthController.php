<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function authPage(){
        return Inertia::render("Auth",[]);
    }
    public function doLogin(Request $request){
        return redirect()->to("login");
    }
}
