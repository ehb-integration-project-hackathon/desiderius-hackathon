import{r as l,j as e}from"./main-390.js";import{B as N}from"./bi.217.726.js";import{_ as a,L as k,c as y,A as v}from"./bi.126.82.js";import{g as w}from"./bi.638.786.js";import{T as r,t as z}from"./bi.243.742.js";function R({formID:A,restrictConf:n,setRestrictConf:c,step:m,setStep:h,setSnackbar:g}){const[i,b]=l.useState(!1),[u,o]=l.useState(!1),[x,p]=l.useState(!1),{restrictContent:t}=z,f=()=>{o("auth"),y({},"restrict_authorize").then(s=>{s!=null&&s.success&&(b(!0),g({show:!0,msg:a("Connected with Restrict Content Successfully","bit-integrations")})),o(!1),p(!0)})},j=s=>{const d=v(n);d[s.target.name]=s.target.value,c(d)},L=()=>{w(n,c,o),h(2)};return e.jsxs("div",{className:"btcd-stp-page",style:{width:m===1&&900,height:m===1&&"auto"},children:[(t==null?void 0:t.youTubeLink)&&e.jsx(r,{title:t==null?void 0:t.title,youTubeLink:t==null?void 0:t.youTubeLink}),(t==null?void 0:t.docLink)&&e.jsx(r,{title:t==null?void 0:t.title,docLink:t==null?void 0:t.docLink}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:a("Integration Name:","bit-integrations")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:j,name:"name",value:n.name,type:"text",placeholder:a("Integration Name...","bit-integrations")}),u==="auth"&&e.jsxs("div",{className:"flx mt-5",children:[e.jsx(k,{size:25,clr:"#022217",className:"mr-2"}),"Checking if restrict content is active!!!"]}),x&&!i&&!u&&e.jsxs("div",{className:"flx mt-5",style:{color:"red"},children:[e.jsx("span",{className:"btcd-icn mr-2",style:{fontSize:30,marginTop:-5},children:"×"}),"RestrictContent plugin must be activated to integrate with Bit Integrations."]}),!i&&e.jsx("button",{onClick:f,className:"btn btcd-btn-lg green sh-sm flx mt-5",type:"button",children:a("Connect","bit-integrations")}),i&&e.jsxs("button",{onClick:()=>L(),className:"btn btcd-btn-lg green sh-sm flx mt-5",type:"button",disabled:!i,children:[a("Next","bit-integrations"),e.jsx(N,{className:"ml-1 rev-icn"})]})]})}export{R as default};
