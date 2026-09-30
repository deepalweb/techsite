import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, RotateCcw, LoaderCircle } from "lucide-react";
export default function HardwareScene() {
  const { t } = useTranslation();
  const host = useRef(null);
  const controller = useRef(null);
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
  function select(value) {
    setDevice(value);
    controller.current?.select(value);
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
          sizes="(max-width: 767px) 100vw, 1200px"
          alt={t("studio.sceneAlt")}
          width="1280"
          height="853"
          fetchpriority="high"
        />
        {mode === "live" && (
          <div className="hardware-canvas" ref={host} aria-hidden="true" />
        )}
      </div>
      <div className="hardware-controls">
        {mode !== "live" ? (
          <button
            type="button"
            onClick={() => {
              setMode("live");
              setReady(false);
            }}
          >
            <Box size={16} />
            {t("studio.explore")}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setMode("image");
                setReady(false);
                setDevice("computer");
              }}
            >
              <RotateCcw size={15} />
              {t("studio.closeScene")}
            </button>
            {ready ? (
              <div
                className="device-controls"
                role="group"
                aria-label={t("studio.sceneHint")}
              >
                {["computer", "wifi", "printer"].map((id, i) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={device === id}
                    onClick={() => select(id)}
                  >
                    {t(`studio.deviceNames.${i}`)}
                  </button>
                ))}
              </div>
            ) : (
              <span role="status">
                <LoaderCircle className="loading-icon" size={15} />
                {t("studio.sceneLoading")}
              </span>
            )}
          </>
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
