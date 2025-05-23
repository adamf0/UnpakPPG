<?php

namespace App\Http\Controllers;

use App\Models\LaporDiri;
use App\Models\mahasiswa;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboardPage(){
        $totalRegistrasi = DB::table("all_record")->count();
        
        $lengkap = DB::table("all_record")->where("status","done")->count();
        $tidakLengkap = DB::table("all_record")->whereNull("status")->count();

        return Inertia::render("Admin/Dashboard",["lengkap"=>$lengkap,"tidakLengkap"=>$tidakLengkap]);
    }
}
