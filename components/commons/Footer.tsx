import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="  pl-4 py-4 mx-auto lg:py-8 w-full lg:w-2/3">
      <div className="flex items-center gap-4 text-xl mb-4">
        <FaFacebookF className="cursor-pointer" />
        <FaInstagram className="cursor-pointer" />
        <FaTwitter className="cursor-pointer" />
        <FaYoutube className="cursor-pointer" />
      </div>
      <div className="flex items-center text-[#808080]">
        <div className="flex flex-col  md:flex-row text-[13px] w-1/2 gap-y-2">
          <ul className="flex gap-2 flex-col md:w-[50%]">
            <li className="hover:underline cursor-pointer">
              Audio Description
            </li>
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">
              Investor Relations
            </li>
          </ul>
          <ul className="flex gap-2 flex-col md:w-[50%]">
            <li className="hover:underline cursor-pointer">Teams of Use</li>
            <li className="hover:underline cursor-pointer">Legal Notices</li>
            <li className="hover:underline cursor-pointer">
              Corporate Information
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row text-[13px] w-1/2 gap-y-2">
          <ul className="flex gap-2 flex-col md:w-[50%]">
            <li className="hover:underline cursor-pointer">
              Audio Description
            </li>
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">
              Investor Relations
            </li>
          </ul>
          <ul className="flex gap-2 flex-col md:w-[50%]">
            <li className="hover:underline cursor-pointer">Teams of Use</li>
            <li className="hover:underline cursor-pointer">Legal Notices</li>
            <li className="hover:underline cursor-pointer">
              Corporate Information
            </li>
          </ul>
        </div>
      </div>
      <div className="my-4">
        <span className="text-[#808080] text-[11px]">
          © 1997-2023 Netflix, Inc.
        </span>
      </div>
    </footer>
  )
}

export default Footer
