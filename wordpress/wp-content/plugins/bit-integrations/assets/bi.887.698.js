var f=Object.defineProperty;var y=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var _=(i,r,s)=>r in i?f(i,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[r]=s,p=(i,r)=>{for(var s in r||(r={}))k.call(r,s)&&_(i,s,r[s]);if(y)for(var s of y(r))w.call(r,s)&&_(i,s,r[s]);return i};import{h as R,j as e,L as z}from"./main-390.js";import{l as M,_ as a,m as T,n as V,T as E}from"./bi.126.82.js";import{r as L,a as S}from"./bi.968.697.js";import{T as Z}from"./bi.286.689.js";const $=(i,r,s)=>{const t=p({},r);t.field_map.splice(i,0,{}),s(t)};function O({i,formFields:r,field:s,campaignsConf:t,setCampaignsConf:n}){var u,d,x,v,N;const m=R(M),{isPro:h}=m,o=s.zohoFormField===""||((u=t.default.fields[t.list].required)==null?void 0:u.indexOf(s.zohoFormField))===-1,j=l=>{const c=p({},t);c.field_map.length>1&&c.field_map.splice(l,1),n(c)},b=(l,c)=>{const F=p({},t);F.field_map[c][l.target.name]=l.target.value,l.target.value==="custom"&&(F.field_map[c].customValue=""),n(F)};return e.jsxs("div",{className:`flx flx-around mt-2 ${o&&"mr-1"}`,children:[e.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:s.formField||"",onChange:l=>b(l,i),children:[e.jsx("option",{value:"",children:a("Select Field","bit-integrations")}),e.jsx("optgroup",{label:"Form Fields",children:r.map(l=>l.type!=="file"&&e.jsx("option",{value:l.name,children:l.label},`ff-zhcrm-${l.name}`))}),e.jsx("option",{value:"custom",children:a("Custom...","bit-integrations")}),e.jsx("optgroup",{label:`General Smart Codes ${h?"":"(PRO)"}`,children:h&&((d=T)==null?void 0:d.map(l=>e.jsx("option",{value:l.name,children:l.label},`ff-rm-${l.name}`)))})]}),s.formField==="custom"&&e.jsx(Z,{onChange:l=>V(l,i,t,n),label:a("Custom Value","bit-integrations"),className:"mr-2",type:"text",value:s.customValue,placeholder:a("Custom Value","bit-integrations"),formFields:r}),e.jsxs("select",{className:"btcd-paper-inp",name:"zohoFormField",value:s.zohoFormField||"",disabled:!o,onChange:l=>b(l,i),children:[e.jsx("option",{value:"",children:a("Select Field","bit-integrations")}),o?((N=(v=(x=t==null?void 0:t.default)==null?void 0:x.fields)==null?void 0:v[t.list])==null?void 0:N.fields)&&t.default.fields[t.list].fields.map(l=>l!=="Contact Email"&&e.jsx("option",{value:l,children:l},`${l}-1`)):e.jsx("option",{value:"Contact Email",children:a("Contact Email","bit-integrations")},"contact_email")]}),e.jsx("button",{onClick:()=>$(i,t,n),className:`icn-btn sh-sm ml-2 ${!o&&"mr-8"}`,type:"button",children:"+"}),o&&e.jsx("button",{onClick:()=>j(i),className:"icn-btn sh-sm ml-1",type:"button","aria-label":"btn",children:e.jsx(E,{})})]})}function B({formID:i,formFields:r,handleInput:s,campaignsConf:t,setCampaignsConf:n,isLoading:m,setIsLoading:h,setSnackbar:o}){var j,b,u;return e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("b",{className:"wdt-100 d-in-b",children:a("List:","bit-integrations")}),e.jsxs("select",{onChange:d=>s(d),name:"list",value:t.list,className:"btcd-paper-inp w-7",children:[e.jsx("option",{value:"",children:a("Select List","bit-integrations")}),((j=t==null?void 0:t.default)==null?void 0:j.lists)&&Object.values(t.default.lists).map(d=>e.jsx("option",{value:d.listkey,children:d.listname},d.listkey))]}),e.jsx("button",{onClick:()=>L(i,t,n,h,o),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${a("Refresh Campaigns Lists","bit-integrations")}'`},type:"button",disabled:m,children:"↻"}),e.jsx("br",{}),e.jsx("br",{}),m&&e.jsx(z,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),t.list&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mt-4",children:[e.jsx("b",{className:"wdt-100",children:a("Map Fields","bit-integrations")}),e.jsx("button",{onClick:()=>S(i,t,n,h,o),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${a("Refresh Campaigns Contact Fields","bit-integrations")}'`},type:"button",disabled:m,children:"↻"})]}),e.jsx("div",{className:"btcd-hr mt-1"}),((u=(b=t.default)==null?void 0:b.fields)==null?void 0:u[t.list])&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flx flx-around mt-2 mb-2 btcbi-field-map-label",children:[e.jsx("div",{className:"txt-dp",children:e.jsx("b",{children:a("Form Fields","bit-integrations")})}),e.jsx("div",{className:"txt-dp",children:e.jsx("b",{children:a("Zoho Fields","bit-integrations")})})]}),t.field_map.map((d,x)=>e.jsx(O,{i:x,field:d,campaignsConf:t,formFields:r,setCampaignsConf:n},`campaigns-m-${x+9}`)),e.jsx("div",{className:"txt-center btcbi-field-map-button mt-2",children:e.jsx("button",{onClick:()=>$(t.field_map.length,t,n),className:"icn-btn sh-sm",type:"button",children:"+"})})]})]})]})}export{B as Z};