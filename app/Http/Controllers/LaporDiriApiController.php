<?php

namespace App\Http\Controllers;

use App\Exports\LaporDiriExport;
use App\Models\LaporDiri;
use App\Models\mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class LaporDiriApiController extends Controller
{
    public function Index(Request $request){
       try {
            $page = empty($request->page) || $request->page < 1? 1:$request->page;
            $limit = 10;
            $offset = ($page - 1) * $limit;
            
            if($request->post("filter_status")!="done"){
                $total = DB::table("all_record")->whereNull("status")->count();
                $data = DB::table("all_record")->skip($offset)->take($limit);
                $data = $data->whereNull("status");
                
                if($request->has("filter") && !empty($request->get("filter"))){
                    $data = $data->where(fn ($query) =>
                                $query->where("namaPeserta", "like", "%{$request->filter}%")
                                    ->orWhere("nim", "like", "%{$request->filter}%")
                                    ->orWhere("nomorUKG", "like", "%{$request->filter}%"));
                }
                $data = $data->get();

                $totalPages = ceil($total / $limit);
            } else{
                $total = DB::table("all_record");
                if($request->has("filter_status") && !empty($request->get("filter_status"))){
                    $total = $total->where("status",$request->post("filter_status"));
                }
                $total = $total->count();

                $data = LaporDiri::select("pendaftaran.*",DB::raw("(case when pendaftaran.namaPeserta is null then mahasiswa.nama else pendaftaran.namaPeserta end) as namaPeserta"))
                                    ->leftJoin("mahasiswa","pendaftaran.nomorUKG","=","mahasiswa.nomorUKG")
                                    ->skip($offset)
                                    ->take($limit);
                if($request->has("filter_status") && !empty($request->get("filter_status"))){
                    $data = $data->where("pendaftaran.status",$request->post("filter_status"));
                }
                if($request->has("filter") && !empty($request->get("filter"))){
                    $data = $data->where(fn ($query) =>
                                $query->where("pendaftaran.namaPeserta", "like", "%{$request->filter}%")
                                    ->orWhere("pendaftaran.nim", "like", "%{$request->filter}%")
                                    ->orWhere("pendaftaran.nomorUKG", "like", "%{$request->filter}%"));
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
                // "Error" => $th->getMessage(),
                // "ErrorT" => $th->getTrace(),
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
                // "Error" => $th->getMessage()
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
                // "Error" => $th->getMessage()
            ],400);
        }
    }
    public function Export(Request $request){
       try {
            return Excel::download(new LaporDiriExport($request->get("filter_status")), 'Lapor_Diri_Export.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                "Title" => "lapordiri.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
}
