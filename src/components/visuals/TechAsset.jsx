import { useId } from 'react';

// Original vector assets: crisp at every size, with no texture or model downloads.
export default function TechAsset({ type = 'laptop', className = '' }) {
  const id = useId().replace(/:/g, '');
  const paint = name => `url(#${id}-${name})`;
  return (
    <svg className={`tech-asset ${className}`} viewBox="0 0 320 220" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-face`} x1="70" y1="35" x2="235" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#28678c"/><stop offset="1" stopColor="#0b233b"/></linearGradient>
        <linearGradient id={`${id}-edge`} x1="80" y1="80" x2="260" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#102f4d"/><stop offset="1" stopColor="#050e1d"/></linearGradient>
        <linearGradient id={`${id}-light`} x1="100" y1="40" x2="210" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#a3efff"/><stop offset=".5" stopColor="#36c5ff"/><stop offset="1" stopColor="#168bff"/></linearGradient>
        <radialGradient id={`${id}-glow`}><stop stopColor="#168bff" stopOpacity=".28"/><stop offset="1" stopColor="#168bff" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="160" cy="160" rx="150" ry="57" fill={paint('glow')}/>
      <path d="m43 172 111-47 121 42-114 46z" fill="#081725" stroke="#20455d"/>
      <path d="m43 172 118 41 114-46v6l-114 41-118-36z" fill="#07121f"/>
      {type === 'laptop' && <>
        <path d="m90 43 137 33v91L90 132z" fill={paint('edge')} stroke="#4c8bad" strokeWidth="1.5"/>
        <path d="m99 54 119 29v72l-119-30z" fill="#06182b" stroke="#2c597a"/>
        <path d="m109 66 96 23v4l-96-23z" fill="#36c5ff" opacity=".8"/>
        <path d="m110 88 29 7v23l-29-7z" fill="#168bff" opacity=".4"/>
        <path d="m146 97 58 14m-58-5 42 10m-42-1 53 13" stroke="#73c7e8" strokeWidth="2" opacity=".6"/>
        <path d="m90 132 137 35-52 32-139-40z" fill={paint('face')} stroke="#4985a4"/>
        <path d="m95 140 112 28-26 16-114-30z" fill="#06192c" stroke="#32617f"/>
        <path d="m103 146 91 24m-101-18 91 24m-65-33-29 18m50-13-29 19m52-13-30 20m51-14-28 19" stroke="#335d7a"/>
        <path d="m113 170 30 8-12 8-30-9z" fill="#376180"/>
        <path d="m36 159 139 40 52-32v5l-52 32-139-40z" fill={paint('edge')}/>
      </>}
      {type === 'server' && <>
        <path d="m111 49 64-24 55 23-66 26z" fill="#367191" stroke="#5c9ab8"/>
        <path d="m164 74 66-26v124l-66 27z" fill={paint('edge')} stroke="#285374"/>
        <path d="m111 49 53 25v125l-53-27z" fill={paint('face')} stroke="#4a85a5"/>
        {[0,1,2,3].map(i => <g key={i} transform={`translate(0 ${i * 27})`}><path d="m118 61 38 18v21l-38-19z" fill="#08192c" stroke="#2c607f"/><path d="m123 68 17 8m-17-2 17 8" stroke="#5685a1" strokeWidth="2"/><ellipse cx="149" cy="86" rx="2" ry="3" fill="#6ce6ff"/></g>)}
        <path d="m178 81 38-15m-38 25 38-15m-38 25 38-15m-38 25 38-15m-38 25 38-15" stroke="#245171" strokeWidth="2"/>
        <path d="m179 146 32-12v23l-32 13z" fill="#0c2137" stroke="#285374"/>
      </>}
      {type === 'globe' && <>
        <path d="m142 142 33 8v30l-33-9z" fill={paint('edge')} stroke="#325c78"/>
        <path d="m123 175 31-13 43 15-31 14z" fill={paint('face')} stroke="#4b83a2"/>
        <circle cx="160" cy="97" r="67" fill={paint('face')} stroke="#71d6ff" strokeWidth="1.5"/>
        <ellipse cx="160" cy="97" rx="29" ry="67" stroke="#56c9f8" strokeWidth="1.3"/>
        <ellipse cx="160" cy="97" rx="54" ry="67" stroke="#3284b1"/>
        <ellipse cx="160" cy="97" rx="67" ry="23" stroke="#56c9f8" strokeWidth="1.3"/>
        <path d="M100 68q60-28 120 0M100 126q60 28 120 0M160 30v134" stroke="#459ec4"/>
        <ellipse cx="160" cy="97" rx="87" ry="27" transform="rotate(-30 160 97)" stroke="#36c5ff" strokeWidth="2"/>
        <circle cx="233" cy="54" r="5" fill="#a3efff"/>
        <circle cx="108" cy="120" r="4" fill="#a3efff"/>
      </>}
      {type === 'printer' && <>
        <path d="m81 96 94-34 68 27-97 36z" fill="#376985" stroke="#74abc5"/>
        <path d="m146 125 97-36v67l-97 38z" fill={paint('edge')} stroke="#35617e"/>
        <path d="m81 96 65 29v69l-65-30z" fill={paint('face')} stroke="#568aa6"/>
        <path d="m109 90V38l74 29v52z" fill="#b6d9eb" stroke="#e1f3fc"/>
        <path d="m119 55 52 20m-52-10 52 20m-52-10 37 14" stroke="#3d7b9f" strokeWidth="3"/>
        <path d="m104 101 76 29 36-14-76-29z" fill="#183c56" stroke="#4e88a8"/>
        <path d="m91 135 44 19v19l-44-20z" fill="#030e1c" stroke="#2c5773"/>
        <path d="m95 145 36 16-21 28-38-17z" fill="#cee8f3" stroke="#effaff"/>
        <path d="m94 157 25 11m-30-5 25 11" stroke="#6b9db6" strokeWidth="2"/>
        <path d="m184 137 34-13v9l-34 13z" fill="#168bff"/>
        <ellipse cx="229" cy="130" rx="2" ry="3" fill="#96f1ff"/>
      </>}
      {type === 'shield' && <>
        <path d="m155 26 62 27v58q-5 47-62 72l-11-7V37z" fill={paint('edge')} stroke="#427da0"/>
        <path d="m144 20 62 27v58q-5 47-62 72-57-35-57-81V43z" fill={paint('face')} stroke="#72d4fa" strokeWidth="1.5"/>
        <path d="m144 36 48 22v45q-4 34-48 59-43-28-43-63V54z" fill="#0a263f" stroke="#3486b1"/>
        <path d="m119 94 19 23 34-42" stroke={paint('light')} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      </>}
      <path d="m61 180 18 6m163-17 14-5" stroke="#36c5ff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
