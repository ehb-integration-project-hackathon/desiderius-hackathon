var w=Object.defineProperty;var g=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var F=(t,e,a)=>e in t?w(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,d=(t,e)=>{for(var a in e||(e={}))y.call(e,a)&&F(t,a,e[a]);if(g)for(var a of g(e))k.call(e,a)&&F(t,a,e[a]);return t};import{j as s,h as I,r as v,L}from"./main-390.js";import{o as S,_ as n,l as $,m as A,n as E,p as V}from"./bi.126.82.js";import{g as R,m as T,a as q}from"./bi.902.823.js";import{T as z}from"./bi.286.689.js";function G({mailjetConf:t,setMailjetConf:e}){var l;const a=i=>{const r=d({},t);i.target.checked?r.actions.IsExcludedFromCampaigns=!0:delete r.actions.IsExcludedFromCampaigns,e(d({},r))};return s.jsx("div",{className:"pos-rel d-flx w-8",children:s.jsx(S,{checked:((l=t.actions)==null?void 0:l.IsExcludedFromCampaigns)||!1,onChange:i=>a(i),className:"wdt-200 mt-4 mr-2",value:"update_subscriber",title:n("Is excluded from campaigns","bit-integrations"),subTitle:n("Indicates whether the contact is added to the exclusion list for campaigns or not. An excluded contact will not be receiving any marketing emails.","bit-integrations")})})}const _=(t,e,a)=>{const l=d({},e);l.field_map.splice(t,0,{}),a(d({},l))},P=(t,e,a)=>{const l=d({},e);l.field_map.length>1&&l.field_map.splice(t,1),a(d({},l))},N=(t,e,a,l)=>{const i=d({},a);i.field_map[e][t.target.name]=t.target.value,t.target.value==="custom"&&(i.field_map[e].customValue=""),l(d({},i))};function B({i:t,formFields:e,field:a,mailjetConf:l,setMailjetConf:i}){var m,u,p;const r=(l==null?void 0:l.staticFields.filter(c=>c.required===!0))||[],x=((m=l==null?void 0:l.customFields)==null?void 0:m.filter(c=>c.required===!1))||[];if(((u=l==null?void 0:l.field_map)==null?void 0:u.length)===1&&a.mailjetFormField===""){const c=d({},l),o=R(c);c.field_map=o,i(c)}const b=I($),{isPro:h}=b;return s.jsx("div",{className:"flx mt-2 mb-2 btcbi-field-map",children:s.jsxs("div",{className:"pos-rel flx",children:[s.jsxs("div",{className:"flx integ-fld-wrp",children:[s.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:a.formField||"",onChange:c=>N(c,t,l,i),children:[s.jsx("option",{value:"",children:n("Select Field","bit-integrations")}),s.jsx("optgroup",{label:"Form Fields",children:e==null?void 0:e.map(c=>s.jsx("option",{value:c.name,children:c.label},`ff-rm-${c.name}`))}),s.jsx("option",{value:"custom",children:n("Custom...","bit-integrations")}),s.jsx("optgroup",{label:`General Smart Codes ${h?"":"(PRO)"}`,children:h&&((p=A)==null?void 0:p.map(c=>s.jsx("option",{value:c.name,children:c.label},`ff-rm-${c.name}`)))})]}),a.formField==="custom"&&s.jsx(z,{onChange:c=>E(c,t,l,i),label:n("Custom Value","bit-integrations"),className:"mr-2",type:"text",value:a.customValue,placeholder:n("Custom Value","bit-integrations"),formFields:e}),s.jsxs("select",{className:"btcd-paper-inp",disabled:t<r.length,name:"mailjetFormField",value:t<r?r[t].label||"":a.mailjetFormField||"",onChange:c=>N(c,t,l,i),children:[s.jsx("option",{value:"",children:n("Select Field","bit-integrations")}),t<r.length?s.jsx("option",{value:r[t].key,children:r[t].label},r[t].key):x.map(({key:c,label:o})=>s.jsx("option",{value:c,children:o},c))]})]}),t>=r.length&&s.jsxs(s.Fragment,{children:[s.jsx("button",{onClick:()=>_(t,l,i),className:"icn-btn sh-sm ml-2 mr-1",type:"button",children:"+"}),s.jsx("button",{onClick:()=>P(t,l,i),className:"icn-btn sh-sm ml-1",type:"button","aria-label":"btn",children:s.jsx("span",{className:"btcd-icn icn-trash-2"})})]})]})})}function K({formFields:t,mailjetConf:e,setMailjetConf:a,loading:l,setLoading:i,setSnackbar:r}){var p;const[x,b]=v.useState({name:"",auth_token:""}),[h,m]=v.useState(!1),u=c=>{const o=d({},e);o.selectedLists=c,a(d({},o))};return s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsxs("div",{className:"flx mt-2",children:[s.jsx("b",{className:"wdt-200 d-in-b",children:n("Select Lists:","bit-integrations")}),s.jsx(V,{options:(p=e==null?void 0:e.lists)==null?void 0:p.map(c=>({label:c.name,value:c.id})),className:"msl-wrp-options",defaultValue:e==null?void 0:e.selectedLists,onChange:c=>u(c)}),s.jsx("button",{onClick:()=>T(e,a,b,m,l,i,"refreshLists"),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`${n("Refresh Groups","bit-integrations")}'`},type:"button",children:"↻"})]}),l.lists&&s.jsx(L,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),s.jsxs("div",{children:[s.jsx("br",{}),s.jsx("div",{className:"mt-5",children:s.jsxs("b",{className:"wdt-100",children:[n("Field Map","bit-integrations"),s.jsx("button",{onClick:()=>q(e,a,i),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${n("Refresh custom fields","bit-integrations")}'`},type:"button",disabled:l.customFields,children:"↻"})]})}),s.jsx("br",{}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsxs("div",{className:"flx flx-around mt-2 mb-2 btcbi-field-map-label",children:[s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:n("Form Fields","bit-integrations")})}),s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:n("Mailjet Fields","bit-integrations")})})]}),(e==null?void 0:e.selectedLists)&&(e==null?void 0:e.field_map.map((c,o)=>s.jsx(B,{i:o,field:c,mailjetConf:e,formFields:t,setMailjetConf:a,setSnackbar:r},`rp-m-${o+9}`))),(e==null?void 0:e.selectedLists)&&s.jsxs("div",{children:[s.jsx("div",{className:"txt-center btcbi-field-map-button mt-2",children:s.jsx("button",{onClick:()=>_(e.field_map.length,e,a),className:"icn-btn sh-sm",type:"button",children:"+"})}),s.jsx("br",{}),s.jsx("br",{}),s.jsx("div",{className:"mt-4",children:s.jsx("b",{className:"wdt-100",children:n("Actions","bit-integrations")})}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsx(G,{mailjetConf:e,setMailjetConf:a})]})]})]})}export{K as M};