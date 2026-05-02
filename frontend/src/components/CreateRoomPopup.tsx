import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';

interface Branch {
    branch_id: number;
    address: string;
    name?: string;
}

interface RoomType {
    room_type_id: number;
    name: string;
}

interface CreateRoomFormData {
    gender_policy: 'Male' | 'Female' | 'Mixed';
    branch_id: number;
    room_type_id: number;
    total_beds: number;
    bed_price: number;
    room_description: string;
}

interface CreateRoomPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

const CreateRoomPopup: React.FC<CreateRoomPopupProps> = ({ isOpen, onClose, onCreated }) => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<CreateRoomFormData>({
        defaultValues: {
            gender_policy: 'Male',
            total_beds: 2,
            bed_price: 0,
            room_description: '',
        }
    });

    useEffect(() => {
        if (!isOpen) return;
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
    }, [isOpen]);

    const onSubmit = async (data: CreateRoomFormData) => {
        try {
            console.log(data);
            await api.post('/room', {
                gender_policy: data.gender_policy,
                branch_id: Number(data.branch_id),
                room_type_id: Number(data.room_type_id),
                total_beds: Number(data.total_beds),
                available_beds: Number(data.total_beds),
                room_description: data.room_description,
                bed_price: Number(data.bed_price),
            });
            reset();
            onCreated?.();
            onClose();
        } catch (err: any) {
            console.error('Failed to create room', err);
            alert(err.response?.data?.message || 'Có lỗi xảy ra khi tạo phòng');
        }
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    // Shared input class
    const inputCls = "border border-LightOutline rounded-md px-3 py-1.5 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary transition-colors w-48 text-right";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] ">
            <div className="bg-background rounded-2xl shadow-xl border-2 border-primary overflow-hidden flex min-w-[560px] w-fit">

                {/* Left label panel */}
                <div className="bg-background border-r border-LightOutline flex items-center justify-center px-8 py-10 min-w-[160px]">
                    <p className="be-vietnam-pro-medium text-text text-size-large text-center text-[1rem] leading-relaxed">
                        Điền thông tin<br />của phòng mới
                    </p>
                </div>

                {/* Right form panel */}
                <form onSubmit={handleSubmit(onSubmit)} className='flex-1 flex flex-col md:flex-row gap-10 px-8 py-7'>
                    <div className="flex-1 flex flex-col gap-5 ">

                        {/* Gender policy */}
                        <div className="flex items-center justify-between">
                            <label className="be-vietnam-pro-light text-size-small text-text">Giới tính phòng:</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-1.5 be-vietnam-pro-light text-size-small cursor-pointer">
                                    <input
                                        type="radio"
                                        value="Male"
                                        {...register('gender_policy', { required: true })}
                                        className="accent-secondary w-4 h-4"
                                    />
                                    Nam
                                </label>
                                <label className="flex items-center gap-1.5 be-vietnam-pro-light text-size-small cursor-pointer">
                                    <input
                                        type="radio"
                                        value="Female"
                                        {...register('gender_policy', { required: true })}
                                        className="accent-secondary w-4 h-4"
                                    />
                                    Nữ
                                </label>
                                <label className="flex items-center gap-1.5 be-vietnam-pro-light text-size-small cursor-pointer">
                                    <input
                                        type="radio"
                                        value="Mixed"
                                        {...register('gender_policy', { required: true })}
                                        className="accent-secondary w-4 h-4"
                                    />
                                    Nam/Nữ
                                </label>
                            </div>
                        </div>

                        {/* Branch */}
                        <div className="flex items-center justify-between">
                            <label className="be-vietnam-pro-light text-size-small text-text">Cơ sở:</label>
                            <select
                                {...register('branch_id', { required: true })}
                                className={inputCls}
                            >
                                <option value="">— Chọn cơ sở —</option>
                                {branches.map(b => (
                                    <option key={b.branch_id} value={b.branch_id}>
                                        CS{b.branch_id}: {b.address || b.name}
                                    </option>
                                ))}
                            </select>
                            {errors.branch_id && <span className="text-LightRed text-xs">Bắt buộc</span>}
                        </div>

                        {/* Room type */}
                        <div className="flex items-center justify-between">
                            <label className="be-vietnam-pro-light text-size-small text-text">Loại phòng:</label>
                            <select
                                {...register('room_type_id', { required: true })}
                                className={inputCls}
                            >
                                <option value="">— Chọn loại —</option>
                                {roomTypes.map(rt => (
                                    <option key={rt.room_type_id} value={rt.room_type_id}>{rt.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Total beds */}
                        <div className="flex items-center justify-between">
                            <label className="be-vietnam-pro-light text-size-small text-text">Số giường tối đa:</label>
                            <select
                                {...register('total_beds', { required: true, valueAsNumber: true })}
                                className={inputCls}
                            >
                                {[1, 2, 3, 4, 5, 6, 8].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        {/* Bed price */}
                        <div className="flex items-center justify-between">
                            <label className="be-vietnam-pro-light text-size-small text-text">Giá (VND/tháng)</label>
                            <input
                                type="number"
                                min={0}
                                {...register('bed_price', { valueAsNumber: true })}
                                className={inputCls}
                                placeholder="0"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-2">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-8 py-2 rounded-lg border border-LightOutline text-text be-vietnam-pro-light text-size-small hover:bg-LightOutline/20 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2 rounded-lg bg-secondary hover:bg-tirtiary text-white be-vietnam-pro-medium text-size-small transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Đang tạo...' : 'Tạo'}
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        {/* Bed room_description */}
                        <div className="flex items-center flex-col items-start h-full min-w-[15vw]">
                            <label className="be-vietnam-pro-light text-size-small text-text">Mô tả:</label>
                            <textarea
                                {...register('room_description')}
                                className="be-vietnam-pro-light text-size-small text-text outline-none border border-LightOutline rounded-lg px-4 py-2 h-full w-full"
                                placeholder="Mô tả về phòng"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoomPopup;
