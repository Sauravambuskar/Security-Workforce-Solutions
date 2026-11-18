import { useEffect, useState } from "react";
import introDesktop from "@/assets/media/aiif-intro-desktop.mp4";
import introMobile from "@/assets/media/aiif-intro-mobile.mp4";
import introFinal from "@/assets/media/aiif-intro-final.jpg";

type IntroPhase = "playing" | "holding" | "leaving" | "done";

const FINAL_FRAME_HOLD_MS = 1000;
const EXIT_FADE_MS = 320;

function shouldPlayIntro() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>(() => shouldPlayIntro() ? "playing" : "done");

  useEffect(() => {
    if (phase === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [phase]);

  useEffect(() => {
    if (phase === "playing") {
      const safetyTimer = window.setTimeout(() => setPhase("holding"), 7000);
      return () => window.clearTimeout(safetyTimer);
    }
    if (phase === "holding") {
      const holdTimer = window.setTimeout(() => setPhase("leaving"), FINAL_FRAME_HOLD_MS);
      return () => window.clearTimeout(holdTimer);
    }
    if (phase === "leaving") {
      const exitTimer = window.setTimeout(() => setPhase("done"), EXIT_FADE_MS);
      return () => window.clearTimeout(exitTimer);
    }
    return undefined;
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      data-testid="site-intro"
      className={`fixed inset-0 z-[100] grid place-items-center bg-white transition-opacity duration-300 ${phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <img
        src={introFinal}
        alt=""
        width="1280"
        height="720"
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-100 ${phase === "playing" ? "opacity-0" : "opacity-100"}`}
      />
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        onEnded={() => setPhase("holding")}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-100 ${phase === "playing" ? "opacity-100" : "opacity-0"}`}
      >
        <source src={introMobile} media="(max-width: 639px)" type="video/mp4" />
        <source src={introDesktop} type="video/mp4" />
      </video>
    </div>
  );
}
