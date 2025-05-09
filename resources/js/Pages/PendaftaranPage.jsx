import React from 'react';
import MainPage from '@src/mainPage';
import Input from "@src/components/Input";
import Select from "@src/components/Select";
import Button from "@src/components/Button";
import RadioGroup from "@src/components/RadioGroup";
import Textarea from "@src/components/Textarea";
import { useEffect, useState, useRef } from "react";
import Stepper from '@src/Components/Stepper';

const StepEnum = {
    PENGAJUAN: "Pengajuan",
    BIODATA_PDDIKTI: "Biodata PDDIKTI",
    KETENTUAN_LAPOR_DIRI: "Ketentuan Lapor Diri"
};
  
function PendaftaranPage({ activeMenu }) {
    const steps = Object.values(StepEnum);
    const [frame, setFrame] = useState(StepEnum.KETENTUAN_LAPOR_DIRI);
    
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
    
    function CreateDataHandler(){
        
    }

    const handleIjazahChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setIjazah(file);
          setIjazahPreview(URL.createObjectURL(file));
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
        }
    };
    const handlerResetFoto = () => {
        setFoto(null);
        setFotoPreview(null);
        if (fotoRef.current) {
            fotoRef.current.value = "";
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
                    Lanjut
                </Button>
            </div>
        </>
    }
    function BiodataPage(){
        return <div className="p-4">
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
                        value={nim}
                        placeholder="065110201"
                        onChange={(e) => setNim(e.target.value)}
                        required
                    />
                    
                    <Input
                        label="NIK"
                        type="text"
                        value={nik}
                        placeholder="3271222222220001"
                        onChange={(e) => setNik(e.target.value)}
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
                            onChange={(e) => setNamaPeserta(e.target.value)}
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
                            }}
                            options={[
                                { label: "Laki-laki", value: "L", id: "male" },
                                { label: "Perempuan", value: "P", id: "female" }
                            ]}
                            errorMessage=""
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
                        onChange={(e) => setTempatLahir(e.target.value)}
                        required
                    />

                    <Input
                        label="Tanggal Lahir"
                        type="date"
                        value={tanggalLahir}
                        placeholder="01/12/1999"
                        onChange={(e) => setTanggalLahir(e.target.value)}
                        required
                    />
                </div>

                <Select
                    label="Agama"
                    options={agamaOptions}
                    value={agama}
                    onChange={setAgama}
                    required
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Select
                        label="Warga Negara"
                        options={wargaNegaraOptions}
                        value={wargaNegara}
                        onChange={setWargaNegara}
                        required
                    />

                    <Select
                        label="Status Sipil"
                        options={statusSipilOptions}
                        value={statusSipil}
                        onChange={setStatusSipil}
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
                        onChange={(e) => setNomorHp(e.target.value)}
                        required
                    />

                    <Input
                        label="Alamat Email"
                        type="email"
                        value={alamatEmail}
                        placeholder="example@gmail.com"
                        onChange={(e) => setAlamatEmail(e.target.value)}
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
                            onChange={(e) => setAlamatTinggal(e.target.value)}
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
                            onChange={(e) => setRT(e.target.value)}
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
                            onChange={(e) => setRW(e.target.value)}
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
                        onChange={(e) => setKelurahan(e.target.value)}
                        required
                    />

                    <Input
                        label="Kecamatan"
                        type="text"
                        value={kecamatan}
                        placeholder="misal: Bogor Tengah"
                        onChange={(e) => setKecamatan(e.target.value)}
                        required
                    />

                    <Input
                        label="Kode POS"
                        type="text"
                        value={kodePos}
                        mask="_____"
                        placeholder="16100"
                        onChange={(e) => setKodePos(e.target.value)}
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
                    onChange={setJenisTinggal}
                    required
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-2">
                        <Input
                            label="Nama Ibu"
                            type="text"
                            value={namaIbu}
                            onChange={(e) => setNamaIbu(e.target.value)}
                        />
                    </div>
                    <div className="flex-2">
                        <Input
                            label="Nama Ayah"
                            type="text"
                            value={namaAyah}
                            onChange={(e) => setNamaAyah(e.target.value)}
                        />
                    </div>
                </div>

                <Textarea
                    label="Alamat Ayah dan Ibu"
                    type="text"
                    value={alamatAyahIbu}
                    onChange={(e) => setAlamatAyahIbu(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-2">
                        <Input
                            label="No. Hp Ayah dan Ibu"
                            type="tel"
                            value={hpAyahIbu}
                            mask="____-____-______"
                            placeholder="0812-3456-7890"
                            onChange={(e) => setHpAyahIbu(e.target.value)}
                        />
                    </div>
                    <div className="flex-2">
                        <Input
                            label="Handphone (Kerabat/Kontak Darurat)"
                            type="tel"
                            value={hpKerabat}
                            mask="____-____-______"
                            placeholder="0812-3456-7890"
                            onChange={(e) => setHpKerabat(e.target.value)}
                        />  
                    </div>
                </div>

                <Input
                    label="Asal Sekolah Tempat Mengajar Sekarang"
                    type="text"
                    value={sekolahMengajar}
                    onChange={(e) => setSekolahMengajar(e.target.value)}
                />

                <Textarea
                    label="Alamat Lengkap (Sekolah/Tempat Mengajar)"
                    type="text"
                    value={alamatSekolah}
                    onChange={(e) => setAlamatSekolah(e.target.value)}
                />

                <Input
                    label="Telepon (No Kontak Sekolah)"
                    type="tel"
                    value={telpSekolah}
                    mask="____-____-______"
                    placeholder="0812-3456-7890"
                    onChange={(e) => setTelpSekolah(e.target.value)}
                />
            </div>

            <div className="flex flex-col rounded-lg">
                <Button 
                    onClick = {()=> CreateDataHandler()}
                    className = ""
                    loading={false}> 
                    Simpan dan Lanjut Pengajuan
                </Button>
            </div>
        </div>
    }
    function KetentuanLaporPage(){
        return <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Berkas Tambahan</h2>

            <div className="flex flex-col rounded-lg">
                <Input
                    label="A1 Pakta Integritas"
                    type="url"
                    value={nomorUKG}
                    placeholder="misal: http://drive.google.com/drive/folders/example"
                    onChange={(e) => {}}
                />

                <Input
                    label="Biodata Mahasiswa"
                    type="url"
                    value={nomorUKG}
                    placeholder="misal: http://drive.google.com/drive/folders/example"
                    onChange={(e) => {}}
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
                    onClick = {()=> CreateDataHandler()}
                    className = ""
                    loading={false}> 
                    Simpan dan Lanjut Pengajuan
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