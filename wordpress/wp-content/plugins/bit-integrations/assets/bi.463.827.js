var y=Object.defineProperty;var p=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var b=(e,t,r)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,l=(e,t)=>{for(var r in t||(t={}))m.call(t,r)&&b(e,r,t[r]);if(p)for(var r of p(t))I.call(t,r)&&b(e,r,t[r]);return e};import{_ as n,d,c as _}from"./bi.126.82.js";const w=(e,t,r)=>{const s=l({},t),{name:o}=e.target;e.target.value!==""?s[o]=e.target.value:delete s[o],r(l({},s))},k=e=>!((e!=null&&e.field_map?e.field_map.filter(r=>!r.formField||!r.pCloudFormField):[]).length>0),C=(e,t,r)=>{const s={tokenDetails:e.tokenDetails},o=_(s,"pCloud_get_all_folders").then(i=>{if(i&&i.success){const a=l({},e);return i.data&&(a.foldersList=i.data),t(a),r==="fetch"?"Folders fetched successfully":"Folders refreshed successfully"}else return"Folders refresh failed. please try again"});d.promise(o,{success:i=>i,error:n("Error Occurred","bit-integrations"),loading:n("Loading PCloud Folders List...","bit-integrations")})},v=(e,t,r,s,o)=>{if(!e.clientId||!e.clientSecret){o({clientId:e.clientId?"":n("Client Id can't be empty","bit-integrations"),clientSecret:e.clientSecret?"":n("Client Secret can't be empty","bit-integrations")});return}s(!0);const i=`https://my.pcloud.com/oauth2/authorize?client_id=${e.clientId}&response_type=code&redirect_uri=${btcbi.api.base}/redirect&state=${encodeURIComponent(window.location.href)}/redirect`,a=window.open(i,"pCloud","width=400,height=609,toolbar=off"),u=setInterval(()=>{if(a.closed){clearInterval(u);let c={},h=!1;const g=localStorage.getItem("__pCloud");if(g&&(h=!0,c=JSON.parse(g),localStorage.removeItem("__pCloud")),!c.code||c.error||!c||!h){const f=c.error?`Cause: ${c.error}`:"";d.error(`${n("Authorization failed","bit-integrations")} ${f}. ${n("please try again","bit-integrations")}`),s(!1)}else{const f=l({},e);f.accountServer=c["accounts-server"],F(c,f,t,r,s)}}},500)},F=(e,t,r,s,o)=>{const i=l({},e);i.clientId=t.clientId,i.clientSecret=t.clientSecret,i.redirectURI=`${btcbi.api.base}/redirect`,_(i,"pCloud_authorization").then(a=>{if(a&&a.success){const u=l({},t);u.tokenDetails=a.data,r(u),s(!0),d.success(n("Authorized Successfully","bit-integrations"))}else a&&a.data||!a.success&&typeof a.data=="string"?d.error(`${n("Authorization failed Cause:","bit-integrations")}${a.data}. ${n("please try again","bit-integrations")}`):d.error(n("Authorization failed. please try again","bit-integrations"));o(!1)})};export{v as a,k as c,C as g,w as h};