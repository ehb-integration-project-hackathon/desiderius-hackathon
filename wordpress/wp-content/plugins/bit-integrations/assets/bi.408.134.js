import{u as h,k as j,d as c,h as b,r as l,j as e}from"./main-390.js";import{h as I,$ as C,i as _,e as w,_ as m,j as v,I as N,s as S}from"./bi.126.82.js";import{Z as k}from"./bi.230.766.js";import{h as f,c as y}from"./bi.662.767.js";import"./bi.286.689.js";import"./bi.414.690.js";function D({allIntegURL:p}){const x=h(),{formID:g}=j(),[t,a]=c(I),[r,F]=c(C),d=b(_),[n,o]=l.useState(!1),[u,s]=l.useState({show:!1});return e.jsxs("div",{style:{width:900},children:[e.jsx(w,{snack:u,setSnackbar:s}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:m("Integration Name:","bit-integrations")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:i=>f(i,t,a),name:"name",value:t.name,type:"text",placeholder:m("Integration Name...","bit-integrations")})]}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(v,{entity:r.triggered_entity,setSnackbar:s}),e.jsx(k,{formID:g,formFields:d,handleInput:i=>f(i,t,a,o,s),zoomConf:t,setZoomConf:a,isLoading:n,setIsLoading:o,setSnackbar:s}),e.jsx(N,{edit:!0,saveConfig:()=>S({flow:r,allIntegURL:p,conf:t,navigate:x,edit:1,setIsLoading:o,setSnackbar:s}),disabled:t.field_map.length<2||n||!t.id||!y(t)||t.selectedActions==null,isLoading:n,dataConf:t,setDataConf:a,formFields:d}),e.jsx("br",{})]})}export{D as default};