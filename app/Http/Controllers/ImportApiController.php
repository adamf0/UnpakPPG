<?php

namespace App\Http\Controllers;

use App\Imports\MahasiswaImport;
use App\Models\mahasiswa;
use App\Rules\SafeFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ImportApiController extends Controller
{
    public function Index(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'file' => ['required', 'file', 'max:5120', new SafeFile([
                    'application/vnd.ms-excel', 
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                    'text/csv'
                ])],
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    "Title" => "import.invalidValidation",
                    "Detail" => $validator->errors(),
                ], 500);
            }
            
            set_time_limit(1800000000);
            $data = Excel::toArray(new MahasiswaImport, $request->file("file"));
            $rows = $data[0];

            $counter = 0;
            $version = config('app.version');
            foreach ($rows as $row) {
                $mahasiswa = mahasiswa::where('nomorUKG',$row["nomorukg"])->where('version',$version);
                $check = $mahasiswa->count();
                
                // if($mahasiswa->count()==1){
                //     $mahasiswa = $mahasiswa->first();
                //     $mahasiswa->jenjangSekolah = $row["jenjangsekolah"] ?? null;
                //     $mahasiswa->provinsi = $row["provinsi"] ?? null;
                //     $mahasiswa->save();
                //     $counter++;
                // }

                if($check==0 && !empty($row["nim"]) && !empty($row["nomorukg"])){
                    $mahasiswa = new mahasiswa();
                    $mahasiswa->nomorUKG = $row["nomorukg"];
                    $mahasiswa->nim = $row["nim"];
                    $mahasiswa->nama = $row["nama"];
                    $mahasiswa->bidangStudi = $row["bidangstudi"];
                    $mahasiswa->email = $row["email"];
                    $mahasiswa->nik = $row["nik"];
                    $mahasiswa->noHP = $row["nohp"];
                    $mahasiswa->version = $version;
                    $mahasiswa->save();
                    $counter++;
                }
            }

            return response()->json("success import $counter data", 200);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "import.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
}
