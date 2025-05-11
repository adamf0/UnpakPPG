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
            'nomorUKG'  => $row["no_ukg"],
            'nim'       => $row["npm"],
        ]);
    }
}
