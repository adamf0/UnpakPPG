<?php

namespace App\Http\Controllers;

use App\Models\LaporDiri;
use App\Models\mahasiswa;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboardPage(){
        $totalRegistrasi = mahasiswa::count();
        
        $lengkap = LaporDiri::where("status","done")->count();
        $tidakLengkap = LaporDiri::whereNot("status","done")->count();
        $tidakTerdaftar = $totalRegistrasi - $lengkap - $tidakLengkap;

        return Inertia::render("Admin/Dashboard",["lengkap"=>$lengkap,"tidakLengkap"=>$tidakLengkap,"tidakTerdaftar"=>$tidakTerdaftar]);
    }
}
