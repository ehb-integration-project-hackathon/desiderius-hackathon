var E=Object.defineProperty;var y=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var N=(r,i,s)=>i in r?E(r,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[i]=s,b=(r,i)=>{for(var s in i||(i={}))S.call(i,s)&&N(r,s,i[s]);if(y)for(var s of y(i))I.call(i,s)&&N(r,s,i[s]);return r};import{r as v,h as R,j as t}from"./main-390.js";import{l as _,_ as n,Y as w,L as B}from"./bi.126.82.js";import{B as $}from"./bi.217.726.js";import{b as D,r as F}from"./bi.868.762.js";import{T as z,t as O}from"./bi.243.742.js";function q({formID:r,keapConf:i,setKeapConf:s,step:h,setstep:T,isLoading:x,setIsLoading:u,setSnackbar:a,redirectLocation:L,isInfo:l}){const[c,f]=v.useState(!1),[d,g]=v.useState({clientId:"",clientSecret:""}),A=R(_),{keap:e}=O,o=m=>{const j=b({},i),p=b({},d);p[m.target.name]="",j[m.target.name]=m.target.value,g(p),s(j)},C=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),F(i,s,u,a),T(2)};return t.jsxs("div",{className:"btcd-stp-page",style:{width:h===1&&900,height:h===1&&"auto"},children:[(e==null?void 0:e.youTubeLink)&&t.jsx(z,{title:e==null?void 0:e.title,youTubeLink:e==null?void 0:e.youTubeLink}),(e==null?void 0:e.docLink)&&t.jsx(z,{title:e==null?void 0:e.title,docLink:e==null?void 0:e.docLink}),t.jsx("div",{className:"mt-3",children:t.jsx("b",{children:n("Integration Name:","bit-integrations")})}),t.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:o,name:"name",value:i.name,type:"text",placeholder:n("Integration Name...","bit-integrations"),disabled:l}),t.jsx("div",{className:"mt-3",children:t.jsx("b",{children:n("Homepage URL:","bit-integrations")})}),t.jsx(w,{value:`${window.location.origin}`,className:"field-key-cpy w-6 ml-0",readOnly:l,setSnackbar:a}),t.jsx("div",{className:"mt-3",children:t.jsx("b",{children:n("Authorized Redirect URIs:","bit-integrations")})}),t.jsx(w,{value:L||`${A.api.base}/redirect`,className:"field-key-cpy w-6 ml-0",readOnly:l,setSnackbar:a}),t.jsxs("small",{className:"d-blk mt-5",children:[n("To get Client ID and SECRET , Please Visit","bit-integrations")," ",t.jsx("a",{className:"btcd-link",href:"https://keys.developer.keap.com/my-apps",target:"_blank",rel:"noreferrer",children:n("Get Keap client id and secret","bit-integrations")})]}),t.jsx("div",{className:"mt-3",children:t.jsx("b",{children:n("Client id:","bit-integrations")})}),t.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:o,name:"clientId",value:i.clientId,type:"text",placeholder:n("Client id...","bit-integrations"),disabled:l}),t.jsx("div",{style:{color:"red",fontSize:"15px"},children:d.clientId}),t.jsx("div",{className:"mt-3",children:t.jsx("b",{children:n("Client secret:","bit-integrations")})}),t.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:o,name:"clientSecret",value:i.clientSecret,type:"text",placeholder:n("Client secret...","bit-integrations"),disabled:l}),t.jsx("div",{style:{color:"red",fontSize:"15px"},children:d.clientSecret}),!l&&t.jsxs(t.Fragment,{children:[t.jsxs("button",{onClick:()=>D(i,s,g,f,u,a),className:"btn btcd-btn-lg green sh-sm flx",type:"button",disabled:c||x,children:[c?n("Authorized ✔","bit-integrations"):n("Authorize","bit-integrations"),x&&t.jsx(B,{size:20,clr:"#022217",className:"ml-2"})]}),t.jsx("br",{}),t.jsxs("button",{onClick:()=>C(),className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",disabled:!c,children:[n("Next","bit-integrations"),t.jsx($,{className:"ml-1 rev-icn"})]})]})]})}export{q as default};