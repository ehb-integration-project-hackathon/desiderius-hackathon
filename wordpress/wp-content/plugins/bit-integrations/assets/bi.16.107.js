import{u as h,d,h as j,r as l,j as e}from"./main-390.js";import{h as _,$ as b,i as w,e as C,_ as c,j as I,I as v,s as y}from"./bi.126.82.js";import{h as N,A as S,c as A}from"./bi.503.735.js";import"./bi.286.689.js";import"./bi.414.690.js";function R({allIntegURL:m}){const f=h(),[t,a]=d(_),[n,p]=d(b),i=j(w),[o,r]=l.useState(!1),[u,s]=l.useState({show:!1}),g=()=>{if(!A(t)){s({show:!0,msg:"Please map all required fields to continue."});return}y({flow:n,setFlow:p,allIntegURL:m,conf:t,navigate:f,edit:1,setIsLoading:r,setSnackbar:s})};return e.jsxs("div",{style:{width:900},children:[e.jsx(C,{snack:u,setSnackbar:s}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:c("Integration Name:","bit-integrations")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:x=>N(x,t,a),name:"name",value:t.name,type:"text",placeholder:c("Integration Name...","bit-integrations")})]}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(I,{entity:n.triggered_entity,setSnackbar:s}),e.jsx(S,{formID:n.triggered_entity_id,formFields:i,autonamiConf:t,setAutonamiConf:a,isLoading:o,step:2,setIsLoading:r,setSnackbar:s}),e.jsx(v,{edit:!0,saveConfig:g,disabled:t.field_map.length<1,isLoading:o,dataConf:t,setDataConf:a,formFields:i}),e.jsx("br",{})]})}export{R as default};