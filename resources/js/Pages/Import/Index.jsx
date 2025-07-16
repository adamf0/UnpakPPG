import AdminPage from "@src/AdminPage";
import { useEffect, useRef, useState } from "react";
import Input from "@src/Components/Input";
import Button from "@src/Components/Button";
import { apiProduction } from "@src/Persistance/API";
import Swal from 'sweetalert2';

const ImportDataPPG = () => {
    const [loadingStatus, setLoading] = useState(null);
    const fileRef = useRef(null);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [errList, setErrList] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFilePreview(file?.name ?? "");
            setErrList(prev => {
                const { file, ...rest } = prev;
                return rest;
            });
        }
    };
    const handlerResetFile = () => {
        setFile(null);
        setFilePreview(null);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    }
    async function SaveHandler(){
        setLoading(true)
        try {
            console.log(`execute SaveHandler to call /api/import`)
            const formData = new FormData();
            const input = {
                file,
            };
    
            Object.entries(input).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });
    
            const response = await apiProduction.post("/api/import", formData, {
                headers: {
                "Content-Type": "multipart/form-data"
                }
            });
    
            if (response.status === 200 || response.status === 204) {
                Swal.fire({
                    title: "",
                    text: "selamat anda telah import data mahasiswa",
                    icon: "success"
                });
            }
        } catch (error) {
            // console.error(error.response?.data)
    
            const status = error.response?.status;
            const detail = error.response?.data?.Detail ?? "ada masalah pada aplikasi";
    
            if (status === 400) {
                alert(detail)
            } else if(status === 500){
                if(error.response?.data?.Title=="import.invalidValidation"){
                setErrList(detail)
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

    return (
        <AdminPage selected="import">
            <>
                {/* Breadcrumb */}
                <nav className="text-gray-600 text-sm mb-4">
                    <span className="text-gray-500">Import Data PPG</span>
                </nav>

                <div className="flex flex-col gap-3 relative bg-white shadow-md rounded-lg p-4">
                    <Input
                        inputRef={fileRef}
                        label="Data Mahasiswa"
                        type="file"
                        placeholder="Upload file"
                        onChange={handleFileChange}
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                        className="mb-3"
                        required
                    >
                        {(errList?.file??[]).map(err => <p className="text-red-500 text-sm mt-1">{err}</p>)}
                        <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                        <ol className="list-decimal pl-10">
                            {/* <li>Unduh template upload (Di prind tulis tangan lalu di Scan) <a href="https://drive.google.com/file/d/1--Jqg0JlbAf72K7epXWCNc65yEN04Fry/view?usp=sharing" class="hover:bg-gray-700 hover:text-white text-purple-600 rounded-md px-3 py-2 text-sm font-medium">Klik Disini</a></li> */}
                            <li>ektensi file yang diterima <b>.CSV, .XLS, & .XLSX</b></li>  
                            <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                        </ol>
                        {file && (
                            <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                                <div>
                                    <div className="flex items-center">
                                        <a target="_blank" href={filePreview==null? `/file/?`.replace("?",file):"#"}>
                                            {filePreview==null? file:filePreview}
                                        </a>
                                    </div>
                                </div>
                                <button onClick={handlerResetFile}>
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

                    <div className="flex gap-2">
                        <Button
                            onClick={() => SaveHandler()}
                            className="flex-11"
                            loading={loadingStatus}
                        >
                            Import
                        </Button>
                    </div>
                </div>
            </>
        </AdminPage>
    );
};

export default ImportDataPPG;
