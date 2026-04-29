import mapPinIcon from "@/assets/icons/MapPin.svg";
import roomImage from "@/assets/MockRoom.webp";

const RentingItem = () => {
    return (
        <div className="w-full h-fit rounded-lg bg-gradient-to-r from-tirtiary/40 to-transparent p-4 flex flex-col md:flex-row gap-6 items-center be-vietnam-pro-light">
            <img src={roomImage} alt="Room" className="w-[14rem] h-[10rem] object-cover rounded-lg" />

            <div className="flex flex-col justify-center flex-1 gap-2 py-4 h-full">
                <div className="flex items-center gap-2">
                    <h3 className="be-vietnam-pro-medium text-size-base">Tên phòng trọ Tên phòng trọ Tên phòng trọ</h3>
                    <span className="text-DarkOutline text-size-base font-light">|</span>
                    <span className=" text-size-small">Giường 2</span>
                </div>

                <div className="flex items-center gap-2">
                    <img src={mapPinIcon} alt="Location" className="h-3 w-3 shrink-0" />
                    <span className="text-size-small">123 street 3/2</span>
                </div>

                <span className="text-size-small">Trả phòng theo hợp đồng: 18-2</span>

                <button className="text-left underline be-vietnam-pro-light text-size-small mt-4 hover:text-secondary w-fit cursor-pointer">
                    Yêu cầu trả phòng
                </button>
            </div>
        </div>
    );
};

export default RentingItem;
