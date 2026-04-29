import mapPinIcon from "@/assets/icons/MapPin.svg";
import roomImage from "@/assets/MockRoom.webp";

const RentedItem = () => {
    return (
        <article className="flex flex-col md:flex-row gap-4 p-4 w-full h-fit bg-white rounded-lg border border-LightOutline/50 be-vietnam-pro-light">
            <img src={roomImage} className="w-[10rem] h-[7rem] object-cover rounded-lg" alt="Room" />
            <div className="be-vietnam-pro-light flex flex-col gap-1 justify-center">
                <h3 className="be-vietnam-pro-regular text-size-base text-text">Tên phòng trọ Tên phòng trọ Tên phòng trọ</h3>
                <div className="flex items-center gap-2 mt-1">
                    <img src={mapPinIcon} alt="Location" className="h-3 w-3 shrink-0" />
                    <span className="text-size-small">123 street 3/2</span>
                </div>
                <p className="text-size-small text-DarkOutline mt-2 ">
                    Hủy thuê vào 12/12/2026
                </p>
            </div>
        </article>
    );
};

export default RentedItem;
