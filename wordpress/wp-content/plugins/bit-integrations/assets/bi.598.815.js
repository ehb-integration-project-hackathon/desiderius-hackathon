var _=Object.defineProperty,k=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var F=(t,s,e)=>s in t?_(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e,a=(t,s)=>{for(var e in s||(s={}))p.call(s,e)&&F(t,e,s[e]);if(l)for(var e of l(s))g.call(s,e)&&F(t,e,s[e]);return t},r=(t,s)=>k(t,b(s));import{_ as h,c as A,d as f}from"./bi.126.82.js";const w=(t,s,e)=>{const u=a({},s),{name:i}=t.target;t.target.value!==""?u[i]=t.target.value:delete u[i],e(a({},u))},y=t=>{const s=t==null?void 0:t.staticFields.filter(e=>e.required===!0);return s.length>0?s.map(e=>({formField:"",mailBlusterFormField:e.key})):[{formField:"",mailBlusterFormField:""}]},z=t=>!((t!=null&&t.field_map?t.field_map.filter(e=>!e.formField||!e.mailBlusterFormField||!e.formField==="custom"&&!e.customValue):[]).length>0),M=(t,s,e,u,i,n,d)=>{if(!t.auth_token){e({auth_token:t.auth_token?"":h("Api Key can't be empty","bit-integrations")});return}e({}),d==="authentication"&&n(r(a({},i),{auth:!0})),d==="refreshCustomFields"&&n(r(a({},i),{customFields:!0}));const m={auth_token:t.auth_token};A(m,"mailBluster_authentication").then(c=>{if(c&&c.success){const o=a({},t);c.data&&(o.campaigns=c.data),s(o),u(!0),d==="authentication"?(c.data&&(o.customFields=c.data),n(r(a({},i),{auth:!1})),f.success(h("Authorized successfully","bit-integrations"))):d==="refreshCustomFields"&&(c.data&&(o.customFields=c.data),n(r(a({},i),{customFields:!1})),f.success(h("Custom fields fectched successfully","bit-integrations")));return}n(r(a({},i),{auth:!1})),f.error(h("Authorized failed","bit-integrations"))})};export{z as c,y as g,w as h,M as m};
