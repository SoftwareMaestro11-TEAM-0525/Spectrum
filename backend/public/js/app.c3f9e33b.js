(function(e){function n(n){for(var r,u,l=n[0],i=n[1],c=n[2],p=0,f=[];p<l.length;p++)u=l[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&f.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(n);while(f.length)f.shift()();return a.push.apply(a,c||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,l=1;l<t.length;l++){var i=t[l];0!==o[i]&&(r=!1)}r&&(a.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},o={app:0},a=[];function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=n,l=l.slice();for(var c=0;c<l.length;c++)n(l[c]);var s=i;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"nav"}}),t("router-view")],1)},a=[],u=t("2877"),l={},i=Object(u["a"])(l,o,a,!1,null,null,null),c=i.exports,s=t("8c4f"),p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("h1",[e._v("This may be Home page...")])},f=[],d={name:"Home"},v=d,m=Object(u["a"])(v,p,f,!1,null,"0dd31778",null),b=m.exports,h=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div")},y=[],w={name:"Login"},_=w,g=Object(u["a"])(_,h,y,!1,null,"40aba7da",null),O=g.exports,j=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div")},x=[],P={name:"Join"},S=P,$=Object(u["a"])(S,j,x,!1,null,"4f3908df",null),E=$.exports,J=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div")},M=[],T={name:"Password"},k=T,H=Object(u["a"])(k,J,M,!1,null,"13cfba01",null),L=H.exports,R=[{path:"/login",name:"Login",component:O},{path:"/join",name:"Join",component:E},{path:"/password",name:"Password",component:L}];r["a"].use(s["a"]);const U=[{path:"/",name:"Home",component:b},R],q=new s["a"]({mode:"history",base:"/",routes:U});var z=q,A=t("2f62");r["a"].use(A["a"]);var B=new A["a"].Store({state:{},mutations:{},actions:{},modules:{}}),C=t("bc3a"),D=t.n(C);r["a"].config.productionTip=!1,D.a.defaults.baseURL="/api/",new r["a"]({router:z,store:B,render:e=>e(c)}).$mount("#app")}});
//# sourceMappingURL=app.c3f9e33b.js.map