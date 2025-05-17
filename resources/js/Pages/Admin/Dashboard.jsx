import {
  HiOutlineCalendar,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaCheckCircle, FaTimesCircle, FaCommentDots } from "react-icons/fa";
import Select from "@src/Components/Select";
import Input from "@src/Components/Input";
import AdminPage from "@src/AdminPage";

const AdminDashboard = () => {
  return (
    <AdminPage selected="dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tipe Data (Hanya Muncul di Mobile) */}
        <div className="bg-white shadow-md rounded-lg p-6 block lg:hidden">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Tipe Data
          </h2>
          <Select
            label="Pilih Tipe Data"
            options={[
              { label: "Total", value: "total" },
              { label: "List", value: "list" },
            ]}
            value={""}
            onChange={(value) => handleFilterChange("type", value)}
          />
        </div>

        {/* Laporan Ujian - Lebih besar, menempati 2 kolom di desktop */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 self-start">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Laporan</h2>

          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Select
              label="Filter Jadwal Ujian"
              options={[
                { label: "Semua Jadwal", value: "" },
              ]}
              value={""}
              onChange={(value) => handleFilterChange("uuidJadwalUjian", value)}
            />
            <Input
              label="Filter Tanggal Mulai"
              type="date"
              value={""}
              onChange={(e) =>
                handleFilterChange("tanggalMulai", e.target.value)
              }
            />
            <Input
              label="Filter Tanggal Akhir"
              type="date"
              value={""}
              onChange={(e) =>
                handleFilterChange("tanggalAkhir", e.target.value)
              }
            />
          </div>

          {/* Empty State Jika Tidak Ada Data */}
          {"" === "list" && isEmptyData && (
            <div className="text-center p-6 flex flex-col items-center">
              <HiOutlineExclamationCircle className="text-gray-400 text-7xl mb-4" />
              <p className="text-gray-600 text-lg font-semibold">
                Data tidak ditemukan.
              </p>
            </div>
          )}

          {/* Tampilkan Kartu Jika Type == 'total' */}
          {"" === "total" &&
            laporan &&
            typeof laporan === "object" && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Tidak Lulus */}
                <div className="relative border border-gray-200 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center font-semibold text-base bg-red-50 hover:bg-red-100 transition">
                  <div className="p-4 rounded-full mb-3 bg-red-200 text-red-700">
                    <FaTimesCircle className="text-4xl" />
                  </div>
                  <span className="text-sm font-semibold">
                    Total Tidak Lulus
                  </span>
                  <p className="text-4xl font-bold text-red-800 mt-2">
                    {laporan.totalTidakLulus}
                  </p>
                </div>

                {/* Total Lulus */}
                <div className="relative border border-gray-200 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center font-semibold text-base bg-green-50 hover:bg-green-100 transition">
                  <div className="p-4 rounded-full mb-3 bg-green-200 text-green-700">
                    <FaCheckCircle className="text-4xl" />
                  </div>
                  <span className="text-sm font-semibold">Total Lulus</span>
                  <p className="text-4xl font-bold text-green-800 mt-2">
                    {laporan.totalLulus}
                  </p>
                </div>

                {/* Total Lulus Dengan Respon */}
                <div className="relative border border-gray-200 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center font-semibold text-base bg-purple-50 hover:bg-purple-100 transition">
                  <div className="p-4 rounded-full mb-3 bg-purple-200 text-purple-700">
                    <FaCommentDots className="text-4xl" />
                  </div>
                  <span className="text-sm font-semibold">
                    Total Lulus Dengan Respon
                  </span>
                  <p className="text-4xl font-bold text-purple-800 mt-2">
                    {laporan.totalLulusDenganRespon}
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Sidebar: Tipe Data (Hanya Muncul di Desktop) dan Ujian Aktif */}
        <div className="flex flex-col gap-6">
          {/* Tipe Data (Hanya Muncul di Desktop) */}
          <div className="bg-white shadow-md rounded-lg p-6 hidden lg:block">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Tampilan Data
            </h2>
            <Select
              label="Pilih Tamplan Data"
              options={[
                { label: "Total", value: "total" },
                { label: "List", value: "list" },
              ]}
              value={""}
              onChange={(value) => handleFilterChange("type", value)}
            />
          </div>

          {/* Ujian Aktif */}
          <div className="bg-white shadow-md rounded-lg p-4">
              <div className="text-center p-6 flex flex-col items-center">
                <HiOutlineCalendar className="text-gray-400 text-7xl mb-4" />
                <p className="text-gray-600 text-lg font-semibold">
                  Tidak ada ujian aktif saat ini.
                </p>
              </div>
          </div>
        </div>
      </div>
    </AdminPage>
  );
};

export default AdminDashboard;
