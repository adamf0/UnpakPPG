<?php

namespace App\Http\Controllers;

use App\Exports\LaporDiriExport;
use App\Models\LaporDiri;
use App\Models\mahasiswa;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class LaporDiriApiController extends Controller
{
    public function Index(Request $request){
       try {
            $page = empty($request->page) || $request->page < 1? 1:$request->page;
            $limit = 10;
            $offset = ($page - 1) * $limit;
            
            if($request->post("filter_status")=="not registered"){
                $registeredUKG = LaporDiri::pluck("nomorUKG");
                $allMahasiswa = mahasiswa::whereNotIn("nomorUKG", $registeredUKG)->get();
                $total = $allMahasiswa->count();

                $data = $allMahasiswa->skip($offset)->take($limit)->map(function ($m) {
                    return [
                        "agama" => "",
                        "alamatAyahIbu" => "",
                        "alamatEmail" => $m->email,
                        "alamatSekolah" => "",
                        "alamatTinggal" => "",
                        "biodataMahasiswa" => "",
                        "created_at" => "",
                        "foto" => "",
                        "hpAyahIbu" => "",
                        "hpKerabat" => "",
                        "id" => $m->id,
                        "ijazah" => "",
                        "jenisKelamin" => "",
                        "jenisTinggal" => "",
                        "kecamatan" => "",
                        "kelurahan" => "",
                        "kodePos" => "",
                        "ktp" => "",
                        "namaAyah" => "",
                        "namaIbu" => "",
                        "namaPeserta" => $m->nama,
                        "nik" => $m->nik,
                        "nim" => $m->nim,
                        "noHp" => "",
                        "nomorUKG" => $m->nomorUKG,
                        "npwp" => "",
                        "paktaIntegritas" => "",
                        "rt" => "",
                        "rw" => "",
                        "sekolahMengajar" => "",
                        "status" => "",
                        "statusSipil" => "",
                        "suratBebasNarkoba" => "",
                        "suratKeteranganBerkelakuanBaik" => "",
                        "suratKeteranganSehat" => "",
                        "tanggalLahir" => "",
                        "telpSekolah" => "",
                        "tempatLahir" => "",
                        "transkripS1" => "",
                        "updated_at" => "",
                        "uuid" => $m->uuid,
                        "wargaNegara" => "",
                    ];
                })->values();

                $totalPages = ceil($total / $limit);
            } else{
                $total = LaporDiri::count();
                $data = LaporDiri::skip($offset)->take($limit);
                if($request->has("filter_nama") && !empty($request->get("filter_nama"))){
                    $data = $data->where("namaPeserta","like","%".$request->filter_nama."%");
                }
                if($request->has("filter_npm") && !empty($request->get("filter_npm"))){
                    $data = $data->where("nim",$request->filter_npm);
                }
                if($request->has("filter_ukg") && !empty($request->get("filter_ukg"))){
                    $data = $data->where("nomorUKG",$request->filter_ukg);
                }
                if($request->has("filter_status") && !empty($request->get("filter_status"))){
                    $data = $data->where("status",$request->post("filter_status"));
                }
                $data = $data->get();

                $totalPages = ceil($total / $limit);
            }

            return response()->json([
                'data' => $data,
                'pagination' => [
                    'current_page' => (int) $page,
                    'per_page' => $limit,
                    'total_data' => $total,
                    'total_pages' => $totalPages,
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "lapordiri.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
    public function Delete($uuid){
       try {
            $data = LaporDiri::where("uuid",$uuid)->first();

            if(empty($data)){
                return response()->json([
                    "Title" => "lapordiri.dataNotFound",
                    "Detail" => "data tidak ditemukan",
                ],400);    
            }

            $data->delete();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "lapordiri.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
    public function Detail($uuid){
       try {
            $data = LaporDiri::select("pendaftaran.*","mahasiswa.nama","mahasiswa.bidangStudi")->join("mahasiswa", "pendaftaran.nomorUKG", "mahasiswa.nomorUKG")->where("uuid",$uuid)->first();

            if(empty($data)){
                return response()->json([
                    "Title" => "lapordiri.dataNotFound",
                    "Detail" => "data tidak ditemukan",
                ],400);    
            }

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "lapordiri.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
    public function Export(Request $request){
       try {
            return Excel::download(new LaporDiriExport($request->get("filter_status")=="draf"? "":$request->get("filter_status")), 'Lapor_Diri_Export.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "lapordiri.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
}
