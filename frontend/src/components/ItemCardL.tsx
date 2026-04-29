import homeIcon from "@/assets/icons/Room.svg";
import mapPinIcon from "@/assets/icons/MapPin.svg";
import roomImage from "@/assets/MockRoom.webp";

const ItemCardL = () => {
  return (
    <article className="w-full max-w-[18rem] flex flex-col overflow-hidden rounded-2xl border border-LightOutline bg-white/30 shadow-sm transition-shadow hover:shadow-md be-vietnam-pro-light">
      <div className="relative h-48 w-full p-2">
        <img
          src={roomImage}
          alt="Cho thuê nhà, khu tập thể"
          className="h-full w-full rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2 px-5 pb-4 pt-2">

        {/* Meta Row: Time & Icon */}
        <div className="flex items-center justify-between text">
          <span className="be-vietnam-pro-medium text-size-small">Trống 2 giường</span>
          <span className="text-size-xs text-text/50">1 ngày trước</span>
        </div>

        {/* Title */}
        <h2 className="text-size-large font-semibold leading-tight text-text">
          Cho thuê nhà, khu tập thể
        </h2>

        {/* Details List */}
        <ul className="mt-1 flex flex-col gap-2 text-base text-text">
          <li className="flex items-center gap-3">
            {/* Custom Bullet Point */}
            <span className="ml-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text" />
            <span>Phòng nam</span>
          </li>

          <li className="flex items-center gap-3">
            <span className="ml-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-text" />
            <span>100.000.000 VNĐ/tháng</span>
          </li>

          {/* Location with custom Map Pin SVG */}
          <li className="mt-1 flex items-center gap-2 text-size-base justify-start">
            <img
              src={mapPinIcon}
              alt="Location"
              className="ml-0.75 h-3 w-3 shrink-0"
            />
            <span>Quận Tân Phú, TPHCM</span>
          </li>
        </ul>

      </div>
    </article>
  );
};

export default ItemCardL;