<?php

namespace App\Http\Controllers;

use App\Imports\MahasiswaImport;
use App\Models\mahasiswa;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function Index(){
        set_time_limit(1800000000);
        $data = Excel::toArray(new MahasiswaImport, public_path('import.xlsx'));
        $rows = $data[0];  

        foreach ($rows as $row) {
            $check = mahasiswa::where('nim', $row["npm"])->where('nomorUKG',$row["no_ukg"])->count();

            if($check==0 && !empty($row["npm"]) && !empty($row["no_ukg"])){
                $mahasiswa = new mahasiswa();
                $mahasiswa->nomorUKG = $row["no_ukg"];
                $mahasiswa->nim = $row["npm"];
                $mahasiswa->nama = $row["nama_lengkap"];
                $mahasiswa->bidangStudi = $row["bidang_studi_ppg"];
                $mahasiswa->email = $row["email"];
                $mahasiswa->nik = $row["nik"];
                $mahasiswa->noHP = $row["no_hp"];
                $mahasiswa->save();
            }
        }
        return "success import";
    }
}
