var T=Object.defineProperty;var y=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var j=(i,n,a)=>n in i?T(i,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[n]=a,A=(i,n)=>{for(var a in n||(n={}))I.call(n,a)&&j(i,a,n[a]);if(y)for(var a of y(n))G.call(n,a)&&j(i,a,n[a]);return i};import{r as m,j as t,u as L,k as R,h as _}from"./main-390.js";import{_ as d,L as z,c as P,A as B,l as D,e as F,I as E,s as M}from"./bi.126.82.js";import{S as q}from"./bi.348.918.js";import{G as H,h as $}from"./bi.520.794.js";import{B as J}from"./bi.217.726.js";import{T as N,t as K}from"./bi.243.742.js";import"./bi.286.689.js";import"./bi.414.690.js";function O({formID:i,gamiPressConf:n,setGamiPressConf:a,step:u,setStep:v,isLoading:b,setIsLoading:p,setSnackbar:k}){const[o,h]=m.useState(!1),[r,f]=m.useState(!1),{gamiPress:s}=K,l=()=>{p("auth"),P({},"gamiPress_authorize").then(c=>{c!=null&&c.success&&(h(!0),k({show:!0,msg:d("Connected with GamiPress Successfully","bit-integrations")})),p(!1),f(!0)})},g=c=>{const e=B(n);e[c.target.name]=c.target.value,a(e)};return t.jsxs("div",{className:"btcd-stp-page",style:{width:u===1&&900,height:u===1&&"auto"},children:[(s==null?void 0:s.youTubeLink)&&t.jsx(N,{title:s==null?void 0:s.title,youTubeLink:s==null?void 0:s.youTubeLink}),(s==null?void 0:s.docLink)&&t.jsx(N,{title:s==null?void 0:s.title,docLink:s==null?void 0:s.docLink}),t.jsx("div",{className:"mt-3",children:t.jsx("b",{children:d("Integration Name:","bit-integrations")})}),t.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:g,name:"name",value:n.name,type:"text",placeholder:d("Integration Name...","bit-integrations")}),b==="auth"&&t.jsxs("div",{className:"flx mt-5",children:[t.jsx(z,{size:25,clr:"#022217",className:"mr-2"}),"Checking if GamiPress is active!!!"]}),r&&!o&&!b&&t.jsxs("div",{className:"flx mt-5",style:{color:"red"},children:[t.jsx("span",{className:"btcd-icn mr-2",style:{fontSize:30,marginTop:-5},children:"×"}),"GamiPress plugin must be activated to integrate with Bit Integrations."]}),!o&&t.jsx("button",{onClick:l,className:"btn btcd-btn-lg green sh-sm flx mt-5",type:"button",children:d("Connect","bit-integrations")}),o&&t.jsxs("button",{onClick:()=>v(2),className:"btn btcd-btn-lg green sh-sm flx mt-5",type:"button",disabled:!o,children:[d("Next","bit-integrations"),t.jsx(J,{className:"ml-1 rev-icn"})]})]})}function se({formFields:i,setFlow:n,flow:a,allIntegURL:u,isInfo:v,edit:b}){const p=L(),{formID:k}=R();_(D);const[o,h]=m.useState(!1),[r,f]=m.useState(1),[s,l]=m.useState({show:!1}),g=[{key:"1",label:"Award rank to the user"},{key:"2",label:"Award an achievement to the user"},{key:"3",label:"Award a points to the user"},{key:"4",label:"Revoke a rank form the user"},{key:"5",label:"Revoke an achievement form the user"},{key:"6",label:"Revoke points from the user"}],c=[{key:"point",label:"Point",required:!0}],[e,x]=m.useState({name:"GamiPress",type:"GamiPress",mainAction:"",field_map:[{formField:"",gamiPressFormField:""}],pointFields:c,allActions:g,actions:{}}),w=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),e.mainAction!==""&&f(3)};function S(){switch(e.mainAction){case"1":return e.selectedRank===void 0||e.selectedRank==="";case"2":return e.selectedAchievement===void 0||e.selectedAchievement==="";case"3":return e.selectedPointType===void 0||e.selectedPointType==="";case"4":return e.selectedRank===void 0||e.selectedRank==="";case"5":return e.selectedAchievement===void 0||e.selectedAchievement==="";case"6":return e.selectedPointType===void 0||e.selectedPointType==="";default:return!1}}return t.jsxs("div",{children:[t.jsx(F,{snack:s,setSnackbar:l}),t.jsx("div",{className:"txt-center mt-2",children:t.jsx(q,{step:3,active:r})}),t.jsx(O,{formID:k,gamiPressConf:e,setGamiPressConf:x,step:r,setStep:f,isLoading:o,setIsLoading:h,setSnackbar:l}),t.jsxs("div",{className:"btcd-stp-page",style:A({},r===2&&{width:900,height:"auto",overflow:"visible"}),children:[t.jsx(H,{formFields:i,handleInput:C=>$(C,e,x),gamiPressConf:e,setGamiPressConf:x,isLoading:o,setIsLoading:h,setSnackbar:l,allIntegURL:u,isInfo:v,edit:b}),t.jsxs("button",{onClick:()=>w(),disabled:!e.mainAction||o||S(),className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",children:[d("Next","bit-integrations")," ",t.jsx("div",{className:"btcd-icn icn-arrow_back rev-icn d-in-b"})]})]}),t.jsx(E,{step:r,saveConfig:()=>M({flow:a,setFlow:n,allIntegURL:u,navigate:p,conf:e,setIsLoading:h,setSnackbar:l}),isLoading:o,dataConf:e,setDataConf:x,formFields:i})]})}export{se as default};
