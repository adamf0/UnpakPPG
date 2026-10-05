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
        $showData = config('app.show_data');

        $totalRegistrasi = DB::table("all_record")
            ->join("mahasiswa", function ($join) {
                $join->on("all_record.nomorUKG", "=", "mahasiswa.nomorUKG")
                     ->on("all_record.version", "=", "mahasiswa.version");
            })
            ->where('all_record.version', $version)
            ->where('mahasiswa.show_data', $showData)
            ->count();
        
        $lengkap = DB::table("all_record")
            ->join("mahasiswa", function ($join) {
                $join->on("all_record.nomorUKG", "=", "mahasiswa.nomorUKG")
                     ->on("all_record.version", "=", "mahasiswa.version");
            })
            ->where("all_record.status", "done")
            ->where('all_record.version', $version)
            ->where('mahasiswa.show_data', $showData)
            ->count();

        $tidakLengkap = DB::table("all_record")
            ->join("mahasiswa", function ($join) {
                $join->on("all_record.nomorUKG", "=", "mahasiswa.nomorUKG")
                     ->on("all_record.version", "=", "mahasiswa.version");
            })
            ->whereNull("all_record.status")
            ->where('all_record.version', $version)
            ->where('mahasiswa.show_data', $showData)
            ->count();

        return Inertia::render("Admin/Dashboard",["lengkap"=>$lengkap,"tidakLengkap"=>$tidakLengkap]);
    }
}
