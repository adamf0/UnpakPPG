<?php

namespace App\Http\Controllers;

use App\Models\pengaturan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function Index(){
        $pengaturan = pengaturan::first();
        $linkWa = $pengaturan?->link_wa ?? "";

        return Inertia::render("Setting/Index", [
            "linkWa" => $linkWa,
        ]);
    }

    public function Save(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'link_wa' => ['required', 'string'],
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "Title" => "setting.invalidValidation",
                    "Detail" => $validator->errors(),
                ], 500);
            }

            $pengaturan = pengaturan::first();
            if ($pengaturan == null) {
                $pengaturan = new pengaturan();
            }
            $pengaturan->link_wa = $request->link_wa;
            $pengaturan->save();

            return response()->json($pengaturan, 200);
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "setting.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                "Error" => $th->getMessage(),
            ], 400);
        }
    }
}
