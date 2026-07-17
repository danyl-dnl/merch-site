import { useEffect, useState } from "react";
import Scene from "./components/Scene";
import MobileScene from "./components/MobileScene";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function App() {
  const isMobile = useIsMobile();
  return (
    <main style={{ width: "100vw", height: "100dvh", overflow: "hidden", background: "#060810" }}>
      {isMobile ? <MobileScene /> : <Scene />}
    </main>
  );
}

export default App;
