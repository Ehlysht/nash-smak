import{_ as N,u as T,a as v,x as A,c as i,b as s,d as V,f as r,e as h,n as O,w as d,v as y,y as f,F as g,z as b,t as p,A as S,B as L,g as k,h as E,r as w,k as x,o as a}from"./index-8544e283.js";import{r as j}from"./route-2d8b5531.js";import{v as F,_ as D}from"./select-down-0ade91de.js";const M="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJpSURBVHgB7ZfPaxNBFMe/k21ipRXSm4LCVgQ9SUCExIOkVw9qTj20oVn8A5LeemsDeq79A0pTmpzLnjwaEMyCoEHvdkFBvS3YQt3N7ji79WCzM7Ozyd7aDyQk773Z950fefMCXHQIJmGvWkThRAe0Eghx4FMHo9khjL6DlKgLiJK6TYA2QKHzn0aGzN+BS00Ylq3wVEUBvUoTAbZYdBFqOEzMa6y8bycFygWEs87/OWSfqpiMPrwrNdnW5KTD8+7bKZIjGns2AaQX0Hu0yfazhOmpolvZFjn5W7BX1pEnR8gSjy7yDiZ/BTR24BIo5ufRuP0Ez28+hj53HYnMkBbXzA0m5BkkbD9oonVv+Zxt6/Mu2l92xYMI1th7TER8BQ7KVdnPbfP+i1jySEBov7sMCUX0HpaSBeQEReYf4bLLxEnxNQUBgViAPncjeokoFualfrayOhIFSHC835nEyAUQKqxajnuM/q9PIjfzfYxihIQXV6KAIGdDgjF4CfvkR8weztwYvIIUSofjJi0W9PTOT2j+BgQ43jHMb++wULgWfT8NXOx/fRMl5wk7x2h2HaZ9+r+JXwm7lWnvAA60j1VradwqOISBiczROjwrX4B3tcOajtTdjRAKG17eVBcQ3d90B9kp2Bf1BPKG5KByxCse6XKz2dcHiyK3vBDlRjVMy4guydxyASsfhqw0r2NSKG0nNacakjj8bqF2a4FtRRlpoNhB3dpIClNvy7vlDgtfUwtmh27VaqhEql9G4QPDWWWYPJ2AkPqghYAa0ckeh4DV+VwjTfKzYZMSdjf+jB599tklo/hP6JJx/gKx+MTMWw3wQAAAAABJRU5ErkJggg==",W={components:{route:j,cartList:T},directives:{clickOutside:F.directive},data(){return{checkUser:!1,userInfo:[],testCity:[],addressValuePosht:"",addressValueDel:"",completeCity:!0,citysList:[],cityValue:"",agree:"",agreePolicy:"",addressList:[],maxLength:100,completeAddress:!0,FullList:[],depCheck:"",payCheck:"",screenWidth:"",sumAll:0,userCart:[],userTextarea:"",waitingInfo:!0,ukrCity:[],urkAddress:[]}},computed:{cartSum(){var c=this.$store.getters.sumValue;return 2e3-c>0?this.sumAll=2e3-c:this.sumAll=0,c}},methods:{async buyItems(){if(this.email!=""&&this.fname!=""&&this.sname!=""&&this.phone!=""&&this.cityValue!=""&&this.depCheck!=""&&this.payCheck!=""){let c={headers:{"Content-Type":"multipart/form-data"}},e=new FormData;JSON.parse(localStorage.getItem("user"))[0].role==="tempUser"&&e.append("tempUser",JSON.parse(localStorage.getItem("user"))[0].email),e.append("email",this.email),e.append("fname",this.fname),e.append("sname",this.sname),e.append("phone",this.phone),e.append("cityValue",this.cityValue),e.append("depCheck",this.depCheck),e.append("payCheck",this.payCheck),e.append("userTextarea",this.userTextarea),this.agree?e.append("agree","Не передзвонюйте мені для уточнення замовлення"):e.append("agree","Передзвоніть для уточнення"),this.depCheck=="Нова Пошта (поштомат)"?e.append("address",this.addressValuePosht):(this.depCheck=="Нова Пошта (відділення)"||this.depCheck=="Укрпошта")&&e.append("address",this.addressValueDel),await v.post("https://nash.enott.com.ua/api/sendOrder",e,c).then(n=>{if(n.data.orderId){if(this.payCheck=="Онлайн оплата"){var l="sandbox_xQs3173QoGmt3fD3olfWAjUQrgsmCh7Zgmdb9LpX",u='{"public_key":"sandbox_i23769093976","version":"3","action":"pay","amount":"'+this.cartSum+'","currency":"UAH","description":"Buy items","order_id":"'+n.data.orderId+'"}';this.valData=btoa(u),window.open("https://www.liqpay.ua/api/3/checkout?data="+this.valData+"&signature="+CryptoJS.SHA1(l+this.valData+l).toString(CryptoJS.enc.Base64),"_blank")}this.$store.dispatch("setPosInCart",!1),this.$router.push({path:"/ordered"})}})}else alert("Заповніть всі обов'язкові поля!")},handleScroll(c){const e=document.getElementById(c);let n=0;e.scrollTop<n||(n=e.scrollTop<=0?0:e.scrollTop,e.scrollTop+e.offsetHeight>=e.scrollHeight&&(this.maxLength=this.maxLength+100,c=="cabinet-list_city"?this.cityList():this.addList()))},changeNP(c){this.NPVal=c},cityList(c){var e=this.testCity;if(this.depCheck=="Укрпошта")var e=this.ukrCity;var n=0;this.maxLength>=e.length?n=e.length:n=this.maxLength,this.citysList=[],this.completeCity=!1;for(var l=0;l<e.length;l++)this.cityValue?e[l].citys.toLowerCase().substring(0,this.cityValue.length)==this.cityValue.toLowerCase()&&this.citysList.length<n&&this.citysList.push(e[l]):this.citysList.length<n&&this.citysList.push(e[l]);c&&(this.addressValueDel="",this.FullListDel=[],this.FullListPosht=[],this.cityValue=c,this.completeCity=!0,this.depCheck=="Укрпошта"?this.addressList=this.urkAddress:new A({apiKey:"1805304084717f37c3824fd9898eece6"}).address.getWarehouses({CityName:c.substring(0,c.search(" - ")),"BicycleParking ":"1"}).then(o=>{this.addressList=o.data,this.addressValueDel=""}).catch(o=>{Array.isArray(o)&&o.forEach(m=>console.log(`[${m.code||"-"}] ${m.en||m.uk||m.ru||m.message}`))}),this.addressDell(),this.addressPosht())},addressDell(){if(this.cityValue){this.waitingInfo=!0;var c=[];new A({apiKey:"1805304084717f37c3824fd9898eece6"}).address.getWarehouses({CityName:this.cityValue.substring(0,this.cityValue.search(" - ")),"BicycleParking ":"1"}).then(n=>{this.FullListDel=n.data;for(var l=0;l<this.FullListDel.length;l++)this.FullListDel[l].Description.substring(0,10)=="Відділення"&&(c.push(this.FullListDel[l]),this.waitingInfo=!1);this.FullListDel=c}).catch(n=>{Array.isArray(n)&&n.forEach(l=>console.log(`[${l.code||"-"}] ${l.en||l.uk||l.ru||l.message}`))})}},addressPosht(){this.cityValue&&(this.waitingInfo=!0,this.depCheck=="Укрпошта"?(this.FullListPosht=this.urkAddress,this.waitingInfo=!1):new A({apiKey:"1805304084717f37c3824fd9898eece6"}).address.getWarehouses({CityName:this.cityValue.substring(0,this.cityValue.search(" - ")),"BicycleParking ":"1",CategoryOfWarehouse:"Postomat"}).then(e=>{this.FullListPosht=e.data,this.waitingInfo=!1}).catch(e=>{Array.isArray(e)&&e.forEach(n=>console.log(`[${n.code||"-"}] ${n.en||n.uk||n.ru||n.message}`))}))},onClickOutsideSearch(){this.completeCity=!0},onClickOutsideSearchAdd(){this.completeAddress=!0}},mounted(){if(this.screenWidth=screen.width,!JSON.parse(localStorage.getItem("user")))this.checkUser=!0;else{let n={headers:{"Content-Type":"multipart/form-data"}},l=new FormData;l.append("email",JSON.parse(localStorage.getItem("user"))[0].email),v.post("https://nash.enott.com.ua/api/getUser",l,n).then(u=>{this.userInfo=u.data.answerAdm,JSON.parse(localStorage.getItem("user"))[0].role=="tempUser"?(this.email="",this.checkUser=!0):(this.email=JSON.parse(localStorage.getItem("user"))[0].email,this.fname=u.data.answerAdm[0].first_name,this.sname=u.data.answerAdm[0].second_name,this.phone=u.data.answerAdm[0].phone,this.cityValue=u.data.answerAdm[0].city,this.depCheck=u.data.answerAdm[0].department,this.depCheck=="Нова Пошта (поштомат)"?this.addressValuePosht=u.data.answerAdm[0].delivery:this.addressValueDel=u.data.answerAdm[0].delivery,this.cityValue&&(this.addressDell(),this.addressPosht()))}),v.get("https://nash.enott.com.ua/api/getCart/"+JSON.parse(localStorage.getItem("user"))[0].email).then(u=>{this.userCart=u.data,this.$store.dispatch("setLoader",!1)})}var c=[];new A({apiKey:"1805304084717f37c3824fd9898eece6"}).address.getCities().then(n=>{c=n.data;for(let l=0;l<c.length;l++)this.testCity.push({citys:c[l].Description+" - ("+c[l].AreaDescription+")"})}).catch(n=>{Array.isArray(n)&&n.forEach(l=>console.log(`[${l.code||"-"}] ${l.en||l.uk||l.ru||l.message}`))}),v.get("https://nash.enott.com.ua/api/getUkrPoshta").then(n=>{this.ukrCity=n.data.uniqList,this.urkAddress=n.data.allList}),this.$store.dispatch("setVisibleMenu",!1)}},Q={class:"cart",id:"cart"},K={class:"cart-content"},R={class:"cart-form"},J={key:0,class:"cart-title"},z={class:"cart-user"},H=s("p",{class:"cart-subTitle"}," Ваші контактні дані ",-1),q={key:0,class:"cart-login"},X={for:"cart-input",class:"cart-label"},Y={for:"cart-input",class:"cart-label"},$={for:"cart-input",class:"cart-label"},Z={for:"cart-input",class:"cart-label"},G=s("p",{class:"user-alert"}," Наші сповіщення будуть надходити на E-mail, вони можуть потрапити в папку «спам» ",-1),ee={class:"user-delivery"},te=s("p",{class:"user-delivery_title"}," Спосіб доставки ",-1),se={class:"user-radio"},ie=s("label",{for:"user-radio1",class:"user-label"},"Нова Пошта (відділення)",-1),ae={key:0,for:"city",class:"cabinet-label cabinet-label_select"},le=["onClick","value"],ne={key:1,for:"delSelect",class:"cabinet-label cabinet-label_select"},oe={key:0,class:"cabinet-list",id:"cabinet-list_address"},re={key:0},ce=["onClick","value"],de={key:0},ue={class:"user-radio"},he=s("label",{for:"user-radio2",class:"user-label"},"Нова Пошта (поштомат)",-1),pe={key:0,for:"city",class:"cabinet-label cabinet-label_select"},me=["onClick","value"],ye={key:1,for:"delSelect",class:"cabinet-label cabinet-label_select"},ke={key:0},_e=["onClick","value"],fe={class:"user-radio"},ge=s("label",{for:"user-radio3",class:"user-label"},"Укрпошта",-1),be={key:0,for:"city",class:"cabinet-label cabinet-label_select"},Ce=["onClick","value"],ve={key:1,for:"delSelect",class:"cabinet-label cabinet-label_select"},Ae={key:0},Ve=["onClick","value"],Se={class:"user-radio"},we=s("label",{for:"user-radio4",class:"user-label"},"Самовивіз з фабрики",-1),De={key:0,class:"user-radio_map_text"},Le=s("img",{src:M,alt:"Maps"},null,-1),xe={key:1,class:"user-radio_map",src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.0413495486246!2d27.689560976870318!3d49.86020562968645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472dc8dcece86957%3A0x81c06db17ece39be!2sVul.%20Peremohy%2C%201%2C%20Pedynka%2C%20Zhytomyrs'ka%20oblast%2C%2013144!5e1!3m2!1sen!2sua!4v1684421514485!5m2!1sen!2sua",style:{border:"0"},allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"},Pe={class:"user-payment"},Be=s("p",{class:"user-payment_title"}," Спосіб оплати ",-1),Ue=s("p",{class:"user-payment_alert"}," Інтернет-магазин працює на умовах 100% передоплати ",-1),Ie={class:"user-radio"},Ne=s("label",{for:"user-radio5",class:"user-label"},"Банківською карткою VISA / MasterCard",-1),Te={class:"user-radio"},Oe=s("label",{for:"user-radio6",class:"user-label"},"За банківськими реквізитами",-1),Ee=s("p",{class:"user-payment_descr"}," На картку або розрахунковий рахунок, наш менеджер зателефонує Вам для узгодження способу оплати ",-1),je={for:"callback",class:"user-callback container-check"},Fe=s("span",{class:"checkmark",style:{position:"relative"}},null,-1),Me=s("p",null,"Не передзвонюйте мені для уточнення замовлення",-1),We={class:"user-comments"},Qe=s("p",{class:"user-comments_title"}," Коментар до замовлення ",-1),Ke={key:0,class:"cart-summary"},Re={class:"cart-goods_sum"},Je=s("p",null," Вартість доставки ",-1),ze={key:0},He={key:1},qe={class:"cart-goods_sum"},Xe={class:"cart-goods_final"},Ye=s("p",{class:"cart-goods_final_text"}," До оплати ",-1),$e={class:"cart-goods_final_value"},Ze=s("span",null,"грн",-1),Ge={key:0,class:"cart-goods_alert"},et=s("img",{src:E,alt:"Alert"},null,-1),tt=s("a",{href:"#"},"Оформити замовлення",-1),st=[tt],it={key:2,class:"cart-goods_btn cart-goods_btn_disable"},at={for:"cart-goods_agreement",class:"cart-goods_agreement container-check"},lt=s("p",null,"Даю згоду на обробку персональних даних",-1),nt=s("span",{class:"checkmark",style:{position:"relative"}},null,-1);function ot(c,e,n,l,u,o){const m=w("route"),P=w("router-link"),B=w("QuillEditor"),U=w("cart-list"),I=x("maska"),_=x("click-outside");return a(),i("section",Q,[s("div",{class:S(`${this.screenWidth<=680?"container-fluid":"container"}`)},[V(m,{routeName:"Оформлення замовлення"}),s("div",K,[s("form",R,[this.screenWidth>680?(a(),i("h3",J," Будь ласка, заповніть контактну форму ")):r("",!0),s("div",z,[H,this.checkUser?(a(),i("p",q,[h(" Ви вже зареєстровані? "),V(P,{to:"/Login"},{default:O(()=>[h("Увійти")]),_:1})])):r("",!0)]),s("label",X,[h(" Прізвище "),d(s("input",{type:"text",name:"subName",id:"cart-input",class:"cart-input","onUpdate:modelValue":e[0]||(e[0]=t=>this.fname=t)},null,512),[[y,this.fname]])]),s("label",Y,[h(" Ім'я "),d(s("input",{type:"text",name:"firstName",id:"cart-input",class:"cart-input","onUpdate:modelValue":e[1]||(e[1]=t=>this.sname=t)},null,512),[[y,this.sname]])]),s("label",$,[h(" Телефон "),d(s("input",{type:"text",name:"phone",id:"cart-input",class:"cart-input","onUpdate:modelValue":e[2]||(e[2]=t=>this.phone=t)},null,512),[[I,"+38 ### ### ## ##"],[y,this.phone]])]),s("label",Z,[h(" Email "),d(s("input",{type:"email",name:"email",id:"cart-input",class:"cart-input","onUpdate:modelValue":e[3]||(e[3]=t=>this.email=t)},null,512),[[y,this.email]])]),G,s("div",ee,[te,s("div",se,[d(s("input",{onClick:e[4]||(e[4]=t=>{this.cityValue="",this.addressValueDel="",this.addressValuePosht=""}),type:"radio",name:"delivery",id:"user-radio1",value:"Нова Пошта (відділення)","onUpdate:modelValue":e[5]||(e[5]=t=>this.depCheck=t)},null,512),[[f,this.depCheck]]),ie,this.depCheck=="Нова Пошта (відділення)"?d((a(),i("label",ae,[h(" Місто "),d(s("input",{onClick:e[6]||(e[6]=t=>{this.completeCity=!1,o.cityList()}),onInput:e[7]||(e[7]=t=>o.cityList()),type:"text",name:"firstName",id:"cabinet-input",class:"cabinet-input","onUpdate:modelValue":e[8]||(e[8]=t=>this.cityValue=t),placeholder:"Оберіть місто"},null,544),[[y,this.cityValue]]),this.completeCity?r("",!0):(a(),i("ul",{key:0,class:"cabinet-list",onScroll:e[9]||(e[9]=t=>o.handleScroll("cabinet-list_city")),id:"cabinet-list_city"},[(a(!0),i(g,null,b(this.citysList,t=>(a(),i("li",{onClick:k(C=>o.cityList(t.citys),["prevent"]),key:t.citys,value:t.citys},p(t.citys),9,le))),128))],32))])),[[_,o.onClickOutsideSearch]]):r("",!0),this.depCheck=="Нова Пошта (відділення)"?d((a(),i("label",ne,[h(" Відділення Пошти "),s("p",{onClick:e[10]||(e[10]=t=>this.completeAddress=!this.completeAddress),id:"cabinet-input",class:"cabinet-input cabinet-input_text"},[h(p(this.addressValueDel),1),s("img",{src:D,alt:"",class:S(`${this.completeAddress?"":"cabinet-input_arrow"}`),style:{"margin-left":"auto"}},null,2)]),this.completeAddress?r("",!0):(a(),i("ul",oe,[u.waitingInfo?(a(),i("li",re," Завантаження даних ")):r("",!0),(a(!0),i(g,null,b(this.FullListDel,t=>(a(),i("li",{onClick:k(C=>{this.addressValueDel=t.Description,this.completeAddress=!0},["prevent"]),key:t.Description,value:t.Description},[u.waitingInfo?r("",!0):(a(),i("p",de,p(t.Description),1))],8,ce))),128))]))])),[[_,o.onClickOutsideSearchAdd]]):r("",!0)]),s("div",ue,[d(s("input",{onClick:e[11]||(e[11]=t=>{this.cityValue="",this.addressValueDel="",this.addressValuePosht=""}),type:"radio",name:"delivery",id:"user-radio2",value:"Нова Пошта (поштомат)","onUpdate:modelValue":e[12]||(e[12]=t=>this.depCheck=t)},null,512),[[f,this.depCheck]]),he,this.depCheck=="Нова Пошта (поштомат)"?d((a(),i("label",pe,[h(" Місто "),d(s("input",{onClick:e[13]||(e[13]=t=>{this.completeCity=!1,o.cityList()}),onInput:e[14]||(e[14]=t=>o.cityList()),type:"text",name:"firstName",id:"cabinet-input",class:"cabinet-input","onUpdate:modelValue":e[15]||(e[15]=t=>this.cityValue=t),placeholder:"Оберіть місто"},null,544),[[y,this.cityValue]]),this.completeCity?r("",!0):(a(),i("ul",{key:0,class:"cabinet-list",onScroll:e[16]||(e[16]=t=>o.handleScroll("cabinet-list_city")),id:"cabinet-list_city"},[(a(!0),i(g,null,b(this.citysList,t=>(a(),i("li",{onClick:k(C=>o.cityList(t.citys),["prevent"]),key:t.citys,value:t.citys},p(t.citys),9,me))),128))],32))])),[[_,o.onClickOutsideSearch]]):r("",!0),this.depCheck=="Нова Пошта (поштомат)"?d((a(),i("label",ye,[h(" Відділення Пошти "),s("p",{onClick:e[17]||(e[17]=t=>this.completeAddress=!this.completeAddress),id:"cabinet-input",class:"cabinet-input cabinet-input_text"},[h(p(this.addressValuePosht),1),s("img",{src:D,alt:"",class:S(`${this.completeAddress?"":"cabinet-input_arrow"}`),style:{"margin-left":"auto"}},null,2)]),this.completeAddress?r("",!0):(a(),i("ul",{key:0,class:"cabinet-list",onScroll:e[18]||(e[18]=t=>o.handleScroll("cabinet-list_address")),id:"cabinet-list_address"},[u.waitingInfo?(a(),i("li",ke," Завантаження даних ")):r("",!0),(a(!0),i(g,null,b(this.FullListPosht,t=>(a(),i("li",{onClick:k(C=>{this.addressValuePosht=t.Description,this.completeAddress=!0},["prevent"]),key:t.Description,value:t.Description},p(t.Description),9,_e))),128))],32))])),[[_,o.onClickOutsideSearchAdd]]):r("",!0)]),s("div",fe,[d(s("input",{onClick:e[19]||(e[19]=t=>{this.cityValue="",this.addressValueDel="",this.addressValuePosht=""}),type:"radio",name:"delivery",id:"user-radio3",value:"Укрпошта","onUpdate:modelValue":e[20]||(e[20]=t=>this.depCheck=t)},null,512),[[f,this.depCheck]]),ge,this.depCheck=="Укрпошта"?d((a(),i("label",be,[h(" Місто "),d(s("input",{onClick:e[21]||(e[21]=t=>{this.completeCity=!1,o.cityList()}),onInput:e[22]||(e[22]=t=>o.cityList()),type:"text",name:"firstName",id:"cabinet-input",class:"cabinet-input","onUpdate:modelValue":e[23]||(e[23]=t=>this.cityValue=t),placeholder:"Оберіть місто"},null,544),[[y,this.cityValue]]),this.completeCity?r("",!0):(a(),i("ul",{key:0,class:"cabinet-list",onScroll:e[24]||(e[24]=t=>o.handleScroll("cabinet-list_city")),id:"cabinet-list_city"},[(a(!0),i(g,null,b(this.citysList,t=>(a(),i("li",{onClick:k(C=>o.cityList(t.citys),["prevent"]),key:t.citys,value:t.citys},p(t.citys),9,Ce))),128))],32))])),[[_,o.onClickOutsideSearch]]):r("",!0),this.depCheck=="Укрпошта"?d((a(),i("label",ve,[h(" Відділення Пошти "),s("p",{onClick:e[25]||(e[25]=t=>this.completeAddress=!this.completeAddress),id:"cabinet-input",class:"cabinet-input cabinet-input_text"},[h(p(this.addressValueDel),1),s("img",{src:D,alt:"",class:S(`${this.completeAddress?"":"cabinet-input_arrow"}`),style:{"margin-left":"auto"}},null,2)]),this.completeAddress?r("",!0):(a(),i("ul",{key:0,class:"cabinet-list",onScroll:e[26]||(e[26]=t=>o.handleScroll("cabinet-list_address")),id:"cabinet-list_address"},[u.waitingInfo?(a(),i("li",Ae," Завантаження даних ")):r("",!0),(a(!0),i(g,null,b(this.FullListPosht,t=>(a(),i("li",{onClick:k(C=>{this.addressValueDel=t.Description,this.completeAddress=!0},["prevent"]),key:t.Description,value:t.Description},p(t.Description),9,Ve))),128))],32))])),[[_,o.onClickOutsideSearchAdd]]):r("",!0)]),s("div",Se,[d(s("input",{type:"radio",name:"delivery",id:"user-radio4",value:"Самовивіз з фабрики","onUpdate:modelValue":e[27]||(e[27]=t=>this.depCheck=t)},null,512),[[f,this.depCheck]]),we,this.depCheck=="Самовивіз з фабрики"?(a(),i("p",De,[Le,h(" вул. Перемоги, 1, с. Старий Любар 13133 ")])):r("",!0),this.depCheck=="Самовивіз з фабрики"?(a(),i("iframe",xe)):r("",!0)])]),s("div",Pe,[Be,Ue,s("div",Ie,[d(s("input",{type:"radio",name:"payment",id:"user-radio5",value:"Онлайн оплата","onUpdate:modelValue":e[28]||(e[28]=t=>this.payCheck=t)},null,512),[[f,this.payCheck]]),Ne]),s("div",Te,[d(s("input",{type:"radio",name:"payment",id:"user-radio6",value:"За реквізитами","onUpdate:modelValue":e[29]||(e[29]=t=>this.payCheck=t)},null,512),[[f,this.payCheck]]),Oe,Ee])]),s("label",je,[d(s("input",{type:"checkbox",id:"callback",value:"Не передзвонюйте мені для уточнення замовлення","onUpdate:modelValue":e[30]||(e[30]=t=>this.agree=t)},null,512),[[L,this.agree]]),Fe,Me]),s("div",We,[Qe,V(B,{toolbar:!1,class:"user-textarea",contentType:"html",content:this.userTextarea,"onUpdate:content":e[31]||(e[31]=t=>this.userTextarea=t)},null,8,["content"])])]),V(U,{routeName:!0,email:this.email,fname:this.fname,sname:this.sname,phone:this.phone,cityValue:this.cityValue,depCheck:this.depCheck,addressValuePosht:this.addressValuePosht,addressValueDel:this.addressValueDel,payCheck:this.payCheck,userTextarea:this.userTextarea,agree:this.agree,cartSum:this.cartSum},null,8,["email","fname","sname","phone","cityValue","depCheck","addressValuePosht","addressValueDel","payCheck","userTextarea","agree","cartSum"])]),this.screenWidth<=680?(a(),i("div",Ke,[s("div",Re,[Je,this.sumAll>0?(a(),i("span",ze," за тарифами перевізника ")):r("",!0),this.sumAll<=0?(a(),i("span",He," безкоштовна ")):r("",!0)]),s("div",qe,[s("p",null,p(this.userCart.length)+" товари на суму ",1),s("span",null,p(o.cartSum)+" грн ",1)]),s("div",Xe,[Ye,s("p",$e,[h(p(o.cartSum)+" ",1),Ze])]),o.cartSum<200?(a(),i("p",Ge,[et,h(" Мінімальна сума замовлення 200 грн ")])):r("",!0),o.cartSum>=200?(a(),i("button",{key:1,onClick:e[32]||(e[32]=k(t=>o.buyItems(),["prevent"])),class:"cart-goods_btn cart-goods_btn_active"},st)):r("",!0),o.cartSum<200?(a(),i("button",it," Оформити замовлення ")):r("",!0),s("label",at,[d(s("input",{type:"checkbox",id:"cart-goods_agreement",value:"approved","onUpdate:modelValue":e[33]||(e[33]=t=>this.agreePolicy=t)},null,512),[[L,this.agreePolicy]]),lt,nt])])):r("",!0)],2)])}const ut=N(W,[["render",ot]]);export{ut as default};