<?php

namespace App\Exports;

use App\Models\LaporDiri;
use App\Models\mahasiswa;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class LaporDiriExport implements FromCollection, WithHeadings, WithTitle
{
    protected $filter_status;

    // Constructor to pass the filter status
    public function __construct($filter_status)
    {
        $this->filter_status = $filter_status;
    }

    // Define the collection to be exported
    public function collection()
    {
        $isDev = env("DEPLOY","dev")=="dev";

        if ($this->filter_status == '!done') {
            return DB::table("all_record")
                    ->select("all_record.*","mahasiswa.nama","mahasiswa.bidangStudi",DB::raw("mahasiswa.noHP as nomorHp"))
                    ->join("mahasiswa", "all_record.nomorUKG", "mahasiswa.nomorUKG")
                    ->whereNull("status")
                    ->get()
                    ->map(function($mahasiswa) use($isDev){
                        return [
                            $mahasiswa->bidangStudi,
                            "'".$mahasiswa->nomorUKG,
                            "'".$mahasiswa->nim,
                            "'".$mahasiswa->nik,
                            $mahasiswa->nama,
                            $mahasiswa->namaPeserta,
                            $mahasiswa->jenisKelamin,
                            $mahasiswa->tempatLahir,
                            $mahasiswa->tanggalLahir,
                            $mahasiswa->agama,
                            $mahasiswa->wargaNegara,
                            $mahasiswa->statusSipil,
                            "'".(empty($mahasiswa->noHp)? $mahasiswa->nomorHp:$mahasiswa->noHp),
                            $mahasiswa->alamatEmail,
                            $mahasiswa->alamatTinggal,
                            "'".$mahasiswa->rt,
                            "'".$mahasiswa->rw,
                            $mahasiswa->kelurahan,
                            $mahasiswa->kecamatan,
                            "'".$mahasiswa->kodePos,
                            $mahasiswa->namaIbu,
                            $mahasiswa->namaAyah,
                            $mahasiswa->alamatAyahIbu,
                            "'".$mahasiswa->hpAyahIbu,
                            "'".$mahasiswa->hpKerabat,
                            $mahasiswa->sekolahMengajar,
                            $mahasiswa->alamatSekolah,
                            "'".$mahasiswa->telpSekolah,
                            "",
                            "",
                            
                            empty($mahasiswa->paktaIntegritas)?                 "" : ($isDev? asset('paktaIntegritas/' . $mahasiswa->paktaIntegritas)                                   : secure_asset('paktaIntegritas/' . $mahasiswa->paktaIntegritas)),
                            empty($mahasiswa->biodataMahasiswa)?                "" : ($isDev? asset('biodataMahasiswa/' . $mahasiswa->biodataMahasiswa)                                 : secure_asset('biodataMahasiswa/' . $mahasiswa->biodataMahasiswa)),
                            empty($mahasiswa->ijazah)?                          "" : ($isDev? asset('ijazah/' . $mahasiswa->ijazah)                                                     : secure_asset('ijazah/' . $mahasiswa->ijazah)),
                            empty($mahasiswa->transkripS1)?                     "" : ($isDev? asset('transkripS1/' . $mahasiswa->transkripS1)                                           : secure_asset('transkripS1/' . $mahasiswa->transkripS1)),
                            empty($mahasiswa->ktp)?                             "" : ($isDev? asset('ktp/' . $mahasiswa->ktp)                                                           : secure_asset('ktp/' . $mahasiswa->ktp)),
                            empty($mahasiswa->foto)?                            "" : ($isDev? asset('foto/' . $mahasiswa->foto)                                                         : secure_asset('foto/' . $mahasiswa->foto)),
                            empty($mahasiswa->suratKeteranganSehat)?            "" : ($isDev? asset('suratKeteranganSehat/' . $mahasiswa->suratKeteranganSehat)                         : secure_asset('suratKeteranganSehat/' . $mahasiswa->suratKeteranganSehat)),
                            empty($mahasiswa->suratKeteranganBerkelakuanBaik)?  "" : ($isDev? asset('suratKeteranganBerkelakuanBaik/' . $mahasiswa->suratKeteranganBerkelakuanBaik)     : secure_asset('suratKeteranganBerkelakuanBaik/' . $mahasiswa->suratKeteranganBerkelakuanBaik)),
                            empty($mahasiswa->suratBebasNarkoba)?               "" : ($isDev? asset('suratBebasNarkoba/' . $mahasiswa->suratBebasNarkoba)                               : secure_asset('suratBebasNarkoba/' . $mahasiswa->suratBebasNarkoba)),
                            empty($mahasiswa->npwp)?                            "" : ($isDev? asset('npwp/' . $mahasiswa->npwp)                                                         : secure_asset('npwp/' . $mahasiswa->npwp)),
                        ];
                    });
        } else {
            // If the filter is 'registered', fetch data based on the status
            return LaporDiri::select("pendaftaran.*","mahasiswa.nama", "mahasiswa.bidangStudi", "mahasiswa.jenjangSekolah", "mahasiswa.provinsi", DB::raw("mahasiswa.noHP as nomorHp"))
                    ->join("mahasiswa", "pendaftaran.nomorUKG", "mahasiswa.nomorUKG")
                    ->where('status', $this->filter_status)
                    ->get()
                    ->map(function($mahasiswa) use($isDev){
                        return [
                            $mahasiswa->bidangStudi,
                            "'".$mahasiswa->nomorUKG,
                            "'".$mahasiswa->nim,
                            "'".$mahasiswa->nik,
                            $mahasiswa->nama,
                            $mahasiswa->namaPeserta,
                            $mahasiswa->jenisKelamin,
                            $mahasiswa->tempatLahir,
                            $mahasiswa->tanggalLahir,
                            $mahasiswa->agama,
                            $mahasiswa->wargaNegara,
                            $mahasiswa->statusSipil,
                            "'".(empty($mahasiswa->noHp)? $mahasiswa->nomorHp:$mahasiswa->noHp),
                            $mahasiswa->alamatEmail,
                            $mahasiswa->alamatTinggal,
                            "'".$mahasiswa->rt,
                            "'".$mahasiswa->rw,
                            $mahasiswa->kelurahan,
                            $mahasiswa->kecamatan,
                            "'".$mahasiswa->kodePos,
                            $mahasiswa->namaIbu,
                            $mahasiswa->namaAyah,
                            $mahasiswa->alamatAyahIbu,
                            "'".$mahasiswa->hpAyahIbu,
                            "'".$mahasiswa->hpKerabat,
                            $mahasiswa->sekolahMengajar,
                            $mahasiswa->alamatSekolah,
                            "'".$mahasiswa->telpSekolah,
                            $mahasiswa->jenjangSekolah,
                            $mahasiswa->provinsi,
                            
                            empty($mahasiswa->paktaIntegritas)?                 "" : ($isDev? asset('paktaIntegritas/' . $mahasiswa->paktaIntegritas)                                   : secure_asset('paktaIntegritas/' . $mahasiswa->paktaIntegritas)),
                            empty($mahasiswa->biodataMahasiswa)?                "" : ($isDev? asset('biodataMahasiswa/' . $mahasiswa->biodataMahasiswa)                                 : secure_asset('biodataMahasiswa/' . $mahasiswa->biodataMahasiswa)),
                            empty($mahasiswa->ijazah)?                          "" : ($isDev? asset('ijazah/' . $mahasiswa->ijazah)                                                     : secure_asset('ijazah/' . $mahasiswa->ijazah)),
                            empty($mahasiswa->transkripS1)?                     "" : ($isDev? asset('transkripS1/' . $mahasiswa->transkripS1)                                           : secure_asset('transkripS1/' . $mahasiswa->transkripS1)),
                            empty($mahasiswa->ktp)?                             "" : ($isDev? asset('ktp/' . $mahasiswa->ktp)                                                           : secure_asset('ktp/' . $mahasiswa->ktp)),
                            empty($mahasiswa->foto)?                            "" : ($isDev? asset('foto/' . $mahasiswa->foto)                                                         : secure_asset('foto/' . $mahasiswa->foto)),
                            empty($mahasiswa->suratKeteranganSehat)?            "" : ($isDev? asset('suratKeteranganSehat/' . $mahasiswa->suratKeteranganSehat)                         : secure_asset('suratKeteranganSehat/' . $mahasiswa->suratKeteranganSehat)),
                            empty($mahasiswa->suratKeteranganBerkelakuanBaik)?  "" : ($isDev? asset('suratKeteranganBerkelakuanBaik/' . $mahasiswa->suratKeteranganBerkelakuanBaik)     : secure_asset('suratKeteranganBerkelakuanBaik/' . $mahasiswa->suratKeteranganBerkelakuanBaik)),
                            empty($mahasiswa->suratBebasNarkoba)?               "" : ($isDev? asset('suratBebasNarkoba/' . $mahasiswa->suratBebasNarkoba)                               : secure_asset('suratBebasNarkoba/' . $mahasiswa->suratBebasNarkoba)),
                            empty($mahasiswa->npwp)?                            "" : ($isDev? asset('npwp/' . $mahasiswa->npwp)                                                         : secure_asset('npwp/' . $mahasiswa->npwp)),
                        ];
                    });
        }
    }

    // Define the column headings for the Excel file
    public function headings(): array
    {
        return [
            "Bidang Studi PPG",
            "Nomor UKG",
            "NIM",
            "NIK",
            "Nama Peserta (Sesuai SIM PKB)",
            "Nama Peserta (Jika Tidak Sesuai SIM PKB)",
            "Jenis Kelamin",
            "Tempat Lahir",
            "Tanggal Lahir",
            "Agama",
            "Warga Negara",
            "Status Sipil",
            "No HP (Whatsapp)",
            "Alamat Email",
            "Alamat Tinggal",
            "RT",
            "RW",
            "Kelurahan",
            "Kecamatan",
            "Kode Pos",
            "Nama Ibu",
            "Nama Ayah",
            "Alamat Ayah dan Ibu",
            "No. Hp Ayah dan Ibu",
            "Handphone (Kerabat/Kontak Darurat)",
            "Asal Sekolah Tempat Mengajar Sekarang",
            "Alamat Lengkap (Sekolah/Tempat Mengajar)",
            "Telepon (No Kontak Sekolah)",
            "Jenjang Sekolah",
            "Provinsi",
            
            "Pakta Integritas",
            "Biodata Mahasiswa",
            "Scan Ijazah S1/DIV yang dilegalisir",
            "Scan Transkrip Nilai S1/DIV",
            "Scan Kartu Identitas KTP/SIM",
            "Pas Foto ",
            "Surat Keterangan Sehat",
            "Surat Keterangan Berkelakuan Baik dari Kepolisian",
            "Surat Bebas Narkotika, Psikotropika, dan Zat adiktif lainnya/NAPZA ",
            "NPWP",
        ];
    }

    // Optional: Define the title of the sheet
    public function title(): string
    {
        return 'Lapor Diri Data';  // Name of the sheet
    }
}
