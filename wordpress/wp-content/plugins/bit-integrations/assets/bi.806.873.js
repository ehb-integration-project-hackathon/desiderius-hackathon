var I=Object.defineProperty;var y=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var _=(i,a,l)=>a in i?I(i,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[a]=l,x=(i,a)=>{for(var l in a||(a={}))$.call(a,l)&&_(i,l,a[l]);if(y)for(var l of y(a))M.call(a,l)&&_(i,l,a[l]);return i};import{h as R,j as e,L as k}from"./main-390.js";import{l as q,k as c,m as O,J as S,T,q as D}from"./bi.126.82.js";import{r as P,a as V}from"./bi.666.872.js";function E({i,formFields:a,field:l,dripConf:s,setDripConf:d}){var p,v,N,F;const u=l.required,j=((p=s==null?void 0:s.default)==null?void 0:p.fields)&&Object.values((v=s==null?void 0:s.default)==null?void 0:v.fields).filter(t=>!t.required),g=R(q),{isPro:o}=g,m=t=>{const n=x({},s);n.field_map.splice(t,0,{}),d(n)},r=t=>{const n=x({},s);n.field_map.length>1&&n.field_map.splice(t,1),d(n)},b=(t,n)=>{const h=x({},s);h.field_map[n][t.target.name]=t.target.value,t.target.value==="custom"&&(h.field_map[n].customValue=""),d(h)},w=(t,n)=>{const h=x({},s);h.field_map[n].customValue=t.target.value,d(h)};return e.jsxs("div",{className:"flx mt-2 mb-2 btcbi-field-map",children:[e.jsxs("div",{className:"flx integ-fld-wrp",children:[e.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:l.formField||"",onChange:t=>b(t,i),children:[e.jsx("option",{value:"",children:c("Select Field","bit-integrations")}),e.jsx("optgroup",{label:"Campaign Fields",children:a==null?void 0:a.map(t=>e.jsx("option",{value:t.name,children:t.label},`ff-rm-${t.name}`))}),e.jsx("option",{value:"custom",children:c("Custom...","bit-integrations")}),e.jsx("optgroup",{label:`General Smart Codes ${o?"":"(PRO)"}`,children:o&&((N=O)==null?void 0:N.map(t=>e.jsx("option",{value:t.name,children:t.label},`ff-rm-${t.name}`)))})]}),l.formField==="custom"&&e.jsx(S,{onChange:t=>w(t,i),label:c("Custom Value","bit-integrations"),className:"mr-2",type:"text",value:l.customValue,placeholder:c("Custom Value","bit-integrations")}),e.jsxs("select",{className:"btcd-paper-inp",name:"dripField",value:l.dripField,onChange:t=>b(t,i),disabled:u,children:[e.jsx("option",{value:"",children:c("Select Field","bit-integrations")}),u?((F=s==null?void 0:s.default)==null?void 0:F.fields)&&s.default.fields.map(t=>e.jsx("option",{value:t.fieldValue,children:t.fieldName},`${t.fieldValue}`)):j&&j.map(t=>e.jsx("option",{value:t.fieldValue,children:t.fieldName},`${t.fieldValue}`))]})]}),!u&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>m(i),className:"icn-btn sh-sm ml-2",type:"button",children:"+"}),e.jsx("button",{onClick:()=>r(i),className:"icn-btn sh-sm ml-2",type:"button","aria-label":"btn",children:e.jsx(T,{})})]})]})}function A({formFields:i,dripConf:a,setDripConf:l,isLoading:s,setIsLoading:d,setSnackbar:u}){var g,o;const j=m=>{const r=m.target.value,b=x({},a);r?b.campaignId=r:delete b.campaignId,V(b,l,d,u)};return e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("b",{className:"wdt-200 d-in-b",children:c("Campaign:","bit-integrations")}),e.jsxs("select",{value:a==null?void 0:a.campaignId,name:"campaignId",id:"",className:"btcd-paper-inp w-5",onChange:j,children:[e.jsx("option",{value:"",children:c("Select Campaign","bit-integrations")}),((g=a==null?void 0:a.default)==null?void 0:g.dripCampaigns)&&Object.keys(a.default.dripCampaigns).map(m=>e.jsx("option",{value:a.default.dripCampaigns[m].campaignId,children:a.default.dripCampaigns[m].campaignName},`${m+1}`))]}),e.jsx("button",{onClick:()=>P(a,l,d,u),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":'"Refresh Drip campaign"'},type:"button",disabled:s,children:"↻"}),e.jsx("br",{}),e.jsx("br",{}),s&&e.jsx(k,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transcampaign:"scale(0.7)"}}),e.jsxs("div",{className:"mt-4",children:[e.jsx("b",{className:"wdt-100",children:c("Map Fields","bit-integrations")}),e.jsx("button",{onClick:()=>V(a,l,d,u),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${c("Refresh Drip Field","bit-integrations")}'`},type:"button",disabled:s,children:"↻"})]}),((a==null?void 0:a.campaignId)||((o=a==null?void 0:a.default)==null?void 0:o.fields))&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"btcd-hr mt-1"}),e.jsxs("div",{className:"flx flx-around mt-2 mb-2 btcbi-field-map-label",children:[e.jsx("div",{className:"txt-dp",children:e.jsx("b",{children:c("Campaign Fields","bit-integrations")})}),e.jsx("div",{className:"txt-dp",children:e.jsx("b",{children:c("Drip Fields","bit-integrations")})})]}),a.field_map.map((m,r)=>e.jsx(E,{i:r,field:m,dripConf:a,formFields:i,setDripConf:l},`Drip-m-${r+9}`)),e.jsx("div",{className:"txt-center btcbi-field-map-button mt-2",children:e.jsx("button",{onClick:()=>D(a.field_map.length,a,l),className:"icn-btn sh-sm",type:"button",children:"+"})}),e.jsx("br",{})]})]})}export{A as D};
