var q=Object.defineProperty;var u=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var f=(a,t,s)=>t in a?q(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s,h=(a,t)=>{for(var s in t||(t={}))S.call(t,s)&&f(a,s,t[s]);if(u)for(var s of u(t))v.call(t,s)&&f(a,s,t[s]);return a};import{u as I,k as N,r as c,j as i}from"./main-390.js";import{e as w,_ as E,I as A,s as B}from"./bi.126.82.js";import{S as C}from"./bi.348.918.js";import{h as D,c as b,a as L}from"./bi.715.765.js";import{B as M}from"./bi.217.726.js";import P from"./bi.252.269.js";import{F as T}from"./bi.123.764.js";import"./bi.243.742.js";import"./bi.286.689.js";import"./bi.414.690.js";function X({formFields:a,setFlow:t,flow:s,allIntegURL:k}){const y=I(),{formID:x}=N(),[d,m]=c.useState(!1),[r,p]=c.useState(1),[g,o]=c.useState({show:!1}),F=[{key:"email",label:"email ",required:!0},{key:"subject",label:"subject",required:!0},{key:"description",label:"description",required:!0},{key:"name",label:"name",required:!1},{key:"phone",label:"phone ",required:!1}],_=[{key:"name",label:"Name",required:!0},{key:"email",label:"Email ",required:!0},{key:"phone",label:"Phone ",required:!1},{key:"address",label:"Address",required:!1},{key:"description",label:"Description",required:!1},{key:"job_title",label:"Job_title",required:!1}],[e,n]=c.useState({name:"Freshdesk",type:"Freshdesk",app_domain:"",api_key:"",field_map:[{formField:"",freshdeskFormField:""}],field_map_contact:[{formField:"",contactFreshdeskFormField:""}],freshdesk_id:"",ticketFields:F,contactFields:_,contactShow:"",status:"",priority:"",updateContact:"",actions:{}}),j=l=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),l===3&&e.name!==""&&p(l)};return i.jsxs("div",{children:[i.jsx(w,{snack:g,setSnackbar:o}),i.jsx("div",{className:"txt-center mt-2",children:i.jsx(C,{step:3,active:r})}),i.jsx(P,{formID:x,freshdeskConf:e,setFreshdeskConf:n,step:r,setstep:p,isLoading:d,setIsLoading:m,setSnackbar:o}),i.jsxs("div",{className:"btcd-stp-page",style:h({},r===2&&{width:900,height:"auto",overflow:"visible"}),children:[i.jsx(T,{formFields:a,handleInput:l=>D(l,e,n),freshdeskConf:e,setFreshdeskConf:n,isLoading:d,setIsLoading:m,setSnackbar:o}),b(e==null?void 0:e.field_map_contact),i.jsxs("button",{onClick:()=>j(3),disabled:!e.priority||!e.status||!b(e==null?void 0:e.field_map)||e.contactShow&&!L(e==null?void 0:e.field_map_contact),className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",children:[E("Next","bit-integrations"),i.jsx(M,{className:"ml-1 rev-icn"})]})]}),i.jsx(A,{step:r,saveConfig:()=>B({flow:s,setFlow:t,allIntegURL:k,conf:e,navigate:y,setIsLoading:m,setSnackbar:o}),isLoading:d,dataConf:e,setDataConf:n,formFields:a})]})}export{X as default};