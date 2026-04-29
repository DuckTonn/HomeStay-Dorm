import MeetUp from "@/components/MeetUp";

const MeetUpList = () => {
    return (
        <section className="flex flex-col w-full h-fit gap-5 items-center border-2 border-LightOutline rounded-2xl p-5">
            <p className="text-size-large be-vietnam-pro-medium">Danh sách lịch hẹn</p>
            <MeetUp />
            <MeetUp />
            <MeetUp />
            <MeetUp />
            <MeetUp />
        </section>
    )
}

export default MeetUpList;