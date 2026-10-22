import { useEffect, useRef, useState } from "react";

const nodes = [[100,80],[300,45],[500,80],[535,235],[400,310],[200,310],[65,235]];
export default function NetworkConstellation() {
  const host = useRef(null);
  const [connected,setConnected] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setConnected(true); observer.disconnect(); }
    }, {threshold:.35});
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return <div className={`network-constellation${connected ? " is-connected" : ""}`} ref={host} aria-hidden="true">
    <svg viewBox="0 0 600 360" fill="none">
      <ellipse cx="300" cy="235" rx="155" ry="45" fill="#000" opacity=".18" />
      {nodes.map(([x,y],i) => <g key={i}>
        <path className="network-connection" d={`M300 180 L${x} 180 L${x} ${y}`} stroke="#168bff" strokeWidth="1.4" opacity=".65" />
        <ellipse cx={x} cy={y+22} rx="28" ry="8" fill="#000" opacity=".2" />
        <path d={`M${x-20} ${y-12} L${x} ${y-23} L${x+20} ${y-12} L${x+20} ${y+12} L${x} ${y+23} L${x-20} ${y+12}Z`} fill="#09213d" stroke="#268bf2" />
        <circle cx={x} cy={y} r="4" fill="#19d9f5" />
      </g>)}
      <path d="M245 148 300 118 355 148 300 180Z" fill="#124c75" stroke="#19d9f5" />
      <path d="M245 148V205L300 237V180Z" fill="#09213d" stroke="#168bff" />
      <path d="M300 180 355 148V205L300 237Z" fill="#0b3150" stroke="#19d9f5" />
      <path d="M260 175 285 190M260 192 285 207M315 192 340 177M315 210 340 195" stroke="#19d9f5" strokeWidth="2" />
      <circle cx="300" cy="149" r="5" fill="#19d9f5" />
    </svg>
  </div>;
}
