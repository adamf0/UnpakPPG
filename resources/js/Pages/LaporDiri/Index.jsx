import AdminPage from "@src/AdminPage";
import { useEffect, useRef, useState } from "react";
import Input from "@src/Components/Input";
import Select from "@src/Components/Select";
import Button from "@src/Components/Button";
import Pagination from "@src/Components/Pagination";
import Modal from "@src/Components/Modal";
import { FaPlus } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { TbNumber123 } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { apiProduction } from "@src/Persistance/API";

const LaporDiri = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const dropdownRefs = useRef({});
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedUUID, setSelectedUUID] = useState(null);

    const [loadingStatus, setLoadingStatus] = useState(null);
    const [loadingExport, setLoadingExport] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [namaPeserta, setNamaPeserta] = useState("");
    const [nomorUKG, setNomorUKG] = useState("");
    const [npm, setNPM] = useState("");
    const [status, setStatus] = useState("");
    const [statusOptions, setStatusOptions] = useState([
        {
            value: "",
            label: "",
        },
        {
            value: "done",
            label: "Selesai Input",
        },
        {
            value: "draf",
            label: "Belum Selesai Input",
        },
        {
            value: "not registered",
            label: "Belum Terdaftar",
        },
    ]);

    // Fungsi untuk menutup dropdown jika klik terjadi di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownOpen !== null &&
                dropdownRefs.current[dropdownOpen] &&
                !dropdownRefs.current[dropdownOpen].contains(event.target)
            ) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside, true); // Pakai capture phase
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [dropdownOpen]);

    const toggleDropdown = (uuid) => {
        setDropdownOpen(dropdownOpen === uuid ? null : uuid);
    };

    const handleConfirmDelete = (uuid, judul, event) => {
        event.stopPropagation();
        setSelectedUUID(uuid);
        setSelectedTitle(judul);
        setShowConfirm(true);
        setDropdownOpen(null);
    };

    async function LoadTableHandler(page=1) {
        setLoadingStatus(true);
        try {
            console.log(`execute LoadTableHandler to call /api/laporDiri`);
            const response = await apiProduction.post("/api/laporDiri", {
                filter_nama: namaPeserta,
                filter_npm: npm,
                filter_ukg: nomorUKG,
                filter_status: status == "not registered" ? "" : status,
                page: page,
            });

            if (response.status === 200 || response.status === 204) {
                setDataSource(response?.data ?? []);
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            alert(detail);
            console.error(detail);
        } finally {
            setLoadingStatus(false);
        }
    }
    async function ExportHandler() {
        setLoadingExport(true);
        try {
            console.log(`execute ExportHandler to call /api/laporDiri/export`);
            const response = await apiProduction.post("/api/laporDiri/export", {filter_status: status=="draf"? null:status},{responseType: 'blob'});

            if (response.status === 200 || response.status === 204) {
                // Check if the response is a valid file (check content type)
                const contentDisposition = response.headers['content-disposition'];
                const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'laporDiriExport.xlsx';

                const blob = response.data;

                // Create a URL for the Blob and trigger the download
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;  // Use the filename from the header or default
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); // Clean up the DOM
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.data?.Detail ?? "ada masalah pada aplikasi";

            alert(detail);
            console.error(detail);
        } finally {
            setLoadingExport(false);
        }
    }
    async function DeleteHandler() {
        if (selectedUUID !== null) {
            try {
                console.log(
                    `execute DeleteHandler to call /api/laporDiri/?`.replace(
                        "?",
                        selectedUUID
                    )
                );
                const response = await apiProduction.delete(
                    "/api/laporDiri/?".replace("?", selectedUUID),
                    {}
                );

                if (response.status === 200 || response.status === 204) {
                    alert("berhasil hapus data");
                    LoadTableHandler(1)
                }
            } catch (error) {
                // console.error(error.response?.data)
                const status = error.response?.status;
                const detail =
                    error.response?.data?.Detail ?? "ada masalah pada aplikasi";

                alert(detail);
            } finally {
                setShowConfirm(false);
                setSelectedUUID(null);
            }
        }
    }

    useEffect(()=>{
      LoadTableHandler(currentPage);
    },[currentPage])

    return (
        <AdminPage selected="laporDiri">
            <>
                {/* Breadcrumb */}
                <nav className="text-gray-600 text-sm mb-4">
                    <span className="text-gray-500">Bank Soal</span>
                </nav>

                <div className="flex flex-col gap-3 relative bg-white shadow-md rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-start gap-3">
                        <Input
                            label="Nama Peserta"
                            type="text"
                            placeholder="masukkan nama peserta"
                            value={namaPeserta}
                            onChange={(e) => {
                                setNamaPeserta(e.target.value);
                            }}
                        />
                        <Input
                            label="Nomor UKG"
                            type="text"
                            placeholder="masukkan nomor UKG"
                            value={nomorUKG}
                            onChange={(e) => {
                                setNomorUKG(e.target.value);
                            }}
                        />

                        <Input
                            label="NIM"
                            type="text"
                            placeholder="masukkan nomor nim"
                            value={npm}
                            onChange={(e) => {
                                setNPM(e.target.value);
                            }}
                        />

                        <Select
                            label="status"
                            options={statusOptions}
                            value={status}
                            onChange={(value) => {
                                setStatus(value);
                            }}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => LoadTableHandler()}
                            className="flex-11"
                            loading={loadingStatus}
                        >
                            Filter Data
                        </Button>

                        <Button
                            onClick={ExportHandler}
                            className="flex-1"
                            variant="success"
                            loading={loadingExport}
                        >
                            Export Excel
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
                    {loadingStatus
                        ? "Loading..."
                        : (dataSource?.data ?? []).map((source, index) => (
                              <div
                                  key={source.id}
                                  className={`relative bg-white shadow-md rounded-lg p-4 border-l-4 ${
                                      source.status === "done"
                                          ? "border-green-500"
                                          : "border-red-500"
                                  }`}
                              >
                                  {/* Judul Bank Soal */}
                                  <h3 className="text-lg font-semibold break-words mb-3">
                                      {source?.nomorUKG ?? ""}
                                  </h3>

                                  {/* Tanggal & Jadwal */}
                                  <div className="flex items-center text-purple-400">
                                      <AiOutlineUser
                                          size={16}
                                          className="mr-2"
                                      />
                                      <span className="text-sm">
                                          {source?.namaPeserta ?? ""}
                                      </span>
                                  </div>
                                  <div className="flex items-center text-purple-400 mb-4">
                                      <TbNumber123 size={16} className="mr-2" />
                                      <span className="text-sm">
                                          {source?.nim ?? ""}
                                      </span>
                                  </div>

                                  {/* Badge Status */}
                                  <span
                                      className={`absolute bottom-3 right-3 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                          source.status === "done"
                                              ? "text-green-600 bg-green-100"
                                              : "text-red-600 bg-red-100"
                                      }`}
                                  >
                                      {source.status === "done"
                                          ? "Sudah Lengkap"
                                          : "Belum Lengkap"}
                                  </span>

                                  {/* Dropdown */}
                                  <div
                                      className="absolute top-3 right-3"
                                      ref={(el) =>
                                          (dropdownRefs.current[source.id] =
                                              el)
                                      }
                                  >
                                      <button
                                          onClick={() =>
                                              toggleDropdown(source.id)
                                          }
                                          className="p-2 rounded-full hover:bg-gray-200"
                                      >
                                          <BsThreeDotsVertical size={20} />
                                      </button>

                                      {/* Dropdown Menu */}
                                      {dropdownOpen === source.id && (
                                          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50">
                                              <ul className="py-1">
                                                  <a
                                                      href={`/laporDiri/detail/?`.replace(
                                                          "?",
                                                          source?.uuid
                                                      )}
                                                  >
                                                      <li
                                                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                          onClick={(event) =>
                                                              event.stopPropagation()
                                                          }
                                                      >
                                                          Detail
                                                      </li>
                                                  </a>

                                                  <a
                                                      href={`/laporDiri/edit/?`.replace(
                                                          "?",
                                                          source?.uuid
                                                      )}
                                                  >
                                                      <li
                                                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                          onClick={(event) =>
                                                              event.stopPropagation()
                                                          }
                                                      >
                                                          Edit
                                                      </li>
                                                  </a>

                                                  <li
                                                      className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                                                      onClick={(event) =>
                                                          handleConfirmDelete(
                                                              source?.uuid,
                                                              source?.nomorUKG,
                                                              event
                                                          )
                                                      }
                                                  >
                                                      Hapus
                                                  </li>
                                              </ul>
                                          </div>
                                      )}
                                  </div>
                              </div>
                          ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  perPage={10}
                  totalData={dataSource?.pagination?.total_data ?? 0}
                  totalPages={dataSource?.pagination?.total_pages ?? 1}
                  onNextChange={() => {
                    if (currentPage < dataSource?.pagination?.total_pages) {
                      setCurrentPage(prev => prev + 1);
                    }
                  }}
                  onPrevChange={() => {
                    if (currentPage > 1) {
                      setCurrentPage(prev => prev - 1);
                    }
                  }}
                  isLoading={loadingStatus}
                />

                <Modal
                    isOpen={showConfirm}
                    title="Konfirmasi Hapus"
                    message={`Apakah Anda yakin ingin menghapus data "${selectedTitle}" ?`}
                    onConfirm={() => DeleteHandler()}
                    onCancel={() => setShowConfirm(false)}
                    confirmText="Hapus"
                    cancelText="Batal"
                />
            </>
        </AdminPage>
    );
};

export default LaporDiri;
