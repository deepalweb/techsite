import {useEffect, useRef, useState} from "react";

// Rendered product assets are the immediate view; WebGL is a desktop enhancement.
export default function ServiceHardware({device}) {
  const host = useRef(null);
  const selected = useRef(device);
  const controller = useRef(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    selected.current = device;
    controller.current?.select(device);
  }, [device]);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 768px)");
    let disposed = false, visible = false, pending = false, epoch = 0;
    const stop = () => {
      epoch++;
      controller.current?.dispose();
      controller.current = null;
      setLive(false);
    };
    async function start() {
      if (disposed || pending || !visible || document.hidden || reduced.matches || !desktop.matches || navigator.connection?.saveData || controller.current) return;
      pending = true;
      const ticket = epoch;
      try {
        const {mountHardware} = await import("./hardwareRenderer.js");
        if (disposed || ticket !== epoch || !visible || reduced.matches || !desktop.matches || document.hidden) return;
        controller.current = mountHardware(host.current, stop, {
          serviceStudio:true,
          initialDevice:selected.current,
          onReady:() => {if (!disposed && ticket === epoch) setLive(true);},
        });
      } catch {if (!disposed) stop();}
      finally {pending = false;}
    }
    const preference = () => {stop(); start();};
    const visibility = () => {if (document.hidden) stop(); else start();};
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, {threshold:.15});
    observer.observe(host.current);
    reduced.addEventListener("change", preference);
    desktop.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", preference);
      desktop.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      stop();
    };
  }, []);
  return <div className={`service-hardware${live ? " is-live" : ""}`} aria-hidden="true">
    <img src={`/assets/service-3d-${device}.png`} width="720" height="540" alt="" loading="lazy" />
    <div className="service-hardware-canvas" ref={host} />
  </div>;
}
