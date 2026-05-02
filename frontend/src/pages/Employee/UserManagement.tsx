import React from 'react';
import searchIcon from "@/assets/icons/Search.svg";
import editIcon from "@/assets/icons/Edit.svg";
import deleteIcon from "@/assets/icons/Delete.svg";
import addIcon from "@/assets/icons/Add.svg";
import FilterSelect from "@/layouts/FilterSelect";

const UserManagement = () => {
    const tableData = [
        { id: 1, account: "abc", email: "giaobao2kk5@gmail.com", gender: "Nam", phone: "1231231231", isRenting: "CS1, 422" },
        { id: 2, account: "abc", email: "giaobao2kk5@gmail.com", gender: "Nam", phone: "1231231231", isRenting: "Không thuê" },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-10">
            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative w-64">
                    <input type="text" placeholder="Tìm theo tên / email" className="w-full border border-DarkOutline rounded-full py-1.5 px-4 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
                    <img src={searchIcon} alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                </div>

                <FilterSelect
                    defaultLabel="Giới tính"
                    options={[
                        { label: "Nam", value: "male" },
                        { label: "Nữ", value: "female" }
                    ]}
                />

                <FilterSelect
                    defaultLabel="Trạng thái"
                    options={[
                        { label: "Đang hoạt động", value: "active" },
                        { label: "Đã xóa", value: "deleted" }
                    ]}
                />

                <FilterSelect
                    defaultLabel="Quốc tịch"
                    options={[
                        { label: "Việt Nam", value: "vn" },
                        { label: "Nước ngoài", value: "foreign" }
                    ]}
                />

                <FilterSelect
                    defaultLabel="Trạng thái thuê"
                    options={[
                        { label: "Đang thuê", value: "renting" },
                        { label: "Chưa thuê phòng", value: "not_renting" }
                    ]}
                />

                <FilterSelect
                    defaultLabel="Vai trò"
                    options={[
                        { label: "Người dùng", value: "user" },
                        { label: "Quản trị viên", value: "admin" }
                    ]}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">

                {/* Table Section (Left) */}
                <div className="flex-[2] bg-white rounded-2xl shadow-md overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse be-vietnam-pro-light text-size-small">
                            <thead>
                                <tr className="border-b-2 border-text be-vietnam-pro-medium text-text bg-background">
                                    <th className="py-4 px-8 font-medium text-left">Tên tài khoản</th>
                                    <th className="py-4 px-8 font-medium">Email</th>
                                    <th className="py-4 px-8 font-medium">Giới tính</th>
                                    <th className="py-4 px-8 font-medium">Số đt</th>
                                    <th className="py-4 px-8 font-medium">Đang thuê</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id} className="border-b border-LightOutline/50 hover:bg-LightOutline/10 transition-colors cursor-pointer">
                                        <td className="py-4 px-8 text-left">{row.account}</td>
                                        <td className="py-4 px-8">{row.email}</td>
                                        <td className="py-4 px-8">{row.gender}</td>
                                        <td className="py-4 px-8">{row.phone}</td>
                                        <td className={`py-4 px-8 ${row.isRenting === 'Không thuê' ? 'text-DarkOutline' : ''}`}>{row.isRenting}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Section & Cards (Right) */}
                <div className="flex-1 flex flex-col gap-6">

                    {/* Details Card */}
                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                        <h3 className="be-vietnam-pro-medium text-size-xl text-center mb-6">abc</h3>

                        <div className="flex flex-col gap-4 be-vietnam-pro-light text-size-small">
                            <div className="flex justify-between">
                                <span className="text-text">Id</span>
                                <span className="be-vietnam-pro-medium">1231890273128071204</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text">Họ tên</span>
                                <span className="be-vietnam-pro-medium">Giao Thái Bảo</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text">Email</span>
                                <span className="be-vietnam-pro-medium">giaobao2kk5@gmail.com</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text">CCCD</span>
                                <span className="be-vietnam-pro-medium">1231890273128071204</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <span className="text-text">Quốc tịch</span>
                                    <span className="be-vietnam-pro-medium">Philipine</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-text">Giới tính :</span>
                                    <span className="be-vietnam-pro-medium">Nam</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text">Số điện thoại</span>
                                <span className="be-vietnam-pro-medium">0909090909090909</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text">Vai trò</span>
                                <span className="be-vietnam-pro-medium">Người dùng</span>
                            </div>
                            <div className="flex justify-between border-b border-LightOutline pb-4">
                                <span className="text-text">Đang thuê</span>
                                <span className="be-vietnam-pro-medium">CS1 . 422.4</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors be-vietnam-pro-light text-size-small">
                                Chỉnh sửa <img src={editIcon} alt="Edit" className="w-5 h-5" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-LightRed text-LightRed hover:bg-LightRed hover:text-white transition-colors be-vietnam-pro-light text-size-small">
                                Xóa <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Stats & Add Button */}
                    <div className="flex justify-between gap-4 h-full">
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-LightOutline p-4 flex flex-col justify-center">
                            <span className="text-size-2xl be-vietnam-pro-bold">25</span>
                            <span className="be-vietnam-pro-light text-size-xs text-DarkOutline">Tổng người dùng hệ thống</span>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-LightOutline p-4 flex flex-col justify-center">
                            <span className="text-size-2xl be-vietnam-pro-bold">20</span>
                            <span className="be-vietnam-pro-light text-size-xs text-DarkOutline">Khách hàng</span>
                        </div>
                        <button className="flex-1 bg-secondary hover:bg-primary transition-colors rounded-xl shadow-sm border border-secondary text-white p-4 flex flex-col justify-center items-center cursor-pointer">
                            <img src={addIcon} alt="Add" className="w-6 h-6 brightness-0 invert mb-1" />
                            <span className="be-vietnam-pro-medium text-size-small">Thêm người</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default UserManagement;
