import{u as j,k as I,d as c,r as f,h as k,j as e}from"./main-390.js";import{h as w,$ as C,i as _,e as v,_ as r,j as y,I as N,s as S}from"./bi.126.82.js";import{h as g,c as F}from"./bi.132.707.js";import{Z as M}from"./bi.39.708.js";import"./bi.286.689.js";import"./bi.414.690.js";function P({allIntegURL:p}){const u=j(),{id:E,formID:n}=I(),[t,a]=c(w),[d,h]=c(C),[l,i]=f.useState(!1),[x,s]=f.useState({show:!1}),m=k(_),b=()=>{if(!F(t)){s({show:!0,msg:r("Please map mandatory fields","bit-integrations")});return}S({flow:d,setFlow:h,allIntegURL:p,conf:t,navigate:u,edit:1,setIsLoading:i,setSnackbar:s})};return e.jsxs("div",{style:{width:900},children:[e.jsx(v,{snack:x,setSnackbar:s}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:r("Integration Name:","bit-integrations")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:o=>g(o,n,t,a),name:"name",value:t.name,type:"text",placeholder:r("Integration Name...","bit-integrations")})]}),e.jsx("br",{}),e.jsx(y,{entity:d.triggered_entity,setSnackbar:s}),e.jsx(M,{formID:n,formFields:m,handleInput:o=>g(o,n,t,a,i,s),marketingHubConf:t,setMarketingHubConf:a,isLoading:l,setIsLoading:i,setSnackbar:s}),e.jsx(N,{edit:!0,saveConfig:b,disabled:t.list===""||t.table===""||t.field_map.length<1,isLoading:l,dataConf:t,setDataConf:a,formFields:m})]})}export{P as default};
