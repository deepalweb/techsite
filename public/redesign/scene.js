const mount=document.querySelector('#webgl');
try {
const T=await import('./assets/three.module.js');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setClearColor(0x08141f,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
mount.appendChild(renderer.domElement);
const scene=new T.Scene(),camera=new T.PerspectiveCamera(36,1,.1,80),world=new T.Group();scene.add(world);
scene.add(new T.HemisphereLight(0xcceeff,0x152431,2.5));
function light(color,intensity,x,y,z){const l=new T.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l);return l;}
const key=light(0xe9f6ff,4,2,7,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-7,right:7,top:7,bottom:-7});key.shadow.bias=-.001;
light(0x52cfff,3,-4,3,-3);light(0x829eff,2.1,5,2,-2);
const metal=new T.MeshStandardMaterial({color:0x8e9fae,metalness:.78,roughness:.28}),edge=new T.MeshStandardMaterial({color:0x324658,metalness:.7,roughness:.26}),black=new T.MeshStandardMaterial({color:0x101d29,metalness:.35,roughness:.38}),keymat=new T.MeshStandardMaterial({color:0x0b1926,metalness:.15,roughness:.45}),white=new T.MeshStandardMaterial({color:0xdce6e9,roughness:.65}),blue=new T.MeshStandardMaterial({color:0x4fd1ff,emissive:0x32b8ee,emissiveIntensity:2,roughness:.25});
function box(w,h,d,mat){const b=new T.Mesh(new T.BoxGeometry(w,h,d),mat);b.castShadow=true;b.receiveShadow=true;return b;}
function rounded(w,h,d,r,mat){r=Math.min(r,w/2,h/2);const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:Math.min(.018,h/6,d/5),bevelThickness:Math.min(.012,d/5),curveSegments:6});g.translate(0,0,-d/2);const m=new T.Mesh(g,mat);m.castShadow=true;m.receiveShadow=true;return m;}
function add(parent,obj,x=0,y=0,z=0){obj.position.set(x,y,z);parent.add(obj);return obj;}
function line(points,color=0x60d4ff,opacity=.7){return new T.Line(new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))),new T.LineBasicMaterial({color,transparent:true,opacity}));}
// A real perspective scene, with independently animated device assemblies.
const laptop=new T.Group();laptop.position.set(-.25,.48,.7);laptop.rotation.y=-.12;world.add(laptop);
add(laptop,rounded(3.55,.13,2.2,.055,metal));
add(laptop,box(3.3,.018,1.98,edge),0,.074,-.02);
const keyboard=new T.Group();laptop.add(keyboard);
add(keyboard,box(3.13,.018,1.13,black),0,.09,-.36);
for(let row=0;row<5;row++)for(let col=0;col<14;col++){if(row===4&&col>3&&col<10)continue;const k=rounded(.174,.027,.154,.012,keymat);add(keyboard,k,-1.4+col*.215,.115,-.80+row*.205);if((row+col)%3===0)add(keyboard,box(.041,.002,.008,white),k.position.x,.13,k.position.z-.028);}
add(keyboard,rounded(1.29,.027,.154,.012,keymat),.005,.115,.02);
add(laptop,rounded(1.05,.012,.43,.005,new T.MeshStandardMaterial({color:0x6b8193,metalness:.7,roughness:.3})),0,.094,.65);
for(let i=0;i<10;i++){add(laptop,box(.055,.013,.03,black),-1.72,.005,-.73+i*.08);add(laptop,box(.055,.013,.03,black),1.72,.005,-.73+i*.08);}
const lid=new T.Group();lid.position.set(0,.08,-1.04);laptop.add(lid);
add(lid,rounded(3.55,2.15,.10,.075,metal),0,1.06,0);add(lid,rounded(3.39,1.99,.021,.047,black),0,1.08,.062);
const screenCanvas=document.createElement('canvas');screenCanvas.width=1024;screenCanvas.height=600;const c=screenCanvas.getContext('2d');
const gradient=c.createLinearGradient(0,0,1024,600);gradient.addColorStop(0,'#07182d');gradient.addColorStop(.65,'#143f66');gradient.addColorStop(1,'#176a91');c.fillStyle=gradient;c.fillRect(0,0,1024,600);
for(let i=0;i<50;i++){c.beginPath();c.strokeStyle=`rgba(${55+i*2},${140+i},235,${.12+i*.008})`;c.lineWidth=1.7;c.moveTo(350+i*5,650);c.bezierCurveTo(20+i*12,240,1000-i*6,0,1030,190+i*7);c.stroke();}
c.font='600 67px sans-serif';c.fillStyle='#ecf9ff';c.fillText('DR TECH',74,115);c.font='24px sans-serif';c.fillStyle='#a4d7ee';c.fillText('Technology, restored.',77,159);c.font='14px monospace';c.fillStyle='#74bad6';c.fillText('COMPUTERS / CONNECTIVITY / CARE',77,536);
const texture=new T.CanvasTexture(screenCanvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
add(lid,new T.Mesh(new T.PlaneGeometry(3.21,1.81),new T.MeshBasicMaterial({map:texture})),0,1.1,.081);
add(lid,new T.Mesh(new T.SphereGeometry(.019,12,8),black),0,2.078,.071);
const motherboard=new T.Group();laptop.add(motherboard);motherboard.visible=false;
add(motherboard,box(2.65,.025,1.37,new T.MeshStandardMaterial({color:0x184657,metalness:.55,roughness:.45})),0,.09,-.12);
add(motherboard,box(.67,.065,.61,edge),-.3,.13,-.11);add(motherboard,box(.44,.012,.40,metal),-.3,.171,-.11);
for(let i=0;i<6;i++)add(motherboard,box(.21,.03,.33,keymat),.38+i*.23,.12,-.35);
for(let i=0;i<8;i++)add(motherboard,box(.04,.006,.55,blue),-1.1+i*.065,.11,.28);
// Router and animated signal arcs.
const router=new T.Group();router.position.set(2.05,.59,-.85);router.rotation.y=-.2;world.add(router);
add(router,rounded(1.75,.27,1.05,.085,black));add(router,box(1.56,.012,.88,edge),0,.15,0);
for(let i=0;i<5;i++)add(router,box(.029,.031,.012,blue),-.25+i*.115,-.035,.534);
for(const x of [-.64,.64]){const antenna=new T.Mesh(new T.CylinderGeometry(.035,.05,1.16,12),edge);antenna.rotation.z=x<0?-.1:.1;add(router,antenna,x,.65,-.39);}
for(let i=0;i<8;i++)add(router,box(.034,.012,.68,keymat),-.51+i*.146,.161,0);
const signals=[];for(let i=0;i<3;i++){const arc=new T.Mesh(new T.TorusGeometry(.2+i*.15,.009,6,36,Math.PI),new T.MeshBasicMaterial({color:0x61d9ff,transparent:true,opacity:.65}));add(router,arc,0,1.13,0);signals.push(arc);}add(router,new T.Mesh(new T.SphereGeometry(.034,12,8),blue),0,1.07,0);
// Printer with paper feed, output tray and control strip.
const printer=new T.Group();printer.position.set(-2.55,.7,-1.55);printer.rotation.y=.1;world.add(printer);
add(printer,rounded(1.85,.84,1.37,.08,black));add(printer,box(1.69,.08,1.16,edge),0,.45,-.02);add(printer,rounded(1.3,.21,.03,.025,keymat),0,-.09,.707);add(printer,box(1.31,.033,.69,edge),0,-.25,.91);add(printer,box(1.13,.012,.69,white),0,-.217,.94);
const paper=add(printer,box(1.16,1.00,.015,white),0,.93,-.50);paper.rotation.x=-.16;
for(let i=0;i<4;i++)add(printer,box(.69,.015,.005,new T.MeshBasicMaterial({color:0xadc3cd})),0,.83+i*.09,-.401-i*.014);
add(printer,box(.28,.06,.016,blue),.49,.29,.705);add(printer,new T.Mesh(new T.SphereGeometry(.027,12,8),blue),.75,.29,.709);
// Soft procedural contact shadow and a low-profile exhibition base.
const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=128;const sh=shadowCanvas.getContext('2d'),sg=sh.createRadialGradient(64,64,3,64,64,64);sg.addColorStop(0,'rgba(0,0,0,.65)');sg.addColorStop(1,'rgba(0,0,0,0)');sh.fillStyle=sg;sh.fillRect(0,0,128,128);const shadow=new T.Mesh(new T.PlaneGeometry(10.5,8.5),new T.MeshBasicMaterial({map:new T.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;add(scene,shadow,0,-.11,0);
const motionButton=document.querySelector('#motion');let running=!reduced.matches,expanded=false,explodeAmount=0,elapsed=0,opening=0,drag=false,lastX=0,userYaw=0,visible=true;
let destination=new T.Vector3(4.6,3.3,7.6),targetDestination=new T.Vector3(0,1,0),look=new T.Vector3(0,1,0);camera.position.copy(destination);
function motionUI(){motionButton.setAttribute('aria-pressed',String(running));motionButton.setAttribute('aria-label',running?'Pause automatic 3D motion':'Play automatic 3D motion');motionButton.textContent=running?'Ⅱ Pause animation':'▷ Play animation';}motionUI();
motionButton.addEventListener('click',()=>{running=!running;motionUI()});
reduced.addEventListener('change',e=>{running=!e.matches;motionUI()});
mount.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;mount.setPointerCapture(e.pointerId)});mount.addEventListener('pointermove',e=>{if(!drag)return;userYaw=Math.max(-.65,Math.min(.65,userYaw+(e.clientX-lastX)*.005));lastX=e.clientX});['pointerup','pointercancel','lostpointercapture'].forEach(ev=>mount.addEventListener(ev,()=>drag=false));
function resize(){const w=mount.clientWidth,h=mount.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.fov=w/h<1.2?46:40;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(mount);resize();
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0}).observe(mount);
const clock=new T.Clock();let first=true;
function frame(){requestAnimationFrame(frame);const dt=Math.min(clock.getDelta(),.05);if(!visible||document.hidden)return;if(running)elapsed+=dt;opening=Math.min(1,opening+dt*.48);const ease=1-Math.pow(1-opening,3);const k=reduced.matches?1:1-Math.exp(-dt*5);explodeAmount=T.MathUtils.lerp(explodeAmount,expanded?1:0,k);motherboard.visible=explodeAmount>.02;keyboard.position.y=explodeAmount*.65;motherboard.position.y=explodeAmount*.20;lid.position.y=.08+explodeAmount*.67;lid.rotation.x=reduced.matches?-.17:T.MathUtils.lerp(Math.PI/2-.05,-.17,ease);
world.rotation.y=T.MathUtils.lerp(world.rotation.y,userYaw+(running?Math.sin(elapsed*.24)*.10:0),k);laptop.position.y=.48+(running?Math.sin(elapsed*.9)*.05:0);router.position.y=.59+(running?Math.sin(elapsed*.9+1.8)*.065:0);printer.position.y=.70+(running?Math.sin(elapsed*.8+3)*.045:0);signals.forEach((a,i)=>a.material.opacity=running?.25+.55*(Math.sin(elapsed*2.4-i*.65)*.5+.5):.6);
camera.position.lerp(destination,k);look.lerp(targetDestination,k);camera.lookAt(look);renderer.render(scene,camera);if(first){mount.classList.add('ready');first=false;}}
frame();
} catch(error){console.error('3D scene could not start:',error);document.querySelector('.scene-error').hidden=false;document.querySelector('.scene-controls').hidden=true;}
