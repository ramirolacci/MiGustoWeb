import{q as n,_ as F,x as T,k as e,c as d}from"./index-DKLXAvOK.js";import{s as A,S as y}from"./sweetalert2.esm.all-BM_Um9Ba.js";import{D as B}from"./index.es-B_-fRLuw.js";const H=()=>{const[o,m]=n.useState({nombreApellido:"",mailCorporativo:"",telefono:"",fechaEvento:"",cantidadComensales:"",descripcionEvento:"",observaciones:""}),[f,g]=n.useState(!1),[w,p]=n.useState(!1),[r,u]=n.useState({nombreApellido:"",mailCorporativo:"",telefono:"",fechaEvento:"",cantidadComensales:"",descripcionEvento:"",observaciones:""}),[j,v]=n.useState(!1),E=n.useRef(null),c=n.useRef(null);n.useEffect(()=>()=>{c.current&&clearTimeout(c.current)},[]),n.useEffect(()=>{F(()=>import("./scrollreveal.es-B1uBQqQp.js"),[]).then(t=>{const a=t.default?t.default:t;a().reveal(".venta-corporativa-img",{distance:"30px",duration:1600,origin:"left",opacity:0,reset:!0}),a().reveal(".contacto-form-container",{distance:"30px",duration:1600,origin:"right",opacity:0,reset:!0})})},[]);const C=()=>{const t={};return o.nombreApellido.trim()||(t.nombreApellido="El nombre y apellido es obligatorio."),o.mailCorporativo.trim()?/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.mailCorporativo)||(t.mailCorporativo="El formato del mail no es válido."):t.mailCorporativo="El mail corporativo es obligatorio.",o.telefono.trim()||(t.telefono="El teléfono es obligatorio."),o.fechaEvento.trim()||(t.fechaEvento="La fecha del evento es obligatoria."),o.cantidadComensales.trim()||(t.cantidadComensales="La cantidad de comensales es obligatoria."),o.descripcionEvento.trim()||(t.descripcionEvento="La descripción del evento es obligatoria."),u(t),Object.keys(t).length===0},l=t=>{const{name:a,value:s}=t.target;a==="fechaEvento"&&console.log("Valor seleccionado en fechaEvento:",s),m(h=>({...h,[a]:s})),u(h=>({...h,[a]:""}))},b=t=>{const a=t.currentTarget;a.style.height="auto";const s=Math.max(48,a.scrollHeight);a.style.height=`${s}px`};n.useEffect(()=>{["descripcionEvento","observaciones"].forEach(a=>{const s=document.getElementById(a);s&&(s.style.height="auto",s.style.height=Math.max(48,s.scrollHeight)+"px")})},[]);const S=t=>{m(a=>({...a,fechaEvento:t?new Date(t.getTime()-t.getTimezoneOffset()*6e4).toISOString().slice(0,10):""}))},k=()=>{v(!0),c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{v(!1)},900)},_=async t=>{if(t.preventDefault(),!!C()){g(!0);try{await A("venta-corporativa",o),y.fire({icon:"success",title:'<span style="color:#fff;font-family:inherit;font-size:1.5rem;font-weight:600;">¡Éxito!</span>',html:'<span style="color:#fff;font-family:inherit;font-size:1.08rem;">Tu solicitud de venta corporativa ha sido enviada correctamente.</span>',background:"#1a1a1a",color:"#fff",confirmButtonColor:"#d4af37",customClass:{popup:"swal2-corporativa-popup",confirmButton:"swal2-corporativa-btn"},buttonsStyling:!1,showClass:{popup:"swal2-show"},hideClass:{popup:"swal2-hide"}}),m({nombreApellido:"",mailCorporativo:"",telefono:"",fechaEvento:"",cantidadComensales:"",descripcionEvento:"",observaciones:""})}catch(a){console.error("Error al enviar la solicitud:",a),y.fire({icon:"error",title:"Error",text:"Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.",confirmButtonColor:"#d4af37"})}finally{g(!1)}}},x=new Date,z=x.getFullYear(),N=String(x.getMonth()+1).padStart(2,"0"),D=String(x.getDate()).padStart(2,"0"),I=`${z}-${N}-${D}`,i=T();return e.jsxs("div",{className:"venta-corporativa-section",style:{marginTop:"0px",position:"relative",overflow:"hidden"},children:[e.jsxs("div",{style:{position:"absolute",inset:0,zIndex:0,overflow:"hidden"},children:[e.jsx("video",{ref:E,className:"venta-corporativa-video",src:d("/images/corporate/corpoVideo.mp4"),autoPlay:!0,muted:!0,loop:!0,playsInline:!0,onEnded:k,style:{width:"100%",height:"100%",objectFit:"cover",filter:"blur(1px)"}}),e.jsx("div",{style:{position:"absolute",inset:0,backgroundColor:"rgba(0,0,0,0.35)",opacity:j?1:0,transition:"opacity 1.6s ease"}})]}),e.jsx("div",{className:"sucursales-container",style:{position:"relative",zIndex:2},children:e.jsxs("div",{className:"responsive-row",style:{display:"flex",flexDirection:i?"column":"row",width:"100vw",minHeight:"100vh",alignItems:"stretch",justifyContent:"space-between",padding:i?"32px 16px":"48px 64px",boxSizing:"border-box",gap:"32px"},children:[e.jsxs("div",{className:"venta-corporativa-img",style:{width:i?"100%":"48vw",display:"flex",flexDirection:"column",alignItems:i?"center":"flex-start",justifyContent:"center",marginTop:i?"0px":"24px",position:"relative",zIndex:2,padding:i?"0px":"24px",backdropFilter:"blur(2px)"},children:[e.jsx("style",{children:`
                            @media (max-width: 900px) {
                                .venta-corporativa-img {
                                    width: 100% !important;
                                    max-width: 100% !important;
                                    padding: 16px !important;
                                    margin-top: 0px !important;
                                    align-items: center !important;
                                    justify-content: center !important;
                                }
                                .venta-corporativa-img .corp-text {
                                    padding: 20px !important;
                                    margin: 0 auto !important;
                                    width: 100% !important;
                                    max-width: 100% !important;
                                    box-sizing: border-box !important;
                                }
                                .venta-corporativa-img .corp-text-title {
                                    font-size: 1.35rem !important;
                                    margin-bottom: 12px !important;
                                }
                                .venta-corporativa-img .corp-text-body {
                                    font-size: 1.12rem !important;
                                    line-height: 1.55 !important;
                                }
                                .venta-corporativa-img .corp-icon {
                                    width: 32px !important;
                                    height: 32px !important;
                                }
                            }
                        `}),e.jsxs("div",{className:"corp-text",style:{textAlign:"left",zIndex:3,padding:"24px",background:"rgba(0,0,0,0.45)",borderRadius:"14px",boxShadow:"0 8px 32px rgba(0,0,0,0.35)",width:"100%",maxWidth:"100%",boxSizing:"border-box"},children:[e.jsx("div",{className:"corp-text-title",style:{fontWeight:700,fontSize:"1.75rem",marginBottom:"24px",color:"#ffffff",textShadow:"2px 2px 4px rgba(0,0,0,0.8)"},children:"Beneficios Corporativos"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("img",{src:d("/images/corporate/descuento.png"),alt:"Descuento",className:"corp-icon",style:{width:44,height:44,objectFit:"contain"},loading:"lazy"}),e.jsx("span",{className:"corp-text-body",style:{fontSize:"1.25rem",color:"#ffffff",textShadow:"1px 1px 3px rgba(0,0,0,0.7)"},children:"Packs corporativos anticipados con hasta 25% OFF"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("img",{src:d("/images/corporate/entrega.png"),alt:"Entrega",className:"corp-icon",style:{width:44,height:44,objectFit:"contain"},loading:"lazy"}),e.jsx("span",{className:"corp-text-body",style:{fontSize:"1.25rem",color:"#ffffff",textShadow:"1px 1px 3px rgba(0,0,0,0.7)"},children:"Entregas en CABA y GBA"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("img",{src:d("/images/corporate/servicio.png"),alt:"Servicio",className:"corp-icon",style:{width:44,height:44,objectFit:"contain"},loading:"lazy"}),e.jsx("span",{className:"corp-text-body",style:{fontSize:"1.25rem",color:"#ffffff",textShadow:"1px 1px 3px rgba(0,0,0,0.7)"},children:"Atención personalizada, adaptada a tus necesidades"})]})]})]})]}),e.jsxs("div",{className:"contacto-container no-pattern-bg",style:{width:i?"100%":"38vw",maxWidth:"560px",minHeight:"auto",display:"flex",alignItems:i?"center":"flex-start",justifyContent:i?"center":"flex-end",marginTop:i?"0px":"24px",marginLeft:"auto",marginRight:"auto",padding:0,background:"transparent",boxShadow:"none"},children:[e.jsx("style",{children:`
                            @media (max-width: 900px) {
                                .contacto-container.no-pattern-bg {
                                    width: 100% !important;
                                    max-width: 100% !important;
                                    display: flex !important;
                                    justify-content: center !important;
                                    align-items: center !important;
                                    margin: 0 auto !important;
                                    padding: 0 !important;
                                    box-sizing: border-box !important;
                                }
                            }
                        `}),e.jsxs("div",{className:"contacto-content",style:{width:"100%",maxWidth:"100%",marginTop:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("style",{children:`
                                @media (max-width: 900px) {
                                    .contacto-content {
                                        width: 100% !important;
                                        max-width: 100% !important;
                                        display: flex !important;
                                        justify-content: center !important;
                                        align-items: center !important;
                                        margin: 0 auto !important;
                                    }
                                }
                            `}),e.jsxs("div",{className:"contacto-form-container",style:{background:"rgba(30, 30, 30, 0.78)",backdropFilter:"blur(6px)",width:"100%",maxWidth:"100%"},children:[e.jsx("style",{children:`
                                    @media (max-width: 900px) {
                                        .contacto-form-container {
                                            width: 100% !important;
                                            max-width: 100% !important;
                                            margin: 0 auto !important;
                                            box-sizing: border-box !important;
                                        }
                                    }
                                `}),e.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:e.jsx("img",{src:d("/images/corporate/venta corporativa.png"),alt:"Venta Corporativa",style:{width:i?"95%":"85%",maxWidth:"520px",marginTop:i?"0px":"-10px",marginBottom:"20px",filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.6))"}})}),e.jsx("p",{style:{textAlign:"center",fontSize:"1.4rem",marginBottom:"24px"},children:"Eventos Corporativos: solicitá tu propuesta personalizada"}),e.jsxs("form",{onSubmit:_,className:"contacto-form",children:[e.jsx("style",{children:`
										.react-datepicker {
											background: #181818 !important;
											border: 1px solid #333 !important;
											color: #fff !important;
											font-family: inherit !important;
											border-radius: 8px !important;
											box-shadow: 0 4px 24px rgba(0,0,0,0.25) !important;
											left: -100px !important;
											position: relative !important;
										}
										.react-datepicker__header {
											background: #222 !important;
											border-bottom: 1px solid #333 !important;
											color: #fff !important;
											border-radius: 8px 8px 0 0 !important;
										}
										.react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
											color: #ffc107 !important;
											font-weight: bold !important;
										}
										.react-datepicker__day, .react-datepicker__day-name {
											color: #fff !important;
											font-size: 1rem !important;
											border-radius: 4px !important;
										}
										.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
											background: #ffc107 !important;
											color: #222 !important;
										}
										.react-datepicker__day:hover {
											background: #333 !important;
											color: #ffc107 !important;
										}
										.react-datepicker__triangle { display: none !important; }
										.react-datepicker__navigation { top: 12px !important; }
										.react-datepicker__navigation-icon::before { border-color: #ffc107 !important; }
										.react-datepicker__month-dropdown, .react-datepicker__year-dropdown {
											background: #181818 !important;
											color: #fff !important;
										}
										.react-datepicker__month-option, .react-datepicker__year-option { color: #fff !important; }
										.react-datepicker__month-option--selected, .react-datepicker__year-option--selected {
											background: #ffc107 !important;
											color: #222 !important;
										}
									`}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"nombreApellido",children:["Nombre y apellido: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"text",id:"nombreApellido",name:"nombreApellido",value:o.nombreApellido,onChange:l,placeholder:"Ingrese su nombre y apellido"}),r.nombreApellido&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:r.nombreApellido})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"mailCorporativo",children:["Mail corporativo: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"email",id:"mailCorporativo",name:"mailCorporativo",value:o.mailCorporativo,onChange:l,placeholder:"Ingrese su mail corporativo"}),r.mailCorporativo&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:r.mailCorporativo})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"telefono",children:["Teléfono: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"tel",id:"telefono",name:"telefono",value:o.telefono,onChange:l,placeholder:"Ingrese su teléfono"}),r.telefono&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:r.telefono})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"fechaEvento",children:["Fecha del evento: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"text",id:"fechaEvento",name:"fechaEvento",value:o.fechaEvento,onClick:()=>p(!0),readOnly:!0,placeholder:"dd/mm/aaaa",className:"contacto-form input"}),e.jsx(B,{selected:o.fechaEvento?new Date(o.fechaEvento):null,onChange:t=>{S(t),p(!1)},dateFormat:"yyyy-MM-dd",minDate:new Date(I),showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select",onSelect:()=>p(!1),onClickOutside:()=>p(!1),shouldCloseOnSelect:!0,open:w,customInput:e.jsx("input",{style:{display:"none"}})}),r.fechaEvento&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:r.fechaEvento})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"cantidadComensales",children:["Cantidad de comensales: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"number",id:"cantidadComensales",name:"cantidadComensales",value:o.cantidadComensales,onChange:l,min:"1",placeholder:"Ingrese la cantidad de comensales"}),r.cantidadComensales&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:r.cantidadComensales})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"descripcionEvento",children:["Breve descripción del evento: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("textarea",{id:"descripcionEvento",name:"descripcionEvento",value:o.descripcionEvento,onChange:l,onInput:b,placeholder:"Describa brevemente el evento",rows:1,style:{width:"100%",height:48,minHeight:48,padding:"12px 16px",resize:"none"}}),r.descripcionEvento&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:r.descripcionEvento})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"observaciones",children:"Observaciones especiales:"}),e.jsx("textarea",{id:"observaciones",name:"observaciones",value:o.observaciones,onChange:l,onInput:b,placeholder:"Detalle aquí cualquier requerimiento especial",rows:1,style:{width:"100%",height:48,minHeight:48,padding:"12px 16px",resize:"none"}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-start",marginTop:"18px",gap:"8px"},children:[e.jsxs("div",{className:"contact-links",style:{display:"flex",flexDirection:"row",alignItems:"center",gap:"12px",justifyContent:"flex-start",marginBottom:"0",width:"100%"},children:[e.jsx("a",{href:"mailto:eventos@migusto.com.ar",style:{color:"#D4AF37",textDecoration:"underline",fontWeight:500,fontSize:"0.98rem",background:"none",border:"none",padding:0,cursor:"pointer",opacity:.8,marginBottom:0,whiteSpace:"nowrap"},children:"Email: eventos@migusto.com.ar"}),e.jsx("a",{href:"https://wa.me/541163704522",target:"_blank",rel:"noopener noreferrer",style:{color:"#25D366",textDecoration:"underline",fontWeight:500,fontSize:"0.98rem",background:"none",border:"none",padding:0,cursor:"pointer",opacity:.8,marginBottom:0,whiteSpace:"nowrap"},children:"Contactanos por Whatsapp"})]}),e.jsx("button",{type:"submit",className:"btn-ver-mas",disabled:f,children:f?"Enviando...":"Enviar Solicitud"})]})]})]})]})]})]})})]})};if(typeof window<"u"){const o=document.createElement("style");o.innerHTML=`
        @media (max-width: 900px) {
            .sucursales-section {
                margin-top: 0px !important;
            }
            .contacto-container {
                margin-top: 16px !important;
                width: 100% !important;
                max-width: 100% !important;
            }
            .contacto-container.no-pattern-bg {
                width: 100% !important;
                max-width: 100% !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                margin: 0 auto !important;
                padding: 0 !important;
                box-sizing: border-box !important;
            }
            .contacto-content {
                width: 100% !important;
                max-width: 100% !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                margin: 0 auto !important;
            }
            .contacto-form-container {
                padding: 24px !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 auto !important;
                box-sizing: border-box !important;
            }
            .venta-corporativa-img {
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                max-width: 100% !important;
            }
            .corp-text {
                margin: 0 auto !important;
                width: 100% !important;
                max-width: 100% !important;
                box-sizing: border-box !important;
            }
            .responsive-row {
                align-items: center !important;
                justify-content: center !important;
                padding-left: 16px !important;
                padding-right: 16px !important;
                box-sizing: border-box !important;
                width: 100% !important;
                max-width: 100% !important;
            }
        }
    `,document.head.appendChild(o)}export{H as default};
