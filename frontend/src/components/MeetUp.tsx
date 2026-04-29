import mock from "@/assets/images/hero.png";

const MeetUp = () => {
    return (
        <section className="flex flex-col md:flex-row gap-4 p-3 w-full h-fit border border-LightOutline bg-white rounded-lg">
            <img src={mock} className="w-[11rem] h-[8rem] object-cover rounded-lg" alt="" />
            <div className="be-vietnam-pro-light flex flex-col gap-2 justify-center">
                <h1 className="text-size-large ">12:00 - 12/12/2026 </h1>
                <p className="text-size-base text-DarkOutline">CS1.322.7 - 123 thoại ngọc hầu</p>

                <div className="flex gap-3">
                    <button className="w-fit rounded-md border-2 border-tirtiary text-tirtiary text-size-base whitespace-nowrap px-4 p-1 transition-colors hover:bg-tirtiary hover:text-white hover:cursor-pointer">
                        Hủy lịch hẹn
                    </button>
                    <button className="w-fit rounded-md border-2 border-tirtiary text-tirtiary text-size-base whitespace-nowrap px-4 p-1 transition-colors hover:bg-tirtiary hover:text-white hover:cursor-pointer">
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MeetUp;