import ItemCardS from "@/components/ItemCardS";
import roomImage from "@/assets/MockRoom.webp";
import mapPinIcon from "@/assets/icons/MapPin.svg";

export const RoomDetailPage = () => {
  return (
    <div className="w-full flex flex-col gap-10 pb-10 max-w-6xl mx-auto">

      {/*  Section */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">

        {/* Left Section: Photos */}
        <div className="w-full md:w-3/5 h-fit flex flex-col gap-3 bg-white/25 rounded-2xl p-5 border border-LightOutline">
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
              <ItemCardS />
              <ItemCardS />
              <ItemCardS />
              <ItemCardS />

            </div>
          </div>
        </div>

        {/* Right Side: Info Card */}
        <div className="w-full md:w-2/5 h-fit flex flex-col p-5 rounded-2xl border border-LightOutline bg-white/25 be-vietnam-pro-light">
          <h1 className="text-size-large be-vietnam-pro-medium text-text mb-5 leading-tight">
            Phòng quá đẹp quá đẳng cấp có một không hai
          </h1>

          <div className="flex justify-between items-center mb-6 text-size-base">
            <span className="text-text/90">Phòng Nam</span>
            <span className="text-text/90">Còn 2 giường trống</span>
          </div>

          <div className="mb-6 flex-1">
            <h3 className="be-vietnam-pro-medium text-size-base mb-2">Mô tả</h3>
            <p className="be-vietnam-pro-light text-size-small text-text/80 text-justify leading-relaxed max-h-[22vh] overflow-y-scroll">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ...
            </p>
          </div>

          <div className="be-vietnam-pro-medium text-secondary text-size-xl mb-6">
            3.000.000 đ/tháng
          </div>

          <div className="flex flex-col gap-4 mb-8 be-vietnam-pro-light text-size-small text-text/80">
            <div className="flex items-center gap-3">
              <img src={mapPinIcon} className="w-4 h-4 opacity-80 text-secondary" alt="Location" style={{ filter: 'invert(52%) sepia(35%) saturate(543%) hue-rotate(95deg) brightness(93%) contrast(85%)' }} />
              <span>Thành phố Hà Nội / Quận Hà Đông / Phường Mộ Lao</span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-secondary">
                {/* Phone SVG */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>0333226123</span>
              </div>
              <div className="h-4 w-[1px] bg-LightOutline"></div>
              <div className="flex items-center gap-2 text-secondary">
                {/* Email SVG */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>giaobao2kk5@gmail.com</span>
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
