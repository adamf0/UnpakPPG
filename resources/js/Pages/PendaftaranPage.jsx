import MainPage from '@src/mainPage';
import Input from "@src/components/Input";
import Select from "@src/components/Select";
import Button from "@src/components/Button";
import Modal from "@src/components/Modal";
import Textarea from "@src/components/Textarea";
import { useEffect, useState, useRef } from "react";
import Stepper from '@src/Components/Stepper';
import { apiProduction } from "@src/Persistance/API";
import Swal from 'sweetalert2';

const StepEnum = {
    PENGAJUAN: "Pengajuan",
    BIODATA_PDDIKTI: "Biodata PDDIKTI",
    KETENTUAN_LAPOR_DIRI: "Ketentuan Lapor Diri",
    SELESAI: "Selesai"
};
Object.prototype.isEmpty = function() {
    return this === null || this === undefined || this === '' || 
           (Array.isArray(this) && this.length === 0) || 
           (typeof this === 'object' && Object.keys(this).length === 0);
};
  
function PendaftaranPage({ activeMenu }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const steps = Object.values(StepEnum);
    const [frame, setFrame] = useState(StepEnum.PENGAJUAN);
    const [loading, setLoading] = useState(false);
    const [loadingFrame, setLoadingFrame] = useState(false);
    const [errListBiodata, setErrListBiodata] = useState({});
    const [errListBerkasTambahan, setErrListBerkasTambahan] = useState({});

    const [errNomorUKG, setErrNomorUKG] = useState([]);
    const [uuidPendaftaran, setUuidPendaftaran] = useState(null);
    const [biodata, setBiodata] = useState(null);
    const [berkasTambahan, setBerkasTambahan] = useState(null);
    
    const [nomorUKG,setNomorUKG] = useState("");
    const [bidangStudi,setBidangStudi] = useState("");
    const [bidangStudi2,setBidangStudi2] = useState("");
    const [nim,setNim] = useState("");
    const [nik,setNik] = useState("");
    const [nama,setNama] = useState("");
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
            value: "H",
            label: "Hindu",
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
            value: "K",
            label: "Menikah",
        },
        {
            value: "B",
            label: "Tidak Menikah",
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
    const [perguruanTinggiAsal,setPerguruanTinggiAsal] = useState("");

    const [jenisTinggal,setJenisTinggal ] = useState("");
    const [jenisTinggalOptions,setJenisTinggalOptions] = useState([
        {
            value: 1,
            label: "Bersama orang tua",
        },
        {
            value: 3,
            label: "Kost",
        },
        {
            value: 2,
            label: "Wali",
        },
        {
            value: 99,
            label: "Lainnya",
        },
        {
            value: 10,
            label: "Rumah sendiri",
        },
        {
            value: 4,
            label: "Asrama",
        },
        {
            value: 5,
            label: "Panti asuhan",
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

    const paktaIntegritasRef = useRef(null);
    const [paktaIntegritas, setPaktaIntegritas] = useState(null);
    const [paktaIntegritasPreview, setPaktaIntegritasPreview] = useState(null);

    const biodataMahasiswaRef = useRef(null);
    const [biodataMahasiswa, setBiodataMahasiswa] = useState(null);
    const [biodataMahasiswaPreview, setBiodataMahasiswaPreview] = useState(null);

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

    const suratKeteranganSehatRef = useRef(null);
    const [suratKeteranganSehat, setSuratKeteranganSehat] = useState(null);
    const [suratKeteranganSehatPreview, setSuratKeteranganSehatPreview] = useState(null);
    
    const suratKeteranganBerkelakuanBaikRef = useRef(null);
    const [suratKeteranganBerkelakuanBaik, setSuratKeteranganBerkelakuanBaik] = useState(null);
    const [suratKeteranganBerkelakuanBaikPreview, setSuratKeteranganBerkelakuanBaikPreview] = useState(null);

    const suratBebasNarkobaRef = useRef(null);
    const [suratBebasNarkoba, setSuratBebasNarkoba] = useState(null);
    const [suratBebasNarkobaPreview, setSuratBebasNarkobaPreview] = useState(null);

    const npwpRef = useRef(null);
    const [npwp, setNpwp] = useState(null);
    const [npwpPreview, setNpwpPreview] = useState(null);

    const handlePaktaIntegritasChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPaktaIntegritas(file);
            setPaktaIntegritasPreview(file?.name ?? "");
            setErrListBerkasTambahan(prev => {
                const { paktaIntegritas, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetPaktaIntegritas = () => {
        setPaktaIntegritas(null);
        setPaktaIntegritasPreview(null);
        if (paktaIntegritasRef.current) {
            paktaIntegritasRef.current.value = "";
        }
    }

    const handleBiodataMahasiswaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBiodataMahasiswa(file);
            setBiodataMahasiswaPreview(file?.name ?? "");
            setErrListBerkasTambahan(prev => {
                const { biodataMahasiswa, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetBiodataMahasiswa = () => {
        setBiodataMahasiswa(null);
        setBiodataMahasiswaPreview(null);
        if (biodataMahasiswaRef.current) {
            biodataMahasiswaRef.current.value = "";
        }
    }

    const handleIjazahChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIjazah(file);
            setIjazahPreview(file?.name ?? "");
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

    const handleSuratKeteranganSehatChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSuratKeteranganSehat(file);
            setSuratKeteranganSehatPreview(file?.name ?? "");
            setErrListBerkasTambahan(prev => {
                const { suratKeteranganSehat, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetSuratKeteranganSehat = () => {
        setSuratKeteranganSehat(null);
        setSuratKeteranganSehatPreview(null);
        if (suratKeteranganSehatRef.current) {
            suratKeteranganSehatRef.current.value = "";
        }
    }

    const handleSuratKeteranganBerkelakuanBaikChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSuratKeteranganBerkelakuanBaik(file);
            setSuratKeteranganBerkelakuanBaikPreview(file?.name ?? "");
            setErrListBerkasTambahan(prev => {
                const { suratKeteranganBerkelakuanBaik, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetSuratKeteranganBerkelakuanBaik = () => {
        setSuratKeteranganBerkelakuanBaik(null);
        setSuratKeteranganBerkelakuanBaikPreview(null);
        if (suratKeteranganBerkelakuanBaikRef.current) {
            suratKeteranganBerkelakuanBaikRef.current.value = "";
        }
    }

    const handleSuratBebasNarkobaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSuratBebasNarkoba(file);
            setSuratBebasNarkobaPreview(file?.name ?? "");
            setErrListBerkasTambahan(prev => {
                const { suratBebasNarkoba, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetSuratBebasNarkoba = () => {
        setSuratBebasNarkoba(null);
        setSuratBebasNarkobaPreview(null);
        if (suratBebasNarkobaRef.current) {
            suratBebasNarkobaRef.current.value = "";
        }
    }

    const handleNpwpChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNpwp(file);
            setNpwpPreview(URL.createObjectURL(file));
            setErrListBerkasTambahan(prev => {
                const { npwp, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetNpwp = () => {
        setNpwp(null);
        setNpwpPreview(null);
        if (npwpRef.current) {
            npwpRef.current.value = "";
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
                setBidangStudi(response?.data?.bidangStudi ?? "");
                setBidangStudi2(response?.data?.bidangStudi2 ?? "");
                setNim(response?.data?.nim ?? "");
                setNik(response?.data?.nik ?? "");
                setNama(response?.data?.nama ?? "");
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
                setPerguruanTinggiAsal(response?.data?.perguruanTinggiAsal ?? "");

                if(response?.data?.status?.toLowerCase?.()=="done"){
                    setFrame(StepEnum.SELESAI);
                }
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
                setIjazah(response?.data?.ijazah ?? "")
                setTranskripS1(response?.data?.transkripS1 ?? response?.data?.transkripS1)

                setKtp(response?.data?.ktp)
                setKtpPreview(response?.data?.ktp?.isEmpty()? "":`/ktp/${response?.data?.ktp}`)

                setFoto(response?.data?.foto)
                setFotoPreview(response?.data?.foto?.isEmpty()? "":`/foto/${response?.data?.foto}`)
                
                setSuratKeteranganSehat(response?.data?.suratKeteranganSehat ?? "")
                setSuratKeteranganBerkelakuanBaik(response?.data?.suratKeteranganBerkelakuanBaik ?? "")
                setSuratBebasNarkoba(response?.data?.suratBebasNarkoba ?? "")
                setNpwp(response?.data?.npwp ?? "")
                setNpwpPreview(
                    response?.data?.ktp?.isEmpty()
                        ? ""
                        : `/npwp/${response?.data?.npwp}`
                );
            }
        } catch (error) {
            // console.error(error.response?.data)

            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title!="berkasTambahan.invalidValidation"){
                    
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
                perguruanTinggiAsal: perguruanTinggiAsal ?? "",
                bidangStudi: bidangStudi ?? "",
                bidangStudi2: bidangStudi2 ?? "",
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
                suratKeteranganSehat,
                suratKeteranganBerkelakuanBaik,
                suratBebasNarkoba,
                npwp
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
                Swal.fire({
                    title: "",
                    text: "selamat anda telah menyelesaikan lapor diri",
                    icon: "success"
                });
                setFrame(StepEnum.SELESAI)
            } else{
                const status = error.response?.status;
                const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";
                console.error(status, error.response?.data?.Title)

                if (status === 400) {
                    alert(detail)
                } else if(status === 500){
                    const detailerr = error.response?.data?.Detail ?? {};
                    const errorKeys = Object.keys(detailerr);

                    if(error.response?.data?.Title=="berkasTambahan.invalidValidation"){
                        setErrListBerkasTambahan(detail)
                        alert(`cek kembali formnya! ${errorKeys.join(",")} masih belum benar datanya`)
                    } else{
                        alert(detail)
                    }
                }
            }
        } catch (error) {
            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";
            console.error(status, error.response?.data?.Title)

            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                const detailerr = error.response?.data?.Detail ?? {};
                const errorKeys = Object.keys(detailerr);

                if(error.response?.data?.Title=="berkasTambahan.invalidValidation"){
                    setErrListBerkasTambahan(detail)
                    alert(`cek kembali formnya! ${errorKeys.join(",")} masih belum benar datanya`)
                } else{
                    alert(detail)
                }
            } else{
               alert(detail)
            }
        } finally {
            setLoading(false)
            setShowConfirm(false);
        }
    }

    function RenderFrame(){
        if(frame=="Pengajuan"){
            return InitialPage()
        } else if(frame=="Biodata PDDIKTI"){
            return BiodataPage()
        } else if(frame=="Ketentuan Lapor Diri"){
            return KetentuanLaporPage();
        } else if(frame=="Selesai"){
            return SelesaiPage();
        }
    }

    function InitialPage(){
        return <>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Nomor UKG/PTK ID</h2>

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
                <div className="flex flex-col sm:flex-row w-full gap-4">
                    <div className="flex-1">
                        <Input
                            label="Nomor UKG"
                            type="text"
                            value={nomorUKG}
                            onChange={(e) => {}}
                            errorMessageList={errListBiodata?.bidangStudi ?? []}
                            disabled
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="Bidang Studi PPG"
                            type="text"
                            value={bidangStudi}
                            disabled
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-4">
                    <div className="flex-1">
                        <Input
                            label="Perguruan Tinggi Asal"
                            type="text"
                            value={perguruanTinggiAsal}
                            placeholder=""
                            onChange={(e) => {
                                setPerguruanTinggiAsal(e.target.value)
                                setErrListBiodata(prev => {
                                    const { perguruanTinggiAsal, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            errorMessageList={errListBiodata?.perguruanTinggiAsal ?? []}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <Input
                            label="Bidang Studi"
                            type="text"
                            value={bidangStudi2}
                            onChange={(e) => {
                                setBidangStudi2(e.target.value)
                                setErrListBiodata(prev => {
                                    const { bidangStudi2, ...rest } = prev;
                                    return rest;
                                });
                            }}
                            errorMessageList={errListBiodata?.bidangStudi2 ?? []}
                            required
                        />
                    </div>
                </div>

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
                        disabled
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-4">
                    <div className="flex-2">
                        <Input
                            label="Nama Peserta (Sesuai SIM PKB)"
                            type="text"
                            placeholder="masukkan nama"
                            value={nama}
                            onChange={(e) => {}}
                            disabled
                        />
                    </div>

                    <div className="flex-2">
                        <Input
                            label="Nama Peserta (Jika Tidak Sesuai SIM PKB)"
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
                        />
                    </div>

                    <div className="flex-1">
                        <div className={`w-full`}>
                              <label className="block text-sm font-medium text-gray-900 mb-2">Jenis Kelamin</label>
                              <div className="row">
                                {[
                                    { label: "Laki-laki", value: "L", id: "male" },
                                    { label: "Perempuan", value: "P", id: "female" }
                                ].map((option, index) => {
                                  return (
                                    <div className="col-12">
                                    <input
                                        key={option.id}
                                        type="radio"
                                        htmlFor={option.id}
                                        id={option.id}
                                        name="radio-group"
                                        value={option.value}
                                        checked={jenisKelamin === option.value}
                                        onChange={(val) => {
                                            console.log(option.value)
                                            setJenisKelamin(option.value)
                                            setErrListBiodata(prev => {
                                                const { jenisKelamin, ...rest } = prev;
                                                return rest;
                                            });
                                        }}
                                    />
                                    {option.label}
                                    </div>
                                  )
                                })}
                              </div>
                              {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
                              {(errListBiodata?.jenisKelamin ?? []).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                        </div>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row w-full gap-4">
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
                        label="Alamat Email terbaru Belajar.id"
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
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full gap-4">
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

                <div className="flex flex-col sm:flex-row w-full gap-4">
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

                <div className="flex flex-col sm:flex-row w-full gap-4">
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

                <div className="flex flex-col sm:flex-row w-full gap-4">
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
                    inputRef={paktaIntegritasRef}
                    label="1. Pakta Integritas (Di ketika bagian yang perlu di isi, tanda tangan menggunakan materai 10rb lalu di save PDF)"
                    type="file"
                    placeholder="Upload file"
                    onChange={handlePaktaIntegritasChange}
                    accept="application/pdf"
                    className="mb-3"
                    required
                >
                    {(errListBerkasTambahan?.paktaIntegritas??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>Unduh template upload (Di prind tulis tangan lalu di Scan) <a href="https://lapordiri-ppg.unpak.ac.id/FAKTA%20INTEGRITAS%20.pdf" class="hover:bg-gray-700 hover:text-white text-purple-600 rounded-md px-3 py-2 text-sm font-medium">Klik Disini</a></li>
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {paktaIntegritas && (
                        <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                            <div>
                                <div className="flex items-center">
                                    <a target="_blank" href={paktaIntegritasPreview==null? `/paktaIntegritas/?`.replace("?",paktaIntegritas):"#"}>
                                        {paktaIntegritasPreview==null? paktaIntegritas:paktaIntegritasPreview}
                                    </a>
                                </div>
                            </div>
                            <button onClick={handlerResetPaktaIntegritas}>
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
                        </div>
                    )}
                </Input>

                <Input
                    inputRef={biodataMahasiswaRef}
                    label="2. Biodata Mahasiswa (Sesuai format PD DIKTI)_(Di ketika lalu di save PDF)"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleBiodataMahasiswaChange}
                    accept="application/pdf"
                    className="mb-3"
                    required
                >
                    {(errListBerkasTambahan?.biodataMahasiswa??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>Unduh template upload (Di ketik lalu di Scan) <a href="https://lapordiri-ppg.unpak.ac.id/Biodata%20Mahasiswa%20PD%20DIKTI.pdf" class="hover:bg-gray-700 hover:text-white text-purple-600 rounded-md px-3 py-2 text-sm font-medium">Klik Disini</a></li>
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {biodataMahasiswa && (
                        <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                            <div>
                                <div className="flex items-center">
                                    <a target="_blank" href={biodataMahasiswaPreview==null? `/biodataMahasiswa/?`.replace("?",biodataMahasiswa):"#"}>
                                        {biodataMahasiswaPreview==null? biodataMahasiswa:biodataMahasiswaPreview}
                                    </a>
                                </div>
                            </div>
                            <button onClick={handlerResetBiodataMahasiswa}>
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
                        </div>
                    )}
                </Input>

                <Input
                    inputRef={ijazahRef}
                    label="3. Scan Ijazah S1/DIV yang dilegalisir"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleIjazahChange}
                    accept="application/pdf"
                    className="mb-3"
                    required
                >
                    {(errListBerkasTambahan?.ijazah??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {ijazah && (
                        <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                            <div>
                                <div className="flex items-center">
                                    <a target="_blank" href={ijazahPreview==null? `/ijazah/?`.replace("?",ijazah):"#"}>
                                        {ijazahPreview==null? ijazah:ijazahPreview}
                                    </a>
                                </div>
                            </div>
                            <button onClick={handlerResetIjazah}>
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
                        </div>
                    )}
                </Input>
                
                <div className="mb-6"></div>

                <Input
                    inputRef={transkripS1Ref}
                    label="4. Scan Transkrip Nilai S1/DIV"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleTranskripS1Change}
                    accept="application/pdf"
                    className="mb-3"
                    required
                >
                    {(errListBerkasTambahan?.transkripS1??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>

                    {transkripS1 && 
                    <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                        <div>
                            <div className="flex items-center">
                                <a target="_blank" href={transkripS1Preview==null? `/transkripS1/?`.replace("?",transkripS1):"#"}>
                                    {transkripS1Preview==null? transkripS1:transkripS1Preview}
                                </a>
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
                    label="5. Scan Kartu Identitas KTP/SIM"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleKtpChange}
                    accept="image/jpeg,image/png"
                    className="mb-3"
                    required
                >
                    {(errListBerkasTambahan?.ktp??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.JPG, .JPEG & .PNG</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>

                    {ktp!==null? 
                        <div className="relative max-w-min">
                            <img
                                src={ktpPreview}
                                alt="Preview"
                                className="aspect-square max-w-[300px] rounded-md mb-3"
                            />
                            <button onClick={handlerResetKtp} className="bg-gray-500 absolute top-0 right-0">
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
                        </div>:<></>
                    }
                </Input>

                <div className="mb-6"></div>

                <Input
                    inputRef={fotoRef}
                    label="6. Scan Pas Foto Berwarna dimensi 4 x 6"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleFotoChange}
                    accept="image/jpeg,image/png"
                    className="mb-3"
                    required
                >
                    {(errListBerkasTambahan?.foto??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <div className='flex flex-col md:flex-row flex-col-reverse'>
                        <div className='flex-2'>
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
                        </div>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-red-500 mb-2">Contoh Format Foto:</label>
                            <img src="https://lapordiri-ppg.unpak.ac.id/contoh_pass_foto.jpeg" className='max-h-[200px]' alt="contoh_pass_foto"/>
                        </div>
                    </div>

                    {foto!==null? 
                        <div className="relative max-w-min">
                            <img
                                src={fotoPreview}
                                alt="Preview"
                                className="aspect-square max-w-[300px] rounded-md mb-3"
                            />
                            <button onClick={handlerResetFoto} className="bg-gray-500 absolute top-0 right-0">
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
                        </div>:<></>
                    }
                </Input>

                <div className="mb-6"></div>
                
                <Input
                    inputRef={suratKeteranganSehatRef}
                    label="7. Scan Surat Keterangan Sehat"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleSuratKeteranganSehatChange}
                    accept="application/pdf"
                    required
                >
                    {(errListBerkasTambahan?.suratKeteranganSehat??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>dari fasilitas layanan kesehatan</li>
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {suratKeteranganSehat && (
                        <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                            <div>
                                <div className="flex items-center">
                                    <a target="_blank" href={suratKeteranganSehatPreview==null? `/suratKeteranganSehat/?`.replace("?",suratKeteranganSehat):"#"}>
                                        {suratKeteranganSehatPreview==null? suratKeteranganSehat:suratKeteranganSehatPreview}
                                    </a>
                                </div>
                            </div>
                            <button onClick={handlerResetSuratKeteranganSehat}>
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
                        </div>
                    )}
                </Input>

                <div className="mb-6"></div>
                
                <Input
                    inputRef={suratKeteranganBerkelakuanBaikRef}
                    label="8. Scan Surat Keterangan Berkelakuan Baik dari Kepolisian"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleSuratKeteranganBerkelakuanBaikChange}
                    accept="application/pdf"
                    required
                >
                    {(errListBerkasTambahan?.suratKeteranganBerkelakuanBaik??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {suratKeteranganBerkelakuanBaik && (
                        <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                            <div>
                                <div className="flex items-center">
                                    <a target="_blank" href={suratKeteranganBerkelakuanBaikPreview==null? `/suratKeteranganBerkelakuanBaik/?`.replace("?",suratKeteranganBerkelakuanBaik):"#"}>
                                        {suratKeteranganBerkelakuanBaikPreview==null? suratKeteranganBerkelakuanBaik:suratKeteranganBerkelakuanBaikPreview}
                                    </a>
                                </div>
                            </div>
                            <button onClick={handlerResetSuratKeteranganBerkelakuanBaik}>
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
                        </div>
                    )}
                </Input>

                <div className="mb-6"></div>
                
                <Input
                    inputRef={suratBebasNarkobaRef}
                    label="9. Scan Surat Bebas Narkotika, Psikotropika, dan Zat adiktif lainnya/NAPZA"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleSuratBebasNarkobaChange}
                    accept="application/pdf"
                    required
                >
                    {(errListBerkasTambahan?.suratBebasNarkoba??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                    <ol className="list-decimal pl-10">
                        <li>dari Puskesmas/RSUD setempat/Kepolisian/BNN</li>
                        <li>ektensi file yang diterima <b>.PDF</b></li>  
                        <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                    </ol>
                    {suratBebasNarkoba && (
                        <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                            <div>
                                <div className="flex items-center">
                                    <a target="_blank" href={suratBebasNarkobaPreview==null? `/suratBebasNarkoba/?`.replace("?",suratBebasNarkoba):"#"}>
                                        {suratBebasNarkobaPreview==null? suratBebasNarkoba:suratBebasNarkobaPreview}
                                    </a>
                                </div>
                            </div>
                            <button onClick={handlerResetSuratBebasNarkoba}>
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
                        </div>
                    )}
                </Input>

                <div className="mb-6"></div>
                
                <Input
                    inputRef={npwpRef}
                    label="10. NPWP"
                    type="file"
                    placeholder="Upload file"
                    onChange={handleNpwpChange}
                    accept="image/jpeg,image/png"
                >
                    {(errListBerkasTambahan?.npwp??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                    <div className='flex flex-col md:flex-row flex-col-reverse'>
                        <div className='flex-1'>
                            <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                            <ol className="list-decimal pl-10">
                                <li>ektensi file yang diterima <b>.JPG, .JPEG & .PNG</b></li>  
                                <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                            </ol>
                        </div>
                    </div>

                    {npwp!==null? 
                        <div className="relative max-w-min">
                            <img
                                src={npwpPreview}
                                alt="Preview"
                                className="aspect-square max-w-[300px] rounded-md mb-3"
                            />
                            <button onClick={handlerResetNpwp} className="bg-gray-500 absolute top-0 right-0">
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
                        </div>:<></>
                    }
                </Input>

            </div>

            <div className="flex flex-col rounded-lg">
                <Button 
                    onClick = {()=> setShowConfirm(true)}
                    className = ""
                    loading={loading}> 
                    Kirim Pengajuan
                </Button>
            </div>
        </div>
    }
    function SelesaiPage(){
        return <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Selesai Pengajuan</h2>
            <p>
                Selamat! Data data pengajuan anda sudah terkirim ke admin, tahap berikutnya anda harus bergabung group di whatsapp dengan link berikut untuk mendapatkan informasi terkait orientasi 
                <a href="https://chat.whatsapp.com/LrMwY6qsnxvGuJYiSjwBfu" target="_blank" className='hover:bg-gray-700 hover:text-white text-purple-500 rounded-md px-3 py-2 text-sm font-medium'>https://chat.whatsapp.com/LrMwY6qsnxvGuJYiSjwBfu</a>
            </p>
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

            <Modal
                    isOpen={showConfirm}
                    title="Konfirmasi Simpan Data"
                    message={`Apakah anda yakin ingin simpan data secara permanen?`}
                    onConfirm={() => SaveBerkasHandler()}
                    onCancel={() => setShowConfirm(false)}
                    confirmText="Ya"
                    cancelText="Tidak"
                />
        </MainPage>
    );
}

export default PendaftaranPage;