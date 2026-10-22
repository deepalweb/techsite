import { useEffect, useRef, useState } from "react";

// The photograph renders first. This enhancement never owns support controls.
export default function ImmersiveHardware() {
  const host = useRef(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || navigator.connection?.saveData) return;
    let cancelled = false, controller, idle, timer;
    const stop = () => { controller?.dispose(); controller = undefined; setLive(false); };
    const start = async () => {
      if (cancelled || reduced.matches || !host.current) return;
      try {
        const { mountHardware } = await import("./hardwareRenderer.js");
        if (cancelled || reduced.matches) return;
        controller = mountHardware(host.current, stop, { immersive: true, onReady: () => { if (!cancelled) setLive(true); } });
      } catch { if (!cancelled) stop(); }
    };
    const schedule = () => {
      timer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) idle = window.requestIdleCallback(start, { timeout: 2500 });
        else start();
      }, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    const preference = () => { if (reduced.matches) stop(); };
    reduced.addEventListener("change", preference);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.removeEventListener("load", schedule);
      reduced.removeEventListener("change", preference);
      controller?.dispose();
    };
  }, []);
  return <div className={`immersive-hardware${live ? " is-live" : ""}`} ref={host} aria-hidden="true" />;
}
