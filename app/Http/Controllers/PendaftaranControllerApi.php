<?php

namespace App\Http\Controllers;

use App\Models\berkasTambahan;
use App\Models\mahasiswa;
use App\Models\pengajuan;
use App\Rules\SafeFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class PendaftaranControllerApi extends Controller
{
    public function CreateForm(Request $request){
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
            $mahasiswa = mahasiswa::where('nomorUKG',$request->nomorUKG)->first();
            // if($mahasiswa==null){
            //     return response()->json([
            //         "Title" => "pendaftaran.dataNotFound",
            //         "Detail" => "nomor ukg tidak terdaftar"
            //     ],400);
            // }
            $pengajuan = pengajuan::where('nomorUKG',$request->nomorUKG)->orWhere('nim',$mahasiswa?->nim)->get();
            if($pengajuan->count()>1){
                return response()->json([
                    "Title" => "pendaftaran.tooMuchDataFound",
                    "Detail" => "data ditemukan lebih dari 1"
                ],400);
            }

            $pengajuan = $pengajuan?->first();
        
            if($pengajuan != null){
                return $pengajuan->uuid;
            } else{
                $uuid = Uuid::uuid4()->toString();

                $new = new Pengajuan();
                $new->uuid = $uuid;
                $new->nomorUKG = $request->nomorUKG;
                $new->nim = $mahasiswa?->nim;
                $new->save();

                return response()->json($uuid,200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "pendaftaran.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }
    }
    public function GetData($uuid,$type){
        try {
            if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $uuid)) {
                return response()->json([
                    "Title" => "pendaftaran.invalidRequest",
                    "Detail" => "UUID tidak valid",
                ], 500);
            }
            if(!in_array(strtolower($type),["biodata_diri","berkas_tambahan"])){
                return response()->json([
                    "Title" => "pendaftaran.invalidRequest",
                    "Detail" => "type tidak valid",
                ], 500);
            }

            $pendaftaran = pengajuan::where('uuid',$uuid)->firstOrFail();
            if($pendaftaran==null){
                return response()->json([
                    "Title" => "pendaftaran.dataNotfound",
                    "Detail" => "data tidak ditemukan",
                ], 400);
            }

            if($type=="biodata_diri"){
                return response()->json([
                    "nomorUKG"          => $pendaftaran->nomorUKG, //number
                    "nim"               => $pendaftaran->nim, //number
                    "nik"               => $pendaftaran->nik, //number, 16 digit
                    "namaPeserta"       => $pendaftaran->namaPeserta, //string
                    "jenisKelamin"      => $pendaftaran->jenisKelamin, //string, 1 length, [L,P] range
                    "tempatLahir"       => $pendaftaran->tempatLahir, //string
                    "tanggalLahir"      => $pendaftaran->tanggalLahir, //string, y-m-d
                    "agama"             => $pendaftaran->agama, //string, 1 length, agamaOptions range
                    "wargaNegara"       => $pendaftaran->wargaNegara, //string, 1 length, wargaNegaraOptions range
                    "statusSipil"       => $pendaftaran->statusSipil, //string, 1 length, statusSipilOptions range
                    "noHp"              => $pendaftaran->noHp, //number, min 10 max 13 digit
                    "alamatEmail"       => $pendaftaran->alamatEmail, //string, email
                    "alamatTinggal"     => $pendaftaran->alamatTinggal, //string
                    "rt"                => $pendaftaran->rt, //number, 3 digit
                    "rw"                => $pendaftaran->rw, //number, 3 figit
                    "kelurahan"         => $pendaftaran->kelurahan, //string
                    "kecamatan"         => $pendaftaran->kecamatan, //scring
                    "kodePos"           => $pendaftaran->kodePos, //number, 5 digit
                    "jenisTinggal"      => $pendaftaran->jenisTinggal, //string, 1 length, jenisTinggalOptions range
                    "namaIbu"           => $pendaftaran->namaIbu, //string
                    "namaAyah"          => $pendaftaran->namaAyah, //string
                    "alamatAyahIbu"     => $pendaftaran->alamatAyahIbu, //string
                    "hpAyahIbu"         => $pendaftaran->hpAyahIbu, //number, min 10 max 13 digit
                    "hpKerabat"         => $pendaftaran->hpKerabat, //number, min 10 max 13 digit
                    "sekolahMengajar"   => $pendaftaran->sekolahMengajar, //string
                    "alamatSekolah"     => $pendaftaran->alamatSekolah, //string
                    "telpSekolah"       => $pendaftaran->telpSekolah, //number
                ],200);
            } else{
                return response()->json([
                    "paktaIntegritas"   => empty($pendaftaran->paktaIntegritas)? null : urlencode($pendaftaran->paktaIntegritas),
                    "biodataMahasiswa"  => empty($pendaftaran->biodataMahasiswa)? null : urlencode($pendaftaran->biodataMahasiswa),
                    "ijazah"            => empty($pendaftaran->ijazah)? null : urlencode($pendaftaran->ijazah),
                    "transkripS1"       => empty($pendaftaran->transkripS1)? null : urlencode($pendaftaran->transkripS1),
                    "ktp"               => empty($pendaftaran->ktp)? null : urlencode($pendaftaran->ktp),
                    "foto"              => empty($pendaftaran->foto)? null : urlencode($pendaftaran->foto),
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "pendaftaran.commonError",
                "Detail" => "ada yg salah pada aplikasi"
            ],400);
        }        
    }
    public function SaveBiodata(Request $request){
        // $validator = Validator::make($request->all(), [
        //     'uuidPendaftaran' => 'required',
        //     'nik'             => 'required|digits:16',
        //     'namaPeserta'     => 'required|string|max:255',
        //     'jenisKelamin'    => 'required|string|in:L,P',
        //     'tempatLahir'     => 'required|string|max:255',
        //     'tanggalLahir'    => 'required|date_format:Y-m-d',
        //     'agama'           => 'required|string|in:I,K,P,B,G,L',
        //     'wargaNegara'     => 'required|string|in:I,A',
        //     'statusSipil'     => 'required|string|in:B,K,J,D',
        //     'noHp'            => 'required|digits_between:10,13',
        //     'alamatEmail'     => 'required|email|max:255',
        //     'alamatTinggal'   => 'required|string|max:500',
        //     'rt'              => 'required|digits:3',
        //     'rw'              => 'required|digits:3',
        //     'kelurahan'       => 'required|string|max:255',
        //     'kecamatan'       => 'required|string|max:255',
        //     'kodePos'         => 'required|digits:5',
        //     'jenisTinggal'    => 'required|in:1,2,3,4,5,99',
        //     'namaIbu'         => 'required|string|max:255',
        //     'namaAyah'        => 'required|string|max:255',
        //     'alamatAyahIbu'   => 'required|string|max:500',
        //     'hpAyahIbu'       => 'required|digits_between:10,13',
        //     'hpKerabat'       => 'required|digits_between:10,13',
        //     'sekolahMengajar' => 'required|string|max:255',
        //     'alamatSekolah'   => 'required|string|max:500',
        //     'telpSekolah'     => 'nullable|numeric',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         "Title" => "pendaftaran.invalidValidation",
        //         "Detail" => $validator->errors(),
        //     ], 500);
        // }
        
        try {
            $pendaftaran                     = pengajuan::where('uuid',$request->uuidPendaftaran)->firstOrFail();
            $pendaftaran->nik                = $request->nik;
            $pendaftaran->namaPeserta        = $request->namaPeserta;
            $pendaftaran->jenisKelamin       = $request->jenisKelamin;
            $pendaftaran->tempatLahir        = $request->tempatLahir;
            $pendaftaran->tanggalLahir       = $request->tanggalLahir;
            $pendaftaran->agama              = $request->agama;
            $pendaftaran->wargaNegara        = $request->wargaNegara;
            $pendaftaran->statusSipil        = $request->statusSipil;
            $pendaftaran->noHp               = $request->noHp;
            $pendaftaran->alamatEmail        = $request->alamatEmail;
            $pendaftaran->alamatTinggal      = $request->alamatTinggal;
            $pendaftaran->rt                 = $request->rt;
            $pendaftaran->rw                 = $request->rw;
            $pendaftaran->kelurahan          = $request->kelurahan;
            $pendaftaran->kecamatan          = $request->kecamatan;
            $pendaftaran->kodePos            = $request->kodePos;
            $pendaftaran->jenisTinggal       = $request->jenisTinggal;
            $pendaftaran->namaIbu            = $request->namaIbu;
            $pendaftaran->namaAyah           = $request->namaAyah;
            $pendaftaran->alamatAyahIbu      = $request->alamatAyahIbu;
            $pendaftaran->hpAyahIbu          = $request->hpAyahIbu;
            $pendaftaran->hpKerabat          = $request->hpKerabat;
            $pendaftaran->sekolahMengajar    = $request->sekolahMengajar;
            $pendaftaran->alamatSekolah      = $request->alamatSekolah;
            $pendaftaran->telpSekolah        = $request->telpSekolah;
            $pendaftaran->save();

            return response()->noContent();
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "pendaftaran.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Erorr" => $th->getMessage()
            ],400);
        }

    }
    public function SaveBerkasTambahan(Request $request){
        $validator = Validator::make($request->all(), [
            'uuidPendaftaran' => ['required'],
            'paktaIntegritas' => ['required', 'url', 'regex:/^https:\/\/drive\.google\.com\//'],
            'paktaIntegritas' => ['required', 'url', 'regex:/^https:\/\/drive\.google\.com\//'],
            'biodataMahasiswa' => ['required', 'url', 'regex:/^https:\/\/drive\.google\.com\//'],
            'foto' => ['nullable', 'file', 'max:5120', new SafeFile(['image/jpeg', 'image/png'])],
            'ktp' => ['nullable', 'file', 'max:5120', new SafeFile(['image/jpeg', 'image/png'])],
            'transkripS1' => ['nullable', 'file', 'max:5120', new SafeFile(['application/pdf'])],
            'ijazah' => ['nullable', 'file', 'max:5120', new SafeFile(['image/jpeg', 'image/png'])],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Title" => "berkasTamabahn.invalidValidation",
                "Detail" => $validator->errors(),
            ], 500);
        }
        
        try {
            $berkasTambahan                    = pengajuan::where('uuid',$request->uuidPendaftaran)->firstOrFail();
            $berkasTambahan->paktaIntegritas   = $request->paktaIntegritas;
            $berkasTambahan->biodataMahasiswa  = $request->biodataMahasiswa;

            if($request->has("foto")){
                $uuid = Uuid::uuid4()->toString();
                $fileFoto = $uuid.".".strtolower($request->file("foto")->getClientOriginalExtension());
                $request->file("foto")->storeAs('/', $fileFoto, ['disk' => "foto"]);
                $berkasTambahan->foto              = $fileFoto;
            }
            if($request->has("ktp")){
                $uuid = Uuid::uuid4()->toString();
                $fileKtp = $uuid.".".strtolower($request->file("ktp")->getClientOriginalExtension());
                $request->file("ktp")->storeAs('/', $fileKtp, ['disk' => "ktp"]);
                $berkasTambahan->ktp              = $fileKtp;
            }
            if($request->has("transkripS1")){
                $uuid = Uuid::uuid4()->toString();
                $fileTranskripS1 = $uuid.".".strtolower($request->file("transkripS1")->getClientOriginalExtension());
                $request->file("transkripS1")->storeAs('/', $fileTranskripS1, ['disk' => "transkripS1"]);
                $berkasTambahan->transkripS1              = $fileTranskripS1;
            }
            if($request->has("ijazah")){
                $uuid = Uuid::uuid4()->toString();
                $fileIjazah = $uuid.".".strtolower($request->file("ijazah")->getClientOriginalExtension());
                $request->file("ijazah")->storeAs('/', $fileIjazah, ['disk' => "ijazah"]);
                $berkasTambahan->ijazah              = $fileIjazah;
            }
            if($berkasTambahan->isDirty())
            $berkasTambahan->save();

            return response()->noContent();
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "berkasTamabahn.commonError",
                "Detail" => "ada yg salah pada aplikasi"
            ],400);
        }

    }
}
