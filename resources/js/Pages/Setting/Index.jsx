import AdminPage from "@src/AdminPage";
import { useState } from "react";
import Input from "@src/Components/Input";
import Button from "@src/Components/Button";
import { apiProduction } from "@src/Persistance/API";
import Swal from "sweetalert2";

const SettingPage = ({ linkWa: initialLinkWa = "" }) => {
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [linkWa, setLinkWa] = useState(initialLinkWa ?? "");
    const [errList, setErrList] = useState({});

    async function SaveHandler() {
        setLoadingStatus(true);
        try {
            const response = await apiProduction.post("/api/setting", {
                link_wa: linkWa,
            });

            if (response.status === 200 || response.status === 204) {
                Swal.fire({
                    title: "",
                    text: "Berhasil menyimpan pengaturan link WhatsApp",
                    icon: "success",
                });
            }
        } catch (error) {
            const status = error.response?.status;
            const detail =
                error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            if (status === 400) {
                alert(detail);
            } else if (status === 500) {
                if (error.response?.data?.Title === "setting.invalidValidation") {
                    setErrList(detail);
                } else {
                    alert(detail);
                }
            } else {
                console.error(detail);
            }
        } finally {
            setLoadingStatus(false);
        }
    }

    return (
        <AdminPage selected="setting">
            <>
                {/* Breadcrumb */}
                <nav className="text-gray-600 text-sm mb-4">
                    <span className="text-gray-500">Setting</span>
                </nav>

                <div className="flex flex-col gap-3 relative bg-white shadow-md rounded-lg p-4">
                    <Input
                        label="Link WhatsApp"
                        type="text"
                        placeholder="Masukkan link group WhatsApp (contoh: https://chat.whatsapp.com/...)"
                        value={linkWa}
                        onChange={(e) => {
                            setLinkWa(e.target.value);
                            setErrList((prev) => {
                                const { link_wa, ...rest } = prev;
                                return rest;
                            });
                        }}
                        className="mb-3"
                        required
                    >
                        {(errList?.link_wa ?? []).map((err, idx) => (
                            <p key={idx} className="text-red-500 text-sm mt-1">
                                {err}
                            </p>
                        ))}
                    </Input>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => SaveHandler()}
                            className="flex-11"
                            loading={loadingStatus}
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </>
        </AdminPage>
    );
};

export default SettingPage;
