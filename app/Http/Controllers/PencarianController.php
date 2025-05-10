<?php

namespace App\Http\Controllers;

use App\Models\pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PencarianController extends Controller
{
    public function pencarianPage(){
        return Inertia::render("PencarianPage",['activeMenu'=>'Pencarian']);
    }
    public function GetDataPendaftaran(Request $request){
        $validator = Validator::make($request->all(), [
            'nomorUKG' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Title" => "pendaftaran.invalidValidation",
                "Detail" => $validator->errors(),
            ], 500);
        }

        try {
            $cek = pengajuan::where('nomorUKG',$request->nomorUKG)->exists();
            if(!$cek){
                return response()->json([
                    "Title" => "pendaftaran.NotFound",
                    "Detail" => "data belum terdaftar di sistem"
                ],400);
            } else{
                return response()->json("data sudah terdaftar",200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "pendaftaran.commonError",
                "Detail" => "ada yg salah pada aplikasi"
            ],400);
        }
    }
}
