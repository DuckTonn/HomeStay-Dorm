import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";

const Header = () => {
  const [passThreshold, setPassThreshold] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setPassThreshold(true);
      } else {
        setPassThreshold(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 be-vietnam-pro-light bg-background/15 backdrop-blur-[4px] flex items-center justify-between
        ${passThreshold
          ? "top-5 left-1/2 -translate-x-1/2 w-[60%] px-6 py-2 rounded-lg text-size-small border border-LightOutline/30 shadow-sm border-1 border-primary" // Small header state (adjusted width to 60% to fit content comfortably)
          : "top-0 left-0 w-full px-8 py-3 text-large rounded-none border-transparent shadow-none" // Big header state
        }`}
    >
      <div className="mx-auto flex w-full items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-1 justify-start items-center w-fit gap-2">
          <Link to="/#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
            Liên hệ
          </Link>
          <div className={`w-[1.5px] bg-secondary opacity-75 transition-all duration-500 ${passThreshold ? "h-5" : "h-6"}`}></div>
          <Link to="/#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
            Danh sách lịch hẹn
          </Link>
        </div>

        {/* Center Section: Brand/Logo (Fades out and shrinks) */}
        <Link
          className={`flex justify-center items-center overflow-hidden
            ${passThreshold ? "w-0 opacity-0 scale-50 flex-none" : "flex-1 opacity-100 scale-100 w-auto"}`}
          to="/"
        >
          <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
        </Link>

        {/* Right Section */}
        <div className={`flex flex-1 items-center justify-end transition-all duration-500 ${passThreshold ? "gap-2" : "gap-5"}`}>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="text-text transition-colors hover:text-primary whitespace-nowrap">
                Đăng nhập
              </Link>
              <div className={`w-[1.5px] bg-secondary opacity-75 transition-all duration-500 ${passThreshold ? "h-5" : "h-6"}`}></div>
              <Link to="/register">
                <button className={`rounded-md bg-secondary be-vietnam-pro-medium text-background transition-colors hover:ring hover:ring-offset-primary hover:ring-offset-2 hover:shadow-md hover:cursor-pointer whitespace-nowrap ${passThreshold ? "px-2 py-0.5" : "px-3 py-1"}`}>
                  Đăng ký
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;