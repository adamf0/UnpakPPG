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
            if($mahasiswa==null){
                return response()->json([
                    "Title" => "pendaftaran.dataNotFound",
                    "Detail" => "nomor ukg tidak terdaftar"
                ],400);
            }
            
            $pengajuan = pengajuan::where('nomorUKG',$request->nomorUKG)->get();
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
                $new->nik = $mahasiswa?->nik;
                $new->namaPeserta = $mahasiswa?->nama;
                $new->alamatEmail = $mahasiswa?->email;
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

            $pendaftaran = pengajuan::select("pendaftaran.*","mahasiswa.nama","mahasiswa.bidangStudi")->join("mahasiswa", "pendaftaran.nomorUKG", "mahasiswa.nomorUKG")->where('uuid',$uuid)->firstOrFail();
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
                    "nama"              => $pendaftaran->nama, //string
                    "bidangStudi"       => $pendaftaran->bidangStudi, //string
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
                    "status"            => $pendaftaran->status,
                ],200);
            } else{
                return response()->json([
                    "paktaIntegritas"   => empty($pendaftaran->paktaIntegritas)? null : urlencode($pendaftaran->paktaIntegritas),
                    "biodataMahasiswa"  => empty($pendaftaran->biodataMahasiswa)? null : urlencode($pendaftaran->biodataMahasiswa),
                    "ijazah"            => empty($pendaftaran->ijazah)? null : urlencode($pendaftaran->ijazah),
                    "transkripS1"       => empty($pendaftaran->transkripS1)? null : urlencode($pendaftaran->transkripS1),
                    "ktp"               => empty($pendaftaran->ktp)? null : urlencode($pendaftaran->ktp),
                    "foto"              => empty($pendaftaran->foto)? null : urlencode($pendaftaran->foto),
                    "suratKeteranganSehat" => empty($pendaftaran->suratKeteranganSehat)? null: urlencode($pendaftaran->suratKeteranganSehat),
                    "suratKeteranganBerkelakuanBaik" => empty($pendaftaran->suratKeteranganBerkelakuanBaik)? null: urlencode($pendaftaran->suratKeteranganBerkelakuanBaik),
                    "suratBebasNarkoba" => empty($pendaftaran->suratBebasNarkoba)? null: urlencode($pendaftaran->suratBebasNarkoba),
                    "npwp"              => empty($pendaftaran->npwp)? null: urlencode($pendaftaran->npwp),
                    "status"            => $pendaftaran->status,
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
        $validator = Validator::make($request->all(), [
            'uuidPendaftaran' => 'required',
            'nik'             => 'required|digits:16',
            // 'namaPeserta'     => 'required|string|max:255',
            'jenisKelamin'    => 'required|string|in:L,P',
            'tempatLahir'     => 'required|string|max:255',
            'tanggalLahir'    => 'required|date_format:Y-m-d',
            'agama'           => 'required|string|in:I,K,P,B,G,L',
            'wargaNegara'     => 'required|string|in:I,A',
            'statusSipil'     => 'required|string|in:B,K,J,D',
            'noHp'            => 'required|digits_between:10,13',
            'alamatEmail'     => 'required|email|max:255',
            'alamatTinggal'   => 'required|string|max:500',
            'rt'              => 'required|digits:3',
            'rw'              => 'required|digits:3',
            'kelurahan'       => 'required|string|max:255',
            'kecamatan'       => 'required|string|max:255',
            'kodePos'         => 'required|digits:5',
            'jenisTinggal'    => 'required|in:1,3,2,99,10,4,5',
            'namaIbu'         => 'required|string|max:255',
            'namaAyah'        => 'required|string|max:255',
            'alamatAyahIbu'   => 'required|string|max:500',
            'hpAyahIbu'       => 'required|digits_between:10,13',
            'hpKerabat'       => 'required|digits_between:10,13',
            'sekolahMengajar' => 'required|string|max:255',
            'alamatSekolah'   => 'required|string|max:500',
            'telpSekolah'     => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "Title" => "pendaftaran.invalidValidation",
                "Detail" => $validator->errors(),
            ], 500);
        }
        
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
            'paktaIntegritas' => ['required'],
            'biodataMahasiswa' => ['required'],
            'foto' => ['required'],
            'ktp' => ['required'],
            'transkripS1' => ['required'],
            'ijazah' => ['required'],
            'suratKeteranganSehat' => ['required'],
            'suratKeteranganBerkelakuanBaik' => ['required'],
            'suratBebasNarkoba' => ['required']
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                "Title" => "berkasTambahan.invalidValidation",
                "Detail" => $validator->errors(),
            ], 500);
        }
        
        $fileRules = [];        
        if ($request->hasFile('paktaIntegritas')) {
            $fileRules['paktaIntegritas'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];
        }
        if ($request->hasFile('biodataMahasiswa')) {
            $fileRules['biodataMahasiswa'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];
        }
        if ($request->hasFile('foto')) {
            $fileRules['foto'] = ['file', 'max:5120', new SafeFile(['image/jpeg', 'image/png'])];
        }
        if ($request->hasFile('ktp')) {
            $fileRules['ktp'] = ['file', 'max:5120', new SafeFile(['image/jpeg', 'image/png'])];
        }
        if ($request->hasFile('transkripS1')) {
            $fileRules['transkripS1'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];
        }
        if ($request->hasFile('ijazah')) {
            $fileRules['ijazah'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];
        }
        if ($request->hasFile('suratKeteranganSehat')){
            $fileRules['suratKeteranganSehat'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];;
        }
        if ($request->hasFile('suratKeteranganBerkelakuanBaik')){
            $fileRules['suratKeteranganBerkelakuanBaik'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];;
        }
        if ($request->hasFile('suratBebasNarkoba')){
            $fileRules['suratBebasNarkoba'] = ['file', 'max:5120', new SafeFile(['application/pdf'])];;
        }
        if ($request->hasFile('npwp')){
            $fileRules['npwp'] = ['file', 'max:5120', new SafeFile(['image/jpeg', 'image/png'])];;
        }
        
        if (!empty($fileRules)) {
            $validator = Validator::make($request->all(), $fileRules);
        
            if ($validator->fails()) {
                return response()->json([
                    "Title" => "berkasTambahan.invalidValidation",
                    "Detail" => $validator->errors(),
                ], 500);
            }
        }
        
        try {
            $berkasTambahan                    = pengajuan::where('uuid',$request->uuidPendaftaran)->firstOrFail();
            if($request->has("paktaIntegritas") && $request->hasFile("paktaIntegritas")){
                $uuid = Uuid::uuid4()->toString();
                $filePaktaIntegritas = $uuid.".".strtolower($request->file("paktaIntegritas")->getClientOriginalExtension());
                $request->file("paktaIntegritas")->storeAs('/', $filePaktaIntegritas, ['disk' => "paktaIntegritas"]);
                $berkasTambahan->paktaIntegritas              = $filePaktaIntegritas;

                chmod(public_path('paktaIntegritas/' . $filePaktaIntegritas), 0644);
            } else{
                $berkasTambahan->paktaIntegritas = $request->paktaIntegritas;
            }

            if($request->has("biodataMahasiswa") && $request->hasFile("biodataMahasiswa")){
                $uuid = Uuid::uuid4()->toString();
                $fileBiodataMahasiswa = $uuid.".".strtolower($request->file("biodataMahasiswa")->getClientOriginalExtension());
                $request->file("biodataMahasiswa")->storeAs('/', $fileBiodataMahasiswa, ['disk' => "biodataMahasiswa"]);
                $berkasTambahan->biodataMahasiswa              = $fileBiodataMahasiswa;

                chmod(public_path('biodataMahasiswa/' . $fileBiodataMahasiswa), 0644);
            } else{
                $berkasTambahan->biodataMahasiswa = $request->biodataMahasiswa;
            }

            if($request->has("foto") && $request->hasFile("foto")){
                $uuid = Uuid::uuid4()->toString();
                $fileFoto = $uuid.".".strtolower($request->file("foto")->getClientOriginalExtension());
                $request->file("foto")->storeAs('/', $fileFoto, ['disk' => "foto"]);
                $berkasTambahan->foto              = $fileFoto;

                chmod(public_path('foto/' . $fileFoto), 0644);
            } else{
                $berkasTambahan->foto = $request->foto;
            }

            if($request->has("ktp") && $request->hasFile("ktp")){
                $uuid = Uuid::uuid4()->toString();
                $fileKtp = $uuid.".".strtolower($request->file("ktp")->getClientOriginalExtension());
                $request->file("ktp")->storeAs('/', $fileKtp, ['disk' => "ktp"]);
                $berkasTambahan->ktp              = $fileKtp;

                chmod(public_path('ktp/' . $fileKtp), 0644);
            } else{
                $berkasTambahan->ktp = $request->ktp;
            }

            if($request->has("transkripS1") && $request->hasFile("transkripS1")){
                $uuid = Uuid::uuid4()->toString();
                $fileTranskripS1 = $uuid.".".strtolower($request->file("transkripS1")->getClientOriginalExtension());
                $request->file("transkripS1")->storeAs('/', $fileTranskripS1, ['disk' => "transkripS1"]);
                $berkasTambahan->transkripS1              = $fileTranskripS1;

                chmod(public_path('transkripS1/' . $fileTranskripS1), 0644);
            } else{
                $berkasTambahan->transkripS1 = $request->transkripS1;
            }

            if($request->has("ijazah") && $request->hasFile("ijazah")){
                $uuid = Uuid::uuid4()->toString();
                $fileIjazah = $uuid.".".strtolower($request->file("ijazah")->getClientOriginalExtension());
                $request->file("ijazah")->storeAs('/', $fileIjazah, ['disk' => "ijazah"]);
                $berkasTambahan->ijazah              = $fileIjazah;

                chmod(public_path('ijazah/' . $fileIjazah), 0644);
            } else{
                $berkasTambahan->ijazah = $request->ijazah;
            }

            if($request->has("suratKeteranganSehat") && $request->hasFile("suratKeteranganSehat")){
                $uuid = Uuid::uuid4()->toString();
                $fileSuratKeteranganSehat = $uuid.".".strtolower($request->file("suratKeteranganSehat")->getClientOriginalExtension());
                $request->file("suratKeteranganSehat")->storeAs('/', $fileSuratKeteranganSehat, ['disk' => "suratKeteranganSehat"]);
                $berkasTambahan->suratKeteranganSehat              = $fileSuratKeteranganSehat;

                chmod(public_path('suratKeteranganSehat/' . $fileSuratKeteranganSehat), 0644);
            } else{
                $berkasTambahan->ijazah = $request->ijazah;
            }

            if($request->has("suratKeteranganBerkelakuanBaik") && $request->hasFile("suratKeteranganBerkelakuanBaik")){
                $uuid = Uuid::uuid4()->toString();
                $fileSuratKeteranganBerkelakuanBaik = $uuid.".".strtolower($request->file("suratKeteranganBerkelakuanBaik")->getClientOriginalExtension());
                $request->file("suratKeteranganBerkelakuanBaik")->storeAs('/', $fileSuratKeteranganBerkelakuanBaik, ['disk' => "suratKeteranganBerkelakuanBaik"]);
                $berkasTambahan->suratKeteranganBerkelakuanBaik              = $fileSuratKeteranganBerkelakuanBaik;

                chmod(public_path('suratKeteranganBerkelakuanBaik/' . $fileSuratKeteranganBerkelakuanBaik), 0644);
            } else{
                $berkasTambahan->suratKeteranganBerkelakuanBaik = $request->suratKeteranganBerkelakuanBaik;
            }

            if($request->has("suratBebasNarkoba") && $request->hasFile("suratBebasNarkoba")){
                $uuid = Uuid::uuid4()->toString();
                $fileSuratBebasNarkoba = $uuid.".".strtolower($request->file("suratBebasNarkoba")->getClientOriginalExtension());
                $request->file("suratBebasNarkoba")->storeAs('/', $fileSuratBebasNarkoba, ['disk' => "suratBebasNarkoba"]);
                $berkasTambahan->suratBebasNarkoba              = $fileSuratBebasNarkoba;

                chmod(public_path('suratBebasNarkoba/' . $fileSuratBebasNarkoba), 0644);
            } else{
                $berkasTambahan->ijazah = $request->ijazah;
            }

            if($request->has("npwp") && $request->hasFile("npwp")){
                $uuid = Uuid::uuid4()->toString();
                $fileNpwp = $uuid.".".strtolower($request->file("npwp")->getClientOriginalExtension());
                $request->file("npwp")->storeAs('/', $fileNpwp, ['disk' => "npwp"]);
                $berkasTambahan->npwp              = $fileNpwp;

                chmod(public_path('npwp/' . $fileNpwp), 0644);
            } else{
                $berkasTambahan->npwp = $request->npwp;
            }
            $berkasTambahan->status = "done";
            
            if($berkasTambahan->isDirty())
            $berkasTambahan->save();

            return response()->noContent();
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "berkasTambahan.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage()
            ],400);
        }

    }
}
