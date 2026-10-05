import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoaderCircle, Box, X } from "lucide-react";
import { prices } from "../../data/content.js";
const devices = ["computer", "wifi", "printer", "software"];
const devicePrices = {
  computer: prices.basicVisit,
  wifi: prices.wifiPrinter,
  printer: prices.wifiPrinter,
  software: prices.windowsSetup,
};
// The photographic hero stays immediate; WebGL is an explicit optional view.
export default function HardwareScene({ onSelect }) {
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
    onSelect?.(id);
    if (controller.current) controller.current.select(id);
  }
  return (
    <div className="hardware-showcase" data-device={device} data-mode={mode}>
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
          loading="lazy"
        />
        <button
          className="scene-toggle"
          type="button"
          aria-expanded={mode === "live"}
          onClick={() => {
            setReady(false);
            setMode(mode === "live" ? "image" : "live");
          }}
        >
          {mode === "live" ? <X size={15} /> : <Box size={15} />}
          {t(
            mode === "live"
              ? "studio.sceneClose"
              : mode === "error"
                ? "studio.sceneRetry"
                : "studio.sceneActivate",
          )}
        </button>
        {mode === "live" && (
          <div className="hardware-canvas" ref={host} aria-hidden="true" />
        )}
        {mode === "live" && !ready && (
          <span className="hardware-status" role="status">
            <LoaderCircle className="loading-icon" size={15} />
            {t("studio.sceneLoading")}
          </span>
        )}
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
              {id === "software"
                ? t("studio.softwareDevice")
                : t(`studio.deviceNames.${i}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="device-detail" aria-live="polite" aria-atomic="true">
        <div>
          <span>{t("studio.startingPrice")}</span>
          <strong>{devicePrices[device]}</strong>
        </div>
        <a href={`/support?service=${device}`}>
          {t("studio.support")} <span aria-hidden="true">↗</span>
        </a>
      </div>
      {mode === "error" && (
        <p className="hardware-error" role="status">
          {t("studio.sceneFailed")}
        </p>
      )}
    </div>
  );
}
