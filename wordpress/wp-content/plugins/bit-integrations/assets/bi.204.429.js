var W=Object.defineProperty;var u=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var f=(a,e,t)=>e in a?W(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,b=(a,e)=>{for(var t in e||(e={}))_.call(e,t)&&f(a,t,e[t]);if(u)for(var t of u(e))G.call(e,t)&&f(a,t,e[t]);return a};import{u as I,k as q,r as c,j as s}from"./main-390.js";import{e as w,_ as v,I as A,s as F}from"./bi.126.82.js";import{S as P}from"./bi.348.918.js";import{G as E,h as L,c as T}from"./bi.38.846.js";import D from"./bi.642.298.js";import"./bi.286.689.js";import"./bi.414.690.js";import"./bi.217.726.js";import"./bi.243.742.js";function X({formFields:a,setFlow:e,flow:t,allIntegURL:p,isInfo:g,edit:h}){const x=I(),{formID:k}=q(),[r,m]=c.useState(!1),[o,d]=c.useState(1),[y,n]=c.useState({show:!1}),j=[{key:"1",label:"Create a donar"}],S=[{key:"email",label:"Email",required:!0},{key:"name",label:"Name",required:!1},{key:"first_name",label:"First Name",required:!1},{key:"last_name",label:"Last Name",required:!1},{key:"purchase_value",label:"Purchase Value",required:!1},{key:"purchase_count",label:"Purchase Count",required:!1}],[i,l]=c.useState({name:"GiveWp",type:"GiveWp",mainAction:"",field_map:[{formField:"",giveWpFormField:""}],allActions:j,giveWpFields:S,actions:{}}),C=()=>{if(setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),!T(i)){n({show:!0,msg:v("Please map mandatory fields","bit-integrations")});return}i.mainAction!==""&&d(3)};return s.jsxs("div",{children:[s.jsx(w,{snack:y,setSnackbar:n}),s.jsx("div",{className:"txt-center mt-2",children:s.jsx(P,{step:3,active:o})}),s.jsx(D,{formID:k,giveWpConf:i,setGiveWpConf:l,step:o,setStep:d,isLoading:r,setIsLoading:m,setSnackbar:n}),s.jsxs("div",{className:"btcd-stp-page",style:b({},o===2&&{width:900,height:"auto",overflow:"visible"}),children:[s.jsx(E,{formFields:a,handleInput:N=>L(N,i,l),giveWpConf:i,setGiveWpConf:l,isLoading:r,setIsLoading:m,setSnackbar:n,allIntegURL:p,isInfo:g,edit:h}),s.jsxs("button",{onClick:()=>C(),disabled:!i.mainAction||r,className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",children:[v("Next","bit-integrations")," ",s.jsx("div",{className:"btcd-icn icn-arrow_back rev-icn d-in-b"})]})]}),s.jsx(A,{step:o,saveConfig:()=>F({flow:t,setFlow:e,allIntegURL:p,navigate:x,conf:i,setIsLoading:m,setSnackbar:n}),isLoading:r,dataConf:i,setDataConf:l,formFields:a})]})}export{X as default};