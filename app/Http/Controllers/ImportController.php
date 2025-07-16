<?php

namespace App\Http\Controllers;

use App\Imports\MahasiswaImport;
use App\Models\mahasiswa;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function Index(){
        return Inertia::render("Import/Index",[]);
    }
}
