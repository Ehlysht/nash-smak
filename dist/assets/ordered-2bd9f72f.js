import{_ as v,a as y,c as o,b as s,F as c,z as u,d as f,n as m,f as i,r as x,o as r,t,e as d}from"./index-71d0a728.js";const C={data(){return{userCart:[],userInfo:[],sumValue:"",posInCart:"",sumPercent:"",screenWidth:""}},computed:{sumAll(){var n=0;if(this.sumValue=0,this.posInCart=0,this.userCart){for(let l=0;l<this.userCart.length;l++)this.posInCart=this.posInCart+Number(this.userCart[l].userQty),n=n+this.userCart[l].price*this.userCart[l].userQty,this.sumValue=this.sumValue+this.userCart[l].price*this.userCart[l].userQty;return this.sumPercent=n,2e3-n>0?2e3-n:0}else return 0}},mounted(){y.get("https://nash.enott.com.ua/api/getOrder/"+JSON.parse(localStorage.getItem("user"))[0].email+"/"+JSON.parse(localStorage.getItem("user"))[0].token).then(n=>{this.userCart=n.data.orders,this.userInfo=n.data.orderUser,this.$store.dispatch("setLoader",!1)}),this.screenWidth=screen.width}},k={class:"ordered",id:"ordered"},b={class:"container"},g={class:"ordered-content"},I={class:"ordered-cart"},V=s("h3",{class:"ordered-title"}," Дякуємо за замовлення! ",-1),N=s("p",{class:"ordered-alert"}," Ми вдячні за ваш вибір. Зараз ми працюємо над його обробкою та підготовкою до відправлення. Ви отримаєте повідомлення з подальшими деталями найближчим часом. ",-1),W=s("h4",{class:"ordered-subtitle"}," Ваше замовлення ",-1),A={class:"ordered-list"},Q=["src","alt"],S={class:"ordered-text_first"},P={class:"ordered-name"},w={class:"ordered-weight"},B={key:0,class:"ordered-text_fake"},O={class:"ordered-text"},F=s("p",{class:"ordered-text_title"}," Ціна ",-1),G={class:"ordered-text_value"},J=s("span",null,"грн",-1),L={class:"ordered-text"},z=s("p",{class:"ordered-text_title"}," Кількість ",-1),D={class:"ordered-text_value"},E=s("span",null,"шт",-1),T={class:"ordered-text"},U=s("p",{class:"ordered-text_title"}," Сумма ",-1),j={class:"ordered-text_value"},q=s("span",null,"грн",-1),H=s("p",{class:"ordered-item_alert"}," В наявності ",-1),K={key:0,class:"btn ordered-btn"},M={key:0,class:"ordered-info"},R=s("h4",{class:"ordered-info_title ordered-subtitle"}," Адреса доставки ",-1),X={class:"ordered-info_info"},Y=s("span",null," Отримувач ",-1),Z={class:"ordered-info_info"},$=s("span",null," Доставка в Ужгород ",-1),ss=s("br",null,null,-1),es={class:"ordered-info_info"},ts=s("span",null," Спосіб оплати ",-1),os={class:"ordered-info_sum"},rs=s("span",null,[d(" Вартість "),s("br"),d(" доставки ")],-1),ds={key:0},ns={key:1},is={class:"ordered-info_sum"},ls={class:"ordered-info_final"},_s=s("p",{class:"ordered-info_final_text"}," До оплати ",-1),as={class:"ordered-info_final_value"},cs=s("span",null,"грн",-1),us={class:"container-fluid"},hs={key:0,class:"ordered-info_mob"},ps=s("h4",{class:"ordered-info_title ordered-subtitle"}," Адреса доставки ",-1),fs={class:"ordered-info_info"},ms=s("span",null," Отримувач ",-1),vs={class:"ordered-info_info"},ys=s("span",null," Доставка в Ужгород ",-1),xs=s("br",null,null,-1),Cs={class:"ordered-info_info"},ks=s("span",null," Спосіб оплати ",-1),bs={class:"ordered-info_sum"},gs=s("span",null,[d(" Вартість "),s("br"),d(" доставки ")],-1),Is={key:0},Vs={key:1},Ns={class:"ordered-info_sum"},Ws={class:"ordered-info_final"},As=s("p",{class:"ordered-info_final_text"}," До оплати ",-1),Qs={class:"ordered-info_final_value"},Ss=s("span",null,"грн",-1),Ps={key:0,class:"btn ordered-btn"};function ws(n,l,Bs,Os,h,_){const p=x("router-link");return r(),o("section",k,[s("div",b,[s("div",g,[s("div",I,[V,N,W,s("ul",A,[(r(!0),o(c,null,u(this.userCart,e=>(r(),o("li",{class:"ordered-item",key:e.bar},[s("img",{src:`https://nash.enott.com.ua/api/upload/${e.headImg}`,alt:e.headImg,class:"ordered-img"},null,8,Q),s("div",S,[s("p",P,t(e.itemName),1),s("p",w,t(e.itemWeight)+" гр ",1)]),this.screenWidth<=768?(r(),o("div",B)):i("",!0),s("div",O,[F,s("p",G,[d(t(e.price)+" ",1),J])]),s("div",L,[z,s("p",D,[d(t(e.userQty)+" ",1),E])]),s("div",T,[U,s("p",j,[d(t(e.price*e.userQty)+" ",1),q])]),H]))),128))]),this.screenWidth>480?(r(),o("button",K,[f(p,{to:"/Goods/Онлайн крамниця"},{default:m(()=>[d(" Продовжити покупки ")]),_:1})])):i("",!0)]),this.screenWidth>480?(r(),o("div",M,[(r(!0),o(c,null,u(h.userInfo,(e,a)=>(r(),o("div",{key:a},[R,s("div",X,[Y,s("p",null,t(e.userName),1)]),s("div",Z,[$,s("p",null,[d(t(e.adress)+" ",1),ss,d(" "+t(e.adress1),1)])]),s("div",es,[ts,s("p",null,t(e.userPayment),1)]),s("div",os,[rs,_.sumAll>0?(r(),o("p",ds," за тарифами перевізника ")):i("",!0),_.sumAll<=0?(r(),o("p",ns," безкоштовна ")):i("",!0)]),s("div",is,[s("span",null,t(this.posInCart)+" товари на суму ",1),s("p",null,t(this.sumValue)+" грн ",1)]),s("div",ls,[_s,s("p",as,[d(t(this.sumValue)+" ",1),cs])])]))),128))])):i("",!0)])]),s("div",us,[this.screenWidth<=480?(r(),o("div",hs,[(r(!0),o(c,null,u(h.userInfo,(e,a)=>(r(),o("div",{class:"ordered-info",key:a},[ps,s("div",fs,[ms,s("p",null,t(e.userName),1)]),s("div",vs,[ys,s("p",null,[d(t(e.adress)+" ",1),xs,d(" "+t(e.adress1),1)])]),s("div",Cs,[ks,s("p",null,t(e.userPayment),1)]),s("div",bs,[gs,_.sumAll>0?(r(),o("p",Is," за тарифами перевізника ")):i("",!0),_.sumAll<=0?(r(),o("p",Vs," безкоштовна ")):i("",!0)]),s("div",Ns,[s("span",null,t(this.posInCart)+" товари на суму ",1),s("p",null,t(this.sumValue)+" грн ",1)]),s("div",Ws,[As,s("p",Qs,[d(t(this.sumValue)+" ",1),Ss])])]))),128)),this.screenWidth<=480?(r(),o("button",Ps,[f(p,{to:"/Goods/Онлайн крамниця"},{default:m(()=>[d(" Продовжити покупки ")]),_:1})])):i("",!0)])):i("",!0)])])}const Gs=v(C,[["render",ws]]);export{Gs as default};
