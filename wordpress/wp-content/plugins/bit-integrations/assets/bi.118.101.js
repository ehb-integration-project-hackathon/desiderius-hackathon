import{u as j,k as p,d as a,h as u,r as i,j as s}from"./main-390.js";import{h as k,$ as w,i as b,e as h,j as v,s as S}from"./bi.126.82.js";import H from"./bi.843.243.js";import{W}from"./bi.58.725.js";import"./bi.217.726.js";function y({allIntegURL:n}){const r=j(),{id:_,formID:c}=p(),[t,d]=a(k),[e,m]=a(w),f=u(b),[l,o]=i.useState({show:!1}),[x,g]=i.useState(!1);return s.jsxs("div",{style:{width:900},children:[s.jsx(h,{snack:l,setSnackbar:o}),s.jsx(v,{entity:e.triggered_entity,setSnackbar:o}),s.jsx("div",{className:"mt-3",children:s.jsx(H,{formID:c,formFields:f,webHooks:t,setWebHooks:d,setSnackbar:o})}),s.jsx(W,{edit:!0,saveConfig:()=>S({flow:e,setFlow:m,allIntegURL:n,conf:t,navigate:r,edit:1,setIsLoading:g,setSnackbar:o}),isLoading:x}),s.jsx("br",{})]})}export{y as default};
