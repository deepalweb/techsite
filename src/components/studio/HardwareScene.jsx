import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoaderCircle } from "lucide-react";
const devices = ["computer", "wifi", "printer"];
// The poster is a render of the same scene's laptop view, so the live
// WebGL scene only loads when someone asks to look at another device.
export default function HardwareScene() {
  const { t } = useTranslation();
  const host = useRef(null);
  const controller = useRef(null);
  const selected = useRef("computer");
  const [mode, setMode] = useState("image");
  const [device, setDevice] = useState("computer");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (mode !== "live") return;
    let stopped = false;
    let cleanup;
    import("./hardwareRenderer.js")
      .then(({ mountHardware }) => {
        if (stopped) return;
        try {
          const renderer = mountHardware(host.current, () => {
            if (!stopped) {
              setMode("error");
              setReady(false);
            }
          });
          controller.current = renderer;
          cleanup = renderer.dispose;
          renderer.select(selected.current);
          setReady(true);
        } catch {
          if (!stopped) setMode("error");
        }
      })
      .catch(() => {
        if (!stopped) setMode("error");
      });
    return () => {
      stopped = true;
      cleanup?.();
      controller.current = null;
    };
  }, [mode]);
  function choose(id) {
    selected.current = id;
    setDevice(id);
    if (controller.current) controller.current.select(id);
    else if (mode === "image" && id !== "computer") setMode("live");
  }
  return (
    <div className="hardware-showcase">
      <div className="hardware-frame">
        <img
          className={
            ready && mode === "live"
              ? "hardware-poster concealed"
              : "hardware-poster"
          }
          src="/assets/workstation-studio.webp"
          srcSet="/assets/workstation-studio-mobile.webp 768w, /assets/workstation-studio.webp 1280w"
          sizes="(max-width: 900px) 100vw, 640px"
          alt={t("studio.sceneAlt")}
          width="1280"
          height="1067"
          fetchpriority="high"
        />
        {mode === "live" && (
          <div className="hardware-canvas" ref={host} aria-hidden="true" />
        )}
        {mode === "live" && !ready && (
          <span className="hardware-status" role="status">
            <LoaderCircle className="loading-icon" size={15} />
            {t("studio.sceneLoading")}
          </span>
        )}
        {mode !== "error" && (
          <div
            className="hardware-controls"
            role="group"
            aria-label={t("studio.sceneHint")}
          >
            {devices.map((id, i) => (
              <button
                key={id}
                type="button"
                aria-pressed={device === id}
                onClick={() => choose(id)}
              >
                {t(`studio.deviceNames.${i}`)}
              </button>
            ))}
          </div>
        )}
      </div>
      {mode === "error" && (
        <p className="hardware-error" role="status">
          {t("studio.sceneFailed")}
        </p>
      )}
    </div>
  );
}
