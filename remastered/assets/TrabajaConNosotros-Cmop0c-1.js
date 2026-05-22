import{q as n,_ as F,x as L,k as e,c as b}from"./index-DKLXAvOK.js";import{S as x,s as A}from"./sweetalert2.esm.all-BM_Um9Ba.js";const B=["Ballester","Balvanera","Barrancas de Belgrano","Belgrano","Bella Vista","Caballito","Cañitas","Campana","Del Viso","Devoto","Don Torcuato","Escobar","Floresta","Florida","Gral. Pacheco","Hurlingham","Ituzaingó","José C. Paz","Los Polvorines","Martínez","Maschwitz","Mataderos","Merlo","Moreno","Muñiz","Munro","Palermo","Paternal","Pilar Centro","Pilar Cruce Derqui","Puerto Madero","San Fernando","San Martín","San Miguel","Tigre","Tortugas Norte","Vicente Lopez","Villa Adelina","Villa Crespo","Villa Urquiza"],q=()=>{n.useEffect(()=>{F(()=>import("./scrollreveal.es-B1uBQqQp.js"),[]).then(a=>{const r=a.default?a.default:a;r().reveal(".trabaja-titulo-img",{distance:"30px",duration:1600,origin:"top",opacity:0,reset:!0}),r().reveal(".trabaja-img",{distance:"30px",duration:1600,origin:"left",opacity:0,reset:!0}),r().reveal(".contacto-form-container",{distance:"30px",duration:1600,origin:"right",opacity:0,reset:!0})})},[]);const[o,s]=n.useState({nombre:"",edad:"",localidad:"",apellido:"",telefono:"",email:"",puesto:"",area:"",sucursal:"",cv:null}),[j,d]=n.useState(!1),[g,m]=n.useState(!1),[D,p]=n.useState(null),[t,u]=n.useState({nombre:"",edad:"",localidad:"",apellido:"",telefono:"",email:"",puesto:"",cv:"",area:"",sucursal:""}),w=["Adrogué","Almirante Brown","Avellaneda","Bahía Blanca","Balcarce","Baradero","Berazategui","Berisso","Bolívar","Bragado","Campana","Cañuelas","Capitán Sarmiento","Carlos Casares","Carlos Tejedor","Carmen de Areco","Castelli","Chacabuco","Chascomús","Chivilcoy","Colón","Coronel Dorrego","Coronel Pringles","Coronel Suárez","Daireaux","Dolores","Ensenada","Escobar","Esteban Echeverría","Exaltación de la Cruz","Ezeiza","Florencio Varela","Florentino Ameghino","General Alvarado","General Alvear","General Arenales","General Belgrano","General Guido","General Juan Madariaga","General La Madrid","General Las Heras","General Lavalle","General Paz","General Pinto","General Pueyrredón","General Rodríguez","General San Martín","General Viamonte","General Villegas","Guaminí","Hipólito Yrigoyen","Hurlingham","Ituzaingó","José C. Paz","Junín","La Matanza","La Plata","Lanús","Laprida","Las Flores","Leandro N. Alem","Lincoln","Lobería","Lobos","Lomas de Zamora","Luján","Magdalena","Maipú","Malvinas Argentinas","Mar Chiquita","Marcos Paz","Mercedes","Merlo","Monte","Monte Hermoso","Moreno","Morón","Navarro","Necochea","Olavarría","Patagones","Pehuajó","Pellegrini","Pergamino","Pila","Pilar","Pinamar","Presidente Perón","Puán","Punta Indio","Quilmes","Ramallo","Rauch","Rivadavia","Rojas","Roque Pérez","Saavedra","Saladillo","Salliqueló","Salto","San Andrés de Giles","San Antonio de Areco","San Cayetano","San Fernando","San Isidro","San Miguel","San Nicolás","San Pedro","San Vicente","Suipacha","Tandil","Tapalqué","Tigre","Tordillo","Tornquist","Trenque Lauquen","Tres Arroyos","Tres de Febrero","Tres Lomas","Vicente López","Villa Gesell","Villarino","Zárate"],[y,v]=n.useState(!1),C=n.useRef(null),c=n.useRef(null);n.useEffect(()=>()=>{c.current&&clearTimeout(c.current)},[]);const N=()=>{const a={};return o.nombre.trim()||(a.nombre="El nombre es obligatorio."),o.edad.trim()?(!/^\d+$/.test(o.edad)||parseInt(o.edad)<16||parseInt(o.edad)>99)&&(a.edad="Ingrese una edad válida (16-99)."):a.edad="La edad es obligatoria.",o.localidad.trim()||(a.localidad="La localidad es obligatoria."),o.apellido.trim()||(a.apellido="El apellido es obligatorio."),o.telefono.trim()?/^[\d\s\-\+\(\)]+$/.test(o.telefono)||(a.telefono="El formato del teléfono no es válido."):a.telefono="El teléfono es obligatorio.",o.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)||(a.email="El formato del email no es válido."):a.email="El email es obligatorio.",o.puesto.trim()||(a.puesto="El puesto es obligatorio."),o.cv||(a.cv="El CV es obligatorio."),o.puesto==="fabrica"&&!o.area.trim()&&(a.area="El área es obligatoria."),o.puesto==="sucursales"&&!o.sucursal.trim()&&(a.sucursal="La sucursal es obligatoria."),u(a),Object.keys(a).length===0},l=a=>{const{name:r,value:M}=a.target;s(f=>({...f,[r]:M})),u(f=>({...f,[r]:""}))},S=a=>{if(a.target.files&&a.target.files[0]){const r=a.target.files[0];s({...o,cv:r})}else s({...o,cv:null})},h=a=>{a.preventDefault(),a.stopPropagation(),a.type==="dragenter"||a.type==="dragover"?d(!0):a.type==="dragleave"&&d(!1)},z=a=>{if(a.preventDefault(),a.stopPropagation(),d(!1),a.dataTransfer.files&&a.dataTransfer.files[0]){const r=a.dataTransfer.files[0];s({...o,cv:r})}},T=()=>{s({...o,cv:null});const a=document.getElementById("cv-upload");a&&(a.value="")},P=async a=>{if(a.preventDefault(),!!N()){if(m(!0),p(null),!o.cv){p("Por favor, adjunta tu CV."),x.fire({icon:"warning",title:"CV Requerido",text:"Por favor, adjunta tu CV para completar la postulación.",confirmButtonColor:"#d4af37"}),m(!1);return}try{await A("trabaja-con-nosotros",o),x.fire({icon:"success",title:"¡Éxito!",text:"Tu postulación ha sido enviada correctamente.",confirmButtonColor:"#d4af37"}),s({nombre:"",edad:"",localidad:"",apellido:"",telefono:"",email:"",puesto:"",area:"",sucursal:"",cv:null}),u({nombre:"",edad:"",localidad:"",apellido:"",telefono:"",email:"",puesto:"",cv:"",area:"",sucursal:""})}catch{p("Hubo un error al enviar la postulación. Intenta nuevamente."),x.fire({icon:"error",title:"Error",text:"Hubo un error al enviar la postulación. Intenta nuevamente.",confirmButtonColor:"#d4af37"})}finally{m(!1)}}},E=()=>{v(!0),c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{v(!1)},900)},i=L();return e.jsxs("div",{className:"sucursales-section",style:{marginTop:"0px",position:"relative",overflow:"hidden"},children:[e.jsxs("div",{style:{position:"absolute",inset:0,zIndex:0,overflow:"hidden"},children:[e.jsx("video",{ref:C,className:"trabaja-bg-video",src:b("/images/trabaja_con_nosotros/trabajaVideo.mp4"),autoPlay:!0,muted:!0,loop:!0,playsInline:!0,onEnded:E,style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",inset:0,backgroundColor:"rgba(0,0,0,0.35)",opacity:y?1:0,transition:"opacity 1.6s ease"}})]}),e.jsx("div",{className:"sucursales-container",style:{position:"relative",zIndex:2},children:e.jsx("div",{className:"responsive-row",style:{display:"flex",flexDirection:i?"column":"row",width:"100vw",minHeight:"100vh",alignItems:i?"center":"flex-start",justifyContent:i?"center":"flex-end",padding:"20px 20px 40px",boxSizing:"border-box"},children:e.jsx("div",{className:"contacto-container no-pattern-bg",style:{width:i?"100%":"45vw",maxWidth:"600px",display:"flex",justifyContent:"flex-end",marginTop:i?"8px":"16px",marginLeft:i?0:"auto",marginRight:i?0:"5vw",padding:0,background:"transparent",boxShadow:"none"},children:e.jsx("div",{className:"contacto-content",style:{width:"100%",marginTop:0,display:"flex",flexDirection:"column",alignItems:i?"center":"flex-start"},children:e.jsxs("div",{className:"contacto-form-container",style:{background:"rgba(30, 30, 30, 0.75)",backdropFilter:"blur(6px)"},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",width:"100%"},children:e.jsx("img",{src:b("/images/trabaja_con_nosotros/Trabaja con nosotros titulo.png"),alt:"Título Trabaja con nosotros",className:"trabaja-titulo-img",style:{width:i?"95%":"85%",maxWidth:"580px",marginTop:i?"0px":"-10px",marginBottom:"28px",opacity:1}})}),e.jsx("p",{style:{textAlign:"center"},children:"Completa el siguiente formulario si estás interesado en formar parte de nuestro equipo."}),e.jsxs("form",{className:"contacto-form",onSubmit:P,children:[e.jsx("style",{children:`
                    .contacto-form .select-match-input {
                      padding: 15px !important;
                      border: 1px solid rgba(255, 255, 255, 0.2) !important;
                      border-radius: 5px !important;
                      font-size: 1rem !important;
                      background-color: rgba(255, 255, 255, 0.1) !important;
                      color: #f8f9fa !important;
                      transition: all 0.3s ease !important;
                      appearance: none !important;
                      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e") !important;
                      background-repeat: no-repeat !important;
                      background-position: right 1.5rem center !important;
                      background-size: 1.5rem !important;
                      cursor: pointer !important;
                      width: 100% !important;
                      min-width: 300px !important;
                      box-sizing: border-box !important;
                    }
                    @media (max-width: 768px) {
                      .contacto-form .select-match-input {
                        min-width: 100% !important;
                        width: 100% !important;
                        max-width: 100% !important;
                      }
                      .form-row {
                        flex-direction: column !important;
                        gap: 0 !important;
                      }
                      .form-group.half-width {
                        width: 100% !important;
                        min-width: 100% !important;
                        max-width: 100% !important;
                      }
                    }
                    .contacto-form .select-match-input:focus {
                      outline: none !important;
                      border-color: #ffc107 !important;
                      box-shadow: 0 0 12px rgba(255, 193, 7, 0.6) !important;
                      background-color: rgba(255, 255, 255, 0.2) !important;
                    }
                    .contacto-form .select-match-input option[value=''] {
                      color: rgba(248, 249, 250, 0.6) !important;
                    }
                    .contacto-form .select-match-input option {
                      white-space: nowrap !important;
                      overflow: hidden !important;
                      text-overflow: ellipsis !important;
                      max-width: 100%;
                    }
                    .contacto-form .select-match-input option:hover {
                      white-space: normal !important;
                      overflow: visible !important;
                    }
                    .contacto-form .select-match-input option,
                    .contacto-form .select-match-input option:checked,
                    .contacto-form .select-match-input option:focus,
                    .contacto-form .select-match-input option:hover {
                      color: #f8f9fa !important;
                      background-color: #1a1a1a !important;
                    }
                  `}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"nombre",children:["Nombre: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"text",id:"nombre",name:"nombre",value:o.nombre,onChange:l,placeholder:"Ingrese su nombre",className:"contacto-form input"}),t.nombre&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.nombre})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"apellido",children:["Apellido: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"text",id:"apellido",name:"apellido",value:o.apellido,onChange:l,placeholder:"Ingrese su apellido",className:"contacto-form input"}),t.apellido&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.apellido})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"edad",children:["Edad: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"number",id:"edad",name:"edad",value:o.edad,onChange:l,placeholder:"Ingrese su edad",min:"16",max:"99",className:"contacto-form input"}),t.edad&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.edad})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"localidad",children:["Localidad: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("select",{id:"localidad",name:"localidad",value:o.localidad,onChange:l,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona una localidad"}),w.map((a,r)=>e.jsx("option",{value:a,children:a},r))]}),t.localidad&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.localidad})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"telefono",children:["Teléfono: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"tel",id:"telefono",name:"telefono",value:o.telefono,onChange:l,placeholder:"+54 9 11 1234-5678",className:"contacto-form input"}),t.telefono&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.telefono})]}),e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"email",children:["E-mail: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsx("input",{type:"email",id:"email",name:"email",value:o.email,onChange:l,placeholder:"ejemplo@correo.com",className:"contacto-form input"}),t.email&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.email})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"puesto",children:["Puesto: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("select",{id:"puesto",name:"puesto",value:o.puesto,onChange:l,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona un puesto"}),e.jsx("option",{value:"fabrica",children:"Fábrica"}),e.jsx("option",{value:"sucursales",children:"Sucursales"})]}),t.puesto&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.puesto})]}),o.puesto==="fabrica"&&e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"area",children:["Área: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("select",{id:"area",name:"area",value:o.area,onChange:l,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona un área"}),e.jsx("option",{value:"administracion",children:"Administración"}),e.jsx("option",{value:"produccion",children:"Producción"}),e.jsx("option",{value:"logistica",children:"Logística"})]}),t.area&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.area})]}),o.puesto==="sucursales"&&e.jsxs("div",{className:"form-group half-width",children:[e.jsxs("label",{htmlFor:"sucursal",children:["Sucursal: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("select",{id:"sucursal",name:"sucursal",value:o.sucursal,onChange:l,className:"contacto-form select select-match-input",children:[e.jsx("option",{value:"",children:"Selecciona una sucursal"}),B.map((a,r)=>e.jsx("option",{value:a,children:a},r))]}),t.sucursal&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.sucursal})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"cv-upload",children:["Adjuntar CV: ",e.jsx("span",{className:"required",children:"*"})]}),e.jsxs("div",{className:`file-drop-zone ${j?"dragging":""} ${o.cv?"has-file":""}`,onDragEnter:h,onDragLeave:h,onDragOver:h,onDrop:z,onClick:()=>{var a;return(a=document.getElementById("cv-upload"))==null?void 0:a.click()},children:[e.jsx("input",{type:"file",id:"cv-upload",name:"cv",accept:".pdf,.doc,.jpg",onChange:S,style:{display:"none"}}),t.cv&&e.jsx("div",{style:{color:"red",fontSize:"0.95rem",marginTop:4},children:t.cv}),o.cv?e.jsxs("div",{className:"file-drop-content has-file",children:[e.jsx("p",{children:o.cv.name}),e.jsx("button",{type:"button",className:"remove-file",onClick:T,children:"×"})]}):e.jsxs("div",{className:"file-drop-content",children:[e.jsx("i",{className:"fas fa-cloud-upload-alt"}),e.jsx("p",{children:"Arrastra y suelta tu CV aquí o haz clic para seleccionar"}),e.jsx("p",{className:"file-types",children:"(PDF, DOC, JPG)"})]})]})]}),e.jsx("button",{type:"submit",className:"btn-ver-mas",disabled:g,children:g?"Enviando...":"Postularse"})]})]})})})})})]})};if(typeof window<"u"){const o=document.createElement("style");o.innerHTML=`
    @media (max-width: 900px) {
      .sucursales-section {
        margin-top: 0px !important;
      }
      .contacto-container {
        margin-top: 16px !important;
        width: 100% !important;
        padding: 0 !important;
      }
      .responsive-row {
        flex-direction: column !important;
        padding: 20px !important;
      }
      .trabaja-titulo-img {
        margin-top: 0px !important;
        margin-bottom: 20px !important;
        width: 90% !important;
        max-width: 340px !important;
      }
    }
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column !important;
        gap: 0 !important;
      }
      .form-group.half-width {
        width: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
        margin-bottom: 14px !important;
      }
      .contacto-form .select-match-input {
        min-width: 100% !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .contacto-form input,
      .contacto-form select {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        font-size: 16px !important;
      }
      .contacto-form-container {
        padding: 20px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
    }
    @media (max-width: 480px) {
      .form-group.half-width {
        width: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
      }
      .contacto-form-container {
        padding: 16px !important;
      }
      .contacto-form input,
      .contacto-form select {
        padding: 12px !important;
      }
    }
  `,document.head.appendChild(o)}export{q as default};
