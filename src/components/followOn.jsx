import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function FollowOn() {
  return (
    <div className="faded-text pt-2">
      <span>Follow On:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://www.instagram.com/me_abhishek7" target="_blank">
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/abhishek-thakur-b6b0691b9/"
          target="_blank"
        >
          <FaLinkedinIn size={20} />
        </a>
      </div>
    </div>
  );
}
