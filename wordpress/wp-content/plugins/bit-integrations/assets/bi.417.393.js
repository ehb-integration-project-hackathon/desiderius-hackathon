var _=Object.defineProperty;var u=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var b=(s,e,t)=>e in s?_(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,f=(s,e)=>{for(var t in e||(e={}))C.call(e,t)&&b(s,t,e[t]);if(u)for(var t of u(e))I.call(e,t)&&b(s,t,e[t]);return s};import{u as N,k as L,r as d,j as a}from"./main-390.js";import{e as q,_ as w,I as E,s as A}from"./bi.126.82.js";import{S as D}from"./bi.348.918.js";import T from"./bi.59.265.js";import{h as P,i as U}from"./bi.955.778.js";import{S as z}from"./bi.992.779.js";import"./bi.217.726.js";import"./bi.243.742.js";import"./bi.286.689.js";import"./bi.414.690.js";function X({formFields:s,setFlow:e,flow:t,allIntegURL:p}){const x=N(),{formID:F}=L(),[c,n]=d.useState(!1),[o,m]=d.useState(1),[g,r]=d.useState({show:!1}),S=[{key:"1",label:"Create List"},{key:"2",label:"Create Contact"},{key:"3",label:"Unsubscribe Contact"}],h=[{key:"email",label:"Email",required:!0},{key:"first_name",label:"First Name",required:!1},{key:"last_name",label:"Last Name",required:!1}],k=[{key:"name",label:"Name",required:!0}],y=[{key:"email",label:"Email",required:!0}],[i,l]=d.useState({name:"SendFox",type:"SendFox",listId:"",access_token:"",field_map:[{formField:"",sendFoxFormField:""}],field_map_list:[{formField:"",sendFoxListFormField:""}],field_map_unsubscribe:[{formField:"",sendFoxUnsubscribeFormField:""}],allActions:S,contactFields:h,unsubscribeFields:y,listFields:k,actions:{}}),j=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),m(3)};return a.jsxs("div",{children:[a.jsx(q,{snack:g,setSnackbar:r}),a.jsx("div",{className:"txt-center mt-2",children:a.jsx(D,{step:3,active:o})}),a.jsx(T,{formID:F,sendFoxConf:i,setSendFoxConf:l,step:o,setstep:m,isLoading:c,setIsLoading:n,setSnackbar:r}),a.jsxs("div",{className:"btcd-stp-page",style:f({},o===2&&{width:900,height:"auto",overflow:"visible"}),children:[a.jsx(z,{formFields:s,handleInput:v=>P(v,i,l,n),sendFoxConf:i,setSendFoxConf:l,isLoading:c,setIsLoading:n,setSnackbar:r}),a.jsxs("button",{onClick:()=>j(),className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",disabled:U(i),children:[w("Next","bit-integrations")," "," ",a.jsx("div",{className:"btcd-icn icn-arrow_back rev-icn d-in-b"})]})]}),a.jsx(E,{step:o,saveConfig:()=>A({flow:t,setFlow:e,allIntegURL:p,navigate:x,conf:i,setIsLoading:n,setSnackbar:r}),isLoading:c,dataConf:i,setDataConf:l,formFields:s})]})}export{X as default};
