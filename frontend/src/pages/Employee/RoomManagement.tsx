import React, { useState, useEffect } from 'react';
import searchIcon from "@/assets/icons/Search.svg";
import deleteIcon from "@/assets/icons/Delete.svg";
import addIcon from "@/assets/icons/Add.svg";
import FilterSelect from "@/layouts/FilterSelect";
import ConfirmDialog from "@/components/ConfirmDialog";
import CreateRoomPopup from "@/components/CreateRoomPopup";
import type { RoomData } from "@/types/room";
import api from "@/lib/axios";
import { useForm } from 'react-hook-form';
import editIcon from "@/assets/icons/Edit.svg";

interface RoomTenant {
    tenant_id: number;
    name: string;
    phone: string | null;
}

const RoomManagement = () => {
    const [rooms, setRooms] = useState<RoomData[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
    const [tenants, setTenants] = useState<RoomTenant[]>([]);
    const [tenantsLoading, setTenantsLoading] = useState(false);
    const [roomsLoading, setRoomsLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState<RoomTenant | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [pendingDeleteBed, setPendingDeleteBed] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [viewMode, setViewMode] = useState<'tenants' | 'details'>('tenants');
    const [branches, setBranches] = useState<any[]>([]);
    const [roomTypes, setRoomTypes] = useState<any[]>([]);

    // Filter state
    const [search, setSearch] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [branchFilter, setBranchFilter] = useState('');
    const [isFullFilter, setIsFullFilter] = useState('');

    const fetchRooms = async () => {
        setRoomsLoading(true);
        try {
            const params = new URLSearchParams({ limit: '50' });
            if (genderFilter) params.set('gender_policy', genderFilter);
            if (branchFilter) params.set('branch_id', branchFilter);
            if (isFullFilter) params.set('is_full', isFullFilter);
            console.log(params.toString());
            const response = await api.get(`/room?${params.toString()}`);
            if (response.data && response.data.success) {
                setRooms(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch rooms", error);
        } finally {
            setRoomsLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, [genderFilter, branchFilter, isFullFilter]);

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const [branchRes, typeRes] = await Promise.all([
                    api.get('/branch'),
                    api.get('/room/room-type/all'),
                ]);
                if (branchRes.data?.success) setBranches(branchRes.data.data);
                if (typeRes.data?.success) setRoomTypes(typeRes.data.data);
            } catch (e) {
                console.error('Failed to load meta', e);
            }
        };
        fetchMeta();
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting: isUpdating }
    } = useForm<any>();

    const handleRoomClick = (room: RoomData) => {
        if (isEditing) return;
        setSelectedRoom(room);
        setViewMode('details');
        setIsEditing(false);
    };

    const handleEditClick = () => {
        if (!selectedRoom) return;
        reset({
            gender_policy: selectedRoom.gender_policy,
            branch_id: selectedRoom.branch_id,
            room_type_id: selectedRoom.room_type?.room_type_id,
            total_beds: selectedRoom.total_beds,
            room_description: selectedRoom.room_description || '',
            bed_price: getRawPrice(selectedRoom),
        });
        setIsEditing(true);
    };

    const onUpdateSubmit = async (data: any) => {
        if (!selectedRoom) return;
        try {
            const response = await api.put(`/room/${selectedRoom.room_id}`, {
                ...data,
                branch_id: Number(data.branch_id),
                room_type_id: Number(data.room_type_id),
                total_beds: Number(data.total_beds),
                bed_price: Number(data.bed_price),
            });
            if (response.data?.success) {
                setIsEditing(false);
                fetchRooms();
                setSelectedRoom(response.data.data);
            }
        } catch (err) {
            console.error('Failed to update room', err);
            alert('Có lỗi xảy ra khi cập nhật phòng');
        }
    };

    const handleViewTenants = async (room: RoomData) => {
        if (isEditing) return;
        setSelectedRoom(room);
        setViewMode('tenants');
        setIsEditing(false);
        setTenants([]);
        setTenantsLoading(true);
        try {
            const response = await api.get(`/room/${room.room_id}/tenants`);
            if (response.data && response.data.success) {
                setTenants(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch tenants", error);
        } finally {
            setTenantsLoading(false);
        }
    };

    const getRoomLabel = (room: RoomData) =>
        room.branch_id ? `CS${room.branch_id} . ${room.room_number}` : `Phòng ${room.room_number}`;

    const getPriceText = (room: RoomData) => {
        if (!room.beds || room.beds.length === 0) return 'Đang cập nhật';
        const prices = room.beds.map(b => Number(b.price) || 0).filter(p => p > 0);
        if (prices.length === 0) return 'Đang cập nhật';
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const format = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
        if (minPrice === maxPrice) return format(minPrice) + '/tháng';
        return `${format(minPrice)} - ${format(maxPrice)}/tháng`;
    };

    const getRawPrice = (room: RoomData) => {
        if (!room.beds || room.beds.length === 0) return 0;
        const minPrice = Math.min(...room.beds.map(b => Number(b.price) || 0));
        return minPrice;
    };

    const handleDeleteConfirm = async () => {
        if (!pendingDelete || !selectedRoom) return;
        setDeleteLoading(true);
        try {
            await api.delete(`/room/${selectedRoom.room_id}/tenants/${pendingDelete.tenant_id}`);
            setTenants(prev => prev.filter(t => t.tenant_id !== pendingDelete.tenant_id));
            setPendingDelete(null);
        } catch (error) {
            console.error('Failed to remove tenant', error);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleAddBed = async () => {
        if (!selectedRoom) return;
        try {
            // Use the price of existing beds or 0
            const defaultPrice = selectedRoom.beds?.[0]?.price || 0;
            const response = await api.post('/room/bed', {
                room_id: selectedRoom.room_id,
                price: defaultPrice
            });
            
            if (response.data?.success) {
                // Refresh rooms to get updated counts and bed list
                await fetchRooms();
                // Find and update selected room
                const updatedRoom = rooms.find(r => r.room_id === selectedRoom.room_id);
                if (updatedRoom) setSelectedRoom(updatedRoom);
                else {
                    // If not in current state, we might need to refetch specific room or just wait for rooms to update
                    // Actually fetchRooms updates the 'rooms' state, but selectedRoom is a separate state
                    // We can just rely on the next render or fetch it manually
                    const roomRes = await api.get(`/room/${selectedRoom.room_id}`);
                    if (roomRes.data?.success) setSelectedRoom(roomRes.data.data);
                }
            }
        } catch (error) {
            console.error('Failed to add bed', error);
            alert('Có lỗi xảy ra khi thêm giường');
        }
    };

    const handleDeleteBedConfirm = async () => {
        if (!pendingDeleteBed || !selectedRoom) return;
        setDeleteLoading(true);
        try {
            const response = await api.delete(`/room/bed/${pendingDeleteBed.bed_id}`);
            if (response.data?.success) {
                await fetchRooms();
                // Refresh selected room
                const roomRes = await api.get(`/room/${selectedRoom.room_id}`);
                if (roomRes.data?.success) setSelectedRoom(roomRes.data.data);
                setPendingDeleteBed(null);
            }
        } catch (error) {
            console.error('Failed to delete bed', error);
            alert('Có lỗi xảy ra khi xóa giường');
        } finally {
            setDeleteLoading(false);
        }
    };

    const filteredRooms = rooms.filter(r => {
        if (!search) return true;
        return r.room_number?.toString().toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-10">
                {/* Filters Row */}
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative w-64">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Tìm theo số phòng"
                            className="w-full border border-DarkOutline rounded-full py-1.5 px-4 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                        />
                        <img src={searchIcon} alt="search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    </div>

                    <FilterSelect
                        defaultLabel="Cơ sở"
                        options={[
                            { label: "Tất cả", value: "" },
                            { label: "CS1", value: "1" },
                            { label: "CS2", value: "2" },
                            { label: "CS3", value: "3" },
                        ]}
                        onChange={(e) => setBranchFilter((e.target as HTMLSelectElement).value)}
                    />

                    <FilterSelect
                        defaultLabel="Giới tính"
                        options={[
                            { label: "Tất cả", value: "" },
                            { label: "Nam", value: "Male" },
                            { label: "Nữ", value: "Female" },
                            { label: "Nam/Nữ", value: "Mixed" },
                        ]}
                        onChange={(e) => setGenderFilter((e.target as HTMLSelectElement).value)}
                    />

                    <FilterSelect
                        defaultLabel="Số giường trống"
                        options={[
                            { label: "Trống và đầy", value: "" },
                            { label: "Còn trống", value: "false" },
                            { label: "Đầy", value: "true" },
                        ]}
                        onChange={(e) => setIsFullFilter((e.target as HTMLSelectElement).value)}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-stretch">

                    {/* Left: Room List Table */}
                    <div className="flex-3 bg-white rounded-2xl shadow-md overflow-hidden min-h-[400px] max-h-[75vh] overflow-y-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-collapse be-vietnam-pro-light text-size-small">
                                <thead>
                                    <tr className="border-b-2 border-text be-vietnam-pro-medium text-text bg-background">
                                        <th className="py-4 px-6 font-medium text-left">Số phòng</th>
                                        <th className="py-4 px-6 font-medium">Giới tính</th>
                                        <th className="py-4 px-6 font-medium">Tối đa</th>
                                        <th className="py-4 px-6 font-medium">Trống</th>
                                        <th className="py-4 px-6 font-medium">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => setShowCreateRoom(true)}
                                                    className="bg-secondary hover:bg-tirtiary hover:cursor-pointer rounded-md p-1 px-3 transition-colors"
                                                >
                                                    <img src={addIcon} className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomsLoading ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-DarkOutline be-vietnam-pro-light">Đang tải...</td>
                                        </tr>
                                    ) : filteredRooms.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-DarkOutline be-vietnam-pro-light">Không có phòng</td>
                                        </tr>
                                    ) : filteredRooms.map((room) => (
                                        <tr
                                            key={room.room_id}
                                            onClick={() => handleRoomClick(room)}
                                            className={`border-b border-LightOutline/50 transition-colors ${isEditing ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} ${selectedRoom?.room_id === room.room_id ? 'bg-secondary/10' : !isEditing && 'hover:bg-LightOutline/10'}`}
                                        >
                                            <td className="py-4 px-6 text-left be-vietnam-pro-medium">{getRoomLabel(room)}</td>
                                            <td className="py-4 px-6">{room.gender_policy}</td>
                                            <td className="py-4 px-6">{room.total_beds}</td>
                                            <td className="py-4 px-6">{room.available_beds}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleViewTenants(room); }}
                                                    className="bg-secondary hover:bg-tirtiary transition-colors rounded-full px-4 py-1 text-white text-size-small be-vietnam-pro-light hover:cursor-pointer "
                                                >
                                                    Xem danh sách giường
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right: Tenant List Panel */}
                    <div className="flex-2 bg-white rounded-2xl shadow-md overflow-hidden min-h-[400px] flex flex-col">
                        {/* Header */}
                        <div className="border-b-2 border-text bg-background px-6 py-4 flex items-center justify-between">
                            <h3 className="be-vietnam-pro-medium text-text">

                            </h3>
                            <h3 className="be-vietnam-pro-medium text-text">
                                {selectedRoom ? (viewMode === 'tenants' ? `Giường - Phòng ${getRoomLabel(selectedRoom)}` : `Phòng ${getRoomLabel(selectedRoom)}`) : 'Chọn một phòng'}
                            </h3>
                            <h3 className="be-vietnam-pro-medium text-text">

                            </h3>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {!selectedRoom ? (
                                <div className="flex items-center justify-center h-full py-20 text-DarkOutline be-vietnam-pro-light text-size-small">
                                    Chọn một phòng để xem chi tiết
                                </div>
                            ) : viewMode === 'tenants' ? (
                                tenantsLoading ? (
                                    <div className="flex items-center justify-center h-full py-20 text-DarkOutline be-vietnam-pro-light text-size-small">
                                        Đang tải...
                                    </div>
                                ) : (
                                    <div className="p-4">
                                        <table className="w-full text-left border-collapse be-vietnam-pro-light text-size-small">
                                            <thead>
                                                <tr className="border-b border-LightOutline be-vietnam-pro-medium text-text">
                                                    <th className="py-3 px-6 text-center">ID</th>
                                                    <th className="py-3 px-6 text-center whitespace-nowrap">Trạng thái</th>
                                                    <th className="py-3 px-6 text-center">Sđt khách</th>
                                                    {selectedRoom && (
                                                        <th className="py-3 px-6 justify-center">
                                                            <div 
                                                                onClick={handleAddBed}
                                                                className="w-fit h-fit bg-secondary rounded-full p-2 hover:bg-tirtiary hover:cursor-pointer mx-auto transition-transform active:scale-95"
                                                                title="Thêm giường"
                                                            >
                                                                <img src={addIcon} className='w-3 h-3' />
                                                            </div>
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!selectedRoom.beds || selectedRoom.beds.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4} className="py-10 text-center text-DarkOutline">Phòng chưa có giường</td>
                                                    </tr>
                                                ) : selectedRoom.beds.map((bed) => (
                                                    <tr key={bed.bed_id} className="border-b border-LightOutline/40 hover:bg-LightOutline/10 transition-colors">
                                                        <td className="py-3 px-6 text-center">{bed.bed_id}</td>
                                                        <td className="py-3 px-6 text-center">
                                                            <span className={`px-2 py-1 rounded-full text-[10px] ${bed.status === 'Empty' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                                {bed.status === 'Empty' ? 'Trống' : 'Đã thuê'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">{(bed as any).tenant_phone || '—'}</td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex justify-center gap-2">
                                                                {bed.status === 'Empty' && (
                                                                    <button
                                                                        onClick={() => setPendingDeleteBed(bed)}
                                                                        className="text-LightRed hover:shadow-md hover:shadow-LightOutline rounded-full hover:cursor-pointer transition-colors"
                                                                        title="Xóa giường"
                                                                    >
                                                                        <img src={deleteIcon} alt="Xóa" className="w-5 h-5" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            ) : (
                                // viewMode === 'details'
                                <div className="p-6 h-full">
                                    {isEditing ? (
                                        <form onSubmit={handleSubmit(onUpdateSubmit)} className="flex flex-col gap-4 h-full">
                                            <div className="grid grid-cols-2 gap-y-4 text-size-small be-vietnam-pro-medium items-center">
                                                <div className="text-DarkOutline">Giới tính:</div>
                                                <select {...register('gender_policy')} className="border border-DarkOutline rounded-md p-1 be-vietnam-pro-light text-size-small">
                                                    <option value="Male">Nam</option>
                                                    <option value="Female">Nữ</option>
                                                    <option value="Mixed">Nam/Nữ</option>
                                                </select>

                                                <div className="text-DarkOutline">Cơ sở:</div>
                                                <select {...register('branch_id')} className="border border-DarkOutline rounded-md p-1 be-vietnam-pro-light text-size-small">
                                                    {branches.map(b => (
                                                        <option key={b.branch_id} value={b.branch_id}>CS{b.branch_id}: {b.address}</option>
                                                    ))}
                                                </select>

                                                <div className="text-DarkOutline">Loại phòng:</div>
                                                <select {...register('room_type_id')} className="border border-DarkOutline rounded-md p-1 be-vietnam-pro-light text-size-small">
                                                    {roomTypes.map(rt => (
                                                        <option key={rt.room_type_id} value={rt.room_type_id}>{rt.name}</option>
                                                    ))}
                                                </select>

                                                <div className="text-DarkOutline">Số giường tối đa:</div>
                                                <input type="number" {...register('total_beds')} className="border border-DarkOutline rounded-md p-1 be-vietnam-pro-light text-size-small" />

                                                <div className="text-DarkOutline">Số tiền (VND):</div>
                                                <input type="number" {...register('bed_price')} className="border border-DarkOutline rounded-md p-1 be-vietnam-pro-light text-size-small" />
                                            </div>

                                            <div className="flex flex-col gap-1 flex-1 min-h-[100px]">
                                                <label className="be-vietnam-pro-medium text-size-small">Mô tả:</label>
                                                <textarea {...register('room_description')} className="border border-DarkOutline rounded-md p-2 be-vietnam-pro-light text-size-small flex-1 resize-none" />
                                            </div>
                                            <div className="flex gap-12 mt-2 be-vietnam-pro-light text-size-base">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="flex-1 border border-secondary text-secondary py-2 rounded-lg transition-colors hover:bg-secondary hover:text-background hover:cursor-pointer"
                                                >
                                                    Hủy
                                                </button>

                                                <button
                                                    type="submit"
                                                    disabled={isUpdating}
                                                    className="flex-1 bg-secondary hover:bg-tirtiary text-white py-2 rounded-lg transition-colors disabled:opacity-50 hover:cursor-pointer"
                                                >
                                                    {isUpdating ? 'Đang lưu...' : 'Lưu'}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="flex flex-col gap-2 h-full">
                                            <div className="grid grid-cols-2 gap-y-4 text-size-small be-vietnam-pro-medium">
                                                <div className="text-DarkOutline ">Giới tính:</div>
                                                <div className="be-vietnam-pro-light">{selectedRoom.gender_policy === 'Male' ? 'Nam' : selectedRoom.gender_policy === 'Female' ? 'Nữ' : 'Nam/Nữ'}</div>

                                                <div className="text-DarkOutline ">Cơ sở:</div>
                                                <div className="be-vietnam-pro-light">{selectedRoom.branch?.address || `CS${selectedRoom.branch_id}`}</div>

                                                <div className="text-DarkOutline ">Loại phòng:</div>
                                                <div className="be-vietnam-pro-light">{selectedRoom.room_type?.name || '—'}</div>

                                                <div className="text-DarkOutline ">Số giường:</div>
                                                <div className="be-vietnam-pro-light">{selectedRoom.total_beds} (Trống: {selectedRoom.available_beds})</div>

                                                <div className="text-DarkOutline ">Số tiền:</div>
                                                <div className="be-vietnam-pro-light">{getPriceText(selectedRoom)}</div>
                                            </div>

                                            <div className="flex flex-col gap-1 h-full">
                                                <div className="text-DarkOutline be-vietnam-pro-light text-size-small">Mô tả:</div>
                                                <div className="be-vietnam-pro-light text-size-small p-3 rounded-lg h-full border border-DarkOutline">
                                                    {selectedRoom.room_description || 'Không có mô tả'}
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleEditClick}
                                                className="flex items-center justify-center gap-2 bg-secondary hover:bg-tirtiary text-white py-2 rounded-lg be-vietnam-pro-medium transition-colors mt-4"
                                            >
                                                <img src={editIcon} className="w-6 h-6" />
                                                Chỉnh sửa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <ConfirmDialog
                isOpen={!!pendingDelete}
                message={`Bạn có chắc chắn muốn xóa người dùng "${pendingDelete?.name}" khỏi phòng không?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setPendingDelete(null)}
                isLoading={deleteLoading}
            />

            <ConfirmDialog
                isOpen={!!pendingDeleteBed}
                message={`Bạn có chắc chắn muốn xóa giường "${pendingDeleteBed?.bed_id}" khỏi phòng không?`}
                onConfirm={handleDeleteBedConfirm}
                onCancel={() => setPendingDeleteBed(null)}
                isLoading={deleteLoading}
            />

            <CreateRoomPopup
                isOpen={showCreateRoom}
                onClose={() => setShowCreateRoom(false)}
                onCreated={() => { fetchRooms(); }}
            />
        </>
    );
};

export default RoomManagement;
