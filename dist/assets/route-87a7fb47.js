import{_ as d,o as t,c as o,b as c,d as u,n as i,e as s,f as e,t as _,p as m,r as l,q as N,s as g}from"./index-71d0a728.js";const a="/assets/route-arrow-798e92b5.svg";const p={props:["routeName","routeName2","routeSecondName","catalog","mainPage","mainPage2","mainPage3"]},h=n=>(N("data-v-7c59e71c"),n=n(),g(),n),k={class:"route-list"},y={class:"route-item"},f=h(()=>c("img",{src:a,alt:"Arrow Right"},null,-1)),S={key:0,class:"route-item"},w=h(()=>c("img",{src:a,alt:"Arrow Right"},null,-1)),A={key:1,class:"route-item"},R=h(()=>c("img",{src:a,alt:"Arrow Right"},null,-1)),$={key:2,class:"route-item"},P=h(()=>c("img",{src:a,alt:"Arrow Right"},null,-1)),v={key:3,class:"route-item"},x=h(()=>c("img",{src:a,alt:"Arrow Right"},null,-1)),V={class:"route-item"},B={key:0,href:"#"},I={key:0,src:a,alt:"Arrow Right"},C={key:0,src:a,alt:"Arrow Right"},G={key:2,href:"#"},b={key:0,src:a,alt:"Arrow Right"},q={key:0,src:a,alt:"Arrow Right"},D={key:4,class:"route-item"};function E(n,T,j,z,F,H){const r=l("router-link");return t(),o("ul",k,[c("li",y,[u(r,{to:"/"},{default:i(()=>[s(" Головна "),f]),_:1})]),this.mainPage&&this.routeName!="Онлайн крамниця"&&!this.routeName2&&!this.routeName3?(t(),o("li",S,[u(r,{to:"/Goods/Онлайн крамниця"},{default:i(()=>[s(" Онлайн крамниця "),w]),_:1})])):e("",!0),this.mainPage2&&this.routeName2!="Каталог"&&!this.routeName&&!this.routeName3?(t(),o("li",A,[u(r,{to:"/Goods/Онлайн крамниця"},{default:i(()=>[s(" Каталог "),R]),_:1})])):e("",!0),this.mainPage3&&!this.routeName&&!this.routeName3?(t(),o("li",$,[u(r,{to:"/Goods/Онлайн крамниця"},{default:i(()=>[s(" Каталог "),P]),_:1})])):e("",!0),this.mainPage3&&this.routeName&&!this.routeName2?(t(),o("li",v,[u(r,{to:"/Vacancy"},{default:i(()=>[s(" Вакансії "),x]),_:1})])):e("",!0),c("li",V,[!this.routeSecondName&&this.routeName?(t(),o("a",B,[s(_(this.routeName)+" ",1),this.routeSecondName?(t(),o("img",I)):e("",!0)])):e("",!0),this.routeSecondName&&this.routeName?(t(),m(r,{key:1,to:`/${this.catalog}/${this.routeName}`},{default:i(()=>[s(_(this.routeName)+" ",1),this.routeSecondName?(t(),o("img",C)):e("",!0)]),_:1},8,["to"])):e("",!0),!this.routeSecondName&&this.routeName2?(t(),o("a",G,[s(_(this.routeName2)+" ",1),this.routeSecondName?(t(),o("img",b)):e("",!0)])):e("",!0),this.routeSecondName&&this.routeName2?(t(),m(r,{key:3,to:`/${this.catalog}/${this.routeName}`},{default:i(()=>[s(_(this.routeName2)+" ",1),this.routeSecondName?(t(),o("img",q)):e("",!0)]),_:1},8,["to"])):e("",!0)]),this.routeSecondName?(t(),o("li",D,[u(r,{to:"/"},{default:i(()=>[s(_(this.routeSecondName),1)]),_:1})])):e("",!0)])}const K=d(p,[["render",E],["__scopeId","data-v-7c59e71c"]]);export{K as r};
