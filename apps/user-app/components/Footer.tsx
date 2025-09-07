import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";


export default function Footer() {
  return (
    <footer className="mt-5 p-6">
      <hr className="mb-6" />

      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* About */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold ">PayLock</h1>
          <p>Simplifying your finances with secure and seamless digital payments.</p>
          <p>© 2025 PayLock. All rights reserved.</p>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">Legal</h1>
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-gray-500">Connect With Us</h1>
          <div className="flex gap-4 text-2xl ">
            <a href="https://www.linkedin.com/in/bharat-khatwani-864616257/" className="text-gray-500" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
            </a>
            <a href="https://x.com/BharatKhatwan13" target="_blank" className="text-gray-500" rel="noopener noreferrer">
              <FaXTwitter className="hover:text-blue-400 cursor-pointer" />
            </a>
            <a href="https://github.com/BharatKhatwani" target="_blank"  rel="noopener noreferrer">
              <LuGithub className="hover:text-gray-700 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <div className="text-center text-sm mt-4">
        PayLock is a registered trademark of PayLock, Inc.
      </div>
    </footer>
  );
}
