import "./TopBar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../../Context/ThemeContext";

function Topbar({ toggleSideBar, profileClick, dropDownRef }) {
  const { darkMode } = useTheme();

  return (
    <header className={`topbar ${darkMode ? "dark" : "light"}`}>
      <div className="topbar-left">
        <button onClick={toggleSideBar} className="hamburg-button">
          ☰
        </button>

        <div className="brand">
          <span className="brand-icon">✦</span>
          <div>
            <h3>AI Chat</h3>
            <p>Smart assistant</p>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <button
          onClick={profileClick}
          ref={dropDownRef}
          className="profile-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M14 14s-1-4-6-4-6 4-6 4h12z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
