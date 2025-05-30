import { FaCheckCircle, FaTimesCircle, FaCommentDots } from "react-icons/fa";
import AdminPage from "@src/AdminPage";

const AdminDashboard = ({lengkap=0,tidakLengkap=0}) => {
    return (
        <AdminPage selected="dashboard">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Lulus */}
                <div className="relative border border-gray-200 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center font-semibold text-base bg-green-50 hover:bg-green-100 transition">
                    <div className="p-4 rounded-full mb-3 bg-green-200 text-green-700">
                        <FaCheckCircle className="text-4xl" />
                    </div>
                    <span className="text-sm font-semibold">Total Lapor Diri Sudah Lengkap</span>
                    <p className="text-4xl font-bold text-green-800 mt-2">
                        {lengkap}
                    </p>
                </div>

                {/* Total Lulus Dengan Respon */}
                <div className="relative border border-gray-200 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center font-semibold text-base bg-purple-50 hover:bg-purple-100 transition">
                    <div className="p-4 rounded-full mb-3 bg-purple-200 text-purple-700">
                        <FaCommentDots className="text-4xl" />
                    </div>
                    <span className="text-sm font-semibold">
                        Total Lapor Diri Belum Lengkap
                    </span>
                    <p className="text-4xl font-bold text-purple-800 mt-2">
                        {tidakLengkap}
                    </p>
                </div>
            </div>
        </AdminPage>
    );
};

export default AdminDashboard;
