import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [passThreshold, setPassThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setPassThreshold(true);
      } else {
        setPassThreshold(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* BIG HEADER */}
      <header
        className={`fixed top-0 left-0 z-50 w-full be-vietnam-pro-light text-large bg-background/15 backdrop-blur-[4px] transition-all duration-500 ease-in-out ${passThreshold
          ? "opacity-0 -translate-y-4 pointer-events-none" // Hidden state
          : "opacity-100 translate-y-0 pointer-events-auto" // Visible state
          }`}
      >
        <div className="mx-auto flex w-full items-center justify-between px-8 py-2">
          {/* Left Section */}
          <div className="flex flex-1 justify-start w-fit gap-2">
            <Link to="/#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
              Liên hệ
            </Link>
            <div className="h-6 w-[1.5px] bg-secondary opacity-75"></div>
            <Link to="/#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
              Danh sách lịch hẹn
            </Link>
          </div>

          {/* Center Section: Brand/Logo */}
          <Link className="flex flex-1 justify-center" to="/">
            <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
          </Link>

          {/* Right Section */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <Link to="login" className="text-text transition-colors hover:text-primary">
              Đăng nhập
            </Link>
            <div className="h-6 w-[1.5px] bg-secondary opacity-75"></div>
            <Link to="/register">
              <button className="rounded-md bg-secondary px-3 py-1 be-vietnam-pro-medium text-background transition-colors hover:ring hover:ring-offset-primary hover:ring-offset-2 hover:shadow-md hover:cursor-pointer">
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* SMALL HEADER (PILL)*/}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-1/2 flex items-center justify-between px-4 py-2 rounded-lg bg-background/15 backdrop-blur-[4px] be-vietnam-pro-light text-size-small transition-all duration-500 ease-in-out ${passThreshold
          ? "opacity-100 translate-y-0 pointer-events-auto" // Visible state
          : "opacity-0 -translate-y-4 pointer-events-none"  // Hidden state
          }`}
      >
        {/* Left Section */}
        <div className="flex flex-1 justify-start w-fit gap-2">
          <Link to="/#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
            Liên hệ
          </Link>

          <div className="h-5 w-[1.5px] bg-secondary opacity-75"></div>

          <Link to="/#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
            Danh sách lịch hẹn
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-2 h-fit w-fit">
          <Link to="#" className="text-text transition-colors hover:text-primary whitespace-nowrap">
            Đăng nhập
          </Link>

          <div className="h-5 w-[1.5px] bg-secondary opacity-75"></div>

          <Link to="/register">
            <button className="rounded-md bg-secondary px-2 be-vietnam-pro-medium text-background transition-colors hover:ring hover:ring-offset-primary hover:ring-offset-2 hover:shadow-md hover:cursor-pointer whitespace-nowrap">
              Đăng ký
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;