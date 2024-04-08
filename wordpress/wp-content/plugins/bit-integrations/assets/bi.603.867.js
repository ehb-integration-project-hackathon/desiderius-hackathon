var q=Object.defineProperty;var w=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var y=(l,r,t)=>r in l?q(l,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[r]=t,b=(l,r)=>{for(var t in r||(r={}))A.call(r,t)&&y(l,t,r[t]);if(w)for(var t of w(r))K.call(r,t)&&y(l,t,r[t]);return l};import{j as e,h as I,L as u}from"./main-390.js";import{J as L,_ as i,l as P,m as E,p as v}from"./bi.126.82.js";import{g as G,a as S,b as p,d as _,e as T,f as R}from"./bi.119.866.js";const M=(l,r,t)=>{const a=b({},r);a.field_map.splice(l,0,{}),t(b({},a))},J=(l,r,t)=>{const a=b({},r);a.field_map.length>1&&a.field_map.splice(l,1),t(b({},a))},$=(l,r,t,a)=>{const d=b({},t);d.field_map[r][l.target.name]=l.target.value,l.target.value==="custom"&&(d.field_map[r].customValue=""),l.target.value==="customFieldKey"&&(d.field_map[r].customFieldKey=""),a(b({},d))},O=(l,r,t,a,d)=>{const m=b({},t);m.field_map[r][d]=l.target.value,a(b({},m))};function V({field:l,index:r,conf:t,setConf:a,fieldValue:d,fieldLabel:m,className:o}){return e.jsx(L,{onChange:g=>O(g,r,t,a,d),label:i(m,"bit-integrations"),className:o,type:"text",value:l[d],placeholder:i(m,"bit-integrations")})}function z({i:l,formFields:r,field:t,clickupConf:a,setClickupConf:d}){var F,N;let m=[];a.actionName==="task"&&(m=a==null?void 0:a.taskFields);const o=m.filter(s=>s.required===!0)||[],h=[...m.filter(s=>s.required===!1)||[],...(a==null?void 0:a.customFields)||[]];if(((F=a==null?void 0:a.field_map)==null?void 0:F.length)===1&&t.clickupFormField===""){const s=b({},a),n=G(s);s.field_map=n,d(s)}const c=I(P),{isPro:j}=c;return e.jsx("div",{className:"flx mt-2 mb-2 btcbi-field-map",children:e.jsxs("div",{className:"pos-rel flx",children:[e.jsxs("div",{className:"flx integ-fld-wrp",children:[e.jsxs("select",{className:"btcd-paper-inp mr-2",name:"formField",value:t.formField||"",onChange:s=>$(s,l,a,d),children:[e.jsx("option",{value:"",children:i("Select Field","bit-integrations")}),e.jsx("optgroup",{label:"Form Fields",children:r==null?void 0:r.map(s=>e.jsx("option",{value:s.name,children:s.label},`ff-rm-${s.name}`))}),e.jsx("option",{value:"custom",children:i("Custom...","bit-integrations")}),e.jsx("optgroup",{label:`General Smart Codes ${j?"":"(PRO)"}`,children:j&&((N=E)==null?void 0:N.map(s=>e.jsx("option",{value:s.name,children:s.label},`ff-rm-${s.name}`)))})]}),t.formField==="custom"&&e.jsx(V,{field:t,index:l,conf:a,setConf:d,fieldValue:"customValue",fieldLabel:"Custom Value",className:"mr-2"}),e.jsxs("select",{className:"btcd-paper-inp",disabled:l<o.length,name:"clickupFormField",value:l<o?o[l].label||"":t.clickupFormField||"",onChange:s=>$(s,l,a,d),children:[e.jsx("option",{value:"",children:i("Select Field","bit-integrations")}),l<o.length?e.jsx("option",{value:o[l].key,children:o[l].label},o[l].key):h.map(({key:s,label:n})=>e.jsx("option",{value:s,children:n},s)),a.actionName==="task"&&e.jsx("option",{value:"customFieldKey",children:i("Custom Field","bit-integrations")})]}),t.clickupFormField==="customFieldKey"&&e.jsx(V,{field:t,index:l,conf:a,setConf:d,fieldValue:"customFieldKey",fieldLabel:"Custom Field Key",className:"ml-2"})]}),l>=o.length&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>M(l,a,d),className:"icn-btn sh-sm ml-2 mr-1",type:"button",children:"+"}),e.jsx("button",{onClick:()=>J(l,a,d),className:"icn-btn sh-sm ml-1",type:"button","aria-label":"btn",children:e.jsx("span",{className:"btcd-icn icn-trash-2"})})]})]})})}function U({formFields:l,handleInput:r,clickupConf:t,setClickupConf:a,loading:d,setLoading:m,setSnackbar:o}){var c,j,F,N;const g=s=>{const n=b({},t);n.field_map=[{formField:"",clickupFormField:""}];const{name:x}=s.target;s.target.value!==""?(n[x]=s.target.value,s.target.value==="task"&&(n.selectedTeam!=""||n.selectedTeam!=null)&&S(n,a,m)):delete n[x],a(b({},n))},h=(s,n)=>{const x=b({},t);x[n]=s,n==="selectedList"&&s!==""&&t.actionName==="task"?R(x,a,m):n==="selectedFolder"&&s!==""&&t.actionName==="task"?T(x,a,m):n==="selectedSpace"&&s!==""&&t.actionName==="task"?_(x,a,m):n==="selectedTeam"&&s!==""&&t.actionName==="task"&&p(x,a,m),a(b({},x))};return e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("b",{className:"wdt-200 d-in-b",children:i("Select Action:","bit-integrations")}),e.jsxs("select",{onChange:g,name:"actionName",value:t.actionName,className:"btcd-paper-inp w-5",children:[e.jsx("option",{value:"",children:i("Select an action","bit-integrations")}),e.jsx("option",{value:"task",children:i("Create Task","bit-integrations")})]}),t.actionName==="task"&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{className:"flx",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:i("Select Team:","bit-integrations")}),e.jsx(v,{options:(c=t==null?void 0:t.Teams)==null?void 0:c.map(s=>({label:s.name,value:s.id})),className:"msl-wrp-options dropdown-custom-width",defaultValue:t==null?void 0:t.selectedTeam,onChange:s=>h(s,"selectedTeam"),disabled:d.Teams,singleSelect:!0}),e.jsx("button",{onClick:()=>S(t,a,m),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${i("Refresh teams","bit-integrations")}'`},type:"button",disabled:d.Teams,children:"↻"})]})]}),t.actionName==="task"&&t.selectedTeam&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{className:"flx",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:i("Select Space:","bit-integrations")}),e.jsx(v,{options:(j=t==null?void 0:t.Spaces)==null?void 0:j.map(s=>({label:s.name,value:s.id})),className:"msl-wrp-options dropdown-custom-width",defaultValue:t==null?void 0:t.selectedSpace,onChange:s=>h(s,"selectedSpace"),disabled:d.Spaces,singleSelect:!0}),e.jsx("button",{onClick:()=>p(t,a,m),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${i("Refresh spaces","bit-integrations")}'`},type:"button",disabled:d.Spaces,children:"↻"})]})]}),t.actionName==="task"&&t.selectedSpace&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{className:"flx",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:i("Select Folder:","bit-integrations")}),e.jsx(v,{options:(F=t==null?void 0:t.Folders)==null?void 0:F.map(s=>({label:s.name,value:s.id})),className:"msl-wrp-options dropdown-custom-width",defaultValue:t==null?void 0:t.selectedFolder,onChange:s=>h(s,"selectedFolder"),disabled:d.Folders,singleSelect:!0}),e.jsx("button",{onClick:()=>_(t,a,m),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${i("Refresh folders","bit-integrations")}'`},type:"button",disabled:d.Folders,children:"↻"})]})]}),t.actionName==="task"&&t.selectedFolder&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsxs("div",{className:"flx",children:[e.jsx("b",{className:"wdt-200 d-in-b",children:i("Select List:","bit-integrations")}),e.jsx(v,{options:(N=t==null?void 0:t.Lists)==null?void 0:N.map(s=>({label:s.name,value:s.id})),className:"msl-wrp-options dropdown-custom-width",defaultValue:t==null?void 0:t.selectedList,onChange:s=>h(s,"selectedList"),disabled:d.Lists,singleSelect:!0}),e.jsx("button",{onClick:()=>T(t,a,m),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${i("Refresh lists","bit-integrations")}'`},type:"button",disabled:d.Lists,children:"↻"})]})]}),(d.Teams||d.Spaces||d.Folders||d.Lists||d.customFields)&&e.jsx(u,{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100,transform:"scale(0.7)"}}),t.actionName==="task"&&e.jsxs("div",{children:[e.jsx("br",{}),e.jsxs("div",{className:"mt-5",children:[e.jsx("b",{className:"wdt-100",children:i("Field Map","bit-integrations")}),e.jsx("button",{onClick:()=>R(t,a,m),className:"icn-btn sh-sm ml-2 mr-2 tooltip",style:{"--tooltip-txt":`'${i("Refresh Fields","bit-integrations")}'`},type:"button",disabled:d.Lists,children:"↻"})]}),e.jsx("br",{}),e.jsx("div",{className:"btcd-hr mt-1"}),e.jsxs("div",{className:"flx flx-around mt-2 mb-2 btcbi-field-map-label",children:[e.jsx("div",{className:"txt-dp",children:e.jsx("b",{children:i("Form Fields","bit-integrations")})}),e.jsx("div",{className:"txt-dp",children:e.jsx("b",{children:i("Clickup Fields","bit-integrations")})})]}),t==null?void 0:t.field_map.map((s,n)=>e.jsx(z,{i:n,field:s,clickupConf:t,formFields:l,setClickupConf:a,setSnackbar:o},`rp-m-${n+9}`)),e.jsx("div",{className:"txt-center btcbi-field-map-button mt-2",children:e.jsx("button",{onClick:()=>M(t.field_map.length,t,a),className:"icn-btn sh-sm",type:"button",children:"+"})}),e.jsx("br",{}),e.jsx("br",{})]})]})}export{U as C};
