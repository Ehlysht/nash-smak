import{_ as N,G as T,a as v,c as r,b as t,d as w,n as b,A as y,g as V,f as _,F as $,z as x,r as L,o as h,e as C,t as u,E as W,D as G}from"./index-8544e283.js";import{r as z}from"./route-2d8b5531.js";const B="/assets/filter-154f941e.svg",M="/assets/arrow-down-5ce505f6.svg",A={components:{catalog:T,route:z},data(){return{screenWidth:"",openFilter:!1,goodsList:[],filtersList:[],allGoods:[],packingList:[]}},computed:{filteredList(){var n=[],e=!1,i=!1,l=!1,o=!1,d="all";if(this.filtersList.length)for(let f=0;f<this.filtersList.length;f++){for(let a=0;a<this.filtersList.length;a++)this.filtersList[a].weight=="weight1"&&(l=0,o=150),this.filtersList[a].weight=="weight2"&&(l=151,o=300),this.filtersList[a].weight=="weight3"&&(l=301,o=500),this.filtersList[a].weight=="weight4"&&(l=501,o=2e3),this.filtersList[a].weight=="weight5"&&(l=2e3,o=9999),(e>l||!e)&&(e=l),(i<o||!i)&&(i=o);!l&&!o&&(e=0,i=9999),this.filtersList[f].pack&&(d=this.filtersList[f].pack);for(let a=0;a<this.goodsList.length;a++){var m=!1,p=!1,k=[],s=[],c=[];k=this.goodsList[a].weightList.split(","),s=this.goodsList[a].packing.split(","),c=k.concat(s);for(let g=1;g<c.length;g++)c[g]>=e&&c[g]<=i&&(m=c[g]),c[g]==d&&(p=c[g]);m&&p&&(n.some(F=>F.name===this.goodsList[a].name)||n.push(this.goodsList[a]))}}else n=this.goodsList;return n}},watch:{$route(n,e){v.get("https://nash.enott.com.ua/api/goodsNames/"+this.$route.params.category).then(i=>{this.goodsList=i.data}),this.$store.dispatch("setVisibleMenu",!1)}},methods:{addToList(n,e){var i=[],i=this.filtersList,l=!1;for(let o=0;o<i.length;o++)(i[o].pack==e||i[o].weight==e)&&(i.splice(o,1),this.filtersList=i,l=!0);l||(n=="pack"?this.filtersList.push({pack:e}):this.filtersList.push({weight:e}))}},mounted(){this.screenWidth=screen.width,v.get("https://nash.enott.com.ua/api/goodsNames/"+this.$route.params.category).then(n=>{this.goodsList=n.data,this.$store.dispatch("setLoader",!1)}),v.get("https://nash.enott.com.ua/api/getPacking").then(n=>{this.packingList=n.data}),this.$store.dispatch("setVisibleMenu",!1)}},D={class:"goods",id:"goods"},E={class:"container"},P={class:"goods-info"},S=t("div",{class:"goods-texts"},[t("h2",{class:"goods-title"}," Онлайн крамниця "),t("p",{class:"goods-text"}," Смаколики які ви можете придбати у нас в онлайн крамниці ")],-1),j={class:"btn goods-btn"},I=t("img",{src:G,alt:"Arrow"},null,-1),q={class:"container"},H={class:"goods-content"},J=t("a",null,[t("img",{src:B,alt:"Filter",class:"filter-btn_filter"}),C(" Фільтри "),t("img",{src:M,alt:"arrow",class:"filter-btn_arrow"})],-1),K=[J],O={key:1,class:"goods-filters_content"},Q=t("p",{class:"filters-title"}," Вага ",-1),R={class:"filters-list"},U={class:"container-check filters-item",for:"weight1"},X=t("p",null,"від 1 г до 150г",-1),Y=t("span",{class:"checkmark"},null,-1),Z={class:"container-check filters-item",for:"weight2"},tt=t("p",null,"від 150 г до 300 г",-1),st=t("span",{class:"checkmark"},null,-1),et={class:"container-check filters-item",for:"weight3"},it=t("p",null,"від 300 г до 500 г",-1),ot=t("span",{class:"checkmark"},null,-1),at={class:"container-check filters-item",for:"weight4"},nt=t("p",null,"від 500 г до 2000 г",-1),lt=t("span",{class:"checkmark"},null,-1),ct={class:"container-check filters-item",for:"weight5"},rt=t("p",null,"від 2000 г",-1),ht=t("span",{class:"checkmark"},null,-1),dt=t("p",{class:"filters-title filters-second"}," Пакування ",-1),gt={class:"filters-list"},_t=["for"],pt=["id","value","onClick"],ft=t("span",{class:"checkmark"},null,-1),ut={class:"goods-list"},mt={class:"goods-img"},kt={class:"goods-item_stamps__list"},wt={key:0,class:"goods-item_stamps goods-item_discount"},vt={key:1,class:"goods-item_stamps",src:"https://nash.enott.com.ua/api/upload/stamps2.png",alt:"Бестселлер"},Lt={key:2,class:"goods-item_stamps",src:"https://nash.enott.com.ua/api/upload/stamps3.png",alt:"Вегетаріанське"},bt={key:3,class:"goods-item_stamps",src:"https://nash.enott.com.ua/api/upload/stamps4.png",alt:"Пісне"},yt={class:"goods-name"},$t={class:"goods-bottom"},xt={class:"goods-weight"},Ct={class:"goods-price"};function Ft(n,e,i,l,o,d){const m=L("route"),p=L("router-link"),k=L("catalog");return h(),r("section",D,[t("div",E,[w(m,{mainPage:"Онлайн крамниця",routeName:this.$route.meta.title},null,8,["routeName"]),t("div",P,[S,t("button",j,[w(p,{to:"/Catalog/Каталог"},{default:b(()=>[C(" Переглянути весь каталог "),I]),_:1})])])]),w(k),t("div",q,[t("div",H,[t("div",{class:y(["goods-filters",`${this.openFilter?"goods-filters_active":""}`])},[this.screenWidth<=1e3?(h(),r("button",{key:0,class:y(["btn filter-btn",`${this.openFilter?"filter-btn_active":""}`]),onClick:e[0]||(e[0]=V(s=>this.openFilter=!this.openFilter,["prevent"]))},K,2)):_("",!0),this.screenWidth>1e3||this.openFilter?(h(),r("div",O,[Q,t("div",R,[t("label",U,[t("input",{type:"checkbox",id:"weight1",onClick:e[1]||(e[1]=s=>d.addToList("weight","weight1"))}),X,Y]),t("label",Z,[t("input",{type:"checkbox",id:"weight2",onClick:e[2]||(e[2]=s=>d.addToList("weight","weight2"))}),tt,st]),t("label",et,[t("input",{type:"checkbox",id:"weight3",onClick:e[3]||(e[3]=s=>d.addToList("weight","weight3"))}),it,ot]),t("label",at,[t("input",{type:"checkbox",id:"weight4",onClick:e[4]||(e[4]=s=>d.addToList("weight","weight4"))}),nt,lt]),t("label",ct,[t("input",{type:"checkbox",id:"weight5",onClick:e[5]||(e[5]=s=>d.addToList("weight","weight5"))}),rt,ht])]),dt,t("div",gt,[(h(!0),r($,null,x(this.packingList,(s,c)=>(h(),r("label",{class:"container-check filters-item",for:`pack${c}`,key:c},[t("input",{type:"checkbox",id:`pack${c}`,value:s.packing,onClick:f=>d.addToList("pack",s.packing)},null,8,pt),t("p",null,u(s.packing),1),ft],8,_t))),128))])])):_("",!0)],2),t("ul",ut,[(h(!0),r($,null,x(d.filteredList,s=>(h(),r("li",{class:"goods-item",key:s.id},[w(p,{to:`/Goods/${s.name}/${s.bar}`,class:"goods-link"},{default:b(()=>[t("div",mt,[t("div",kt,[s.stamps2!=0?(h(),r("p",wt,"-"+u(s.stamps2)+" %",1)):_("",!0),s.stamps1!=0?(h(),r("img",vt)):_("",!0),s.vegan?(h(),r("img",Lt)):_("",!0),s.category=="До посту"?(h(),r("img",bt)):_("",!0)]),t("div",{style:W(`background:url('https://nash.enott.com.ua/api/upload/${s.mainImage}')center center/100% no-repeat;width:100%;height:100%`)},null,4)]),t("h3",yt,u(s.name),1),t("div",$t,[t("p",xt," Від "+u(s.weight)+"г ",1),t("p",Ct," Від "+u(s.price)+" грн ",1)])]),_:2},1032,["to"])]))),128))])])])])}const Vt=N(A,[["render",Ft]]);export{Vt as default};