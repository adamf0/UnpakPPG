<?php

namespace App\Http\Controllers;

use App\Models\pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PencarianControllerApi extends Controller
{
    public function GetDataPendaftaran(Request $request){
        $validator = Validator::make(
            $request->all(), 
            [
                'nomorUKG' => ['required'],
            ],
            [
                'nomorUKG.required' => ['The nomor ukg field is required.'],
            ],
        );

        if ($validator->fails()) {
            return response()->json([
                "Title" => "pencarian.invalidValidation",
                "Detail" => $validator->errors(),
            ], 500);
        }

        $version = config('app.version');
        $showData = config('app.show_data');
        try {
            $cek = pengajuan::join("mahasiswa", function ($join) {
                    $join->on("pendaftaran.nomorUKG", "=", "mahasiswa.nomorUKG")
                         ->on("pendaftaran.version", "=", "mahasiswa.version");
                })
                ->where('pendaftaran.nomorUKG',$request->nomorUKG)
                ->where('pendaftaran.version',$version)
                ->where('mahasiswa.show_data',$showData)
                ->exists();
            if(!$cek){
                return response()->json([
                    "Title" => "pencarian.NotFound",
                    "Detail" => "Anda belum melakukan Lapor Diri, silahkan ke menu Pendaftaran"
                ],400);
            } else{
                return response()->json("Anda sudah melakukan Lapor Diri",200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "pencarian.commonError",
                "Detail" => "ada yg salah pada aplikasi"
            ],400);
        }
    }
}
