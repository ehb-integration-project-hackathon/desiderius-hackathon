import{k as x,r,d as i,h as u,j as s}from"./main-390.js";import{$ as j,i as k,h as p,e as b,D as h,E as w,s as S}from"./bi.126.82.js";import E from"./bi.843.243.js";import{W}from"./bi.58.725.js";import"./bi.217.726.js";function T({allIntegURL:a}){const{formID:n}=x(),[c,e]=r.useState({show:!1}),[d,m]=r.useState(!1),[o,f]=i(j),g=u(k),[t,l]=i(p);return s.jsxs("div",{style:{width:900},children:[s.jsx(b,{snack:c,setSnackbar:e}),o.triggered_entity!=="Webhook"?s.jsx(h,{setSnackbar:e}):s.jsx(w,{setSnackbar:e}),s.jsx("div",{className:"mt-3",children:s.jsx(E,{formID:n,formFields:g,webHooks:t,setWebHooks:l,setSnackbar:e})}),s.jsx(W,{edit:!0,saveConfig:()=>S({flow:o,setFlow:f,allIntegURL:a,conf:t,edit:1,setIsLoading:m,setSnackbar:e}),isLoading:d}),s.jsx("br",{})]})}export{T as default};