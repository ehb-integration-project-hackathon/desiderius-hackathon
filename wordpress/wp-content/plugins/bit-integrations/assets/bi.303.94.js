import{u as j,k as C,d as m,r as c,h as I,j as t}from"./main-390.js";import{h as b,$ as _,i as w,e as v,_ as p,j as S,I as N,s as y}from"./bi.126.82.js";import{h as f}from"./bi.288.714.js";import{M as k}from"./bi.769.715.js";import"./bi.645.716.js";import"./bi.286.689.js";import"./bi.414.690.js";function P({allIntegURL:h}){const x=j(),{id:E,formID:o}=C(),[e,a]=m(b),[r,g]=m(_),[d,n]=c.useState(!1),[u,s]=c.useState({show:!1}),l=I(w);return t.jsxs("div",{style:{width:900},children:[t.jsx(v,{snack:u,setSnackbar:s}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:p("Integration Name:","bit-integrations")}),t.jsx("input",{className:"btcd-paper-inp w-5",onChange:i=>f(i,e,a),name:"name",value:e.name,type:"text",placeholder:p("Integration Name...","bit-integrations")})]}),t.jsx("br",{}),t.jsx(S,{entity:r.triggered_entity,setSnackbar:s}),t.jsx(k,{formID:o,formFields:l,handleInput:i=>f(i,e,a,o,n,s),sheetConf:e,setSheetConf:a,isLoading:d,setIsLoading:n,setSnackbar:s}),t.jsx(N,{edit:!0,saveConfig:()=>y({flow:r,setFlow:g,allIntegURL:h,conf:e,navigate:x,edit:1,setIsLoading:n,setSnackbar:s}),disabled:e.listId===""||e.field_map.length<1,isLoading:d,dataConf:e,setDataConf:a,formFields:l}),t.jsx("br",{})]})}export{P as default};