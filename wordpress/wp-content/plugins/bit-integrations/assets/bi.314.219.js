import{k as u,r as i,d as a,h as j,j as s}from"./main-390.js";import{$ as k,i as p,h as g,e as w,D as b,E as h,s as F}from"./bi.126.82.js";import W from"./bi.843.243.js";import{W as E}from"./bi.58.725.js";import"./bi.217.726.js";function $({allIntegURL:n}){const{formID:r}=u(),[c,o]=i.useState({show:!1}),[d,m]=i.useState(!1),[e,f]=a(k),l=j(p),[t,x]=a(g);return s.jsxs("div",{style:{width:900},children:[s.jsx(w,{snack:c,setSnackbar:o}),e.triggered_entity!=="Webhook"?s.jsx(b,{setSnackbar:o}):s.jsx(h,{setSnackbar:o}),s.jsx("div",{className:"mt-3",children:s.jsx(W,{formID:r,formFields:l,webHooks:t,setWebHooks:x,setSnackbar:o})}),s.jsx(E,{edit:!0,saveConfig:()=>F({flow:e,setFlow:f,allIntegURL:n,conf:t,edit:1,setIsLoading:m,setSnackbar:o}),isLoading:d}),s.jsx("br",{})]})}export{$ as default};