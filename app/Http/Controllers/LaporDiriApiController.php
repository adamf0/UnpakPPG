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
       $version = config('app.version');
       $showData = config('app.show_data');

       try {
            $page = empty($request->page) || $request->page < 1? 1:$request->page;
            $limit = 10;
            $offset = ($page - 1) * $limit;
            
            if($request->post("filter_status")!="done"){
                $total = DB::table("all_record")
                    ->join("mahasiswa", function ($join) {
                        $join->on("all_record.nomorUKG", "=", "mahasiswa.nomorUKG")
                             ->on("all_record.version", "=", "mahasiswa.version");
                    })
                    ->whereNull("all_record.status")
                    ->where('all_record.version',$version)
                    ->where('mahasiswa.show_data',$showData)
                    ->count();

                $data = DB::table("all_record")
                    ->select("all_record.*")
                    ->join("mahasiswa", function ($join) {
                        $join->on("all_record.nomorUKG", "=", "mahasiswa.nomorUKG")
                             ->on("all_record.version", "=", "mahasiswa.version");
                    })
                    ->where('all_record.version',$version)
                    ->where('mahasiswa.show_data',$showData)
                    ->skip($offset)
                    ->take($limit);
                $data = $data->whereNull("all_record.status");
                
                if($request->has("filter") && !empty($request->get("filter"))){
                    $data = $data->where(fn ($query) =>
                                $query->where("all_record.namaPeserta", "like", "%{$request->filter}%")
                                    ->orWhere("all_record.nim", "like", "%{$request->filter}%")
                                    ->orWhere("all_record.nomorUKG", "like", "%{$request->filter}%"));
                }
                $data = $data->get();

                $totalPages = ceil($total / $limit);
            } else{
                $total = DB::table("all_record")
                    ->join("mahasiswa", function ($join) {
                        $join->on("all_record.nomorUKG", "=", "mahasiswa.nomorUKG")
                             ->on("all_record.version", "=", "mahasiswa.version");
                    })
                    ->where('all_record.version',$version)
                    ->where('mahasiswa.show_data',$showData);
                if($request->has("filter_status") && !empty($request->get("filter_status"))){
                    $total = $total->where("all_record.status",$request->post("filter_status"));
                }
                $total = $total->count();

                $data = LaporDiri::select("pendaftaran.*",DB::raw("(case when pendaftaran.namaPeserta is null then mahasiswa.nama else pendaftaran.namaPeserta end) as namaPeserta"))
                                    ->join("mahasiswa", function ($join) {
                                        $join->on("pendaftaran.nomorUKG", "=", "mahasiswa.nomorUKG")
                                             ->on("pendaftaran.version", "=", "mahasiswa.version");
                                    })
                                    ->where('pendaftaran.version',$version)
                                    ->where('mahasiswa.show_data',$showData)
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
       $version = config('app.version');

       try {
            $data = LaporDiri::where("uuid",$uuid)->where('version',$version)->first();

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
       $version = config('app.version');
       $showData = config('app.show_data');

       try {
            $data = LaporDiri::select("pendaftaran.*","mahasiswa.nama",DB::raw("(case when pendaftaran.bidangStudi is null then mahasiswa.bidangStudi else pendaftaran.bidangStudi end) as bidangStudi"))
                ->join("mahasiswa", function ($join) {
                    $join->on("pendaftaran.nomorUKG", "=", "mahasiswa.nomorUKG")
                         ->on("pendaftaran.version", "=", "mahasiswa.version");
                })
                ->where("pendaftaran.uuid",$uuid)
                ->where('pendaftaran.version',$version)
                ->where('mahasiswa.show_data',$showData)
                ->first();

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
       set_time_limit(1800000000);
       ini_set('memory_limit',1800000000);
       try {
            return Excel::download(new LaporDiriExport($request->get("filter_status")), 'Lapor_Diri_Export.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "lapordiri.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
}
