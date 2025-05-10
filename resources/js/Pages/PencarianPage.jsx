import React from 'react';
import MainPage from '../mainPage';
import Input from "@src/components/Input";
import Button from "@src/components/Button";
import { useEffect, useState } from "react";
import { apiProduction } from "@src/Persistance/API";

function PencarianPage({activeMenu}) {
    const [nomorUKG, setNomorUKG] = useState("");
    const [errNomorUKG, setErrNomorUKG] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataFound, setDataFound] = useState(null);

    async function CekDataHandler(){
        setLoading(true)
        try {
            console.log(`execute CekDataHandler to call /api/check-data`)
            const response = await apiProduction.post("/api/check-data", {
                nomorUKG: nomorUKG??""
            });

            if (response.status === 200 || response.status === 204) {
                setDataFound("data ditemukan");
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                setDataFound(detail);
            } else if(status === 500){
                if(error.response?.data?.Title=="pencarian.invalidValidation"){
                    setErrNomorUKG(detail.nomorUKG)
                } else{
                    setDataFound(detail);
                }
            } else{
                console.error(detail)
            }
        } finally {
            setLoading(false)
        }
    }

    function renderStatus(){
        if(dataFound=="data ditemukan"){
            return <p className="text-green-500 text-sm mt-1">Data pengajuan sudah terdaftar</p>
        } else if(dataFound != null){
            return <p className="text-red-500 text-sm mt-1">{dataFound}</p>
        }

        return
    }
    return (
        <MainPage activeMenu={activeMenu}>
            <div className='mx-auto px-2 sm:px-6 lg:px-8 py-4'>
                <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pengecekan Laporan Diri</h2>

                    <div className="flex flex-row items-end gap-2 rounded-lg">
                        <Input
                            label=""
                            type="text"
                            value={nomorUKG}
                            onChange={(e) => {
                                if(errNomorUKG.length>0){
                                    setErrNomorUKG([])
                                }
                                setNomorUKG(e.target.value)
                            }}
                        >
                            {renderStatus()}
                        </Input>
                        <Button 
                            onClick = {()=> CekDataHandler()}
                            className = "h-fit"
                            loading={loading}> 
                            Cek
                        </Button>
                    </div>
                    {errNomorUKG.map(err => <p className="text-red-500 text-sm">{err}</p>)}

                </div>
            </div>
        </MainPage>
    );
}

export default  PencarianPage;