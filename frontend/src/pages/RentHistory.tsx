import RentingItem from "@/components/RentingItem";
import RentedItem from "@/components/RentedItem";

const RentHistory = () => {
    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 pb-10">
            {/* Đang thuê Section */}
            <section className="w-full">
                <h2 className="text-secondary text-[1.5rem] be-vietnam-pro-bold mb-4">Đang thuê</h2>
                <RentingItem />
            </section>

            {/* Đã thuê Section */}
            <section className="w-full">
                <h2 className="text-LightRed text-[1.5rem] be-vietnam-pro-bold mb-4">Đã thuê</h2>
                
                <div className="relative w-full max-w-sm mb-6">
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên" 
                        className="w-full border border-DarkOutline rounded-full py-2 px-4 be-vietnam-pro-light text-size-small focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-DarkOutline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <RentedItem />
                    <RentedItem />
                    <RentedItem />
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    <button className="text-secondary hover:text-primary transition-colors">&lt;</button>
                    <button className="w-8 h-8 rounded-md bg-secondary text-white flex items-center justify-center be-vietnam-pro-medium text-size-small">1</button>
                    <button className="w-8 h-8 rounded-md border border-secondary text-secondary flex items-center justify-center be-vietnam-pro-medium text-size-small hover:bg-secondary/10 transition-colors">2</button>
                    <button className="w-8 h-8 rounded-md border border-secondary text-secondary flex items-center justify-center be-vietnam-pro-medium text-size-small hover:bg-secondary/10 transition-colors">3</button>
                    <button className="text-secondary hover:text-primary transition-colors">&gt;</button>
                </div>
            </section>
        </div>
    );
};

export default RentHistory;
