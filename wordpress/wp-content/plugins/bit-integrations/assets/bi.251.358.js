import{u as j,k as S,r as o,j as e}from"./main-390.js";import{e as v,G as T}from"./bi.126.82.js";import{S as k}from"./bi.348.918.js";import P from"./bi.843.243.js";import{W as w}from"./bi.58.725.js";import{T as i,t as H}from"./bi.243.742.js";import"./bi.217.726.js";function D({formFields:c,setFlow:n,flow:m,allIntegURL:u}){const d=j(),{formID:l}=S(),[s,x]=o.useState(1),[h,a]=o.useState({show:!1}),[f,g]=o.useState(!1),{pabblyLinks:t}=H,[r,p]=o.useState({name:"Pabbly Web Hooks",type:"Pabbly",method:"POST",url:"",apiConsole:"https://connect.pabbly.com/dashboard"});return e.jsxs("div",{children:[e.jsx(v,{snack:h,setSnackbar:a}),e.jsx("div",{className:"txt-center mt-2",children:e.jsx(k,{step:2,active:s})}),e.jsxs("div",{className:"btcd-stp-page",style:{width:s===1&&1100,height:s===1&&"auto"},children:[(t==null?void 0:t.youTubeLink)&&e.jsx(i,{title:t==null?void 0:t.title,youTubeLink:t==null?void 0:t.youTubeLink}),(t==null?void 0:t.docLink)&&e.jsx(i,{title:t==null?void 0:t.title,docLink:t==null?void 0:t.docLink}),e.jsx(P,{formID:l,formFields:c,webHooks:r,setWebHooks:p,step:s,setStep:x,setSnackbar:a,create:!0})]}),e.jsx("div",{className:"btcd-stp-page",style:{width:s===2&&"100%",height:s===2&&"auto"},children:e.jsx(w,{step:s,saveConfig:()=>T(m,n,u,r,d,"","",g),isLoading:f})})]})}export{D as default};
