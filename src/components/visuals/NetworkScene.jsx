import { useEffect, useRef, useState } from 'react';
import { Stethoscope, Laptop, Wifi, Cpu, Settings, HardDrive, Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TechAsset from './TechAsset.jsx';

const icons = [Stethoscope, Wifi, Cpu, Settings, HardDrive, Printer, Laptop];

// The useful, lightweight illustration is always present. WebGL is an enhancement.
export default function NetworkScene() {
  const host = useRef(null);
  const [ready, setReady] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const media = matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    let disposed = false;
    let cleanup;
    let generation = 0;
    async function enhance() {
      const current = ++generation;
      if (!media.matches || navigator.connection?.saveData) return;
      try {
        const { mountNetwork } = await import('./networkRenderer.js');
        if (disposed || !media.matches || current !== generation) return;
        cleanup = mountNetwork(host.current, () => setReady(false));
        setReady(true);
      } catch {
        // CSS illustration remains usable if WebGL or the optional chunk fails.
      }
    }
    function change() {
      clearTimeout(timer);
      generation++;
      cleanup?.();
      cleanup = undefined;
      setReady(false);
      if (media.matches) enhance();
    }
    const timer = setTimeout(enhance, 800);
    media.addEventListener('change', change);
    return () => { disposed = true; clearTimeout(timer); cleanup?.(); media.removeEventListener('change', change); };
  }, []);
  return <div className={`network-scene ${ready ? 'webgl-ready' : ''}`} aria-hidden="true">
    <div className="scene-grid" />
    <div className="webgl-host" ref={host} />
    <div className="network-orbit orbit-one" /><div className="network-orbit orbit-two" />
    <svg className="hero-connectors" viewBox="0 0 600 540">
      {[[300,68],[496,160],[500,348],[395,457],[158,433],[87,280],[142,110]].map(([x,y],i) => <path key={i} d={`M300 270 Q${x} 270 ${x} ${y}`} />)}
    </svg>
    <div className="network-core"><span>DR<span className="core-blue">TECH</span></span><small>{t('motion.repairHero.core')}</small></div>
    {icons.map((Icon, i) => <div className={`network-device device-${i}`} key={i}>{i >= 5 ? <div className="scene-mini-asset repair-device-asset"><TechAsset type={i === 5 ? 'printer' : 'laptop'}/></div> : <Icon size={25} strokeWidth={1.4}/>}<span>{t(`motion.nodes.${i}`)}</span></div>)}
    <span className="scene-caption"><i />{t('motion.repairHero.caption')}</span>
  </div>;
}
