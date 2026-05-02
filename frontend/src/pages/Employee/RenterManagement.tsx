import React from 'react';
import searchIcon from "@/assets/icons/Search.svg";
import editIcon from "@/assets/icons/Edit.svg";
import deleteIcon from "@/assets/icons/Delete.svg";
import addIcon from "@/assets/icons/Add.svg";
import FilterSelect from "@/layouts/FilterSelect";

const RenterManagement = () => {
    const tableData = [
        { id: 1, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422" },
        { id: 2, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422" },
        { id: 3, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422" },
        { id: 4, account: "abc", phone: "1231231231", email: "giaobao2kk5@gmail.com", room: "CS1, 422" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-10">
            <div className="w-full bg-white rounded-2xl border border-LightOutline shadow-sm p-6 overflow-hidden min-h-[500px]">
                
                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 items-center mb-6">
                    <div className="relative w-64">
                        <input type="text" placeholder="Tìm theo tên / email" className="w-full border border-DarkOutline rounded-full py-1.5 px-4 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
                        <img src={searchIcon} alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    </div>
                    <FilterSelect 
                        defaultLabel="Cơ sở" 
                        options={[
                            { label: "Cơ sở 1", value: "1" },
                            { label: "Cơ sở 2", value: "2" }
                        ]} 
                    />
                    <FilterSelect 
                        defaultLabel="Phòng" 
                        options={[
                            { label: "Số phòng", value: "room_number" },
                            { label: "Loại phòng", value: "room_type" }
                        ]} 
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse be-vietnam-pro-light text-size-small">
                        <thead>
                            <tr className="border-b-2 border-text be-vietnam-pro-medium text-text">
                                <th className="py-3 px-4 font-medium">Tên tài khoản</th>
                                <th className="py-3 px-4 font-medium">Số đt</th>
                                <th className="py-3 px-4 font-medium">Email</th>
                                <th className="py-3 px-4 font-medium">Đang thuê</th>
                                <th className="py-3 px-4 font-medium w-32">
                                    <button className="w-full bg-secondary text-white rounded py-1 flex items-center justify-center hover:bg-primary transition-colors">
                                        <img src={addIcon} alt="Add" className="w-4 h-4 brightness-0 invert" />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id} className="border-b border-LightOutline/50 hover:bg-LightOutline/10 transition-colors">
                                    <td className="py-4 px-4">{row.account}</td>
                                    <td className="py-4 px-4">{row.phone}</td>
                                    <td className="py-4 px-4">{row.email}</td>
                                    <td className="py-4 px-4">{row.room}</td>
                                    <td className="py-4 px-4 flex justify-center gap-2 items-center">
                                        <button className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center hover:bg-primary transition-colors hover:shadow-md cursor-pointer">
                                            <img src={editIcon} alt="Edit" className="w-3.5 h-3.5 brightness-0 invert" />
                                        </button>
                                        <button className="w-7 h-7 bg-LightRed rounded-full flex items-center justify-center hover:bg-DarkRed transition-colors hover:shadow-md cursor-pointer">
                                            <img src={deleteIcon} alt="Delete" className="w-3.5 h-3.5 brightness-0 invert" />
                                        </button>
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

export default RenterManagement;
