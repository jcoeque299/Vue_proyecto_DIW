"use strict";(self["webpackChunkvue_proyecto"]=self["webpackChunkvue_proyecto"]||[]).push([[465],{2465:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(4108),u=n(9096);const a={key:0,class:"user__info"},o=(0,r.QD)("h1",null,"Perfil",-1),s=(0,r.QD)("h4",null,"Username:",-1),l=(0,r.QD)("h4",null,"Email:",-1),c=(0,r.QD)("h4",null,"Ubicacion:",-1);function i(e,t,n,i,h,p){return h.user?((0,r.Wz)(),(0,r.An)("section",a,[o,s,(0,r.QD)("p",null,(0,u.WA)(h.user.name),1),l,(0,r.QD)("p",null,(0,u.WA)(h.user.email),1),c,(0,r.QD)("p",null,(0,u.WA)(h.user.location),1)])):(0,r.g1)("",!0)}n(3248);var h=n(8094),p=n(3220);const f=(0,p.I)(["token"]);var d={data(){return{user:null,countryData:h}},async created(){const e=await fetch("http://localhost:8000/api/user",{method:"get",headers:{Authorization:"Bearer "+f.get("token")}}),t=await e.json();if(t.message)return f.remove("token",{path:"/"}),void this.$router.push("/");this.user=t,this.user.location=h.find((e=>e.code===this.user.location)).name}},k=n(4100);const m=(0,k.c)(d,[["render",i]]);var v=m}}]);
//# sourceMappingURL=465.0e34287f.js.map