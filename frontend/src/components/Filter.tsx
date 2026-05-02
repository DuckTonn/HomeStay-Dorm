import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plusIcon from "@/assets/icons/CirclePlus.svg";

const Filter = ({ pos }: { pos: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [genderMale, setGenderMale] = useState(false);
  const [genderFemale, setGenderFemale] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [availableBeds, setAvailableBeds] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleNext = () => {
    // Construct query params
    const params = new URLSearchParams();
    if (genderMale && !genderFemale) params.append("gender_policy", "Male");
    if (!genderMale && genderFemale) params.append("gender_policy", "Female");
    if (genderMale && genderFemale) params.append("gender_policy", "Mixed");
    
    if (branchId) params.append("branch_id", branchId);
    if (roomType) params.append("room_type_id", roomType);
    if (availableBeds) params.append("available_beds", availableBeds);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    setIsOpen(false);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`absolute ${pos} flex py-1 px-2 items-center gap-2 rounded-[0.5rem] bg-secondary text-lg font-medium text-background shadow-md transition-colors hover:bg-tirtiary shrink-0 hover:cursor-pointer z-10`}
      >
        <img src={plusIcon} alt="Filter" className="h-6 w-6" />
        <span>Tiêu chí</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#FFFDF7] border border-[#81A18B] rounded-2xl flex max-w-[800px] w-[90%] overflow-hidden shadow-xl be-vietnam-pro-light relative z-50">
            
            {/* Left Pane */}
            <div className="w-[35%] border-r border-[#81A18B] p-8 flex items-center justify-center bg-[#FFFDF7]">
              <h2 className="text-xl md:text-2xl be-vietnam-pro-semibold text-center leading-tight text-text">
                Điền tiêu chí<br />phòng thuê
              </h2>
            </div>

            {/* Right Pane */}
            <div className="w-[65%] p-8 flex flex-col gap-5 text-size-small text-text">
              
              {/* Giới tính phòng */}
              <div className="flex items-center">
                <span className="w-40">Giới tính phòng:</span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-secondary" checked={genderMale} onChange={e => setGenderMale(e.target.checked)} />
                    Nam
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-secondary" checked={genderFemale} onChange={e => setGenderFemale(e.target.checked)} />
                    Nữ
                  </label>
                </div>
              </div>

              {/* Cơ sở */}
              <div className="flex items-center">
                <span className="w-40">Cơ sở:</span>
                <select 
                  className="flex-1 border border-DarkOutline rounded px-3 py-1.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary bg-transparent"
                  value={branchId}
                  onChange={e => setBranchId(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="1">CS1: 227 Nguyễn Văn Cừ</option>
                  <option value="2">CS2: Khu phố 6 Linh Trung</option>
                </select>
              </div>

              {/* Loại phòng */}
              <div className="flex items-center">
                <span className="w-40">Loại phòng:</span>
                <select 
                  className="w-32 border border-DarkOutline rounded px-3 py-1.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary bg-transparent ml-auto"
                  value={roomType}
                  onChange={e => setRoomType(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="1">Thường</option>
                  <option value="2">VIP</option>
                </select>
              </div>

              {/* Số giường trống */}
              <div className="flex items-center">
                <span className="w-40">Số giường trống:</span>
                <select 
                  className="w-32 border border-DarkOutline rounded px-3 py-1.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary bg-transparent ml-auto"
                  value={availableBeds}
                  onChange={e => setAvailableBeds(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Giá */}
              <div className="flex items-center">
                <span className="w-40">Giá:</span>
                <div className="flex items-center gap-3 ml-auto">
                  <input 
                    type="number" 
                    className="w-24 border border-DarkOutline rounded px-3 py-1.5 text-center focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary bg-transparent" 
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                  />
                  <span>—</span>
                  <input 
                    type="number" 
                    className="w-24 border border-DarkOutline rounded px-3 py-1.5 text-center focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary bg-transparent" 
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="border border-[#81A18B] text-[#81A18B] px-4 py-1.5 rounded hover:bg-[#81A18B]/10 transition-colors cursor-pointer"
                >
                  Hủy đăng ký
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-secondary text-white px-6 py-1.5 rounded hover:bg-primary transition-colors shadow-sm cursor-pointer ml-auto"
                >
                  Tiếp theo
                </button>
              </div>

            </div>
          </div>
          {/* Backdrop click handler */}
          <div className="absolute inset-0 z-40" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
};

export default Filter;