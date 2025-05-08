import React from 'react';
import MainPage from '../mainPage';
import Input from "@src/components/Input";
import Button from "@src/components/Button";
import { useEffect, useState } from "react";

function PendaftaranPage({activeMenu}) {
    const [nomorUKG, setNomorUKG] = useState("");
    const [frame, setFrame] = useState("init");
    
    function CreateDataHandler(){
        
    }

    function renderFrame(){
        if(frame=="init"){
            return InitialPage()
        }
    }
    
    function InitialPage(){
        return <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Masukkan Nomor UKG</h2>

            <div className="flex flex-row mb-6 p-4 rounded-lg">
                <Input
                    label="Nomor UKG"
                    showLabel={false}
                    type="text"
                    value={nomorUKG}
                    onChange={(e) => setNomorUKG(e.target.value)}
                    required
                >
                    {/* <p className="text-green-500 text-sm mt-1">Data pengajuan sudah terdaftar</p>
                    <p className="text-red-500 text-sm mt-1">Data pengajuan belum terdaftar</p> */}
                </Input>
                <Button 
                    onClick = {()=> CreateDataHandler()()}
                    className = ""
                    loading={false}> 
                    Cek
                </Button>
            </div>
        </>
    }
    return (
        <MainPage activeMenu={activeMenu}>
            <div className='mx-auto px-2 sm:px-6 lg:px-8 py-4'>
                <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 self-start">
                    {renderFrame()}
                </div>
            </div>
        </MainPage>
    );
}

export default PendaftaranPage;