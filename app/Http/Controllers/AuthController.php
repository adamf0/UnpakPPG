<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function authPage(){
        return Inertia::render("Auth",[]);
    }
    public function doLogin(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "Title" => "auth.invalidValidation",
                    "Detail" => "username dan password tidak boleh kosong",
                ], 500);
            }

            $credentials = $request->only('username', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $request->session()->put('user', $user->uuid);

                return response()->json($user->uuid);
            } else {
                return response()->json([
                    "Title" => "auth.InvalidAccount",
                    "Detail" => "akun tidak ditemukan",
                ],500);
            }
        } catch (\Throwable $th) {
            return response()->json([
                "Title" => "auth.commonError",
                "Detail" => "ada yg salah pada aplikasi",
                // "Error" => $th->getMessage()
            ],400);
        }

        return redirect()->to("login");
    }
    public function doLogOut(Request $request){
        $request->session()->flush();
        return redirect()->to("login");
    }
}
