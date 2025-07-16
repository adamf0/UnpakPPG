<?php

namespace App\Imports;

use App\Models\mahasiswa;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MahasiswaImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new mahasiswa([
            'nomorUKG'          => $row["nomorUKG"],
            'nim'               => $row["nim"],
            'nik'               => $row["nik"],
            'nama'              => $row["nama"],
            'bidangStudi'       => $row["bidangStudi"],
            'email'             => $row["email"],
            'noHP'              => $row["noHP"],
            'jenjangSekolah'    => $row["jenjangSekolah"] ?? null,
            'provinsi'          => $row["provinsi"] ?? null,
        ]);
    }
}
