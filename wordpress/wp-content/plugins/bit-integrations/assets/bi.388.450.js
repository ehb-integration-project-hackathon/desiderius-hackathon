var w=Object.defineProperty;var v=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var j=(a,t,s)=>t in a?w(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s,N=(a,t)=>{for(var s in t||(t={}))I.call(t,s)&&j(a,s,t[s]);if(v)for(var s of v(t))C.call(t,s)&&j(a,s,t[s]);return a};import{u as F,r as o,j as i}from"./main-390.js";import{e as E,_ as L,I as P,G as T,d as c}from"./bi.126.82.js";import{S as M}from"./bi.348.918.js";import R from"./bi.33.318.js";import{c as _}from"./bi.683.884.js";import{S as z}from"./bi.649.885.js";import"./bi.243.742.js";function Q({formFields:a,setFlow:t,flow:s,allIntegURL:p}){const u=F(),[g,d]=o.useState(!1),[f,h]=o.useState({}),[n,x]=o.useState(1),[k,l]=o.useState({show:!1}),[e,m]=o.useState({name:"SuiteDash",type:"SuiteDash",public_id:"",secret_key:"",field_map:[{formField:"",suiteDashFormField:""}],actionName:"",suiteDashFields:[],actions:{}}),y=()=>{d(!0),T(s,t,p,e,u,"","",d).then(r=>{var b;r.success?(c.success((b=r.data)==null?void 0:b.msg),u(p)):c.error(r.data||r)})},D=S=>{if(setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),!_(e)){c.error("Please map mandatory fields");return}if(!e.selectedRole){c.error("Please select a Role");return}e.field_map.length>0&&x(S)};return i.jsxs("div",{children:[i.jsx(E,{snack:k,setSnackbar:l}),i.jsx("div",{className:"txt-center mt-2",children:i.jsx(M,{step:3,active:n})}),i.jsx(R,{suiteDashConf:e,setSuiteDashConf:m,step:n,setStep:x,loading:f,setLoading:h,setSnackbar:l}),i.jsxs("div",{className:"btcd-stp-page",style:N({},n===2&&{width:900,height:"auto",overflow:"visible"}),children:[i.jsx(z,{formFields:a,suiteDashConf:e,setSuiteDashConf:m,loading:f,setLoading:h,isLoading:g,setIsLoading:d,setSnackbar:l}),(e==null?void 0:e.actionName)&&i.jsxs("button",{onClick:()=>D(3),disabled:!_(e),className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",children:[L("Next","bit-integrations")," "," ",i.jsx("div",{className:"btcd-icn icn-arrow_back rev-icn d-in-b"})]})]}),(e==null?void 0:e.actionName)&&i.jsx(P,{step:n,saveConfig:()=>y(),isLoading:g,dataConf:e,setDataConf:m,formFields:a})]})}export{Q as default};
