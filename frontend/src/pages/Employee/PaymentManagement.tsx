import React from 'react';
import searchIcon from "@/assets/icons/Search.svg";
import notifyIcon from "@/assets/icons/Notify.svg";
import verifyIcon from "@/assets/icons/Check.svg"; // Using Check.svg as verify
import FilterSelect from "@/layouts/FilterSelect";

const PaymentManagement = () => {
    const tableData = [
        { id: 1, base: "1", room: "422", user: "ABC", missingAmount: "10.000đ", missingMonth: "10-2026", phone: "0976090909", isPaid: false },
        { id: 2, base: "1", room: "422", user: "ABC", missingAmount: "0đ", missingMonth: "0", phone: "0976090909", isPaid: true },
        { id: 3, base: "1", room: "422", user: "ABC", missingAmount: "10.000đ", missingMonth: "10-2026", phone: "0976090909", isPaid: false },
        { id: 4, base: "1", room: "422", user: "ABC", missingAmount: "10.000đ", missingMonth: "10-2026", phone: "0976090909", isPaid: false },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-10">
            <div className="w-full bg-white rounded-2xl border border-LightOutline shadow-sm p-6 overflow-hidden">
                
                {/* Top Filters Row */}
                <div className="flex flex-wrap gap-4 items-center mb-4">
                    <FilterSelect 
                        defaultLabel="Cơ sở" 
                        options={[
                            { label: "Tất cả cơ sở", value: "all" },
                            { label: "Cơ sở 1", value: "1" }
                        ]} 
                    />
                    <FilterSelect 
                        defaultLabel="Trạng thái" 
                        options={[
                            { label: "Đã đóng", value: "paid" },
                            { label: "Chưa đóng", value: "unpaid" }
                        ]} 
                    />
                    <FilterSelect 
                        defaultLabel="Sắp xếp" 
                        options={[
                            { label: "Sắp xếp theo tên", value: "name" },
                            { label: "Sắp xếp theo phòng", value: "room" }
                        ]} 
                    />
                    <FilterSelect 
                        defaultLabel="Thứ tự" 
                        options={[
                            { label: "Tăng dần", value: "asc" },
                            { label: "Giảm dần", value: "desc" }
                        ]} 
                    />
                    
                    <input type="date" className="border border-DarkOutline rounded-full px-4 py-1.5 be-vietnam-pro-light text-size-small text-DarkOutline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors bg-white" placeholder="Ngày bắt đầu" />
                    <span className="text-DarkOutline">-</span>
                    <input type="date" className="border border-DarkOutline rounded-full px-4 py-1.5 be-vietnam-pro-light text-size-small text-DarkOutline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors bg-white" placeholder="Ngày kết thúc" />
                    
                    <div className="ml-auto text-LightRed be-vietnam-pro-medium underline cursor-pointer hover:text-DarkRed transition-colors">
                        Tổng tiền thiếu: 1.000.000.000đ
                    </div>
                </div>

                {/* Bottom Filters Row */}
                <div className="flex flex-wrap gap-4 items-center mb-8">
                    <div className="relative w-64">
                        <input type="text" placeholder="Tìm theo tên" className="w-full border border-DarkOutline rounded-full py-1.5 px-4 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
                        <img src={searchIcon} alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    </div>
                    <label className="flex items-center gap-2 be-vietnam-pro-light text-size-small text-DarkOutline cursor-pointer hover:text-text transition-colors">
                        <input type="checkbox" className="w-3.5 h-3.5 border-LightOutline rounded accent-secondary cursor-pointer" />
                        Ưu tiên hiện chưa đóng
                    </label>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse be-vietnam-pro-light text-size-small">
                        <thead>
                            <tr className="border-b-2 border-text be-vietnam-pro-medium text-text">
                                <th className="py-3 px-4 font-medium text-left">Cơ sở</th>
                                <th className="py-3 px-4 font-medium text-left">Phòng</th>
                                <th className="py-3 px-4 font-medium text-left">User1</th>
                                <th className="py-3 px-4 font-medium text-left">Tiền thiếu</th>
                                <th className="py-3 px-4 font-medium text-left">Tháng thiếu</th>
                                <th className="py-3 px-4 font-medium text-left">Số đt</th>
                                <th className="py-3 px-4 font-medium text-center">.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id} className={`${row.isPaid ? 'bg-secondary/20' : 'bg-LightRed/10'} border-b border-LightOutline/50 hover:brightness-95 transition-all`}>
                                    <td className="py-3 px-4 text-left">{row.base}</td>
                                    <td className="py-3 px-4 text-left">{row.room}</td>
                                    <td className="py-3 px-4 text-left">{row.user}</td>
                                    <td className="py-3 px-4 text-left">{row.missingAmount}</td>
                                    <td className="py-3 px-4 text-left">{row.missingMonth}</td>
                                    <td className="py-3 px-4 text-left">{row.phone}</td>
                                    <td className="py-3 px-4 text-center">
                                        {row.isPaid ? (
                                            <span className="text-secondary be-vietnam-pro-medium">Đã đóng</span>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:shadow-md cursor-pointer">
                                                    <img src={notifyIcon} alt="Notify" className="w-4 h-4 brightness-0 invert" />
                                                </button>
                                                <button className="w-7 h-7 bg-white border border-secondary rounded-full flex items-center justify-center hover:bg-secondary/10 transition-colors hover:shadow-md cursor-pointer">
                                                    <img src={verifyIcon} alt="Verify" className="w-4 h-4" style={{ filter: 'invert(52%) sepia(35%) saturate(543%) hue-rotate(95deg) brightness(93%) contrast(85%)' }} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default PaymentManagement;
