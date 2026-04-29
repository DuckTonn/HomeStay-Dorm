import { Link } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import heroImage from "@/assets/images/hero.png"; // Path to the large room image
import FacebookButton from "@/components/auth/FacebookButton";
import GoogleButton from "@/components/auth/GoogleButton";

export const RegisterPage = () => {
  return (
    <AuthLayout heroImage={heroImage}>
      {/* 1. Heading & Accent Link */}
      <div className="text-center mb-10 be-vietnam-pro-light">
        <h1 className="text-7xl text-text mb-2 whitespace-nowrap be-vietnam-pro-bold">
          Đăng ký
        </h1>
        <p className="text-lg text-text/80">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="text-secondary font-medium hover:underline">
            đăng nhập
          </Link>
        </p>
      </div>

      {/* 2. Credentials Form */}
      <form className="flex flex-col gap-6">
        <input 
          type="email" 
          placeholder="Email"
          className="w-full h-14 rounded-lg border border-LightOutline px-6 text-lg placeholder:text-gray-400 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
        />
        
        <input 
          type="password" 
          placeholder="Mật khẩu"
          className="w-full h-14 rounded-lg border border-LightOutline px-6 text-lg placeholder:text-gray-400 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
        />

        <input 
          type="password" 
          placeholder="Nhập lại mật khẩu"
          className="w-full h-14 rounded-lg border border-LightOutline px-6 text-lg placeholder:text-gray-400 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
        />

        {/* Secondary Green Button */}
        <button 
          type="submit" 
          className="h-[3rem] w-[14rem] mx-auto rounded-lg bg-secondary text-white text-lg font-medium transition-colors hover:cursor-pointer hover:bg-tirtiary"
        >
          Đăng ký
        </button>
      </form>

      {/* 3. Social Divider */}
      <div className="relative flex items-center justify-center my-10">
        <div className="flex-grow border-t border-LightOutline"></div>
        <span className="flex-shrink mx-4 text-text/75 text-base px-2 bg-background z-10">
          Hoặc đăng ký bằng
        </span>
        <div className="flex-grow border-t border-LightOutline"></div>
      </div>

      {/* 4. Social Login Buttons */}
      <div className="flex gap-4 justify-center">
        <GoogleButton />
        <FacebookButton />
      </div>

    </AuthLayout>
  );
};