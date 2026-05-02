import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemCardS from "@/components/ItemCardS";
import roomImage from "@/assets/MockRoom.webp";
import mapPinIcon from "@/assets/icons/MapPin.svg";
import phoneIcon from "@/assets/icons/Phone.svg";
import emailIcon from "@/assets/icons/Mail.svg";
import api from "@/lib/axios";
import type { RoomData } from "@/types/room";

export const RoomDetailPage = () => {
  const location = useLocation();
  const room = location.state?.room as RoomData | undefined;

  const getGenderText = (policy: string | undefined) => {
    if (policy === 'Male') return 'Phòng nam';
    if (policy === 'Female') return 'Phòng nữ';
    if (policy === 'Mixed') return 'Phòng nam/nữ';
    return 'Phòng';
  };

  const getPriceText = (beds: RoomData['beds'] | undefined) => {
    if (!beds || beds.length === 0) return 'Đang cập nhật';
    const prices = beds.map(b => Number(b.price) || 0).filter(p => p > 0);
    if (prices.length === 0) return 'Đang cập nhật';

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const format = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    if (minPrice === maxPrice) return format(minPrice) + '/tháng';
    return `${format(minPrice)} - ${format(maxPrice)}/tháng`;
  };
  const [similarRooms, setSimilarRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await api.get('/room?limit=4');
        if (response.data && response.data.success) {
          setSimilarRooms(response.data.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch similar rooms", error);
      } finally {
        setLoading(false);
      }
    };
    console.log(room);
    fetchRooms();
  }, []);

  const title = `CS ${room?.branch?.branch_id}. ${room?.room_number}` || "Đang cập nhật";

  return (
    <div className="w-full flex flex-col pb-10 mx-auto">

      {/*  Section */}
      <div className="flex flex-col w-full md:flex-row gap-6 items-stretch justify-between">

        {/* Left Section: Photos */}
        <div className="w-full md:w-2/3 h-fit flex flex-col gap-3 bg-white/25 rounded-2xl p-5 border border-LightOutline">
          {/* Main Photo */}
          <div className="w-full h-[22rem] rounded-2xl overflow-hidden bg-LightOutline shadow-sm">
            <img src={roomImage} className="w-full h-full object-cover" alt="Main Room" />
          </div>
          {/* Small Photos */}
          <div className="flex gap-3 overflow-x-scroll w-full no-scrollbar">
            <img src={roomImage} className="w-1/4 h-full object-cover rounded-xl border-2 border-transparent hover:border-secondary cursor-pointer transition-colors shadow-sm" alt="Room 1" />
            <img src={roomImage} className="w-1/4 h-full object-cover rounded-xl border-2 border-transparent hover:border-secondary cursor-pointer transition-colors shadow-sm" alt="Room 2" />
            <img src={roomImage} className="w-1/4 h-full object-cover rounded-xl border-2 border-transparent hover:border-secondary cursor-pointer transition-colors shadow-sm" alt="Room 3" />
            <img src={roomImage} className="w-1/4 h-full object-cover rounded-xl border-2 border-transparent hover:border-secondary cursor-pointer transition-colors shadow-sm" alt="Room 4" />
          </div>

          {/* Bottom Section */}
          <div className="mt-8 ">
            <h2 className="text-[1.1rem] be-vietnam-pro-bold text-text mb-6">Các phòng trọ tương tự</h2>
            <div className="flex gap-6 overflow-x-scroll no-scrollbar shrink-0">
              {similarRooms.length > 0 ? (
                similarRooms.map((room) => <ItemCardS key={room.room_id} room={room} />)
              ) : (
                <span className="text-text">Không có phòng tương tự</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Info Card */}
        <div className="w-full md:w-1/3 h-fit flex flex-col p-5 rounded-2xl border border-LightOutline bg-white/25 be-vietnam-pro-light">
          <h1 className="text-size-large be-vietnam-pro-medium text-text mb-5 leading-tight">
            {title}
          </h1>

          <div className="flex justify-between items-center mb-6 text-size-base">
            <span className="text-text/90">{getGenderText(room?.gender_policy)}</span>
            <span className="text-text/90">Còn {room?.available_beds ?? 2} giường trống</span>
          </div>

          <div className="mb-6 flex-1 min-h-[10rem]">
            <h3 className="be-vietnam-pro-medium text-size-base mb-2">Mô tả</h3>
            <p className="be-vietnam-pro-light text-size-small text-text/80 text-justify leading-relaxed max-h-[22vh] overflow-y-scroll">
              {room?.room_description ? `${room.room_description}` : 'Không có mô tả'}
            </p>
          </div>

          <div className="be-vietnam-pro-medium text-secondary text-size-xl mb-6">
            {getPriceText(room?.beds)}
          </div>

          <div className="flex flex-col gap-4 mb-8 be-vietnam-pro-light text-size-small text-text/80">
            <div className="flex items-center gap-3">
              <img src={mapPinIcon} className="w-3.5 h-3.5 text-primary" alt="Location" style={{ filter: 'invert(52%) sepia(35%) saturate(543%) hue-rotate(95deg) brightness(93%) contrast(85%)' }} />
              <span>{room?.branch?.address || "Thành phố Hà Nội / Quận Hà Đông / Phường Mộ Lao"}</span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-text">
                {/* Phone SVG */}
                <img src={phoneIcon} alt="Phone" className="w-4 h-4 opacity-80 text-secondary" />
                <span>{room?.branch?.phone_number || "[PHONE_NUMBER]"}</span>
              </div>
              <div className="h-4 w-[1px] bg-LightOutline"></div>
              <div className="flex items-center gap-2 text-text">
                {/* Email SVG */}
                <img src={emailIcon} alt="Email" className="w-4 h-4 opacity-80 text-secondary" />
                <span>{room?.branch?.email || "[EMAIL_ADDRESS]"}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-center">
            <button className="w-fit px-8 py-2.5 rounded-lg border border-secondary text-secondary be-vietnam-pro-medium hover:bg-secondary hover:text-white transition-all duration-300">
              Đặt lịch xem phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
