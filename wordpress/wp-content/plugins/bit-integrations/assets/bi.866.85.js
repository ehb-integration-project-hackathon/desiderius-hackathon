import{u as I,k as _,d as p,r as d,h as y,j as e}from"./main-390.js";import{h as v,$ as S,i as N,e as k,_ as a,j as C,I as F,s as E}from"./bi.126.82.js";import{h as u,c as L}from"./bi.300.692.js";import{Z as $}from"./bi.648.693.js";import"./bi.923.694.js";import"./bi.286.689.js";import"./bi.414.690.js";function q({allIntegURL:f}){const g=I(),{id:B,formID:l}=_(),[t,n]=p(v),[m,h]=p(S),[c,o]=d.useState(!1),[x,s]=d.useState({show:!1}),[i,j]=d.useState(0),b=y(N),w=()=>{if(!L(t)){s({show:!0,msg:a("Please map mandatory fields","bit-integrations")});return}if((t==null?void 0:t.module)==="Deals"&&!(t!=null&&t.pLayout)){s({show:!0,msg:a("Please select a layout","bit-integrations")});return}E({flow:m,setFlow:h,allIntegURL:f,conf:t,navigate:g,edit:1,setIsLoading:o,setSnackbar:s})};return e.jsxs("div",{style:{width:900},children:[e.jsx(k,{snack:x,setSnackbar:s}),e.jsxs("div",{className:"flx mt-3",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:a("Integration Name:","bit-integrations")}),e.jsx("input",{className:"btcd-paper-inp w-5",onChange:r=>u(r,i,t,n),name:"name",value:t.name,type:"text",placeholder:a("Integration Name...","bit-integrations")})]}),e.jsx("br",{}),e.jsx(C,{entity:m.triggered_entity,setSnackbar:s}),e.jsx($,{tab:i,settab:j,formID:l,handleInput:r=>u(r,i,t,n,l,o,s),isLoading:c,setIsLoading:o,setSnackbar:s}),e.jsx(F,{edit:!0,saveConfig:w,disabled:t.module===""||t.field_map.length<1,isLoading:c,dataConf:t,setDataConf:n,formFields:b}),e.jsx("br",{})]})}export{q as default};
