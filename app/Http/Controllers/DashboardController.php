<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboardPage(){
        return Inertia::render("Admin/Dashboard",[]);
    }
}
