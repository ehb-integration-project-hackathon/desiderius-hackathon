import{u as I,k as _,d as m,r as o,h as w,j as t}from"./main-390.js";import{$ as C,h as P,i as v,e as y,_ as r,j as F,I as N,X as l,s as k}from"./bi.126.82.js";import{h as p,c as g}from"./bi.681.902.js";import{S as E}from"./bi.727.903.js";function M({allIntegURL:u}){const x=I();_();const[n,L]=m(C),[e,a]=m(P),[d,c]=o.useState(!1),[h,j]=o.useState({}),[S,s]=o.useState({show:!1}),f=w(v),b=()=>{if(!g(e)){s({show:!0,msg:r("Please map mandatory fields","bit-integrations")});return}if(e.actionName==="opportunities"){if(!e.selectedAccount){l.error("Please select an Account");return}if(!e.selectedPipeline){l.error("Please select a Pipeline");return}if(e.selectedPipeline&&!e.selectedStage){l.error("Please select a Stage");return}}k({flow:n,allIntegURL:u,conf:e,navigate:x,edit:1,setIsLoading:c,setSnackbar:s})};return t.jsxs("div",{style:{width:900},children:[t.jsx(y,{snack:S,setSnackbar:s}),t.jsxs("div",{className:"flx mt-3",children:[t.jsx("b",{className:"wdt-200 d-in-b",children:r("Integration Name:","bit-integrations")}),t.jsx("input",{className:"btcd-paper-inp w-5",onChange:i=>p(i,e,a),name:"name",value:e.name,type:"text",placeholder:r("Integration Name...","bit-integrations")})]}),t.jsx("br",{}),t.jsx(F,{entity:n.triggered_entity,setSnackbar:s}),t.jsx(E,{formID:n.triggered_entity_id,formFields:f,handleInput:i=>p(i,e,a),salesflareConf:e,setSalesflareConf:a,loading:h,setLoading:j,isLoading:d,setIsLoading:c,setSnackbar:s}),t.jsx(N,{edit:!0,saveConfig:b,disabled:!g(e),isLoading:d,dataConf:e,setDataConf:a,formFields:f}),t.jsx("br",{})]})}export{M as default};
