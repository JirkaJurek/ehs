(function(t){function e(e){for(var o,r,s=e[0],c=e[1],u=e[2],d=0,f=[];d<s.length;d++)r=s[d],a[r]&&f.push(a[r][0]),a[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);l&&l(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(o=!1)}o&&(i.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},a={app:0},i=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/public-dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var o=n("64a9"),a=n.n(o);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],r={name:"app"},s=r,c=(n("034f"),n("2877")),u=Object(c["a"])(s,a,i,!1,null,null,null),l=u.exports,d=n("8c4f"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("form",{attrs:{id:"appform"},on:{submit:t.sendForm}},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.currentLanguage,expression:"currentLanguage"}],staticStyle:{display:"none"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.currentLanguage=e.target.multiple?n:n[0]},t.changeLang]}},t._l(t.languages,function(e){return n("option",{key:e.iso_code,domProps:{value:e.iso_code}},[t._v("\n        "+t._s(e.name)+"\n      ")])}),0),t._m(0),n("div",{staticClass:"fcw"},[n("div",{staticClass:"fc"},[n("label",[t._v("Date:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.date,expression:"formData.date"}],attrs:{type:"date"},domProps:{value:t.formData.date},on:{input:function(e){e.target.composing||t.$set(t.formData,"date",e.target.value)}}})]),n("div",{staticClass:"fc"},[n("label",[t._v("Location:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.location,expression:"formData.location"}],domProps:{value:t.formData.location},on:{input:function(e){e.target.composing||t.$set(t.formData,"location",e.target.value)}}})]),n("div",{staticClass:"fc"},[n("label",[t._v("Technician: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.technician,expression:"formData.technician"}],domProps:{value:t.formData.technician},on:{input:function(e){e.target.composing||t.$set(t.formData,"technician",e.target.value)}}})]),n("div",{staticClass:"fc"},[n("label",[t._v("Customer: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.customer,expression:"formData.customer"}],domProps:{value:t.formData.customer},on:{input:function(e){e.target.composing||t.$set(t.formData,"customer",e.target.value)}}})])]),n("table",[t._l(t.formSection,function(e,o){return[n("tr",{key:o,staticClass:"grey",class:{green:t.isValidSection(e.id)},on:{click:function(n){return t.open(e.id)}}},[n("th",[t._v(t._s(e.index))]),n("th",{attrs:{colspan:"3"}},[t._v(t._s(e.name))])]),t._l(e.questions,function(o){return[t.isOpen(e.id)?n("tr",{key:e.index+"."+o.index,class:e.index},[n("td",[t._v(t._s(e.index)+"."+t._s(o.index))]),n("td",[n("my-img",{attrs:{id:o.id,width:"auto"}})],1),n("td",[t._v(t._s(o.text))]),n("td",[n("div",{staticClass:"control",class:{green:t.formData.questions[o.id]}},[n("label",{staticClass:"radio",attrs:{section:e.id}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.questions[o.id],expression:"formData.questions[question.id]"}],attrs:{name:o.id,type:"radio",value:"Yes"},domProps:{checked:t._q(t.formData.questions[o.id],"Yes")},on:{change:function(e){return t.$set(t.formData.questions,o.id,"Yes")}}}),t._v("\n                  Yes\n                ")]),n("label",{staticClass:"radio"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.questions[o.id],expression:"formData.questions[question.id]"}],attrs:{name:o.id,type:"radio",value:"No"},domProps:{checked:t._q(t.formData.questions[o.id],"No")},on:{change:function(e){return t.$set(t.formData.questions,o.id,"No")}}}),t._v("\n                  No\n                ")])])])]):t._e(),t.isOpen(e.id)&&t.isOpenFinding(o.id)?n("tr",{key:"findings-"+e.index+"."+o.index,class:e.index},[n("td",{attrs:{colspan:"3"}},[n("div",{staticClass:"fcv"},[t._m(1,!0),n("div",{staticClass:"fc"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.findings[o.id].root_cause,expression:"formData.findings[question.id].root_cause"}],domProps:{value:t.formData.findings[o.id].root_cause},on:{input:function(e){e.target.composing||t.$set(t.formData.findings[o.id],"root_cause",e.target.value)}}})]),n("div",{staticClass:"fc"},[n("label",[t._v("Responsibility:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.findings[o.id].corrective_actions,expression:"formData.findings[question.id].corrective_actions"}],attrs:{type:"text"},domProps:{value:t.formData.findings[o.id].corrective_actions},on:{input:function(e){e.target.composing||t.$set(t.formData.findings[o.id],"corrective_actions",e.target.value)}}})]),n("label",[t._v(" Due date:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.findings[o.id].due_date,expression:"formData.findings[question.id].due_date"}],attrs:{type:"date"},domProps:{value:t.formData.findings[o.id].due_date},on:{input:function(e){e.target.composing||t.$set(t.formData.findings[o.id],"due_date",e.target.value)}}})])])])])]):t._e()]})]})],2),n("button",{attrs:{type:"button"},on:{click:t.sendForm}},[t._v("send")])])])},m=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"grey"},[n("h2",[t._v("CCR Europe EH&S Job Site Inspection")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fc"},[n("label",[t._v("Root cause and corrective actions:")])])}],p=(n("6762"),n("2fdb"),n("bd86")),g=n("cebc"),v=(n("55dd"),n("53f6")),h=n("28c9"),_=n("bc3a"),b=n.n(_),D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[t.show?n("a",{on:{click:function(e){t.openImg=t.id}}},[n("img",{attrs:{height:t.height,width:t.width,src:t._f("getImgUrl")(t.id)},on:{error:function(e){t.show=!1}}})]):t._e(),t.openImg==t.id?n("a",{staticClass:"lightbox",on:{click:function(e){t.openImg=null}}},[n("img",{attrs:{src:t._f("getImgUrl")(t.id)}})]):t._e()])},w=[],y={props:{id:{default:void 0},height:{default:60},width:{default:60}},data:function(){return{openImg:null,show:!0}}},x=y,q=(n("bd10"),Object(c["a"])(x,D,w,!1,null,"0054eee9",null)),O=q.exports,k={components:{"my-img":O},data:function(){return{formData:{questions:{},findings:{}},formSectionData:[],openSection:[],languages:[],currentLanguage:"en"}},created:function(){var t=this;b.a.get("".concat(location.protocol,"//").concat(location.hostname).concat(":3001","/languages")).then(function(e){t.languages=e.data}),this.getForms()},computed:{formSection:function(){var t=this.formSectionData.sort(function(t,e){return t.index-e.index}).map(function(t){return Object(g["a"])({},t,{questions:t.questions.sort(function(t,e){return t.index-e.index})})});return t},validatedForm:function(){var t=this,e=this.formSection.reduce(function(e,n){var o=n.id,a=n.questions,i=!0,r=a.reduce(function(e,n){var o=t.formData.questions[n.id],a=!!o;if(a&&"No"===o){var r=t.formData.findings[n.id];r&&r.root_cause&&r.corrective_actions&&r.due_date||(a=!1)}return!1===a&&(i=!1),Object(g["a"])({},e,Object(p["a"])({},n.id,{valid:a,id:n.id}))},{});return Object(g["a"])({},e,Object(p["a"])({},o,{valid:i,id:o,questions:r}))},{});return e}},watch:{},methods:{isValid:function(){return 0===Object(v["a"])(Object(h["a"])(function(t){return!t.valid},this.validatedForm)).length},isValidSection:function(t){return this.validatedForm[t].valid},getForms:function(){var t=this;b.a.get("".concat(location.protocol,"//").concat(location.hostname).concat(":3001","/forms/").concat(this.$route.params.id,"/data"),{params:{hl:this.$route.params.lang}}).then(function(e){return t.formSectionData=e.data})},changeLang:function(){this.getForms()},sendForm:function(t){this.isValid()?(b.a.post("".concat(location.protocol,"//").concat(location.hostname).concat(":3001","/forms/").concat(this.$route.params.id,"/data"),this.formData),this.formData={questions:{},findings:{}},alert("Data send")):alert("invalid form"),t.preventDefault()},isOpen:function(t){return this.openSection.includes(t)},open:function(t){this.openSection=[t]},isOpenFinding:function(t){return"No"===this.formData.questions[t]&&(this.formData.findings[t]||(this.formData.findings[t]={}),!0)},isSectionFilled:function(t){return"No"===this.formData.questions[t]&&(this.formData.findings[t]||(this.formData.findings[t]={}),!0)}}},S=k,j=Object(c["a"])(S,f,m,!1,null,null,null),N=j.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("select",{directives:[{name:"model",rawName:"v-model",value:t.currentLanguage,expression:"currentLanguage"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.currentLanguage=e.target.multiple?n:n[0]}}},t._l(t.languages,function(e){return n("option",{key:e.iso_code,domProps:{value:e.iso_code}},[t._v("\n      "+t._s(e.name)+"\n    ")])}),0),n("ul",t._l(t.forms,function(e,o){return n("li",{key:o},[n("router-link",{attrs:{to:"/"+t.currentLanguage+"/form/"+e.id}},[t._v(" "+t._s(e.name))])],1)}),0)])},C=[],P={data:function(){return{forms:[],languages:[],currentLanguage:"en"}},created:function(){var t=this;b.a.get("".concat(location.protocol,"//").concat(location.hostname).concat(":3001","/forms")).then(function(e){return t.forms=e.data}),b.a.get("".concat(location.protocol,"//").concat(location.hostname).concat(":3001","/languages")).then(function(e){console.log(e.data),t.languages=e.data})},watch:{},methods:{}},F=P,L=Object(c["a"])(F,$,C,!1,null,null,null),E=L.exports;o["a"].use(d["a"]);var I=new d["a"]({mode:"history",base:"/public",routes:[{path:"/",name:"forms",component:E},{path:"/:lang/form/:id",name:"form",component:N}]});b.a.defaults.baseURL="".concat(location.protocol,"//").concat(location.hostname).concat(":3001"),b.a.defaults.headers.common["Authorization"]="Bearer ".concat(localStorage.basicToken);var T=b.a,A=n("9483");Object(A["a"])("/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),o["a"].config.productionTip=!1,o["a"].filter("getImgUrl",function(t){return"".concat(location.protocol,"//").concat(location.hostname).concat("","/questions/").concat(t,"/img?").concat((new Date).getTime())}),navigator.onLine?T.post("/permissions").then(function(t){t.data.status?new o["a"]({router:I,render:function(t){return t(l)}}).$mount("#app"):(localStorage.basicToken="",location.href="/login")}).catch(function(){location.href="/login"}):new o["a"]({router:I,render:function(t){return t(l)}}).$mount("#app")},"64a9":function(t,e,n){},bd10:function(t,e,n){"use strict";var o=n("bfbd"),a=n.n(o);a.a},bfbd:function(t,e,n){}});
//# sourceMappingURL=app.f90a4486.js.map