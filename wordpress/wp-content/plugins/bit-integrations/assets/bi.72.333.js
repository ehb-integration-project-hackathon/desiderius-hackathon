var w=Object.defineProperty;var k=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var j=(a,s,n)=>s in a?w(a,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[s]=n,c=(a,s)=>{for(var n in s||(s={}))z.call(s,n)&&j(a,n,s[n]);if(k)for(var n of k(s))S.call(s,n)&&j(a,n,s[n]);return a};import{r as T,j as e}from"./main-390.js";import{_ as i,L as E,N as _}from"./bi.126.82.js";import{b as B,g as I}from"./bi.793.914.js";import{T as N,t as P}from"./bi.243.742.js";function V({formID:a,discordConf:s,setDiscordConf:n,step:b,setstep:v,isLoading:m,setIsLoading:h,setSnackbar:y,redirectLocation:F,isInfo:r}){const[l,A]=T.useState(!1),[u,p]=T.useState({accessToken:""}),{discord:t}=P,f=()=>{I(s,n,h),setTimeout(()=>{document.getElementById("btcd-settings-wrp").scrollTop=0},300),v(2)},g=o=>{const x=c({},s),d=c({},u);d[o.target.name]="",x[o.target.name]=o.target.value,p(d),n(x)},L=`
            <h4>Get Access Token few step</h4>
            <ul>
                <li>First create app.</li>
                <li>Click on OAuth2.</li>
                <li>Select <b>bot</b> from scopes.</li>
                <li>Select permissions from <b>Bot Permissions</b>.</li>
                <li>Then copy the <b>generated url</b> and paste it in the browser and hit enter.</li>
                <li>Then click on <b>Bot</b>  from left navbar and copy the <b>Access token</b>.</li>
                
            </ul>`;return e.jsxs("div",{className:"btcd-stp-page",style:{width:b===1&&900,height:b===1&&"auto"},children:[(t==null?void 0:t.youTubeLink)&&e.jsx(N,{title:t==null?void 0:t.title,youTubeLink:t==null?void 0:t.youTubeLink}),(t==null?void 0:t.docLink)&&e.jsx(N,{title:t==null?void 0:t.title,docLink:t==null?void 0:t.docLink}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:i("Integration Name:","bit-integrations")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:g,name:"name",value:s.name,type:"text",placeholder:i("Integration Name...","bit-integrations"),disabled:r}),e.jsxs("small",{className:"d-blk mt-5",children:[i("To get access Token , Please Visit","bit-integrations")," ",e.jsx("a",{className:"btcd-link",href:"https://discord.com/developers/applications",target:"_blank",rel:"noreferrer",children:i("Discord Console","bit-integrations")})]}),e.jsx("div",{className:"mt-3",children:e.jsx("b",{children:i("Access Token:","bit-integrations")})}),e.jsx("input",{className:"btcd-paper-inp w-6 mt-1",onChange:g,name:"accessToken",value:s.accessToken,type:"text",placeholder:i("Access Token...","bit-integrations"),disabled:r}),e.jsx("div",{style:{color:"red"},children:u.accessToken}),!r&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>B(s,n,p,A,h,y),className:"btn btcd-btn-lg green sh-sm flx",type:"button",disabled:l||m,children:[l?i("Authorized ✔","bit-integrations"):i("Authorize","bit-integrations"),m&&e.jsx(E,{size:"20",clr:"#022217",className:"ml-2"})]}),e.jsx("br",{}),e.jsxs("button",{onClick:f,className:"btn f-right btcd-btn-lg green sh-sm flx",type:"button",disabled:!l,children:[i("Next","bit-integrations"),e.jsx("div",{className:"btcd-icn icn-arrow_back rev-icn d-in-b"})]})]}),e.jsx(_,{note:L})]})}export{V as default};
