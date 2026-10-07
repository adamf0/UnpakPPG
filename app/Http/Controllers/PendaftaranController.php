<?php

namespace App\Http\Controllers;

use App\Models\berkasTambahan;
use App\Models\mahasiswa;
use App\Models\pengajuan;
use App\Models\pengaturan;
use App\Rules\SafeFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class PendaftaranController extends Controller
{
    public function pendaftaranPage(){
        $pengaturan = pengaturan::first();
        $linkWa = $pengaturan?->link_wa ?? "";
        $linkWa2 = $pengaturan?->link_wa2 ?? "";

        return Inertia::render("PendaftaranPage",[
            'activeMenu' => 'Pendaftaran',
            'linkWa' => $linkWa,
            'linkWa2' => $linkWa2,
        ]);
    }
}
