import{u as k,k as j,r as n,j as e}from"./main-390.js";import{e as I,_ as p,I as M,G as S}from"./bi.126.82.js";import{B as Z}from"./bi.217.726.js";import{S as v}from"./bi.348.918.js";import H from"./bi.545.235.js";import{s as N,h as _,c as w,r as y}from"./bi.132.707.js";import{Z as C}from"./bi.39.708.js";import"./bi.243.742.js";import"./bi.286.689.js";import"./bi.414.690.js";function D({formFields:f,setFlow:g,flow:u,allIntegURL:d}){const h=k(),{formID:r}=j(),[c,o]=n.useState(!1),[i,l]=n.useState(1),[b,s]=n.useState({show:!1}),[t,m]=n.useState({name:"Zoho Marketing Automation(Zoho Marketing Hub)",type:"Zoho Marketing Automation(Zoho Marketing Hub)",clientId:"",clientSecret:"",list:"",field_map:[{formField:"",zohoFormField:""}]});n.useEffect(()=>{window.opener&&N()},[]);const x=a=>{if(a===3){if(!w(t)){s({show:!0,msg:p("Please map mandatory fields","bit-integrations")});return}t.list!==""&&t.table!==""&&t.field_map.length>0&&l(a)}else l(a),a===2&&!t.list&&y(r,t,m,o,s)};return e.jsxs("div",{children:[e.jsx(I,{snack:b,setSnackbar:s}),e.jsx("div",{className:"txt-center mt-2",children:e.jsx(v,{step:3,active:i})}),e.jsx(H,{formID:r,marketingHubConf:t,setMarketingHubConf:m,step:i,setstep:l,isLoading:c,setIsLoading:o,setSnackbar:s}),e.jsxs("div",{className:"btcd-stp-page",style:{width:i===2&&900,height:i===2&&"auto"},children:[e.jsx(C,{formID:r,formFields:f,handleInput:a=>_(a,r,t,m,o,s),marketingHubConf:t,setMarketingHubConf:m,isLoading:c,setIsLoading:o,setSnackbar:s}),e.jsxs("button",{onClick:()=>x(3),disabled:t.list===""||t.table===""||t.field_map.length<1,className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",children:[p("Next","bit-integrations"),e.jsx(Z,{className:"ml-1 rev-icn"})]})]}),e.jsx(M,{step:i,saveConfig:()=>S(u,g,d,t,h,"","",o),isLoading:c})]})}export{D as default};
