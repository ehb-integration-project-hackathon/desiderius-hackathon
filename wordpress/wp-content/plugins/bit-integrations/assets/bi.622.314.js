var E=Object.defineProperty;var j=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var A=(i,n,s)=>n in i?E(i,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[n]=s,c=(i,n)=>{for(var s in n||(n={}))K.call(n,s)&&A(i,s,n[s]);if(j)for(var s of j(n))I.call(n,s)&&A(i,s,n[s]);return i};import{r as u,j as e}from"./main-390.js";import{_ as a,L as f,N as P,c as B,X as g}from"./bi.126.82.js";import{B as F}from"./bi.217.726.js";import{r as G}from"./bi.655.876.js";import{T as N,t as $}from"./bi.243.742.js";function q({lemlistConf:i,setLemlistConf:n,step:s,setstep:z,setSnackbar:_,isInfo:h,isLoading:l,setIsLoading:m}){const[d,T]=u.useState(!1),[b,x]=u.useState({name:"",api_key:""}),[v,w]=u.useState(!1),{lemlist:t}=$,S=()=>{const o=c({},i);if(!o.name||!o.api_key){x({name:o.name?"":a("Integration name cann't be empty","bit-integrations"),api_key:o.api_key?"":a("Access Api Key cann't be empty","bit-integrations")});return}m("auth");const p={api_key:o.api_key};B(p,"lemlist_authorize").then(r=>{if(r&&r.success){const k=c({},i);k.tokenDetails=r.data,n(k),T(!0),g.success(a("Authorized Successfully","bit-integrations"))}else r&&r.data&&r.data.data||!r.success&&typeof r.data=="string"?g.error(`${a("Authorization failed Cause:","bit-integrations")}${r.data.data||r.data}. ${a("please try again","bit-integrations")}`):g.error(a("Authorization failed. please try again","bit-integrations"));w(!0),m(!1)})},y=o=>{const p=c({},i),r=c({},b);r[o.target.name]="",p[o.target.name]=o.target.value,x(r),n(p)},L=()=>{setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),G(i,n,m,_),z(2)},C=`
            <h4>Get Api key</h4>
            <ul>
                <li>First go to your Lemlist dashboard.</li>
                <li>Click on the "Team Setting" from sidebar</li>
                <li>Then Click "Integrations"</li>
                <li>Then click "Api", Then click "Generate Api Key"</li>
            </ul>`;return e.jsxs("div",{className:"btcd-stp-page",style:{width:s===1&&900,height:s===1&&"auto"},children:[(t==null?void 0:t.youTubeLink)&&e.jsx(N,{title:t==null?void 0:t.title,youTubeLink:t==null?void 0:t.youTubeLink}),(t==null?void 0:t.docLink)&&e.jsx(N,{title:t==null?void 0:t.title,docLink:t==null?void 0:t.docLink}),e.jsx("div",{className:"mt-3 wdt-200",children:e.jsx("b",{children:a("Integration Name:","bit-integrations")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:y,name:"name",value:i.name,type:"text",placeholder:a("Integration Name...","bit-integrations"),disabled:h}),e.jsx("div",{style:{color:"red",fontSize:"15px"},children:b.name}),e.jsx("div",{className:"mt-3 wdt-250",children:e.jsx("b",{children:a("Access Api Key:","bit-integrations")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:y,name:"api_key",value:i.api_key,type:"text",placeholder:a("Access Api Key...","bit-integrations"),disabled:h}),e.jsx("div",{style:{color:"red",fontSize:"15px"},children:b.api_key}),e.jsxs("small",{className:"d-blk mt-3",children:[a("To Get Api Key, Please Visit","bit-integrations")," ",e.jsx("a",{className:"btcd-link",href:"https://api.lemlist.com/teams/tea_beEpCu2irsJfn3PJr/settings/integrations#api",target:"_blank",rel:"noreferrer",children:a("Lemlist API Token","bit-integrations")})]}),e.jsx("br",{}),e.jsx("br",{}),l==="auth"&&e.jsxs("div",{className:"flx mt-5",children:[e.jsx(f,{size:25,clr:"#022217",className:"mr-2"}),"Checking Api Key!!!"]}),v&&!d&&!l&&e.jsxs("div",{className:"flx mt-5",style:{color:"red"},children:[e.jsx("span",{className:"btcd-icn mr-2",style:{fontSize:30,marginTop:-5},children:"×"}),"Sorry, Api key is invalid"]}),!h&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:S,className:"btn btcd-btn-lg green sh-sm flx",type:"button",disabled:d||l,children:[d?a("Authorized ✔","bit-integrations"):a("Authorize","bit-integrations"),l&&e.jsx(f,{size:20,clr:"#022217",className:"ml-2"})]}),e.jsx("br",{}),e.jsxs("button",{onClick:()=>L(),className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",disabled:!d,children:[a("Next","bit-integrations"),e.jsx(F,{className:"ml-1 rev-icn"})]})]}),e.jsx(P,{note:C})]})}export{q as default};
