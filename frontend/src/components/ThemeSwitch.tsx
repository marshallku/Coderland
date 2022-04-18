import { useThemeStore } from "../store";
import "./ThemeSwitch.css";

export default function ThemeSwitch() {
  const { toggleTheme } = useThemeStore();

  return (
    <button type="button" onClick={toggleTheme} className="theme-switch">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        className="theme-switch__icon theme-switch__icon--light"
      >
        <path
          d="M12,7c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S14.8,7,12,7L12,7z M2,13h2c0.6,0,1-0.4,1-1s-0.4-1-1-1H2c-0.5,0-1,0.4-1,1
	S1.5,13,2,13z M20,13h2c0.5,0,1-0.4,1-1s-0.5-1-1-1h-2c-0.5,0-1,0.4-1,1S19.5,13,20,13z M11,2v2c0,0.6,0.4,1,1,1s1-0.4,1-1V2
	c0-0.5-0.4-1-1-1S11,1.5,11,2z M11,20v2c0,0.5,0.4,1,1,1s1-0.5,1-1v-2c0-0.5-0.4-1-1-1S11,19.5,11,20z M6,4.6c-0.4-0.4-1-0.4-1.4,0
	C4.2,5,4.2,5.6,4.6,6L5.6,7C6,7.4,6.7,7.4,7,7s0.4-1,0-1.4L6,4.6z M18.4,17c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l1.1,1.1
	c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L18.4,17z M19.4,6c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L17,5.6c-0.4,0.4-0.4,1,0,1.4
	s1,0.4,1.4,0L19.4,6z M7.1,18.4c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L4.6,18c-0.4,0.4-0.4,1,0,1.4s1,0.4,1.4,0L7.1,18.4z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        className="theme-switch__icon theme-switch__icon--dark"
      >
        <path d="M16.5,14.9 M12,3c-5,0-9,4-9,9s4,9,9,9s9-4,9-9c0-0.5,0-0.9-0.1-1.4c-1,1.4-2.6,2.3-4.4,2.3c-3,0-5.4-2.4-5.4-5.4  c0-1.8,0.9-3.4,2.3-4.4C12.9,3,12.5,3,12,3L12,3z" />
      </svg>
    </button>
  );
}
