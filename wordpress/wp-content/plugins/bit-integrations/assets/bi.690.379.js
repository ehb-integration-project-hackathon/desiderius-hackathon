var j=Object.defineProperty;var f=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var u=(e,t,s)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,h=(e,t)=>{for(var s in t||(t={}))v.call(t,s)&&u(e,s,t[s]);if(f)for(var s of f(t))I.call(t,s)&&u(e,s,t[s]);return e};import{u as _,k as C,r as l,j as a}from"./main-390.js";import{e as y,_ as N,I as w,s as L}from"./bi.126.82.js";import{S as T}from"./bi.348.918.js";import B from"./bi.827.252.js";import{h as E}from"./bi.464.746.js";import{S as A}from"./bi.864.745.js";import{B as D}from"./bi.217.726.js";import"./bi.243.742.js";/* empty css          */function O({formFields:e,setFlow:t,flow:s,allIntegURL:x}){const g=_(),{formID:S}=C(),[m,d]=l.useState(!1),[o,p]=l.useState(1),[k,i]=l.useState({show:!1}),[n,c]=l.useState({name:"Slack",type:"Slack",parse_mode:"HTML",field_map:[{formField:"",slackFormField:""}],channel_id:"",body:"",actions:{}}),b=r=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),r===3&&n.name!==""&&n.channel_id&&p(r)};return a.jsxs("div",{children:[a.jsx(y,{snack:k,setSnackbar:i}),a.jsx("div",{className:"txt-center mt-2",children:a.jsx(T,{step:3,active:o})}),a.jsx(B,{formID:S,slackConf:n,setSlackConf:c,step:o,setstep:p,isLoading:m,setIsLoading:d,setSnackbar:i}),a.jsxs("div",{className:"btcd-stp-page",style:h({},o===2&&{width:900,height:"auto",overflow:"visible"}),children:[a.jsx(A,{formFields:e,handleInput:r=>E(r,n,c),slackConf:n,setSlackConf:c,isLoading:m,setIsLoading:d,setSnackbar:i}),a.jsxs("button",{onClick:()=>b(3),disabled:n.channel_id==="",className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",children:[N("Next","bit-integrations"),a.jsx(D,{className:"ml-1 rev-icn"})]})]}),a.jsx(w,{step:o,saveConfig:()=>L({flow:s,setFlow:t,allIntegURL:x,conf:n,navigate:g,setIsLoading:d,setSnackbar:i}),isLoading:m,dataConf:n,setDataConf:c,formFields:e})]})}export{O as default};
