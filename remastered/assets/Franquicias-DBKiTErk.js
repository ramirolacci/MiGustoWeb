import{q as l,_ as F,k as e,c as N,R as E}from"./index-DKLXAvOK.js";import{D as I}from"./index.es-B_-fRLuw.js";import{s as A,S as C}from"./sweetalert2.esm.all-BM_Um9Ba.js";E.forwardRef(({value:s,onClick:c,onChange:i,placeholder:d},f)=>e.jsx("div",{style:{position:"relative",width:"100%"},children:e.jsx("input",{ref:f,value:s,onClick:c,onFocus:c,onChange:i,onInput:m=>{const h=m.target;let o=h.value.replace(/[^0-9]/g,"");o.length>2&&o[2]!=="/"&&(o=o.slice(0,2)+"/"+o.slice(2)),o.length>5&&o[5]!=="/"&&(o=o.slice(0,5)+"/"+o.slice(5)),h.value=o.slice(0,10)},inputMode:"numeric",pattern:"[0-9/]*",placeholder:d,className:"contacto-form input datepicker-match",style:{paddingRight:"48px",width:"100%",boxSizing:"border-box"},autoComplete:"off"})}));const M=()=>{const[s,c]=l.useState(1),[i,d]=l.useState({nombre:"",fechaNacimiento:"",sexo:"",estadoCivil:"",tipoDocumento:"",numeroDocumento:"",paisResidencia:"",provinciaResidencia:"",localidadResidencia:"",domicilio:"",telefonoCelular:"",telefonoAlternativo:"",email:"",emailAlternativo:"",paisPreferencia:"",provinciaPreferencia:"",localidadPreferencia:"",inmuebleGarantia:""}),[f,m]=l.useState(!1),h=l.useRef(null),[o,v]=l.useState(!1),[a,q]=l.useState({nombre:"",fechaNacimiento:"",sexo:"",estadoCivil:"",tipoDocumento:"",numeroDocumento:"",paisResidencia:"",provinciaResidencia:"",localidadResidencia:"",domicilio:"",telefonoCelular:"",email:"",paisPreferencia:"",provinciaPreferencia:"",localidadPreferencia:"",inmuebleGarantia:""}),[S,b]=l.useState(!1),z=l.useRef(null),p=l.useRef(null),[x,k]=l.useState(!1);l.useEffect(()=>{F(()=>import("./scrollreveal.es-B1uBQqQp.js"),[]).then(t=>{const r=t.default?t.default:t;r().reveal(".franquicias-img",{distance:"30px",duration:1600,origin:"left",opacity:0,reset:!0}),r().reveal(".contacto-form-container",{distance:"30px",duration:1600,origin:"right",opacity:0,reset:!0})})},[]),l.useEffect(()=>()=>{p.current&&clearTimeout(p.current)},[]);const n=t=>{const{name:r,value:u}=t.target;d(g=>({...g,[r]:u}))},R=(t,r)=>{d(u=>({...u,fechaNacimiento:t?t.toLocaleDateString("es-AR"):r&&"target"in r&&r.target.value||""})),m(!1)},P=t=>{let r=t.target.value;/^[0-9/]*$/.test(r)&&r.length<=8&&(r===""||/^(\d{0,2})(\/)?(\d{0,2})(\/)?(\d{0,2})$/.test(r))&&d(g=>({...g,fechaNacimiento:r}))},j=()=>{const t={};return s===1&&(i.nombre.trim()||(t.nombre="El nombre es obligatorio."),i.fechaNacimiento.trim()||(t.fechaNacimiento="La fecha de nacimiento es obligatoria."),i.sexo.trim()||(t.sexo="El sexo es obligatorio."),i.estadoCivil.trim()||(t.estadoCivil="El estado civil es obligatorio."),i.tipoDocumento.trim()||(t.tipoDocumento="El tipo de documento es obligatorio."),i.numeroDocumento.trim()||(t.numeroDocumento="El número de documento es obligatorio.")),s===2&&(i.paisResidencia.trim()||(t.paisResidencia="El país de residencia es obligatorio."),i.provinciaResidencia.trim()||(t.provinciaResidencia="La provincia de residencia es obligatoria."),i.localidadResidencia.trim()||(t.localidadResidencia="La localidad de residencia es obligatoria."),i.domicilio.trim()||(t.domicilio="El domicilio es obligatorio."),i.telefonoCelular.trim()||(t.telefonoCelular="El teléfono celular es obligatorio."),i.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email)||(t.email="El formato del email no es válido."):t.email="El email es obligatorio."),s===3&&(i.paisPreferencia.trim()||(t.paisPreferencia="El país de preferencia es obligatorio."),i.provinciaPreferencia.trim()||(t.provinciaPreferencia="La provincia de preferencia es obligatoria."),i.localidadPreferencia.trim()||(t.localidadPreferencia="La localidad de preferencia es obligatoria."),i.inmuebleGarantia.trim()||(t.inmuebleGarantia="Este campo es obligatorio.")),q(t),Object.keys(t).length===0},w=()=>{j()&&c(t=>t+1)},y=()=>{c(t=>t-1)},D=async t=>{if(t.preventDefault(),!!j()){v(!0);try{await A("franquicias",i),C.fire({icon:"success",title:"¡Éxito!",text:"¡Formulario de franquicia enviado con éxito! Nos pondremos en contacto pronto.",confirmButtonColor:"#d4af37"}),d({nombre:"",fechaNacimiento:"",sexo:"",estadoCivil:"",tipoDocumento:"",numeroDocumento:"",paisResidencia:"",provinciaResidencia:"",localidadResidencia:"",domicilio:"",telefonoCelular:"",telefonoAlternativo:"",email:"",emailAlternativo:"",paisPreferencia:"",provinciaPreferencia:"",localidadPreferencia:"",inmuebleGarantia:""}),c(1)}catch(r){console.error("Error al enviar el formulario:",r),C.fire({icon:"error",title:"Error",text:"Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.",confirmButtonColor:"#d4af37"})}finally{v(!1)}}},_=()=>{b(!0),p.current&&clearTimeout(p.current),p.current=setTimeout(()=>{b(!1)},900)},T=(s-1)/2*100;return e.jsxs("div",{className:"sucursales-section",style:{marginTop:"0px",position:"relative",overflow:"hidden",background:"transparent"},children:[e.jsxs("div",{style:{position:"absolute",inset:0,zIndex:0,overflow:"hidden"},children:[e.jsx("video",{ref:z,className:"franquicias-bg-video",src:N("/images/franquicias/videoFranquicias.mp4"),autoPlay:!0,muted:!0,loop:!0,playsInline:!0,onEnded:_,style:{width:"100%",height:"100%",objectFit:"cover",filter:"blur(2px)"}}),e.jsx("div",{style:{position:"absolute",inset:0,backgroundColor:"rgba(0,0,0,0.35)",opacity:S?1:0,transition:"opacity 1.6s ease"}})]}),e.jsx("div",{className:"sucursales-container",style:{position:"relative",zIndex:2},children:e.jsxs("div",{className:"responsive-row",style:{display:"flex",flexDirection:"row",width:"100vw",minHeight:"100vh",alignItems:"stretch",padding:"48px 64px",boxSizing:"border-box",gap:"32px"},children:[e.jsx("style",{children:`
            @media (max-width: 900px) {
              .responsive-row {
                flex-direction: column !important;
                padding: 20px 16px !important;
                gap: 20px !important;
                min-height: auto !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                max-width: 100vw !important;
                box-sizing: border-box !important;
              }
            }
            @media (max-width: 480px) {
              .responsive-row {
                padding: 16px 12px !important;
                gap: 16px !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                max-width: 100vw !important;
                box-sizing: border-box !important;
              }
            }
          `}),e.jsxs("div",{className:"franquicias-img",style:{width:"50vw",height:"100%",maxHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"0px",position:"relative",zIndex:2,padding:"20px",backdropFilter:"blur(2px)"},children:[e.jsx("style",{children:`
              @media (max-width: 900px) {
                .franquicias-img {
                  width: 100vw !important;
                  padding: 16px !important;
                  margin-top: 8px !important;
                  maxHeight: auto !important;
                  height: auto !important;
                  align-items: center !important;
                }
                .franquicias-img .franq-text {
                  padding: 16px !important;
                  margin: 0 auto !important;
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .franquicias-img .franq-text-title {
                  font-size: 1.3rem !important;
                  margin-bottom: 12px !important;
                }
                .franquicias-img .franq-text-body {
                  font-size: 1.05rem !important;
                  line-height: 1.55 !important;
                }
                .franquicias-img button {
                  font-size: 1.4rem !important;
                }
              }
              @media (max-width: 480px) {
                .franquicias-img {
                  padding: 12px !important;
                  align-items: center !important;
                }
                .franquicias-img .franq-text {
                  padding: 12px !important;
                  margin: 0 auto !important;
                  width: 100% !important;
                }
                .franquicias-img button {
                  font-size: 1.2rem !important;
                }
                .franquicias-img .franq-text-body {
                  font-size: 0.95rem !important;
                }
              }
            `}),e.jsxs("div",{className:"franq-text",style:{textAlign:"left",zIndex:3,padding:"20px",background:"rgba(0,0,0,0.45)",borderRadius:"14px",boxShadow:"0 8px 24px rgba(0,0,0,0.35)",transform:"scale(0.9)",transformOrigin:"center",width:"100%",maxWidth:"100%"},children:[e.jsxs("button",{onClick:()=>k(t=>!t),"aria-expanded":x,style:{background:"none",border:"none",color:"#ffffff",fontWeight:700,fontSize:"1.7rem",textShadow:"2px 2px 4px rgba(0,0,0,0.8)",cursor:"pointer",padding:0,width:"100%",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"},className:"franq-why-button",children:[e.jsx("style",{children:`
                  @media (max-width: 900px) {
                    .franq-why-button {
                      font-size: 1.4rem !important;
                    }
                  }
                  @media (max-width: 480px) {
                    .franq-why-button {
                      font-size: 1.2rem !important;
                    }
                  }
                `}),"¿Por qué elegir Mi Gusto?",e.jsx("span",{style:{fontSize:"1.3rem",transition:"transform 0.3s ease",transform:x?"rotate(90deg)":"rotate(0deg)"},children:"❯"})]}),e.jsx("div",{className:"franq-text-body",style:{fontSize:"1.25rem",lineHeight:1.6,color:"#ffffff",whiteSpace:"pre-line",textShadow:"1px 1px 3px rgba(0,0,0,0.8)",maxHeight:x?"600px":"0px",opacity:x?1:0,overflow:"hidden",transition:"max-height 0.6s ease, opacity 0.6s ease",marginTop:x?"16px":"0px"},children:"Porque llevamos más de 25 años en el mercado y sabemos cómo hacer que un negocio funcione. Tenemos un modelo probado, pensado para vender en volumen y con procesos simples de operar. Invertimos en tecnología, tenemos app propia y presencia en todas las plataformas de delivery. Ofrecemos una amplia variedad de productos y un sistema de atención 360 que acompaña cada punto de venta. Si buscás una marca con experiencia real, respaldo y potencial de crecimiento, este es el momento de sumarte."})]})]}),e.jsxs("div",{className:"contacto-container no-pattern-bg",style:{width:"50vw",minHeight:"100vh",display:"flex",alignItems:"flex-start",justifyContent:"center",marginTop:"0px",padding:0,background:"transparent",boxShadow:"none"},children:[e.jsx("style",{children:`
              @media (max-width: 900px) {
                .contacto-container.no-pattern-bg {
                  width: 100% !important;
                  max-width: 100% !important;
                  min-height: auto !important;
                  padding: 0 !important;
                  margin: 0 auto !important;
                  display: flex !important;
                  justify-content: center !important;
                  align-items: center !important;
                  box-sizing: border-box !important;
                }
              }
            `}),e.jsx("div",{className:"contacto-content",style:{width:"100%",marginTop:0,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{className:"contacto-form-container",style:{background:"rgba(30, 30, 30, 0.85)",transform:"scale(0.9)",transformOrigin:"center",width:"100%",maxWidth:"100%"},children:[e.jsx("style",{children:`
                  @media (max-width: 900px) {
                    .contacto-form-container {
                      padding: 20px !important;
                      margin: 0 auto !important;
                      width: 100% !important;
                      max-width: 100% !important;
                      box-sizing: border-box !important;
                      transform: scale(0.9) !important;
                      transform-origin: center !important;
                    }
                    .contacto-content {
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
                  @media (max-width: 480px) {
                    .contacto-form-container {
                      padding: 16px !important;
                      margin: 0 auto !important;
                      width: 100% !important;
                      max-width: 100% !important;
                      box-sizing: border-box !important;
                      transform: scale(0.9) !important;
                      transform-origin: center !important;
                    }
                    .contacto-content {
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
                `}),e.jsxs("div",{style:{width:"100%",display:"flex",justifyContent:"center"},children:[e.jsx("img",{src:N("/images/franquicias/Franquicias.png"),alt:"Franquicias",style:{width:"85%",maxWidth:"460px",marginBottom:"20px",filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.6))"}}),e.jsx("style",{children:`
                    @media (max-width: 900px) {
                      .contacto-form-container img {
                        width: 90% !important;
                        max-width: 300px !important;
                        margin-bottom: 16px !important;
                      }
                    }
                    @media (max-width: 480px) {
                      .contacto-form-container img {
                        width: 95% !important;
                        max-width: 250px !important;
                        margin-bottom: 12px !important;
                      }
                    }
                  `})]}),e.jsx("p",{style:{textAlign:"center",fontSize:"1.3rem",marginBottom:"24px"},children:"Completa el siguiente formulario si estás interesado en abrir una franquicia de Mi Gusto."}),e.jsx("style",{children:`
                  @media (max-width: 900px) {
                    .contacto-form-container p {
                      font-size: 1.1rem !important;
                      margin-bottom: 20px !important;
                      padding: 0 8px !important;
                    }
                  }
                  @media (max-width: 480px) {
                    .contacto-form-container p {
                      font-size: 1rem !important;
                      margin-bottom: 16px !important;
                      padding: 0 4px !important;
                    }
                  }
                `}),e.jsxs("div",{style:{textAlign:"center",marginBottom:"16px",fontSize:"1.1rem",color:"#ffc107"},children:["Paso ",s," de 3"]}),e.jsx("style",{children:`
                  @media (max-width: 480px) {
                    .contacto-form-container > div[style*="color: #ffc107"] {
                      font-size: 1rem !important;
                      margin-bottom: 12px !important;
                    }
                  }
                `}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-bar",style:{width:`${T}%`}})}),e.jsxs("form",{className:"contacto-form",onSubmit:D,children:[e.jsx("style",{children:`
                    .datepicker-match {
                      width: 100% !important;
                      min-width: 100% !important;
                      max-width: 100% !important;
                      box-sizing: border-box !important;
                      height: auto !important;
                      padding: 15px !important;
                      border: 1px solid rgba(255, 255, 255, 0.2) !important;
                      border-radius: 5px !important;
                      font-size: 1rem !important;
                      background-color: rgba(255, 255, 255, 0.1) !important;
                      color: #f8f9fa !important;
                      transition: all 0.3s ease !important;
                      display: block !important;
                    }
                    
                    .form-group.half-width .datepicker-match {
                      width: 100% !important;
                      min-width: 100% !important;
                      max-width: 100% !important;
                      display: block !important;
                    }
                    
                    .datepicker-match:focus {
                      outline: none !important;
                      border-color: #ffc107 !important;
                      box-shadow: 0 0 12px rgba(255, 193, 7, 0.6) !important;
                      background-color: rgba(255, 255, 255, 0.2) !important;
                    }
                    
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
                    @media (max-width: 900px) {
                      .react-datepicker {
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        position: fixed !important;
                        z-index: 9999 !important;
                        top: 50% !important;
                        margin-top: -200px !important;
                      }
                    }
                    @media (max-width: 480px) {
                      .react-datepicker {
                        width: 90vw !important;
                        max-width: 320px !important;
                        font-size: 0.9rem !important;
                      }
                      .react-datepicker__day {
                        font-size: 0.85rem !important;
                        padding: 6px !important;
                      }
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
                    .react-datepicker__triangle {
                      display: none !important;
                    }
                    .react-datepicker__navigation {
                      top: 12px !important;
                    }
                    .react-datepicker__navigation-icon::before {
                      border-color: #ffc107 !important;
                    }
                    .react-datepicker__month-dropdown, .react-datepicker__year-dropdown {
                      background: #181818 !important;
                      color: #fff !important;
                    }
                    .react-datepicker__month-option, .react-datepicker__year-option {
                      color: #fff !important;
                    }
                    .react-datepicker__month-option--selected, .react-datepicker__year-option--selected {
                      background: #ffc107 !important;
                      color: #222 !important;
                    }
                    .datepicker-match::placeholder {
                      color: #bbb !important;
                      opacity: 1 !important;
                      font-style: normal !important;
                    }
                  `}),s===1&&e.jsxs("div",{className:"form-step",children:[e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"nombre",children:["Nombre completo: ",e.jsx("span",{className:"required",children:"*"})]}),a.nombre&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.nombre}),e.jsx("input",{type:"text",id:"nombre",name:"nombre",value:i.nombre,onChange:n,required:!0,placeholder:"Ingrese su nombre completo"})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"fechaNacimiento",children:["Fecha de Nacimiento: ",e.jsx("span",{className:"required",children:"*"})]}),a.fechaNacimiento&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.fechaNacimiento}),e.jsx("input",{type:"text",id:"fechaNacimiento",name:"fechaNacimiento",value:i.fechaNacimiento,onChange:P,onClick:()=>m(!0),required:!0,placeholder:"dd/mm/aaaa",className:"contacto-form input",readOnly:!0}),e.jsx(I,{selected:i.fechaNacimiento?new Date(i.fechaNacimiento.split("/").reverse().join("-")):null,onChange:(t,r)=>{R(t,r),m(!1)},dateFormat:"dd/MM/yy",placeholderText:"dd/mm/aaaa",customInput:e.jsx("input",{style:{display:"none"}}),id:"fechaNacimiento-hidden",name:"fechaNacimiento-hidden",showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select",maxDate:new Date,onClickOutside:()=>m(!1),shouldCloseOnSelect:!0,open:f,ref:h})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"sexo",children:["Sexo: ",e.jsx("span",{className:"required",children:"*"})]}),a.sexo&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.sexo}),e.jsxs("select",{id:"sexo",name:"sexo",value:i.sexo,onChange:n,required:!0,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona"}),e.jsx("option",{value:"masculino",children:"Masculino"}),e.jsx("option",{value:"femenino",children:"Femenino"}),e.jsx("option",{value:"otro",children:"Otro"})]})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"estadoCivil",children:["Estado Civil: ",e.jsx("span",{className:"required",children:"*"})]}),a.estadoCivil&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.estadoCivil}),e.jsxs("select",{id:"estadoCivil",name:"estadoCivil",value:i.estadoCivil,onChange:n,required:!0,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona"}),e.jsx("option",{value:"soltero",children:"Soltero/a"}),e.jsx("option",{value:"casado",children:"Casado/a"}),e.jsx("option",{value:"divorciado",children:"Divorciado/a"}),e.jsx("option",{value:"viudo",children:"Viudo/a"})]})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"tipoDocumento",children:["Tipo de Documento: ",e.jsx("span",{className:"required",children:"*"})]}),a.tipoDocumento&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.tipoDocumento}),e.jsxs("select",{id:"tipoDocumento",name:"tipoDocumento",value:i.tipoDocumento,onChange:n,required:!0,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona"}),e.jsx("option",{value:"DNI",children:"DNI"}),e.jsx("option",{value:"LC",children:"LC"}),e.jsx("option",{value:"LE",children:"LE"})]})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"numeroDocumento",children:["Número de Documento: ",e.jsx("span",{className:"required",children:"*"})]}),a.numeroDocumento&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.numeroDocumento}),e.jsx("input",{type:"text",id:"numeroDocumento",name:"numeroDocumento",value:i.numeroDocumento,onChange:n,required:!0,placeholder:"Ingrese su número de documento"})]})]}),e.jsxs("div",{className:"form-buttons",style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"},children:[e.jsx("button",{type:"button",className:"btn-ver-mas",onClick:w,style:{margin:"0 5px"},disabled:o,children:"Siguiente"}),e.jsx("button",{type:"button",className:"btn-ver-mas",onClick:()=>alert("Cancelado"),style:{margin:"0 5px"},disabled:o,children:"Cancelar"})]})]}),s===2&&e.jsxs("div",{className:"form-step",children:[e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"paisResidencia",children:["País de Residencia: ",e.jsx("span",{className:"required",children:"*"})]}),a.paisResidencia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.paisResidencia}),e.jsxs("select",{id:"paisResidencia",name:"paisResidencia",value:i.paisResidencia,onChange:n,required:!0,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona"}),e.jsx("option",{value:"argentina",children:"Argentina"}),e.jsx("option",{value:"otros",children:"Otros"})]})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"provinciaResidencia",children:["Provincia de Residencia: ",e.jsx("span",{className:"required",children:"*"})]}),a.provinciaResidencia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.provinciaResidencia}),e.jsx("input",{type:"text",id:"provinciaResidencia",name:"provinciaResidencia",value:i.provinciaResidencia,onChange:n,required:!0,placeholder:"Ingrese su provincia"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"localidadResidencia",children:["Localidad de Residencia: ",e.jsx("span",{className:"required",children:"*"})]}),a.localidadResidencia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.localidadResidencia}),e.jsx("input",{type:"text",id:"localidadResidencia",name:"localidadResidencia",value:i.localidadResidencia,onChange:n,required:!0,placeholder:"Ingrese su localidad"})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"domicilio",children:["Domicilio: ",e.jsx("span",{className:"required",children:"*"})]}),a.domicilio&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.domicilio}),e.jsx("input",{type:"text",id:"domicilio",name:"domicilio",value:i.domicilio,onChange:n,required:!0,placeholder:"Ingrese su domicilio completo"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"telefonoCelular",children:["Teléfono Celular: ",e.jsx("span",{className:"required",children:"*"})]}),a.telefonoCelular&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.telefonoCelular}),e.jsx("input",{type:"tel",id:"telefonoCelular",name:"telefonoCelular",value:i.telefonoCelular,onChange:n,required:!0,placeholder:"+54 9 11 1234-5678"})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsx("label",{htmlFor:"telefonoAlternativo",children:"Teléfono Alternativo:"}),e.jsx("input",{type:"tel",id:"telefonoAlternativo",name:"telefonoAlternativo",value:i.telefonoAlternativo,onChange:n,placeholder:"+54 9 11 1234-5678"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"email",children:["E-mail: ",e.jsx("span",{className:"required",children:"*"})]}),a.email&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.email}),e.jsx("input",{type:"email",id:"email",name:"email",value:i.email,onChange:n,required:!0,placeholder:"ejemplo@email.com"})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsx("label",{htmlFor:"emailAlternativo",children:"E-mail Alternativo:"}),e.jsx("input",{type:"email",id:"emailAlternativo",name:"emailAlternativo",value:i.emailAlternativo,onChange:n,placeholder:"ejemplo@email.com"})]})]}),e.jsxs("div",{className:"form-buttons",style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"},children:[e.jsx("button",{type:"button",className:"btn-ver-mas",onClick:w,style:{margin:"0 5px"},disabled:o,children:"Siguiente"}),e.jsx("button",{type:"button",className:"btn-ver-mas",onClick:y,style:{margin:"0 5px"},disabled:o,children:"Volver"})]})]}),s===3&&e.jsxs("div",{className:"form-step",children:[e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"paisPreferencia",children:["País de Preferencia: ",e.jsx("span",{className:"required",children:"*"})]}),a.paisPreferencia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.paisPreferencia}),e.jsxs("select",{id:"paisPreferencia",name:"paisPreferencia",value:i.paisPreferencia,onChange:n,required:!0,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona"}),e.jsx("option",{value:"argentina",children:"Argentina"}),e.jsx("option",{value:"otros",children:"Otros"})]})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"provinciaPreferencia",children:["Provincia de Preferencia: ",e.jsx("span",{className:"required",children:"*"})]}),a.provinciaPreferencia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.provinciaPreferencia}),e.jsx("input",{type:"text",id:"provinciaPreferencia",name:"provinciaPreferencia",value:i.provinciaPreferencia,onChange:n,required:!0,placeholder:"Ingrese la provincia de preferencia"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"localidadPreferencia",children:["Localidad de Preferencia: ",e.jsx("span",{className:"required",children:"*"})]}),a.localidadPreferencia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.localidadPreferencia}),e.jsx("input",{type:"text",id:"localidadPreferencia",name:"localidadPreferencia",value:i.localidadPreferencia,onChange:n,required:!0,placeholder:"Ingrese la localidad de preferencia"})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"inmuebleGarantia",children:["¿Dispone de Inmueble para Garantía?: ",e.jsx("span",{className:"required",children:"*"})]}),a.inmuebleGarantia&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:a.inmuebleGarantia}),e.jsxs("select",{id:"inmuebleGarantia",name:"inmuebleGarantia",value:i.inmuebleGarantia,onChange:n,required:!0,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona"}),e.jsx("option",{value:"si",children:"Sí"}),e.jsx("option",{value:"no",children:"No"})]})]})]}),e.jsxs("div",{className:"form-buttons",style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"},children:[e.jsx("button",{type:"submit",className:"btn-ver-mas",style:{margin:"0 5px"},disabled:o,children:"Finalizar"}),e.jsx("button",{type:"button",className:"btn-ver-mas",onClick:y,style:{margin:"0 5px"},disabled:o,children:"Volver"})]})]})]})]})})]})]})})]})};if(typeof window<"u"){const s=document.createElement("style");s.innerHTML=`
    @media (max-width: 900px) {
      .sucursales-section {
        margin-top: 0px !important;
        min-height: auto !important;
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100vw !important;
      }
      .sucursales-container {
        width: 100% !important;
        max-width: 100vw !important;
        overflow-x: hidden !important;
      }
      .contacto-container {
        margin-top: 0px !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      .responsive-row {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
        box-sizing: border-box !important;
      }
      .responsive-row img {
        margin-top: 8px !important;
        margin-bottom: 24px !important;
      }
      .franquicias-bg-video {
        filter: blur(2px) !important;
      }
      .contacto-form input,
      .contacto-form select {
        font-size: 16px !important; /* Evita zoom en iOS */
      }
      .form-buttons {
        flex-direction: column !important;
        gap: 12px !important;
      }
      .form-buttons .btn-ver-mas {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
      }
      .franquicias-img {
        align-items: center !important;
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
        box-sizing: border-box !important;
      }
      .franq-text {
        margin: 0 auto !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .contacto-container.no-pattern-bg {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
        box-sizing: border-box !important;
      }
      .contacto-content {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .contacto-form-container {
        margin: 0 auto !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
    }
    @media (max-width: 480px) {
      .sucursales-section {
        padding: 0 !important;
      }
      .responsive-row {
        padding: 12px !important;
      }
      .contacto-form-container {
        padding: 16px !important;
      }
      .contacto-form label {
        font-size: 0.95rem !important;
      }
      .contacto-form input,
      .contacto-form select {
        padding: 12px !important;
        font-size: 16px !important;
      }
      .form-row {
        margin-bottom: 8px !important;
      }
      .form-group {
        margin-bottom: 12px !important;
      }
    }
  `,document.head.appendChild(s)}export{M as default};
