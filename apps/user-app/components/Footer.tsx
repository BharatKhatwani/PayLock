import { FaLinkedin } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className=" mt-5 p-6">
      <hr className="mb-6" />

      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* About */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-black ">PayLoad</h1>
          <p>Simplifying your finances with secure and seamless digital payments.</p>
          <p>© 2025 PayLoad. All rights reserved.</p>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Legal</h1>
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Connect With Us</h1>
          <div className="flex gap-4 text-2xl">
            <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
            <FaXTwitter className="hover:text-blue-400 cursor-pointer" />
            <LuGithub className="hover:text-gray-700 cursor-pointer" />
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <div className="text-center text-sm mt-4">
        PayLoad is a registered trademark of PayLoad, Inc.
      </div>
    </footer>
  );
}
