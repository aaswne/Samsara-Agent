"use client"

import styles from "./Page.module.css"
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { useTheme } from "@/app/Context/ThemeContext";
import Footer from "./components/Footer/Footer";
import { useRouter } from "next/navigation";
import Button from "./components/Button/Button"

function Home() {

  const route = useRouter()   

  const handleClick = () => {
    route.push('/DashBoard')
  }

const { darkMode } = useTheme();

  return (
    <div
      className={styles.landingPage}
      style={{
        background: darkMode ? "#111" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <ThemeToggle />

      <span className={styles.span}>
        <h1 className={styles.headingText}>Samsara.Ai</h1>
        <p className={styles.tagLine}>Intelligence That Evolves.</p>
      </span>

      <div className={styles.buttonDiv}>
        <Button text="Get Started" onClick={handleClick} />
        <Button text="Sign In" onClick={() => route.push("/Login")} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;