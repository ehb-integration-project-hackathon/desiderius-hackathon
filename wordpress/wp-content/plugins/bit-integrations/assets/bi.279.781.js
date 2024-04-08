var V=Object.defineProperty;var N=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var F=(e,a,t)=>a in e?V(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t,p=(e,a)=>{for(var t in a||(a={}))M.call(a,t)&&F(e,t,a[t]);if(N)for(var t of N(a))R.call(a,t)&&F(e,t,a[t]);return e};import{h as G,j as s,r as v,L as A}from"./main-390.js";import{l as I,_ as i,m as $,n as O,o as _,f as w,p as y}from"./bi.126.82.js";import{g as q,a as k,m as U}from"./bi.492.780.js";import{T as f}from"./bi.286.689.js";const S=(e,a,t)=>{const l=p({},a);l.field_map.splice(e,0,{}),t(p({},l))},E=(e,a,t)=>{const l=p({},a);l.field_map.length>1&&l.field_map.splice(e,1),t(p({},l))},T=(e,a,t,l)=>{const d=p({},t);d.field_map[a][e.target.name]=e.target.value,e.target.value==="custom"&&(d.field_map[a].customValue=""),l(p({},d))};function z({i:e,formFields:a,field:t,mailerLiteConf:l,setMailerLiteConf:d}){var j,g;if(((j=l==null?void 0:l.field_map)==null?void 0:j.length)===1&&t.mailerLiteFormField===""){const n=p({},l),b=q(n);n.field_map=b}const r=(l==null?void 0:l.mailerLiteFields.filter(n=>n.required===!0))||[],h=(l==null?void 0:l.mailerLiteFields.filter(n=>n.required===!1))||[],m=G(I),{isPro:x}=m;return s.jsx("div",{className:"flx mt-2 mb-2 btcbi-field-map",children:s.jsxs("div",{className:"pos-rel flx",children:[s.jsxs("div",{className:"flx integ-fld-wrp",children:[s.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:t.formField||"",onChange:n=>T(n,e,l,d),children:[s.jsx("option",{value:"",children:i("Select Field","bit-integrations")}),s.jsx("optgroup",{label:"Form Fields",children:a==null?void 0:a.map(n=>s.jsx("option",{value:n.name,children:n.label},`ff-rm-${n.name}`))}),s.jsx("option",{value:"custom",children:i("Custom...","bit-integrations")}),s.jsx("optgroup",{label:`General Smart Codes ${x?"":"(PRO)"}`,children:x&&((g=$)==null?void 0:g.map(n=>s.jsx("option",{value:n.name,children:n.label},`ff-rm-${n.name}`)))})]}),t.formField==="custom"&&s.jsx(f,{onChange:n=>O(n,e,l,d),label:i("Custom Value","bit-integrations"),className:"mr-2",type:"text",value:t.customValue,placeholder:i("Custom Value","bit-integrations"),formFields:a}),s.jsxs("select",{className:"btcd-paper-inp",disabled:e<r.length,name:"mailerLiteFormField",value:e<r?r[e].label||"":t.mailerLiteFormField||"",onChange:n=>T(n,e,l,d),children:[s.jsx("option",{value:"",children:i("Select Field","bit-integrations")}),e<r.length?s.jsx("option",{value:r[e].key,children:r[e].label},r[e].key):h.map(({key:n,label:b})=>s.jsx("option",{value:n,children:b},n))]})]}),e>=r.length&&s.jsxs(s.Fragment,{children:[s.jsx("button",{onClick:()=>S(e,l,d),className:"icn-btn sh-sm ml-2 mr-1",type:"button",children:"+"}),s.jsx("button",{onClick:()=>E(e,l,d),className:"icn-btn sh-sm ml-1",type:"button","aria-label":"btn",children:s.jsx("span",{className:"btcd-icn icn-trash-2"})})]})]})})}function B({mailerLiteConf:e,setMailerLiteConf:a,loading:t,setLoading:l}){var g,n,b;const[d,r]=v.useState({show:!1,action:()=>{}}),h=(c,u)=>{const o=p({},e);u==="group"&&(k(e,a,t,l),c.target.checked?o.actions.group=!0:delete o.actions.group,r({show:u})),u==="mailer_lite_type"&&(c.target.checked?o.actions.mailer_lite_type=!0:delete o.actions.mailer_lite_type,r({show:u})),u==="update"&&(c.target.checked?o.actions.update=!0:delete o.actions.update),u==="double_opt_in"&&(c.target.checked?o.actions.double_opt_in=!0:delete o.actions.double_opt_in),a(p({},o))},m=()=>{r({show:!1})},x=(c,u)=>{const o=p({},e);u==="group_ids"&&c.length?(o.actions.group=!0,o.actions.update=!0):u==="group_ids"&&c.length<1&&delete o.actions.group,u==="mailer_lite_type"&&c.length?o.actions.mailer_lite_type=!0:u==="mailer_lite_type"&&c.length<1&&delete o.actions.mailer_lite_type,o[u]=c,a(p({},o))},j=[{label:"Active",value:"active"},{label:"Unsubscribed",value:"unsubscribed"},{label:"Bounced",value:"bounced"},{label:"Spam Complaints",value:"junk"},{label:"Unconfirmed",value:"unconfirmed"}];return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"pos-rel d-flx w-8",children:[s.jsx(_,{checked:(e==null?void 0:e.group_ids.length)||!1,onChange:c=>h(c,"group"),className:"wdt-200 mt-4 mr-2",value:"group",title:i("Groups","bit-integrations"),subTitle:i("Add Groups","bit-integrations")}),s.jsx(_,{checked:(e==null?void 0:e.mailer_lite_type)||!1,onChange:c=>h(c,"mailer_lite_type"),className:"wdt-200 mt-4 mr-2",value:"type",title:i("Type","bit-integrations"),subTitle:i("Add Type","bit-integrations")}),s.jsx(_,{checked:((g=e.actions)==null?void 0:g.double_opt_in)||!1,onChange:c=>h(c,"double_opt_in"),className:"wdt-200 mt-4 mr-2",value:"double_opt_in",title:i("Double Opt-in","bit-integrations"),subTitle:i("Add Double Opt-in","bit-integrations")}),s.jsx(_,{checked:((n=e.actions)==null?void 0:n.update)||!1,isInfo:e==null?void 0:e.group_ids.length,onChange:c=>h(c,"update"),className:"wdt-200 mt-4 mr-2",value:"user_share",title:i("Update Subscriber","bit-integrations"),subTitle:i("Update Responses with MailerLite exist Subscriber?","bit-integrations")})]}),s.jsxs(w,{className:"custom-conf-mdl",mainMdlCls:"o-v",btnClass:"blue",btnTxt:i("Ok","bit-integrations"),show:d.show==="group",close:m,action:m,title:i("Groups","bit-integrations"),children:[s.jsx("div",{className:"btcd-hr mt-2 mb-2"}),t.group?s.jsx(A,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:45,transform:"scale(0.5)"}}):s.jsxs("div",{className:"flx flx-between mt-2",children:[s.jsx(y,{className:"msl-wrp-options",defaultValue:e==null?void 0:e.group_ids,options:(b=e==null?void 0:e.groups)==null?void 0:b.map(c=>({label:c.name,value:c.group_id})),onChange:c=>x(c,"group_ids"),customValue:!0}),s.jsx("button",{onClick:()=>k(e,a,t,l),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`${i("Refresh Groups","bit-integrations")}'`},type:"button",disabled:t.group,children:"↻"})]})]}),s.jsxs(w,{className:"custom-conf-mdl",mainMdlCls:"o-v",btnClass:"blue",btnTxt:i("Ok","bit-integrations"),show:d.show==="mailer_lite_type",close:m,action:m,title:i("Type","bit-integrations"),children:[s.jsx("div",{className:"btcd-hr mt-2 mb-2"}),s.jsx("div",{className:"flx flx-between mt-2",children:s.jsx(y,{className:"msl-wrp-options",defaultValue:e==null?void 0:e.mailer_lite_type,options:j.map(c=>({label:c.label,value:c.value})),onChange:c=>x(c,"mailer_lite_type"),customValue:!0,singleSelect:!0})})]})]})}function Q({formFields:e,handleInput:a,mailerLiteConf:t,setMailerLiteConf:l,loading:d,setLoading:r,setSnackbar:h}){const[m,x]=v.useState({name:"",auth_token:""}),[j,g]=v.useState(!1);return s.jsxs(s.Fragment,{children:[s.jsx("br",{}),s.jsx("div",{className:"mt-5",children:s.jsxs("b",{className:"wdt-100",children:[i("Field Map","bit-integrations"),s.jsx("button",{onClick:()=>U(t,l,x,g,d,r,"refreshFields"),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":'"Refresh Fields"'},type:"button",disabled:d.field,children:"↻"})]})}),s.jsx("br",{}),d.field&&s.jsx(A,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsxs("div",{className:"flx flx-around mt-2 mb-2 btcbi-field-map-label",children:[s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:i("Form Fields","bit-integrations")})}),s.jsx("div",{className:"txt-dp",children:s.jsx("b",{children:i("MailerLite Fields","bit-integrations")})})]}),t==null?void 0:t.field_map.map((n,b)=>s.jsx(z,{i:b,field:n,mailerLiteConf:t,formFields:e,setMailerLiteConf:l,setSnackbar:h},`rp-m-${b+9}`)),s.jsx("div",{className:"txt-center btcbi-field-map-button mt-2",children:s.jsx("button",{onClick:()=>S(t.field_map.length,t,l),className:"icn-btn sh-sm",type:"button",children:"+"})}),s.jsx("br",{}),s.jsx("br",{}),s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"mt-4",children:s.jsx("b",{className:"wdt-100",children:i("Actions","bit-integrations")})}),s.jsx("div",{className:"btcd-hr mt-1"}),s.jsx(B,{mailerLiteConf:t,setMailerLiteConf:l,formFields:e,loading:d,setLoading:r})]})]})}export{Q as M};