import React from 'react';
import searchIcon from "@/assets/icons/Search.svg";
import FilterSelect from '@/layouts/FilterSelect';

const RenterList = () => {
    const tableData = [
        { id: 1, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422.1" },
        { id: 2, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422.1" },
        { id: 3, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422.1" },
        { id: 4, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422.1" },
    ];

    return (
        <div className="w-full rounded-2xl p-6 overflow-hidden">
            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <div className="relative w-64">
                    <input type="text" placeholder="Tìm theo tên / email" className="w-full border border-DarkOutline rounded-full py-1.5 px-4 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
                    <img src={searchIcon} alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                </div>
                <FilterSelect
                    defaultLabel="Cơ sở"
                    options={[
                        { label: "Cơ sở 1", value: "all" },
                        { label: "Cơ sở 2", value: "1" }
                    ]}
                />
                <FilterSelect
                    defaultLabel="Số phòng"
                    options={[
                        { label: "Tất cả", value: "all" },
                        { label: "403", value: "403" }
                    ]}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-2xl  min-h-[70vh]">
                <table className="w-full text-center border-collapse be-vietnam-pro-light text-size-small">
                    <thead>
                        <tr className="border-b-2 border-text be-vietnam-pro-medium text-text bg-background">
                            <th className="py-3 px-4 font-medium">Tên tài khoản</th>
                            <th className="py-3 px-4 font-medium">Số đt</th>
                            <th className="py-3 px-4 font-medium">Email</th>
                            <th className="py-3 px-4 font-medium">Đang thuê</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row) => (
                            <tr key={row.id} className="border-b border-LightOutline/50 hover:bg-LightOutline/10 transition-colors">
                                <td className="py-4 px-4">{row.account}</td>
                                <td className="py-4 px-4">{row.phone}</td>
                                <td className="py-4 px-4">{row.email}</td>
                                <td className="py-4 px-4">{row.room}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default RenterList;
