import{u as h,k as j,d,h as C,r as m,j as t}from"./main-390.js";import{h as b,$ as I,i as w,e as _,k as c,j as v,I as N,s as S}from"./bi.126.82.js";import{h as k}from"./bi.10.880.js";import{C as y}from"./bi.57.881.js";function L({allIntegURL:l}){const f=h(),{formID:g}=j(),[a,s]=d(b),[n,p]=d(I),o=C(w),[i,r]=m.useState(!1),[x,e]=m.useState({show:!1});return t.jsxs("div",{style:{width:900},children:[t.jsx(_,{snack:x,setSnackbar:e}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:c("Integration Name:","bit-integrations")}),t.jsx("input",{className:"btcd-paper-inp w-5",onChange:u=>k(u,a,s),name:"name",value:a.name,type:"text",placeholder:c("Integration Name...","bit-integrations")})]}),t.jsx("br",{}),t.jsx(v,{entity:n.triggered_entity,setSnackbar:e}),t.jsx(y,{formID:g,formFields:o,campaignMonitorConf:a,setCampaignMonitorConf:s,isLoading:i,setIsLoading:r,setSnackbar:e}),t.jsx(N,{edit:!0,saveConfig:()=>S({flow:n,setFlow:p,allIntegURL:l,navigate:f,conf:a,edit:1,setIsLoading:r,setSnackbar:e}),disabled:a.field_map.length<1,isLoading:i,dataConf:a,setDataConf:s,formFields:o}),t.jsx("br",{})]})}export{L as default};
