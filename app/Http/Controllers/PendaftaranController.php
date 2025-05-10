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

class PendaftaranController extends Controller
{
    public function pendaftaranPage(){
        return Inertia::render("PendaftaranPage",['activeMenu'=>'Pendaftaran']);
    }
}
