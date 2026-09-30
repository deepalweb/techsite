export default function ServiceVisual({ type }) {
  return <svg className={`service-visual visual-${type}`} viewBox="0 0 540 330" fill="none" aria-hidden="true">
    <ellipse cx="275" cy="280" rx="190" ry="24" fill="#12294a" opacity=".12"/>
    {type === 'computer' && <g strokeLinejoin="round">
      <path d="M120 52 395 74 425 243 145 220Z" fill="#283a51" stroke="#61758f" strokeWidth="3"/>
      <path d="m135 66 248 20 26 140-252-20Z" fill="#091c36"/>
      <path d="M157 170c90-150 120 100 220-57" stroke="#4689ff" strokeWidth="32"/>
      <path d="m145 220 280 23-66 54-288-30Z" fill="#b7c7d8" stroke="#7b91ac" strokeWidth="2"/>
      <path d="m160 231 225 19-29 23-229-23Z" fill="#34475e"/>
      <path d="m207 262 78 8-14 12-79-8Z" fill="#95a9bf"/>
      <g transform="translate(72 107) rotate(-12)"><rect width="88" height="62" rx="5" fill="#26715e" stroke="#b4cabb" strokeWidth="3"/><rect x="20" y="12" width="47" height="35" rx="3" fill="#1c2e3c"/><path d="M10 55h68" stroke="#d9b963" strokeWidth="7"/></g>
    </g>}
    {type === 'wifi' && <g>
      <path d="M184 199V97M348 191V83" stroke="#233950" strokeWidth="13" strokeLinecap="round"/>
      <path d="m150 200 194-18 63 49-199 25Z" fill="#f8fbff" stroke="#c1cedd" strokeWidth="2"/>
      <path d="m150 200 58 56v29l-58-54Z" fill="#8ba1b7"/>
      <path d="m208 256 199-25v28l-199 26Z" fill="#cad6e2"/>
      <path d="m324 256 40-5" stroke="#3787ff" strokeWidth="5" strokeDasharray="3 5"/>
      {[0,1,2].map(i=><path key={i} d={`M${213-i*32} ${139-i*30}Q270 ${96-i*50} ${327+i*32} ${139-i*30}`} stroke="#397ff2" strokeWidth="7" strokeLinecap="round" opacity={1-i*.23}/>)}
    </g>}
    {type === 'printer' && <g strokeLinejoin="round">
      <path d="m189 54 158 10 9 124-169-7Z" fill="white" stroke="#b5c4d5" strokeWidth="2"/>
      <path d="m212 83 108 7m-108 13 87 6m-86 14 99 6" stroke="#b5c4d5" strokeWidth="4"/>
      <path d="m137 148 222-14 47 48-231 19Z" fill="#f5f9fc"/>
      <path d="m137 148 38 53v74l-38-43Z" fill="#8ea6bf"/>
      <path d="m175 201 231-19v86l-231 7Z" fill="#d7e1ec"/>
      <path d="m204 229 165-12v28l-165 9Z" fill="#243d57"/>
      <path d="m220 241 122-6 29 52-126 10Z" fill="#fff" stroke="#b7c7d9"/>
      <path d="m359 202 19-2" stroke="#347bf4" strokeWidth="6"/>
    </g>}
    {type === 'software' && <g transform="translate(115 60) rotate(-7 160 105)">
      <rect x="32" y="-10" width="280" height="185" rx="12" fill="#a7c8ff"/>
      <rect x="16" y="10" width="280" height="185" rx="12" fill="#6e9de9"/>
      <rect y="30" width="280" height="185" rx="12" fill="#fff" stroke="#b4c8e3" strokeWidth="2"/>
      <path d="M0 67h280" stroke="#d7e3f3" strokeWidth="2"/>
      <circle cx="19" cy="49" r="4" fill="#78a4e5"/><circle cx="34" cy="49" r="4" fill="#b4c9e7"/>
      <path d="M30 98h53m-53 20h43m-43 20h53m-53 20h32" stroke="#b2c8e6" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="183" cy="139" r="43" fill="#e4eeff"/>
      <path d="m162 138 15 16 29-32" stroke="#347cf0" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
    </g>}
  </svg>;
}
