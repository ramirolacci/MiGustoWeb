import{q as n,_ as N,k as e,N as z,F}from"./index-DKLXAvOK.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),B=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,a,s)=>s?s.toUpperCase():a.toLowerCase()),v=t=>{const r=B(t);return r.charAt(0).toUpperCase()+r.slice(1)},w=(...t)=>t.filter((r,a,s)=>!!r&&r.trim()!==""&&s.indexOf(r)===a).join(" ").trim(),M=t=>{for(const r in t)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=n.forwardRef(({color:t="currentColor",size:r=24,strokeWidth:a=2,absoluteStrokeWidth:s,className:d="",children:l,iconNode:m,...p},x)=>n.createElement("svg",{ref:x,...E,width:r,height:r,stroke:t,strokeWidth:s?Number(a)*24/Number(r):a,className:w("lucide",d),...!l&&!M(p)&&{"aria-hidden":"true"},...p},[...m.map(([g,u])=>n.createElement(g,u)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(t,r)=>{const a=n.forwardRef(({className:s,...d},l)=>n.createElement(A,{ref:l,iconNode:r,className:w(`lucide-${T(v(t))}`,`lucide-${t}`,s),...d}));return a.displayName=v(t),a};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]],R=b("crown",I);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]],P=b("gift",H);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5",key:"4mh3h7"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5",key:"1mdrzq"}]],L=b("percent",D);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],q=b("users",_),$="/tools/remastered/assets/Mexican-Veggie-demo-BTxpej8U.png",V="/tools/remastered/assets/Mexican-Pibil-Pork-demo-BaKjYYUx.png",O="/tools/remastered/assets/Matambre%20a%20la%20pizza-CyM7sEtd.png",U="/tools/remastered/assets/burger-CBxj346T.png",j=[$,V,O,U];function G(){const r=n.useRef(null);return r.current||(r.current=Array.from({length:24}).map((a,s)=>{const d=Math.random()*100,l=54+Math.random()*64,m=-Math.random()*12,p=10+Math.random()*10,x=j[Math.floor(Math.random()*j.length)];return e.jsx("img",{src:x,alt:"empanada",style:{position:"absolute",left:`${d}%`,width:l,height:l,animation:`empanada-fall  ${p}s linear infinite`,animationDelay:`${m}s`,objectFit:"contain",aspectRatio:"1/1",pointerEvents:"none",zIndex:2,opacity:.9}},s)})),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @keyframes empanada-fall {
          0% {
            opacity: 0;
            transform: translateY(-80px) rotate(0deg);
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(110vh) rotate(var(--rotEnd, 360deg));
          }
        }
      `}),e.jsx("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:2},children:r.current})]})}const Y=["Mexican pibil pork","Mexican veggie","Big burger","Matambre a la pizza","Cheese burger","Vacio y provoleta","American chicken","Jamón y queso","Jamón, huevo y queso","Carne picante","Carne con aceituna","Carne a cuchillo","Carne Suave","Queso y cebolla","Roquefort con jamón","Pollo","Cuatro quesos","Pollo al champignon","Choclo","Verdura","Calabaza","Panceta y ciruela","Carne"],K=()=>{n.useEffect(()=>{N(()=>import("./scrollreveal.es-B1uBQqQp.js"),[]).then(o=>{const i=o.default?o.default:o;i().reveal(".productos-titulo",{distance:"30px",duration:1600,origin:"top",opacity:0,reset:!0}),i().reveal(".lovers-beneficios-grid",{distance:"30px",duration:1600,origin:"left",opacity:0,reset:!0}),i().reveal(".contacto-form-container",{distance:"30px",duration:1600,origin:"right",opacity:0,reset:!0})})},[]);const[t,r]=n.useState({nombreCompleto:"",email:"",telefono:"",cumple:"",sucursal:"",saboresFavoritos:[],esCliente:""}),[a,s]=n.useState({nombreCompleto:"",email:"",telefono:"",saboresFavoritos:"",esCliente:"",cumple:"",sucursal:""}),[d,l]=n.useState(!1),[m,p]=n.useState(!1),[x,g]=n.useState(!1),[u,y]=n.useState(!1);n.useEffect(()=>{if(m)g(!0),y(!1);else if(x){y(!0);const o=setTimeout(()=>{g(!1),y(!1)},480);return()=>clearTimeout(o)}},[m]);const k=o=>{const i=o.target.value;i&&!t.saboresFavoritos.includes(i)&&t.saboresFavoritos.length<3&&(r(c=>({...c,saboresFavoritos:[...c.saboresFavoritos,i]})),s(c=>({...c,saboresFavoritos:""}))),o.target.value=""},C=o=>{r(i=>({...i,saboresFavoritos:i.saboresFavoritos.filter(c=>c!==o)})),s(i=>({...i,saboresFavoritos:""}))},h=o=>{const{name:i,value:c,type:S}=o.target;if(S==="radio"){r(f=>({...f,[i]:c})),s(f=>({...f,[i]:""}));return}r(f=>({...f,[i]:c})),s(f=>({...f,[i]:""}))},W=o=>{o.preventDefault();const i={};t.nombreCompleto.trim()||(i.nombreCompleto="Este campo es obligatorio"),t.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)||(i.email="Ingrese un email válido"):i.email="Este campo es obligatorio",t.telefono.trim()||(i.telefono="Este campo es obligatorio"),t.saboresFavoritos.length===0&&(i.saboresFavoritos="Debes elegir al menos un sabor"),t.esCliente||(i.esCliente="Este campo es obligatorio"),t.cumple||(i.cumple="Este campo es obligatorio"),t.sucursal||(i.sucursal="Este campo es obligatorio"),s(i),!(Object.keys(i).length>0)&&alert("¡Formulario enviado correctamente!")};return console.log("ERRORES FORMULARIO LOVERS:",a),e.jsxs("div",{style:{minHeight:"100vh",width:"100vw",backgroundColor:"#000",position:"relative",overflow:"hidden"},children:[x&&e.jsx("div",{className:`lovers-modal-overlay${u?" closing":""}`,style:{position:"fixed",inset:0,zIndex:1e4,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:m?"auto":"none"},children:e.jsxs("div",{className:`lovers-modal-content${u?" closing":""}`,style:{background:"rgba(30,30,30,0.98)",borderRadius:16,boxShadow:"0 8px 32px rgba(0,0,0,0.45)",padding:"2.5rem 2rem 2rem 2rem",maxWidth:480,width:"100%",margin:"0 16px",position:"relative",color:"#fff",display:"flex",flexDirection:"column",alignItems:"center",transition:"opacity 0.25s, transform 0.25s"},children:[e.jsx("button",{onClick:()=>p(!1),style:{position:"absolute",top:8,right:12,background:"none",border:"none",color:"#888",fontWeight:900,fontSize:28,cursor:"pointer",lineHeight:1},"aria-label":"Cerrar",children:"×"}),e.jsx("h2",{className:"productos-titulo",style:{marginBottom:"1.5rem",marginTop:0,maxWidth:420,textAlign:"center",color:"#ffc107",whiteSpace:"nowrap",fontSize:"2.35rem",fontWeight:700},children:"Términos y condiciones"}),e.jsx("div",{style:{color:"#fff",fontSize:"1.08rem",lineHeight:1.6,textAlign:"justify",maxWidth:420},children:"Al unirte a Mi Gusto Lovers, aceptás recibir novedades, promociones y beneficios exclusivos por correo electrónico o teléfono. Tus datos serán utilizados únicamente para fines relacionados con el programa y no serán compartidos con terceros. Podés darte de baja en cualquier momento. La participación está sujeta a disponibilidad y condiciones de cada sucursal. Para más información, consultá en nuestras bases y condiciones generales."})]})}),e.jsx("style",{children:`
        .lovers-modal-overlay {
          background: rgba(0,0,0,0.45);
          opacity: 1;
          transition: opacity 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .lovers-modal-overlay.closing {
          opacity: 0;
        }
        .lovers-modal-content {
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .lovers-modal-content.closing {
          opacity: 0;
          transform: scale(0.92);
        }
        .lovers-modal-content:not(.closing) {
          animation: lovers-modal-in 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes lovers-modal-in {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}),e.jsx("div",{className:"background-overlay"}),e.jsx("style",{children:`
        .switch-lovers-btn {
          /* Asegura el estilo base, pero solo sobrescribe si no está activo */
        }
        .switch-lovers-btn:not(.on) {
          background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%) !important;
          color: #181818 !important;
          font-weight: bold !important;
          box-shadow: 0 2px 12px 0 rgba(255,215,0,0.18) !important;
          opacity: 1 !important;
        }
      `}),e.jsx(z,{}),e.jsx("style",{children:`
        @media (max-width: 900px) {
          .navbar { display: none !important; }
          .lovers-flex { padding-top: 0 !important; }
        }
      `}),e.jsx("style",{children:`
        @media (max-width: 900px) {
          .lovers-flex {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1.5rem !important;
          }
          .lovers-left {
            order: 1 !important;
            min-width: 0 !important;
            max-width: 100vw !important;
          }
          .lovers-form {
            order: 2 !important;
            min-width: 0 !important;
            max-width: 100vw !important;
          }
        }
      `}),e.jsx("style",{children:`
        @media (max-width: 480px) {
          .lovers-beneficios-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            width: 100% !important;
            max-width: 100vw !important;
            gap: 0.7rem !important;
            justify-items: center !important;
          }
          .lovers-beneficio-card {
            width: 44vw !important;
            min-width: 120px !important;
            max-width: 44vw !important;
            height: 44vw !important;
            min-height: 120px !important;
            max-height: 44vw !important;
            box-sizing: border-box !important;
            padding: 0.9rem 0.4rem 0.7rem 0.4rem !important;
          }
        }
      `}),e.jsxs("div",{className:"lovers-flex",style:{display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"center",width:"100%",maxWidth:1300,margin:"0 auto",paddingTop:"6rem",zIndex:10,position:"relative",gap:"2.5rem"},children:[e.jsx("div",{className:"lovers-left",style:{flex:1,minWidth:320},children:e.jsxs("div",{style:{display:"inline-flex",flexDirection:"column",alignItems:"center",marginLeft:0},children:[e.jsxs("h2",{className:"productos-titulo",style:{marginBottom:"2.5rem",marginTop:0,maxWidth:900,textAlign:"left"},children:[e.jsx("span",{style:{display:"block"},children:"Programa exclusivo de"}),e.jsx("span",{style:{display:"block",textAlign:"center"},children:"beneficios!"})]}),e.jsx("p",{style:{color:"#fff",fontSize:"1.18rem",margin:"0 0 2.2rem 0",maxWidth:700,lineHeight:1.6,fontWeight:400,letterSpacing:.1,textShadow:"0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)",textAlign:"center",alignSelf:"center"},children:"Unite a nuestro programa especial para fanaticos, disfruta de beneficios unicos y experiencias imperdibles, canjea puntos y ganá los premios exclusivos de la marca"}),e.jsxs("div",{className:"lovers-beneficios-grid",style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1.1rem",marginTop:"1.5rem",marginBottom:"2.5rem",width:"100%",maxWidth:440,justifyItems:"center"},children:[e.jsxs("div",{className:"lovers-beneficio-card",style:{background:"rgba(255,255,255,0.05)",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 5px 15px rgba(0,0,0,0.2)",padding:"1.3rem 0.7rem 0.9rem 0.7rem",width:200,minWidth:200,maxWidth:200,display:"flex",flexDirection:"column",alignItems:"center",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",opacity:.85},children:[e.jsx(L,{color:"#ffc107",size:28,style:{marginBottom:10}}),e.jsx("span",{style:{color:"#ffc107",fontWeight:700,fontSize:"1.01rem",letterSpacing:.5,textTransform:"uppercase",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"},children:"Descuentos"}),e.jsx("span",{style:{color:"#fff",fontWeight:400,fontSize:"0.98rem",marginTop:16,textAlign:"center",display:"block",lineHeight:1.35,opacity:.92},children:"Hasta 25% de descuento y promos especiales."})]}),e.jsxs("div",{className:"lovers-beneficio-card",style:{background:"rgba(255,255,255,0.05)",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 5px 15px rgba(0,0,0,0.2)",padding:"1.3rem 0.7rem 0.9rem 0.7rem",width:200,minWidth:200,maxWidth:200,display:"flex",flexDirection:"column",alignItems:"center",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",opacity:.85},children:[e.jsx(q,{color:"#ffc107",size:28,style:{marginBottom:10}}),e.jsx("span",{style:{color:"#ffc107",fontWeight:700,fontSize:"1.01rem",letterSpacing:.5,textTransform:"uppercase",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"},children:"Premios"}),e.jsx("span",{style:{color:"#fff",fontWeight:400,fontSize:"0.98rem",marginTop:16,textAlign:"center",display:"block",lineHeight:1.35,opacity:.92},children:"Canjea puntos por premios únicos."})]}),e.jsxs("div",{className:"lovers-beneficio-card",style:{background:"rgba(255,255,255,0.05)",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 5px 15px rgba(0,0,0,0.2)",padding:"1.3rem 0.7rem 0.9rem 0.7rem",width:200,minWidth:200,maxWidth:200,display:"flex",flexDirection:"column",alignItems:"center",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",opacity:.85},children:[e.jsx(R,{color:"#ffc107",size:28,style:{marginBottom:10}}),e.jsx("span",{style:{color:"#ffc107",fontWeight:700,fontSize:"1.01rem",letterSpacing:.5,textTransform:"uppercase",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block"},children:"VIP"}),e.jsx("span",{style:{color:"#fff",fontWeight:400,fontSize:"0.98rem",marginTop:16,textAlign:"center",display:"block",lineHeight:1.35,opacity:.92},children:"Atención prioritaria."})]}),e.jsxs("div",{className:"lovers-beneficio-card",style:{background:"rgba(255,255,255,0.05)",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 5px 15px rgba(0,0,0,0.2)",padding:"1.3rem 0.7rem 0.9rem 0.7rem",width:200,minWidth:200,maxWidth:200,display:"flex",flexDirection:"column",alignItems:"center",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",opacity:.85},children:[e.jsx(P,{color:"#ffc107",size:28,style:{marginBottom:10}}),e.jsx("span",{style:{color:"#ffc107",fontWeight:700,fontSize:"1.01rem",letterSpacing:.5,textTransform:"uppercase",textAlign:"center",whiteSpace:"pre-line",overflow:"hidden",textOverflow:"ellipsis",display:"block"},children:"Novedades"}),e.jsx("span",{style:{color:"#fff",fontWeight:400,fontSize:"0.98rem",marginTop:16,textAlign:"center",display:"block",lineHeight:1.35,opacity:.92},children:"Vivi experiencias unicas de sabor."})]})]})]})}),e.jsx("div",{className:"lovers-form",style:{flex:"0 1 700px",minWidth:420,maxWidth:700},children:e.jsxs("div",{className:"contacto-form-container",style:{margin:0,background:"rgba(30,30,30,0.65)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",marginBottom:48},children:[e.jsx("h2",{style:{color:"#ffc107",textAlign:"center",marginBottom:8,fontWeight:700,fontSize:"2rem"},children:"Mi Gusto Lovers"}),e.jsx("p",{style:{color:"#fff",textAlign:"center",marginBottom:34,fontSize:"1.05rem",opacity:.92},children:"Completa el siguiente formulario para ponerte en contacto con Mi Gusto Lovers."}),e.jsxs("form",{className:"contacto-form",onSubmit:W,children:[e.jsxs("div",{className:"form-row",style:{marginBottom:12},children:[e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{htmlFor:"nombreCompleto",children:["Nombre completo:",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"text",id:"nombreCompleto",name:"nombreCompleto",value:t.nombreCompleto,onChange:h,placeholder:"Ingrese su nombre completo",style:{width:"100%",minWidth:220,maxWidth:400}}),e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.nombreCompleto})]}),e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{htmlFor:"email",children:["E-mail:",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"email",id:"email",name:"email",value:t.email,onChange:h,placeholder:"ejemplo@email.com",style:{width:"100%",minWidth:220,maxWidth:400}}),e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.email})]})]}),e.jsxs("div",{className:"form-row",style:{marginBottom:0},children:[e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{htmlFor:"telefono",children:["Teléfono:",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"tel",id:"telefono",name:"telefono",value:t.telefono,onChange:h,placeholder:"Ej: +54 9 11 1234-5678",style:{width:"100%",minWidth:220,maxWidth:400}}),e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.telefono})]}),e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{htmlFor:"cumple",children:["Fecha de cumpleaños:",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"date",id:"cumple",name:"cumple",value:t.cumple,onChange:h,placeholder:"Selecciona tu cumpleaños",style:{width:"100%",minWidth:220,maxWidth:400}}),e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.cumple})]})]}),e.jsxs("div",{className:"form-row",style:{marginTop:0,marginBottom:12},children:[e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{htmlFor:"saboresFavoritos",style:{marginTop:18},children:["Tus 3 sabores favoritos:",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("select",{id:"saboresFavoritos",name:"saboresFavoritos",className:"contacto-form",style:{width:"100%",minWidth:220,maxWidth:400,marginBottom:0},onChange:k,disabled:t.saboresFavoritos.length>=3,defaultValue:"",children:[e.jsx("option",{value:"",disabled:!0,children:"Selecciona 3 sabores"}),Y.filter(o=>!t.saboresFavoritos.includes(o)).map(o=>e.jsx("option",{value:o,children:o},o))]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8,marginTop:8,marginBottom:0},children:t.saboresFavoritos.map(o=>e.jsxs("div",{style:{background:"#ffc107",color:"#222",borderRadius:16,padding:"4px 12px",display:"flex",alignItems:"center",fontWeight:600,fontSize:"0.98rem"},children:[o,e.jsx("button",{type:"button",onClick:()=>C(o),style:{marginLeft:6,background:"none",border:"none",color:"#b71c1c",fontWeight:900,fontSize:18,cursor:"pointer",lineHeight:1},"aria-label":`Quitar ${o}`,children:"×"})]},o))}),a.saboresFavoritos&&e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.saboresFavoritos})]}),e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{htmlFor:"sucursal",style:{marginTop:18},children:["Sucursal habitual:",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("select",{id:"sucursal",name:"sucursal",value:t.sucursal,onChange:h,style:{width:"100%",minWidth:220,maxWidth:400,marginBottom:0},children:[e.jsx("option",{value:"",disabled:!0,children:"Selecciona tu sucursal"}),["Ballester","Balvanera","Barrancas de Belgrano","Belgrano","Bella Vista","Campana","Del Viso","Devoto","Don Torcuato","Escobar","Floresta","Florida","Gral. Pacheco","Hurlingham","Ituzaingó","José C. Paz","Los Polvorines","Martínez","Maschwitz","Mataderos","Merlo","Moreno","Muñiz","Munro","Palermo","Paternal","Pilar Centro"].map(o=>e.jsx("option",{value:o,children:o},o))]}),a.sucursal&&e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.sucursal})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsxs("label",{style:{fontWeight:500,color:"#fff",marginBottom:6,display:"block"},children:["¿Ya eres cliente de Mi Gusto? ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("div",{style:{display:"flex",gap:24,marginTop:6},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontWeight:400,color:"#fff"},children:[e.jsx("input",{type:"radio",name:"esCliente",value:"si",checked:t.esCliente==="si",onChange:h,style:{accentColor:"#ffc107"}}),"Sí"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontWeight:400,color:"#fff"},children:[e.jsx("input",{type:"radio",name:"esCliente",value:"no",checked:t.esCliente==="no",onChange:h,style:{accentColor:"#ffc107"}}),"No"]})]}),a.esCliente&&e.jsx("div",{style:{minHeight:18,color:"red",fontSize:"0.95rem",marginTop:4},children:a.esCliente}),e.jsxs("div",{className:"form-group",style:{marginTop:18,marginBottom:0,display:"flex",alignItems:"center",gap:10},children:[e.jsx("input",{type:"checkbox",id:"recibirNovedades",name:"recibirNovedades",checked:d,onChange:o=>l(o.target.checked),style:{accentColor:"#ffc107",width:18,height:18,margin:0}}),e.jsx("label",{htmlFor:"recibirNovedades",style:{margin:0,color:"#fff",fontWeight:500,fontSize:"1rem",cursor:"pointer"},children:"Quiero recibir novedades y beneficios exclusivos."})]})]}),e.jsxs("div",{className:"form-group half-width",style:{minWidth:260,maxWidth:400},children:[e.jsx("button",{type:"submit",className:"btn-ver-mas",style:{marginTop:12},children:"Unirme ahora"}),e.jsx("div",{style:{marginTop:26,marginBottom:0,textAlign:"right",width:"100%",paddingRight:"38px"},children:e.jsx("span",{style:{color:"#ffc107",textDecoration:"underline",fontWeight:600,cursor:"pointer",fontSize:"1rem"},onClick:()=>p(!0),children:"Ver términos y condiciones."})})]})]})]})]})})]}),e.jsx(G,{}),e.jsx("style",{children:`
        @media (max-width: 900px) {
          .terminos-desktop { display: none !important; }
          .terminos-mobile { display: block !important; }
        }
        
        /* Centrar texto de términos y condiciones en mobile */
        @media (max-width: 900px) {
          .lovers-form .form-group:last-child div {
            text-align: center !important;
            padding-right: 0 !important;
            padding-left: 0 !important;
          }
        }
      `}),e.jsx(F,{})]})};export{K as default};
