import AdminPage from "@src/AdminPage";
import { useEffect, useRef, useState } from "react";
import Button from "@src/Components/Button";
import Modal from "@src/Components/Modal";
import { FaPlus } from "react-icons/fa";
import { CiCalendarDate, CiViewList } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const LaporDiri = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const dropdownRefs = useRef({});
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(null);

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
    event.stopPropagation(); // Mencegah klik bocor
    // setSelectedUUID(uuid);
    // setSelectedTitle(judul);
    setShowConfirm(true);
    setDropdownOpen(null);
  };

  return (
    <AdminPage>
      <>
      {/* Breadcrumb */}
      <nav className="text-gray-600 text-sm mb-4">
        <span className="text-gray-500">Bank Soal</span>
      </nav>

      {/* Header */}
      <div className="flex justify-end items-center mb-4">
        <a href="#">
          <Button>
            <div className="flex items-center">
              <FaPlus size={14} className="mr-2" />
              Tambah Data
            </div>
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
              key={"x"}
              className={`relative bg-white shadow-md rounded-lg p-4 border-l-4 ${
                "active" === "active" ? "border-green-500" : "border-red-500"
              }`}
            >
              {/* Judul Bank Soal */}
              <h3 className="text-lg font-semibold break-words mb-3">
                {"hello"}
              </h3>

              {/* Tanggal & Jadwal */}
              <div className="flex items-center text-purple-400">
                <CiCalendarDate size={16} className="mr-2" />
                <span className="text-sm">01 Jan 2025</span>
              </div>
              <div className="flex items-center text-purple-400 mb-4">
                <CiViewList size={16} className="mr-2" />
                <span className="text-sm">
                  {0} Jadwal Terhubung
                </span>
              </div>

              {/* Badge Status */}
              <span
                className={`absolute bottom-3 right-3 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  "active" === "active"
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {"active" === "active" ? "Aktif" : "Non-aktif"}
              </span>

              {/* Dropdown */}
              <div
                className="absolute top-3 right-3"
                ref={(el) => (dropdownRefs.current["xxx"] = el)}
              >
                <button
                  onClick={() => toggleDropdown("xxx")}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <BsThreeDotsVertical size={20} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen === "xxx" && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50">
                    <ul className="py-1">
                      <a href="#">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Detail
                        </li>
                      </a>

                      <a href="#">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Edit
                        </li>
                      </a>

                      <li
                          className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                          onClick={(event) =>
                            handleConfirmDelete("", "tes", event)
                          }
                        >
                          Hapus
                        </li>
                    </ul>
                  </div>
                )}
              </div>
        </div>
      </div>

      <Modal
        isOpen={showConfirm}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus data "${selectedTitle}" ?`}
        onConfirm={()=>{}}
        onCancel={() => setShowConfirm(false)}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </>
    </AdminPage>
  );
};

export default LaporDiri;
