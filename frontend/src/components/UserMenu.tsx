import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
                Xin chào, {user?.username}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-LightOutline rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-text hover:bg-LightOutline/50" onClick={() => setIsOpen(false)}>
                        Thông tin cá nhân
                    </Link>
                    {['admin', 'manager', 'sale', 'accountant', 'employee'].includes(user?.role || '') && (
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-text hover:bg-LightOutline/50" onClick={() => setIsOpen(false)}>
                            Quản lý (Dashboard)
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-LightOutline/50"
                    >
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;