import{u as S,d as f,r as o,h as b,j as e}from"./main-390.js";import{$ as I,h as _,i as w,e as C,_ as r,j as v,I as y,s as F}from"./bi.126.82.js";import{h as c,c as m}from"./bi.313.825.js";import{S as N}from"./bi.361.826.js";import"./bi.286.689.js";import"./bi.414.690.js";function A({allIntegURL:g}){const p=S(),[n,k]=f(I),[t,a]=f(_),[u,E]=o.useState(!1),[x,d]=o.useState({list:!1,field:!1,auth:!1,tags:!1}),[h,s]=o.useState({show:!1}),l=b(w),j=()=>{if(!m(t)){s({show:!0,msg:r("Please map mandatory fields","bit-integrations")});return}F({flow:n,allIntegURL:g,conf:t,navigate:p,edit:1,setLoading:d,setSnackbar:s})};return e.jsxs("div",{style:{width:900},children:[e.jsx(C,{snack:h,setSnackbar:s}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:r("Integration Name:","bit-integrations")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:i=>c(i,t,a),name:"name",value:t.name,type:"text",placeholder:r("Integration Name...","bit-integrations")})]}),e.jsx("br",{}),e.jsx(v,{entity:n.triggered_entity,setSnackbar:s}),e.jsx(N,{formID:n.triggered_entity_id,formFields:l,handleInput:i=>c(i,t,a),sendGridConf:t,setSendGridConf:a,loading:x,setLoading:d,setSnackbar:s}),e.jsx(y,{edit:!0,saveConfig:j,disabled:!m(t),isLoading:u,dataConf:t,setDataConf:a,formFields:l}),e.jsx("br",{})]})}export{A as default};
