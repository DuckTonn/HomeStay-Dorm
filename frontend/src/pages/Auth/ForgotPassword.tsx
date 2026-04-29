import { Link } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import heroImage from "@/assets/images/hero.png"; // Path to the image in image_8.png

export const ForgetPasswordPage = () => {
  return (
    <AuthLayout heroImage={heroImage}>
      {/* 1. Heading & Instructions */}
      <div className="text-center mb-12 be-vietnam-pro-light">
        <h1 className="text-6xl text-text mb-4 whitespace-nowrap be-vietnam-pro-bold">
          Tạo lại mật khẩu
        </h1>
        <p className="text-lg text-text/80 leading-relaxed max-w-md mx-auto">
          Vui lòng nhập địa chỉ email của tài khoản để chúng tôi gửi mail tạo mật khẩu mới cho quý khách
        </p>
      </div>

      {/* 2. Form */}
      <form className="flex flex-col gap-6">
        {/* Email Input */}
        <div>
          <input 
            type="email" 
            placeholder="Điền email của tài khoản"
            className="w-full h-14 rounded-lg border border-LightOutline px-6 text-lg placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Primary Green Button */}
        <button 
          type="submit" 
          className="h-14 w-full rounded-lg bg-primary text-white text-lg font-medium transition-colors hover:bg-opacity-90 active:scale-[0.98]"
        >
          Gửi email tạo lại mật khẩu
        </button>
      </form>

      {/* Optional: Add a subtle 'Back to Login' link if needed later */}
      <div className="text-center mt-12">
          <Link to="/login" className="text-text/75 hover:text-primary hover:underline">
              Quay lại đăng nhập
          </Link>
      </div>

    </AuthLayout>
  );
};