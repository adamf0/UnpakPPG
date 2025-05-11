import React from 'react';
import MainPage from '@src/mainPage';
import Input from "@src/components/Input";
import Select from "@src/components/Select";
import Button from "@src/components/Button";
import RadioGroup from "@src/components/RadioGroup";
import Textarea from "@src/components/Textarea";
import { useEffect, useState, useRef } from "react";
import Stepper from '@src/Components/Stepper';
import { apiProduction } from "@src/Persistance/API";

const StepEnum = {
    PENGAJUAN: "Pengajuan",
    BIODATA_PDDIKTI: "Biodata PDDIKTI",
    KETENTUAN_LAPOR_DIRI: "Ketentuan Lapor Diri"
};
Object.prototype.isEmpty = function() {
    return this === null || this === undefined || this === '' || 
           (Array.isArray(this) && this.length === 0) || 
           (typeof this === 'object' && Object.keys(this).length === 0);
};
  
function PendaftaranPage({ activeMenu }) {
    const steps = Object.values(StepEnum);
    const [frame, setFrame] = useState(StepEnum.BIODATA_PDDIKTI);
    const [loading, setLoading] = useState(false);
    const [loadingFrame, setLoadingFrame] = useState(false);
    const [errListBiodata, setErrListBiodata] = useState({});
    const [errListBerkasTambahan, setErrListBerkasTambahan] = useState({});

    const [errNomorUKG, setErrNomorUKG] = useState([]);
    const [uuidPendaftaran, setUuidPendaftaran] = useState("9bd81aef-cd94-4fba-9e7b-2180e18c06d1");
    const [biodata, setBiodata] = useState(null);
    const [berkasTambahan, setBerkasTambahan] = useState(null);
    
    const [nomorUKG,setNomorUKG] = useState("");
    const [nim,setNim] = useState("");
    const [nik,setNik] = useState("");
    const [namaPeserta,setNamaPeserta] = useState("");
    const [tempatLahir,setTempatLahir] = useState("");
    const [tanggalLahir,setTanggalLahir] = useState("");
    const [jenisKelamin,setJenisKelamin] = useState("");
    const [agama,setAgama] = useState("");
    const [agamaOptions,setAgamaOptions] = useState([
        {
            value: "I",
            label: "Islam",
        },
        {
            value: "K",
            label: "Katolik",
        },
        {
            value: "P",
            label: "Protestan ",
        },
        {
            value: "B",
            label: "Budha",
        },
        {
            value: "G",
            label: "Konghuchu",
        },
        {
            value: "L",
            label: "Lain",
        },
    ]);
    const [wargaNegara,setWargaNegara] = useState("");
    const [wargaNegaraOptions,setWargaNegaraOptions] = useState([
        {
            value: "I",
            label: "Indonesia",
        },
        {
            value: "A",
            label: "Asing",
        }
    ]);
    const [statusSipil,setStatusSipil] = useState("");
    const [statusSipilOptions,setStatusSipilOptions] = useState([
        {
            value: "B",
            label: "Bujangan",
        },
        {
            value: "K",
            label: "Menikah",
        },
        {
            value: "J",
            label: "Janda",
        },
        {
            value: "D",
            label: "Duda",
        }
    ]);
    const [noHp,setNomorHp] = useState("");
    const [alamatEmail,setAlamatEmail] = useState("");
    const [alamatTinggal,setAlamatTinggal] = useState("");
    const [rt,setRT] = useState("");
    const [rw,setRW] = useState("");
    const [kelurahan,setKelurahan] = useState("");
    const [kecamatan,setKecamatan] = useState("");
    const [kodePos,setKodePos] = useState("");


    const [jenisTinggal,setJenisTinggal ] = useState("");
    const [jenisTinggalOptions,setJenisTinggalOptions] = useState([
        {
            value: 1,
            label: "Bersama Orang Tua",
        },
        {
            value: 2,
            label: "Wali",
        },
        {
            value: 3,
            label: "Kost",
        },
        {
            value: 4,
            label: "Asrama",
        },
        {
            value: 5,
            label: "Panti Asuhan",
        },
        {
            value: 99,
            label: "Lain - Lain",
        },
    ]);
    const [namaIbu,setNamaIbu ] = useState("");
    const [namaAyah,setNamaAyah ] = useState("");
    const [alamatAyahIbu,setAlamatAyahIbu ] = useState("");
    const [hpAyahIbu,setHpAyahIbu ] = useState("");
    const [hpKerabat,setHpKerabat ] = useState("");
    const [sekolahMengajar,setSekolahMengajar ] = useState("");
    const [alamatSekolah,setAlamatSekolah ] = useState("");
    const [telpSekolah,setTelpSekolah ] = useState("");

    const [paktaIntegritas,setPaktaIntegritas] = useState("");
    const [biodataMahasiswa,setBiodataMahasiswa] = useState("");

    const ijazahRef = useRef(null);
    const [ijazah, setIjazah] = useState(null);
    const [ijazahPreview, setIjazahPreview] = useState(null);

    const transkripS1Ref = useRef(null);
    const [transkripS1, setTranskripS1] = useState(null);
    const [transkripS1Preview, setTranskripS1Preview] = useState(null);

    const ktpRef = useRef(null);
    const [ktp, setKtp] = useState(null);
    const [ktpPreview, setKtpPreview] = useState(null);

    const fotoRef = useRef(null);
    const [foto, setFoto] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    
    const handleIjazahChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIjazah(file);
            setIjazahPreview(URL.createObjectURL(file));
            setErrListBerkasTambahan(prev => {
                const { ijazah, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetIjazah = () => {
        setIjazah(null);
        setIjazahPreview(null);
        if (ijazahRef.current) {
            ijazahRef.current.value = "";
        }
    }

    const handleTranskripS1Change = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTranskripS1(file);
            setTranskripS1Preview(file?.name ?? "");
            setErrListBerkasTambahan(prev => {
                const { transkripS1, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetTranskripS1 = () => {
        setTranskripS1(null);
        setTranskripS1Preview(null);
        if (transkripS1Ref.current) {
            transkripS1Ref.current.value = "";
        }
    }

    const handleKtpChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setKtp(file);
            setKtpPreview(URL.createObjectURL(file));
            setErrListBerkasTambahan(prev => {
                const { ktp, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetKtp = () => {
        setKtp(null);
        setKtpPreview(null);
        if (ktpRef.current) {
            ktpRef.current.value = "";
        }
    }

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(file);
            setFotoPreview(URL.createObjectURL(file));
            setErrListBerkasTambahan(prev => {
                const { foto, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetFoto = () => {
        setFoto(null);
        setFotoPreview(null);
        if (fotoRef.current) {
            fotoRef.current.value = "";
        }
    }

    useEffect(()=>{
        if(uuidPendaftaran!=null){
            setFrame(StepEnum.BIODATA_PDDIKTI);
            loadBiodata();
        }
    },[uuidPendaftaran])

    useEffect(()=>{
        if(frame===StepEnum.KETENTUAN_LAPOR_DIRI){
            loadBerkasTambahan();
        }
    },[frame])

    async function loadBiodata(){
        setLoadingFrame(true)
        try {
            console.log(`execute call /api/info-pendaftaran/${uuidPendaftaran}/biodata_diri`)
            const response = await apiProduction.get(`/api/info-pendaftaran/${uuidPendaftaran}/biodata_diri`);

            if (response.status === 200 || response.status === 204) {
                setBiodata(response?.data);

                setNomorUKG(response?.data?.nomorUKG ?? "");
                setNim(response?.data?.nim ?? "");
                setNik(response?.data?.nik ?? "");
                setNamaPeserta(response?.data?.namaPeserta ?? "");
                setTempatLahir(response?.data?.tempatLahir ?? "");
                setTanggalLahir(response?.data?.tanggalLahir ?? "");
                setJenisKelamin(response?.data?.jenisKelamin ?? "");
                setAgama(response?.data?.agama ?? "");
                setWargaNegara(response?.data?.wargaNegara ?? "");
                setStatusSipil(response?.data?.statusSipil ?? "");
                setNomorHp(response?.data?.noHp ?? "");
                setAlamatEmail(response?.data?.alamatEmail ?? "");
                setAlamatTinggal(response?.data?.alamatTinggal ?? "");
                setRT(response?.data?.rt ?? "");
                setRW(response?.data?.rw ?? "");
                setKelurahan(response?.data?.kelurahan ?? "");
                setKecamatan(response?.data?.kecamatan ?? "");
                setKodePos(response?.data?.kodePos ?? "");
                setJenisTinggal(response?.data?.jenisTinggal ?? "");
                setNamaIbu(response?.data?.namaIbu ?? "");
                setNamaAyah(response?.data?.namaAyah ?? "");
                setAlamatAyahIbu(response?.data?.alamatAyahIbu ?? "");
                setHpAyahIbu(response?.data?.hpAyahIbu ?? "");
                setHpKerabat(response?.data?.hpKerabat ?? "");
                setSekolahMengajar(response?.data?.sekolahMengajar ?? "");
                setAlamatSekolah(response?.data?.alamatSekolah ?? "");
                setTelpSekolah(response?.data?.telpSekolah ?? "");
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title=="pendaftaran.invalidValidation"){
                    
                } else{
                    alert(detail)
                }
            } else{
                console.error(detail)
            }
            setFrame(StepEnum.PENGAJUAN)
        } finally {
            setLoadingFrame(false)
        }
    }
    async function loadBerkasTambahan(){
        setLoadingFrame(true)
        try {
            console.log(`execute call /api/info-pendaftaran/${uuidPendaftaran}/berkas_tambahan`)
            const response = await apiProduction.get(`/api/info-pendaftaran/${uuidPendaftaran}/berkas_tambahan`);

            if (response.status === 200 || response.status === 204) {
                setBerkasTambahan(response?.data);
                setPaktaIntegritas(response?.data?.paktaIntegritas ?? "")
                setBiodataMahasiswa(response?.data?.biodataMahasiswa ?? "")
                setIjazahPreview(response?.data?.ijazah.isEmpty()? "":`/ijazah/${response?.data?.ijazah}`)
                setTranskripS1Preview(response?.data?.transkripS1.isEmpty()? "":`/transkripS1/${response?.data?.transkripS1}`)
                setKtpPreview(response?.data?.ktp.isEmpty()? "":`/ktp/${response?.data?.ktp}`)
                setFotoPreview(response?.data?.foto.isEmpty()? "":`/foto/${response?.data?.foto}`)
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title=="berkasTamabahan.invalidValidation"){
                    
                } else{
                    alert(detail)
                }
            } else{
                console.error(error)
            }
            // setFrame(StepEnum.PENGAJUAN)
        } finally {
            setLoadingFrame(false)
        }
    }

    async function CreateDataHandler(){
        setLoading(true)
        try {
            console.log(`execute CreateDataHandler to call /api/create`)
            const response = await apiProduction.post("/api/create", {
                nomorUKG: nomorUKG??""
            });

            if (response.status === 200 || response.status === 204) {
                setUuidPendaftaran(response?.data);
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title=="pendaftaran.invalidValidation"){
                    setErrNomorUKG(detail.nomorUKG)
                } else{
                    alert(detail)
                }
            } else{
                console.error(detail)
            }
        } finally {
            setLoading(false)
        }
    }
    async function SaveBiodataHandler(){
        setLoading(true)
        try {
            console.log(`execute SaveBiodataHandler to call /api/save-biodata`)
            const response = await apiProduction.post("/api/save-biodata", {
                nomorUKG: nomorUKG ?? "",
                uuidPendaftaran: uuidPendaftaran ?? "",
                nik: nik ?? "",
                namaPeserta: namaPeserta ?? "",
                jenisKelamin: jenisKelamin ?? "",
                tempatLahir: tempatLahir ?? "",
                tanggalLahir: tanggalLahir ?? "",
                agama: agama ?? "",
                wargaNegara: wargaNegara ?? "",
                statusSipil: statusSipil ?? "",
                noHp: noHp.replaceAll("-","") ?? "",
                alamatEmail: alamatEmail ?? "",
                alamatTinggal: alamatTinggal ?? "",
                rt: rt ?? "",
                rw: rw ?? "",
                kelurahan: kelurahan ?? "",
                kecamatan: kecamatan ?? "",
                kodePos: kodePos ?? "",
                jenisTinggal: jenisTinggal ?? "",
                namaIbu: namaIbu ?? "",
                namaAyah: namaAyah ?? "",
                alamatAyahIbu: alamatAyahIbu ?? "",
                hpAyahIbu: hpAyahIbu.replaceAll("-","") ?? "",
                hpKerabat: hpKerabat.replaceAll("-","") ?? "",
                sekolahMengajar: sekolahMengajar ?? "",
                alamatSekolah: alamatSekolah ?? "",
                telpSekolah: telpSekolah.replaceAll("-","") ?? "",
            });

            if (response.status === 200 || response.status === 204) {
                setFrame(StepEnum.KETENTUAN_LAPOR_DIRI)
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title=="pendaftaran.invalidValidation"){
                    setErrListBiodata(detail)
                } else{
                    alert(detail)
                }
            } else{
                console.error(detail)
            }
        } finally {
            setLoading(false)
        }
    }
    async function SaveBerkasHandler(){
        setLoading(true)
        try {
            console.log(`execute SaveBerkasHandler to call /api/save-berkas`)
            const formData = new FormData();
            const input = {
                uuidPendaftaran,
                paktaIntegritas,
                biodataMahasiswa,
                foto,
                ktp,
                transkripS1,
                ijazah,
            };

            Object.entries(input).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            const response = await apiProduction.post("/api/save-berkas", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200 || response.status === 204) {
                alert("berhasil simpan data")
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title=="berkasTamabahan.invalidValidation"){
                    setErrListBerkasTambahan(detail)
                } else{
                    alert(detail)
                }
            } else{
                console.error(detail)
            }
        } finally {
            setLoading(false)
        }
    }

    function RenderFrame(){
        if(frame=="Pengajuan"){
            return InitialPage()
        } else if(frame=="Biodata PDDIKTI"){
            return BiodataPage()
        } else if(frame=="Ketentuan Lapor Diri"){
            return KetentuanLaporPage();
        }
    }

    function InitialPage(){
        return <>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Masukkan Nomor UKG</h2>

            <div className="flex flex-row rounded-lg">
                <Input
                    label="Nomor UKG"
                    showLabel={false}
                    type="text"
                    value={nomorUKG}
                    onChange={(e) => setNomorUKG(e.target.value)}
                >
                    {/* <p className="text-green-500 text-sm mt-1">Data pengajuan sudah terdaftar</p>
                    <p className="text-red-500 text-sm mt-1">Data pengajuan belum terdaftar</p> */}
                </Input>
                <Button 
                    onClick = {()=> CreateDataHandler()}
                    className = ""
                    loading={loading}> 
                    Lanjut
                </Button>
            </div>
            {errNomorUKG.map(err => <p className="text-red-500 text-sm">{err}</p>)}

        </>
    }
    function BiodataPage(){
        return loadingFrame? 
        <p>Sedang memuat data...</p>:
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Biodata Data Pribadi</h2>

            <div className="flex flex-col rounded-lg">
                <Input
                    label="Nomor UKG"
                    type="text"
                    value={nomorUKG}
                    onChange={(e) => {}}
                    disabled
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Input
                        label="NIM"
                        type="text"
                        value={biodata?.nim ?? " "}
                        placeholder="065110201"
                        onChange={(e) => {}}
                        disabled
                    />
                    
                    <Input
                        label="NIK"
                        type="text"
                        value={nik}
                        placeholder="3271222222220001"
                        onChange={(e) => {
                            setNik(e.target.value)
                            setErrListBiodata(prev => {
                                const { nik, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.nik ?? []}
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-2">
                        <Input
                            label="Nama Peserta"
                            type="text"
                            placeholder="masukkan nama"
                            value={namaPeserta}
                            onChange={(e) => {
                                setNamaPeserta(e.target.value)
                                setErrListBiodata(prev => {
                                    const { namaPeserta, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            errorMessageList={errListBiodata?.namaPeserta ?? []}
                            required
                        />
                    </div>

                    <div className="flex-2">
                        <RadioGroup //[pr] masil masalah state
                            label="Jenis Kelamin"
                            value={jenisKelamin}
                            onChange={(val) => {
                                console.log(val)
                                setJenisKelamin(val)
                                setErrListBiodata(prev => {
                                    const { jenisKelamin, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            options={[
                                { label: "Laki-laki", value: "L", id: "male" },
                                { label: "Perempuan", value: "P", id: "female" }
                            ]}
                            errorMessage=""
                            errorMessageList={errListBiodata?.jenisKelamin ?? []}
                            required
                        />
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Input
                        label="Tempat Lahir"
                        type="text"
                        value={tempatLahir}
                        placeholder="misal: bogor"
                        onChange={(e) => {
                            setTempatLahir(e.target.value)
                            setErrListBiodata(prev => {
                                const { tempatLahir, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.tempatLahir ?? []}
                        required
                    />

                    <Input
                        label="Tanggal Lahir"
                        type="date"
                        value={tanggalLahir}
                        placeholder="01/12/1999"
                        onChange={(e) => {
                            setTanggalLahir(e.target.value)
                            setErrListBiodata(prev => {
                                const { tanggalLahir, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.tanggalLahir ?? []}
                        required
                    />
                </div>

                <Select
                    label="Agama"
                    options={agamaOptions}
                    value={agama}
                    onChange={(value)=>{
                        setAgama(value)
                        setErrListBiodata(prev => {
                            const { agama, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBiodata?.agama ?? []}
                    required
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Select
                        label="Warga Negara"
                        options={wargaNegaraOptions}
                        value={wargaNegara}
                        onChange={(value)=>{
                            setWargaNegara(value)
                            setErrListBiodata(prev => {
                                const { wargaNegara, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.wargaNegara ?? []}
                        required
                    />

                    <Select
                        label="Status Sipil"
                        options={statusSipilOptions}
                        value={statusSipil}
                        onChange={(value)=>{
                            setStatusSipil(value)
                            setErrListBiodata(prev => {
                                const { statusSipil, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.statusSipil ?? []}
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Input
                        label="No. HP (WhatsAPP)"
                        type="tel"
                        value={noHp}
                        mask="____-____-______"
                        placeholder="0812-3456-7890"
                        onChange={(e) => {
                            setNomorHp(e.target.value)
                            setErrListBiodata(prev => {
                                const { noHp, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.noHp ?? []}
                        required
                    />

                    <Input
                        label="Alamat Email"
                        type="email"
                        value={alamatEmail}
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                            setAlamatEmail(e.target.value)
                            setErrListBiodata(prev => {
                                const { alamatEmail, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.alamatEmail ?? []}
                        required
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-2">
                        <Input
                            label="Alamat Tinggal"
                            type="text"
                            value={alamatTinggal}
                            placeholder="misal: Ciheuleut No.10"
                            onChange={(e) => {
                                setAlamatTinggal(e.target.value)
                                setErrListBiodata(prev => {
                                    const { alamatTinggal, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            errorMessageList={errListBiodata?.alamatTinggal ?? []}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="RT"
                            type="text"
                            value={rt}
                            mask="___"
                            placeholder="001"
                            onChange={(e) => {
                                if (e.target.value !="" && /^[0-9]+$/.test(e.target.value)) {
                                    setRT(e.target.value)
                                    setErrListBiodata(prev => {
                                        const { rt, ...rest } = prev;
                                        return rest;
                                    });
                                }
                            }}
                            errorMessageList={errListBiodata?.rt ?? []}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="RW"
                            type="text"
                            value={rw}
                            mask="___"
                            placeholder="001"
                            onChange={(e) => {
                                if (e.target.value !="" && /^[0-9]+$/.test(e.target.value)) {
                                    setRW(e.target.value)
                                    setErrListBiodata(prev => {
                                        const { rw, ...rest } = prev;
                                        return rest;
                                    });
                                }
                            }}
                            errorMessageList={errListBiodata?.rw ?? []}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Input
                        label="Kelurahan"
                        type="text"
                        value={kelurahan}
                        placeholder="misal: Baranangsiang"
                        onChange={(e) => {
                            setKelurahan(e.target.value)
                            setErrListBiodata(prev => {
                                const { kelurahan, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.kelurahan ?? []}
                        required
                    />

                    <Input
                        label="Kecamatan"
                        type="text"
                        value={kecamatan}
                        placeholder="misal: Bogor Tengah"
                        onChange={(e) => {
                            setKecamatan(e.target.value)
                            setErrListBiodata(prev => {
                                const { kecamatan, ...rest } = prev;
                                return rest;
                            });
                        }}
                        errorMessageList={errListBiodata?.kecamatan ?? []}
                        required
                    />

                    <Input
                        label="Kode POS"
                        type="text"
                        value={kodePos}
                        mask="_____"
                        placeholder="16100"
                        onChange={(e) => {
                            if (e.target.value !="" && /^[0-9]+$/.test(e.target.value)) {
                                setKodePos(e.target.value)
                                setErrListBiodata(prev => {
                                    const { kodePos, ...rest } = prev;
                                    return rest;
                                });
                            }
                        }}
                        errorMessageList={errListBiodata?.kodePos ?? []}
                        required
                    />
                </div>
                
            </div>
            
            <hr className="h-px my-8 bg-gray-600 border-0"/>

            <div className="flex flex-col mb-6 rounded-lg">
                <Select
                    label="Jenis Tinggal"
                    options={jenisTinggalOptions}
                    value={jenisTinggal}
                    onChange={(value)=>{
                        setJenisTinggal(value)
                        setErrListBiodata(prev => {
                            const { jenisTinggal, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBiodata?.jenisTinggal ?? []}
                    required
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-2">
                        <Input
                            label="Nama Ibu"
                            type="text"
                            value={namaIbu}
                            onChange={(e) => {
                                setNamaIbu(e.target.value)
                                setErrListBiodata(prev => {
                                    const { namaIbu, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            errorMessageList={errListBiodata?.namaIbu ?? []}
                            required
                        />
                    </div>
                    <div className="flex-2">
                        <Input
                            label="Nama Ayah"
                            type="text"
                            value={namaAyah}
                            onChange={(e) => {
                                setNamaAyah(e.target.value)
                                setErrListBiodata(prev => {
                                    const { namaAyah, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            errorMessageList={errListBiodata?.namaAyah ?? []}
                            required
                        />
                    </div>
                </div>

                <Textarea
                    label="Alamat Ayah dan Ibu"
                    type="text"
                    value={alamatAyahIbu}
                    onChange={(e) => {
                        setAlamatAyahIbu(e.target.value)
                        setErrListBiodata(prev => {
                            const { alamatAyahIbu, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBiodata?.alamatAyahIbu ?? []}
                    required
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-2">
                        <Input
                            label="No. Hp Ayah dan Ibu"
                            type="tel"
                            value={hpAyahIbu}
                            mask="____-____-______"
                            placeholder="0812-3456-7890"
                            onChange={(e) => {
                                    setHpAyahIbu(e.target.value)
                                    setErrListBiodata(prev => {
                                        const { hpAyahIbu, ...rest } = prev;
                                        return rest;
                                    });
                            }}
                            errorMessageList={errListBiodata?.hpAyahIbu ?? []}
                            required
                        />
                    </div>
                    <div className="flex-2">
                        <Input
                            label="Handphone (Kerabat/Kontak Darurat)"
                            type="tel"
                            value={hpKerabat}
                            mask="____-____-______"
                            placeholder="0812-3456-7890"
                            onChange={(e) => {
                                    setHpKerabat(e.target.value)
                                    setErrListBiodata(prev => {
                                        const { hpKerabat, ...rest } = prev;
                                        return rest;
                                    });
                            }}
                            errorMessageList={errListBiodata?.hpKerabat ?? []}
                            required
                        />  
                    </div>
                </div>

                <Input
                    label="Asal Sekolah Tempat Mengajar Sekarang"
                    type="text"
                    value={sekolahMengajar}
                    onChange={(e) => {
                        setSekolahMengajar(e.target.value)
                        setErrListBiodata(prev => {
                            const { sekolahMengajar, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBiodata?.sekolahMengajar ?? []}
                    required
                />

                <Textarea
                    label="Alamat Lengkap (Sekolah/Tempat Mengajar)"
                    type="text"
                    value={alamatSekolah}
                    onChange={(e) => {
                        setAlamatSekolah(e.target.value)
                        setErrListBiodata(prev => {
                            const { alamatSekolah, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBiodata?.alamatSekolah ?? []}
                    required
                />

                <Input
                    label="Telepon (No Kontak Sekolah)"
                    type="tel"
                    value={telpSekolah}
                    mask="____-____-______"
                    placeholder="0812-3456-7890"
                    onChange={(e) => {
                            setTelpSekolah(e.target.value)
                            setErrListBiodata(prev => {
                                const { telpSekolah, ...rest } = prev;
                                return rest;
                            });
                    }}
                    errorMessageList={errListBiodata?.telpSekolah ?? []}
                    required
                />
            </div>

            <div className="flex flex-col rounded-lg">
                <Button 
                    onClick = {()=> SaveBiodataHandler()}
                    className = ""
                    loading={loading}> 
                    Simpan dan Lanjut Pengajuan
                </Button>
            </div>
        </div>
    }
    function KetentuanLaporPage(){
        return loadingFrame? 
        <p>Sedang memuat data...</p>:
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Berkas Tambahan</h2>

            <div className="flex flex-col rounded-lg">
                <Input
                    label="A1 Pakta Integritas"
                    type="url"
                    value={paktaIntegritas}
                    placeholder="misal: http://drive.google.com/drive/folders/example"
                    onChange={(e) => {
                        setPaktaIntegritas(e.target.value)
                        setErrListBerkasTambahan(prev => {
                            const { paktaIntegritas, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBerkasTambahan?.paktaIntegritas ?? []}
                    required
                />

                <Input
                    label="Biodata Mahasiswa"
                    type="url"
                    value={biodataMahasiswa}
                    placeholder="misal: http://drive.google.com/drive/folders/example"
                    onChange={(e) => {
                        setBiodataMahasiswa(e.target.value)
                        setErrListBerkasTambahan(prev => {
                            const { biodataMahasiswa, ...rest } = prev;
                            return rest;
                        });
                    }}
                    errorMessageList={errListBerkasTambahan?.biodataMahasiswa ?? []}
                    required
                />

                <Input
                    inputRef={ijazahRef}
                    label="Scan Ijazah S1/DIV yang dilegalisir"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleIjazahChange}
                    accept="image/jpeg,image/png"
                    className="mb-3"
                >
                    {(errListBerkasTambahan?.ijazah??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.JPG, .JPEG & .PNG</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {ijazahPreview && (
                        <div className="relative max-w-min">
                            <img
                                src={ijazahPreview}
                                alt="Preview"
                                className="aspect-square max-w-[300px] rounded-md mb-3"
                            />
                            <button onClick={handlerResetIjazah} className="absolute top-0 right-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </Input>
                
                <div className="mb-6"></div>

                <Input
                    inputRef={transkripS1Ref}
                    label="Scan Transkrip Nilai S1/DIV"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleTranskripS1Change}
                    accept="application/pdf"
                    className="mb-3"
                >
                    {(errListBerkasTambahan?.transkripS1??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>

                    {transkripS1Preview && 
                    <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                        <div>
                            <div className="flex items-center">
                                <p>{transkripS1Preview}</p>
                            </div>
                        </div>
                        <button onClick={handlerResetTranskripS1}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </button>
                    </div>}
                </Input>

                <div className="mb-6"></div>

                <Input
                    inputRef={ktpRef}
                    label="Scan Kartu Identitas KTP/SIM"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleKtpChange}
                    accept="image/jpeg,image/png"
                    className="mb-3"
                >
                    {(errListBerkasTambahan?.ktp??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.JPG, .JPEG & .PNG</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>

                    {ktpPreview && (
                        <div className="relative max-w-min">
                            <img
                                src={ktpPreview}
                                alt="Preview"
                                className="aspect-square max-w-[300px] rounded-md mb-3"
                            />
                            <button onClick={handlerResetKtp} className="absolute top-0 right-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </Input>

                <div className="mb-6"></div>

                <Input
                    inputRef={fotoRef}
                    label="Scan Pas Foto Berwarna dimensi 4 x 6"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleFotoChange}
                    accept="image/jpeg,image/png"
                    className="mb-3"
                >
                    {(errListBerkasTambahan?.foto??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>dengan background berlatar merah</li>  
                        <li>tidak mengenakan kacamata</li> 
                        <li>tidak mengenakan kopyah/peci/topi</li> 
                        <li>mengenakan jas hitam</li> 
                        <li>kemeja putih berdasi (Perempuan tidak diwajibkan berdasi)</li> 
                        <li>bagi yang berhijab mengenakan hijab berwarna hitam</li>
                        <li>ektensi file yang diterima <b>.JPG, .JPEG & .PNG</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>

                    {fotoPreview && (
                        <div className="relative max-w-min">
                            <img
                                src={fotoPreview}
                                alt="Preview"
                                className="aspect-square max-w-[300px] rounded-md mb-3"
                            />
                            <button onClick={handlerResetFoto} className="absolute top-0 right-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </Input>

            </div>

            <div className="flex flex-col rounded-lg">
                <Button 
                    onClick = {()=> SaveBerkasHandler()}
                    className = ""
                    loading={loading}> 
                    Kirim Pengajuan
                </Button>
            </div>
        </div>
    }

    return (
        <MainPage activeMenu={activeMenu}>
            <div className='mx-auto px-2 sm:px-6 lg:px-8 py-4'>
                <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 self-start">
                    <Stepper steps={steps} currentStep={frame} />

                    {RenderFrame()}
                </div>
            </div>
        </MainPage>
    );
}

export default PendaftaranPage;