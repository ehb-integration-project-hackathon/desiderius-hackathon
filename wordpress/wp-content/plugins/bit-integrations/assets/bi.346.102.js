import{u as g,k as j,d as a,h as p,r as i,j as s}from"./main-390.js";import{h as u,$ as h,i as k,e as F,j as b,s as v}from"./bi.126.82.js";import S from"./bi.843.243.js";import{W as _}from"./bi.58.725.js";import"./bi.217.726.js";function y({allIntegURL:n}){const r=g(),{id:C,formID:c}=j(),[t,d]=a(u),[e,l]=a(h),m=p(k),[f,o]=i.useState({show:!1}),[x,w]=i.useState(!1);return s.jsxs("div",{style:{width:900},children:[s.jsx(F,{snack:f,setSnackbar:o}),s.jsx(b,{entity:e.triggered_entity,setSnackbar:o}),s.jsx("div",{className:"mt-3",children:s.jsx(S,{formID:c,formFields:m,webHooks:t,setWebHooks:d,setSnackbar:o})}),s.jsx(_,{edit:!0,saveConfig:()=>v({flow:e,setFlow:l,allIntegURL:n,conf:t,navigate:r,edit:1,setIsLoading:w,setSnackbar:o}),isLoading:x}),s.jsx("br",{})]})}export{y as default};