"use strict";(self["webpackChunkvue_proyecto"]=self["webpackChunkvue_proyecto"]||[]).push([[584],{5584:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var a=n(4108),o=n(9096);const s={class:"event__card__container"},c=(0,a.QD)("h2",null,"Oops... Esta página no existe...",-1),d=(0,a.QD)("h3",{id:"h3__404"},"Prueba con estos eventos",-1),i=["src"],r={class:"event__card__content"},l={key:0},u={key:1};function m(e,t,n,m,v,h){const _=(0,a.E1)("router-link");return(0,a.Wz)(),(0,a.An)("section",s,[c,d,((0,a.Wz)(!0),(0,a.An)(a.ae,null,(0,a.mi)(v.eventRecomendations,(e=>((0,a.Wz)(),(0,a.An)("article",{class:"event__card",key:e.id},[(0,a.K2)(_,{to:{name:"event",params:{id:e.id}}},{default:(0,a.Ql)((()=>[e.images?((0,a.Wz)(),(0,a.An)("img",{key:0,src:e.images[0].url},null,8,i)):(0,a.g1)("",!0),(0,a.QD)("div",r,[(0,a.QD)("h3",null,(0,o.WA)(e.name),1),e.dates.start.dateTBD||e.dates.start.dateTBA?(0,a.g1)("",!0):((0,a.Wz)(),(0,a.An)("p",l,(0,o.WA)(e.dates.start.localDate),1)),e._embedded&&e._embedded.venues?((0,a.Wz)(),(0,a.An)("p",u,(0,o.WA)(e._embedded.venues[0].city.name),1)):(0,a.g1)("",!0)])])),_:2},1032,["to"])])))),128))])}var v=n(3220),h=n(8094);const _=(0,v.I)(["token"]);var p={data(){return{countryData:h,eventRecomendations:null,location:{code:"",name:""}}},async created(){if(_.get("token")){const e=await fetch("http://localhost:8000/api/user",{method:"get",headers:{Authorization:"Bearer "+_.get("token")}}),t=await e.json();t.message?_.remove("token",{path:"/"}):t.location&&(this.location.code=t.location,this.location.name=h.find((e=>e.code===this.location.code)).name??"")}const e=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${this.location.code}&apikey=S1sDAS05dZI5JmtvdarQaZN5tFxkOUpr&size=5`),t=await e.json();t._embedded?this.eventRecomendations=t._embedded.events:this.eventRecomendations=null}},k=n(4100);const y=(0,k.c)(p,[["render",m]]);var A=y}}]);
//# sourceMappingURL=584.a0308687.js.map