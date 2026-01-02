<?php

namespace App\Http\Controllers;

use App\Models\LaporDiri;
use App\Models\mahasiswa;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboardPage(){
        $version = config('app.version');
        $totalRegistrasi = DB::table("all_record")->where('version',$version)->count();
        
        $lengkap = DB::table("all_record")->where("status","done")->where('version',$version)->count();
        $tidakLengkap = DB::table("all_record")->whereNull("status")->where('version',$version)->count();

        return Inertia::render("Admin/Dashboard",["lengkap"=>$lengkap,"tidakLengkap"=>$tidakLengkap]);
    }
}
