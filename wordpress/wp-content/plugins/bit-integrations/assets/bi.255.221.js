import{u as b,k as I,d as c,r as o,h as N,j as e}from"./main-390.js";import{$ as _,h as w,i as v,e as y,_ as r,j as F,I as R,s as S}from"./bi.126.82.js";import{h as m,c as f}from"./bi.745.909.js";import{N as M}from"./bi.6.910.js";function P({allIntegURL:g}){const u=b();I();const[n,k]=c(_),[t,a]=c(w),[p,d]=o.useState(!1),[h,x]=o.useState({}),[j,s]=o.useState({show:!1}),l=N(v),C=()=>{if(!f(t)){s({show:!0,msg:r("Please map mandatory fields","bit-integrations")});return}S({flow:n,allIntegURL:g,conf:t,navigate:u,edit:1,setIsLoading:d,setSnackbar:s})};return e.jsxs("div",{style:{width:900},children:[e.jsx(y,{snack:j,setSnackbar:s}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:r("Integration Name:","bit-integrations")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:i=>m(i,t,a),name:"name",value:t.name,type:"text",placeholder:r("Integration Name...","bit-integrations")})]}),e.jsx("br",{}),e.jsx(F,{entity:n.triggered_entity,setSnackbar:s}),e.jsx(M,{formID:n.triggered_entity_id,formFields:l,handleInput:i=>m(i,t,a),nutshellCRMConf:t,setNutshellCRMConf:a,loading:h,setLoading:x,setIsLoading:d,setSnackbar:s}),e.jsx(R,{edit:!0,saveConfig:C,disabled:!f(t),isLoading:p,dataConf:t,setDataConf:a,formFields:l}),e.jsx("br",{})]})}export{P as default};
