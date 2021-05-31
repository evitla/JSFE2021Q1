(()=>{"use strict";var e={85:(e,t,n)=>{n.r(t)},76:(e,t,n)=>{n.r(t)},80:(e,t,n)=>{n.r(t)},528:(e,t,n)=>{n.r(t)},825:(e,t,n)=>{n.r(t)},702:(e,t,n)=>{n.r(t)},727:(e,t,n)=>{n.r(t)},580:(e,t,n)=>{n.r(t)},868:(e,t,n)=>{n.r(t)},993:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AboutGame=void 0;const i=s(n(579)),a=s(n(477)),r=s(n(665)),o=n(743);t.AboutGame=class{constructor(e,t){this.rootElement=e,this.title=document.createElement("h2"),this.title.classList.add("section__title"),this.content=document.createElement("div"),this.content.classList.add("about__content"),this.userRegister=new o.UserRegisterWindow(t)}render(){this.clear(),this.rootElement.appendChild(this.title),this.rootElement.appendChild(this.content),this.title.innerText="How to play?";const e=[i.default,a.default,r.default],t=[["register-card"],["settings-card"],["game-card"]],n=["","#/settings","#/game"],s=["Register new player in game","Configure your game settings","Start your new game! Remember card positions and match it before times up."];for(let i=0;i<3;i++){const a=document.createElement("div");a.classList.add("about__numbered-card"),a.setAttribute("data-order",`${i+1}`),a.innerHTML=`\n        <p>${s[i]}</p>\n      `,this.content.appendChild(a),this.renderClickableImage(e[i],t[i],n[i])}this.content.appendChild(this.userRegister.element)}clear(){this.content.innerText=""}renderClickableImage(e,t=[],n=""){const s=document.createElement("figure");s.classList.add("about__card");const a=new Image;if(a.src=e,a.alt="",a.classList.add(...t),n){const e=document.createElement("a");e.href=n,e.appendChild(a),s.appendChild(e)}else s.appendChild(a);this.content.appendChild(s),e===i.default&&s.addEventListener("click",(()=>{this.userRegister.render(),this.userRegister.element.classList.add("visible")}))}}},752:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function o(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(229),a=n(70),r=n(981);t.App=class{constructor(e,t,n,s){this.rootElement=e,this.button=t,this.isEventAdded=!1,this.timer=new r.Timer,this.gameWinWindow=new a.GameWinWindow,this.game=new i.Game(this.timer,this.gameWinWindow,n,s)}start(e){return s(this,void 0,void 0,(function*(){if(!e){const e=document.createElement("p");return e.innerHTML='Please, <a class="register-link" href="/#/">register</a> to play',void this.rootElement.appendChild(e)}this.rootElement.appendChild(this.timer.element),this.rootElement.appendChild(this.game.element),this.rootElement.appendChild(this.gameWinWindow.element);const t=yield fetch("./images.json"),n=yield t.json();this.isEventAdded||this.button.addEventListener("click",(()=>{if("start game"===this.button.innerText.toLowerCase())this.button.innerText="Stop Game",this.game.startGame(n,e);else{if(0===this.timer.currentTime)return;this.button.innerText="Start Game",this.game.stopGame()}})),this.isEventAdded=!0}))}}},37:function(e,t){var n=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function o(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.BestScore=void 0,t.BestScore=class{constructor(e){this.rootElement=e,this.title=document.createElement("h2"),this.title.classList.add("section__title"),this.content=document.createElement("div"),this.content.classList.add("best-score__content")}render(e,t){return n(this,void 0,void 0,(function*(){this.clear(),this.rootElement.appendChild(this.title),this.rootElement.appendChild(this.content),this.title.innerText="Best Players",(yield e.getFiltered((()=>!0))).forEach(((e,n)=>{n<t&&this.addRow(e.name,e.email,e.score)}))}))}clear(){this.content.innerText=""}addRow(e,t,n){const s=document.createElement("div");s.classList.add("best-score__row");const i=document.createElement("div");i.classList.add("best-score__row_left");const a=document.createElement("div");a.classList.add("best-score__row_right"),i.innerHTML=`\n      <p class="best-score__user-name">${e}</p>\n      <p class="best-score__user-email">${t}</p>\n    `,a.innerHTML=`\n      <p class="best-score__user-score">\n        Score: <span>${n}</span>\n      </p>\n    `,s.appendChild(i),s.appendChild(a),this.content.appendChild(s)}}},583:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0,t.BaseComponent=class{constructor(e="div",t=[]){this.element=document.createElement(e),this.element.classList.add(...t)}}},113:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0,n(85);const s=n(583);class i extends s.BaseComponent{constructor(e,t=[],n=""){super(n?"a":"button",["btn"]),n&&this.element.setAttribute("href",n),this.element.innerHTML=e,this.element.classList.add(...t)}}t.Button=i},977:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0,n(76);const s=n(583);class i extends s.BaseComponent{constructor(e){super("div",["card-container"]),this.image=e,this.isFlippedToFront=!1,this.cardElement=new s.BaseComponent("div",["card"]),this.matchCard=new s.BaseComponent("div",["card__match"]),this.cardElement.element.innerHTML=`\n      <div class="card__front" style="background-image: url('./images/${e}')"></div>\n      <div class="card__back"></div>\n    `,this.cardElement.element.appendChild(this.matchCard.element),this.element.appendChild(this.cardElement.element)}flipToBack(){return this.isFlippedToFront=!1,this.matchCard.element.classList.remove("card__match_red"),this.flip(!0)}flipToFront(){return this.isFlippedToFront=!0,this.flip(!1)}flip(e){return new Promise((t=>{this.element.classList.toggle("flipped",e),this.element.addEventListener("transitionend",(()=>t()),{once:!0})}))}}t.Card=i},610:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CardsField=void 0,n(80);const s=n(583);class i extends s.BaseComponent{constructor(){super("div",["cards-field"]),this.cards=[]}clear(){this.cards=[],this.element.innerHTML=""}addCards(e){return this.cards=e,this.cards.forEach((e=>this.element.appendChild(e.element))),new Promise((e=>{setTimeout((()=>{this.cards.forEach((e=>e.flipToBack())),e()}),3e3)}))}}t.CardsField=i},582:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Form=void 0,t.Form=class{constructor(e=[]){this.data=null,this.element=document.createElement("form"),this.element.classList.add(...e)}getData(e){e.preventDefault();const t=new FormData(this.element);return this.data={name:`${t.get("first-name")} ${t.get("last-name")}`,email:`${t.get("email")}`,password:`${t.get("password")}`,score:0},this.data}clear(){this.element.innerText=""}}},229:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function o(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const i=n(680),a=n(977),r=n(610);t.Game=class{constructor(e,t,n,s){this.timer=e,this.gameWinWindow=t,this.gameSettings=n,this.database=s,this.isAnimation=!1,this.timeInterval=0,this.totalCards=0,this.foundCards=0,this.numOfMatch=0,this.numOfIncorrectMatch=0,this.cardsField=new r.CardsField,this.element=this.cardsField.element}startGame(e,t){return s(this,void 0,void 0,(function*(){const n=e.findIndex((e=>e.category===this.gameSettings.cardsType)),s=e[n],i=s.images.map((e=>`${s.category}/${e}`)).slice(0,this.gameSettings.numOfUniqueCards),r=i.concat(i).map((e=>new a.Card(e))).sort((()=>Math.random()-.5));r.forEach((e=>{e.element.addEventListener("click",(()=>this.cardHandler(e,t)))})),yield this.cardsField.addCards(r),this.totalCards=i.length,this.timeInterval=this.timer.updateTime()}))}stopGame(){this.foundCards=0,this.numOfMatch=0,this.numOfIncorrectMatch=0,clearInterval(this.timeInterval),this.timer.clear(),this.cardsField.clear()}finishGame(e){return s(this,void 0,void 0,(function*(){this.gameWinWindow.render(this.timer.renderText()),this.gameWinWindow.element.classList.add("visible"),clearInterval(this.timeInterval);const t=yield this.calculateScore(e);yield this.database.updateScore(e,t)}))}calculateScore(e){return s(this,void 0,void 0,(function*(){const t=(yield this.database.getFiltered((t=>t.email===e)))[0].score,n=100*(this.numOfMatch-this.numOfIncorrectMatch)-10*this.timer.currentTime;return n>t?n:t}))}cardHandler(e,t){return s(this,void 0,void 0,(function*(){if(!this.isAnimation&&!e.isFlippedToFront){if(this.isAnimation=!0,yield e.flipToFront(),!this.activeCard)return this.activeCard=e,void(this.isAnimation=!1);this.activeCard.image!==e.image?(this.numOfIncorrectMatch++,this.activeCard.matchCard.element.classList.add("card__match_red"),e.matchCard.element.classList.add("card__match_red"),yield i.delay(500),yield Promise.all([this.activeCard.flipToBack(),e.flipToBack()])):(this.activeCard.matchCard.element.classList.add("card__match_green"),e.matchCard.element.classList.add("card__match_green"),this.foundCards+=1),this.numOfMatch++,this.foundCards===this.totalCards&&this.finishGame(t),this.activeCard=void 0,this.isAnimation=!1}}))}}},366:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0,n(528);const s=n(583),i=n(113),a=n(569);class r extends s.BaseComponent{constructor(e){super("header",["header"]),this.button=new i.Button("Start Game",["primary-btn"],"#/game"),this.render(),this.renderUserImage(e)}render(){const e=document.createElement("div");e.classList.add("logo"),e.innerHTML='<a href="/#/"><h1 class="logo__title">Match Match</h1></a>';const t=new a.Navigation;this.element.appendChild(e),this.element.appendChild(t.element),this.element.appendChild(this.button.element)}renderUserImage(e){const t=document.createElement("figure");t.classList.add("user-image");const n=new Image;n.src=e,n.alt="user",t.appendChild(n),this.element.appendChild(t)}}t.Header=r},569:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Navigation=void 0,n(825);const i=s(n(128)),a=s(n(584)),r=s(n(389)),o=n(583);class d extends o.BaseComponent{constructor(){super("nav",["nav"]),this.list=new o.BaseComponent("ul",["nav__list"]);const e=["","score","settings"],t=[i.default,a.default,r.default];["About Game","Best Score","Game Settings"].forEach(((n,s)=>this.renderListItem(n,`#/${e[s]}`,t[s]))),this.element.appendChild(this.list.element)}renderListItem(e,t,n){const s=new o.BaseComponent("li",["nav__list-item"]);s.element.innerHTML=`\n      <a href="${t}">\n        <img class="nav__icon" src=${n} alt="">\n        ${e}\n      </a>\n    `,this.list.element.appendChild(s.element)}}t.Navigation=d},167:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Input=void 0,t.Input=class{constructor(e,t=[]){this.validate=()=>{var e,t;const n=/^[^(0-9~!@#$%*&()_—+=|:;"'`<>,.?\\/\\\s)]{1,30}$/,s=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,i=/^[a-zA-Z0-9]{8,}/;let a;switch(this.element.type){case"email":a=s;break;case"password":a=i;break;default:a=n}a.test(this.element.value)?null===(t=this.element.parentElement)||void 0===t||t.classList.remove("invalid"):null===(e=this.element.parentElement)||void 0===e||e.classList.add("invalid")},this.element=document.createElement("input"),this.element.classList.add(...t),this.element.type=e.type,e.id&&(this.element.id=e.id),e.name&&(this.element.name=e.name),e.value&&(this.element.value=e.value),this.errorMessage=e.errorMessage||"",e.isRequired&&(this.element.required=e.isRequired)}containerElement(e=""){const t=document.createElement("div"),n=document.createElement("span"),s=document.createElement("label");return t.classList.add("form__row"),t.setAttribute("data-error",this.errorMessage),n.classList.add("form__bar"),s.classList.add("form__label"),s.htmlFor=this.element.id,s.innerText=e,t.appendChild(this.element),t.appendChild(n),t.appendChild(s),t}}},70:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameWinWindow=void 0,n(702);const s=n(583),i=n(113);class a extends s.BaseComponent{constructor(){super("div",["modal"]),this.contentContainer=document.createElement("div"),this.text=document.createElement("p"),this.closeButton=new i.Button("OK",["secondary-btn"])}render(e){this.contentContainer.classList.add("modal-content"),this.text.classList.add("modal-text"),this.text.innerText=`Congratulations! You successfully found all matches on ${e}.`,this.closeButton.element.addEventListener("click",(()=>this.element.classList.remove("visible"))),this.contentContainer.appendChild(this.text),this.contentContainer.appendChild(this.closeButton.element),this.element.appendChild(this.contentContainer)}}t.GameWinWindow=a},743:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{d(s.next(e))}catch(e){a(e)}}function o(e){try{d(s.throw(e))}catch(e){a(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}d((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.UserRegisterWindow=void 0,n(702);const i=n(583),a=n(986);class r extends i.BaseComponent{constructor(e){super("div",["modal"]),this.userData=null,this.form=new a.RegistrationForm,this.form.submitButton.element.addEventListener("click",(t=>s(this,void 0,void 0,(function*(){if(!this.form.areInputsValid())return;const n=this.form.getData(t);this.userData=yield e.write(n),window.localStorage.setItem("email",this.userData.email),this.element.classList.remove("visible")})))),this.form.cancelButton.element.addEventListener("click",(()=>{this.element.classList.remove("visible"),this.form.clearInputs(),this.form.clear()}))}render(){const e=document.createElement("div");e.classList.add("modal-content");const t=document.createElement("h2");t.classList.add("section__title"),t.innerText="Register New Player",this.form.render(),this.element.appendChild(e),e.appendChild(t),e.appendChild(this.form.element)}}t.UserRegisterWindow=r},986:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RegistrationForm=void 0,n(727);const s=n(582),i=n(167);class a extends s.Form{constructor(){super(["form"]),this.submitButton=new i.Input({type:"submit",value:"Add User"},["btn","secondary-btn","form__submit"]),this.cancelButton=new i.Input({type:"submit",value:"Cancel"},["btn","primary-btn","form__submit"]),this.firstNameInput=new i.Input({type:"text",id:"first-name",name:"first-name",errorMessage:"Invalid name",isRequired:!0},["form__input"]),this.firstNameInput.element.addEventListener("input",this.firstNameInput.validate),this.lastNameInput=new i.Input({type:"text",id:"last-name",name:"last-name",errorMessage:"Invalid name",isRequired:!0},["form__input"]),this.lastNameInput.element.addEventListener("input",this.lastNameInput.validate),this.emailInput=new i.Input({type:"email",id:"email",name:"email",errorMessage:"Invalid email address",isRequired:!0},["form__input"]),this.emailInput.element.addEventListener("input",this.emailInput.validate),this.passwordInput=new i.Input({type:"password",id:"password",name:"password",errorMessage:"Password must contain at least 8 characters",isRequired:!0},["form__input"]),this.passwordInput.element.addEventListener("input",this.passwordInput.validate)}render(){const e=this.firstNameInput.containerElement("First Name"),t=this.lastNameInput.containerElement("Last Name"),n=this.emailInput.containerElement("E-mail"),s=this.passwordInput.containerElement("Password"),i=document.createElement("div");i.classList.add("form__row"),i.appendChild(this.submitButton.element),i.appendChild(this.cancelButton.element),this.element.appendChild(e),this.element.appendChild(t),this.element.appendChild(n),this.element.appendChild(s),this.element.appendChild(i)}areInputsValid(){return[this.firstNameInput,this.lastNameInput,this.emailInput,this.passwordInput].every((e=>a.isInputValid(e)))}static isInputValid(e){var t,n;return!(!e.element.value||(null===(t=e.element.parentElement)||void 0===t?void 0:t.classList.contains("invalid")))||(null===(n=e.element.parentElement)||void 0===n||n.classList.add("invalid"),!1)}clearInputs(){this.firstNameInput.element.value="",this.lastNameInput.element.value="",this.emailInput.element.value="",this.passwordInput.element.value=""}}t.RegistrationForm=a},981:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Timer=void 0,n(580);const s=n(583);class i extends s.BaseComponent{constructor(){super("div",["timer"]),this.currentTime=0,this.minutes=0,this.seconds=0,this.minutesText=document.createElement("span"),this.secondsText=document.createElement("span"),this.render()}updateTime(){return window.setInterval((()=>{this.currentTime++,this.render()}),1e3)}clear(){this.currentTime=0,this.render()}renderText(){return 0===this.minutes?`${this.seconds} seconds`:1===this.minutes?`1 minute and ${this.seconds} seconds`:`${this.minutes} minutes and ${this.seconds} seconds`}render(){const e=e=>e.toString().padStart(2,"0");this.minutes=Math.floor(this.currentTime/60),this.seconds=this.currentTime%60,this.minutesText.innerText=`${e(this.minutes)}:`,this.secondsText.innerText=e(this.seconds),this.element.appendChild(this.minutesText),this.element.appendChild(this.secondsText)}}t.Timer=i},471:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Database=void 0,t.Database=class{constructor(e,t,n){this.dbName=e,this.store=t,this.dbVersion=n,this.db=null}init(){const e=window.indexedDB.open(this.dbName,this.dbVersion);e.onupgradeneeded=()=>{this.db=e.result;const t=this.db.createObjectStore(this.store,{keyPath:"id",autoIncrement:!0});t.createIndex("name","name"),t.createIndex("email","email",{unique:!0}),t.createIndex("score","score")},e.onsuccess=()=>{this.db=e.result}}write(e){return new Promise((t=>{var n;const s=null===(n=this.db)||void 0===n?void 0:n.transaction(this.store,"readwrite"),i=null==s?void 0:s.objectStore(this.store);null==i||i.put(e),s&&(s.oncomplete=()=>{t(e)})}))}updateScore(e,t){return new Promise((n=>{var s;const i=null===(s=this.db)||void 0===s?void 0:s.transaction(this.store,"readwrite"),a=null==i?void 0:i.objectStore(this.store),r=null==a?void 0:a.index("email").openCursor(null,"next");r&&(r.onsuccess=()=>{const s=null==r?void 0:r.result;if(s){const i=s.value;i.email===e&&(i.score=t,s.update(i).onsuccess=()=>{n(i)}),s.continue()}})}))}getAll(){return new Promise((e=>{var t;const n=null===(t=this.db)||void 0===t?void 0:t.transaction(this.store,"readonly"),s=null==n?void 0:n.objectStore(this.store),i=null==s?void 0:s.getAll();n&&(n.oncomplete=()=>{i&&e(i.result)})}))}getFiltered(e){return new Promise((t=>{var n;const s=null===(n=this.db)||void 0===n?void 0:n.transaction(this.store,"readonly"),i=null==s?void 0:s.objectStore(this.store),a=[];if(i){const t=null==i?void 0:i.index("score").openCursor(null,"prev");t&&(t.onsuccess=()=>{const n=null==t?void 0:t.result;if(n){const t=n.value;e(t)&&a.push(t),n.continue()}})}s&&(s.oncomplete=()=>{t(a)})}))}}},728:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameSettings=void 0,t.GameSettings=class{constructor(e){this.rootElement=e,this.cardsType="animals",this.numOfUniqueCards=6,this.content=document.createElement("div"),this.content.classList.add("settings__content"),this.cardsTypeInput=document.createElement("input"),this.difficultyInput=document.createElement("input"),this.cardsTypeInput.addEventListener("input",(()=>{this.cardsType=this.cardsTypeInput.value})),this.difficultyInput.addEventListener("input",(()=>{this.numOfUniqueCards=+this.difficultyInput.value[0]}))}render(){this.clear(),this.rootElement.appendChild(this.content),this.renderList(this.cardsTypeInput,"Game cards",["animals","cars","music"],"cards","cards","cards-list","select games card type"),this.renderList(this.difficultyInput,"Difficulty",["4x4","6x6","8x8"],"difficulty","difficulty","difficulty-list","select game type")}clear(){this.content.innerText=""}renderList(e,t,n,s,i,a,r){const o=document.createElement("div");o.classList.add("settings__container");const d=document.createElement("label"),l=document.createElement("datalist");d.textContent=t,d.htmlFor=i,e.id=s,e.name=i,e.setAttribute("list",a),e.placeholder=r,l.id=a,n.forEach((e=>{const t=document.createElement("option");t.value=e,l.appendChild(t)})),o.appendChild(d),o.appendChild(e),o.appendChild(l),this.content.appendChild(o)}}},607:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(868);const i=s(n(232)),a=n(752),r=n(366),o=s(n(873)),d=n(993),l=n(728),c=n(471),h=n(37);window.onload=()=>{const e=new r.Header(i.default),t=document.createElement("main"),n=new l.GameSettings(t),s=new c.Database("evitla","user-data");s.init();const m=new h.BestScore(t),u=new a.App(t,e.button.element,n,s),p=new d.AboutGame(t,s);p.render(),document.body.appendChild(e.element),document.body.appendChild(t);const v=new o.default({mode:"hash",root:"/"}),f=()=>{u.game.stopGame(),e.button.element.innerText="Start Game",t.innerText=""};v.add(/score/,(()=>{f(),m.render(s,10)})).add(/settings/,(()=>{f(),n.render()})).add(/game/,(()=>{t.innerText="";const e=window.localStorage.getItem("email")||"";u.start(e)})).add("",(()=>{f(),p.render()}))}},873:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this.routes=[],this.current="",this.add=(e,t)=>(this.routes.push({path:e,cb:t}),this),this.remove=e=>{for(let t=0;t<this.routes.length;t++)if(this.routes[t].path===e)return this.routes.slice(t,1),this},this.flush=()=>(this.routes=[],this),this.clearSlashes=e=>e.toString().replace(/\/$/,"").replace(/^\//,""),this.getFragment=()=>{let e="";if("history"===this.mode)e=this.clearSlashes(decodeURI(window.location.pathname+window.location.search)),e=e.replace(/\?(.*)$/,""),e="/"!==this.root?e.replace(this.root,""):e;else{const t=window.location.href.match(/#(.*)$/);e=t?t[1]:""}return this.clearSlashes(e)},this.navigate=(e="")=>("history"===this.mode?window.history.pushState(null,"",this.root+this.clearSlashes(e)):window.location.href=`${window.location.href.replace(/#(.*)$/,"")}#${e}`,this),this.interval=()=>{this.current!==this.getFragment()&&(this.current=this.getFragment(),this.routes.some((e=>{const t=this.current.match(e.path);return!!t&&(t.shift(),e.cb.apply({},[t]),t)})))},this.mode=e.mode,this.root=e.root,window.addEventListener("hashchange",this.interval,!1)}}},680:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.delay=void 0,t.delay=function(e){return new Promise((t=>{setTimeout(t,e)}))}},232:(e,t,n)=>{e.exports=n.p+"assets/65dd8edbfbb147d37fa8.png"},665:(e,t,n)=>{e.exports=n.p+"assets/ddca791335cd5f26858a.png"},128:(e,t,n)=>{e.exports=n.p+"assets/a8e77c5a82716350be74.svg"},584:(e,t,n)=>{e.exports=n.p+"assets/7507cb90ff21ea910b28.svg"},389:(e,t,n)=>{e.exports=n.p+"assets/76a25628ba2212535c33.svg"},579:(e,t,n)=>{e.exports=n.p+"assets/0ba661db90fb9c329ce2.png"},477:(e,t,n)=>{e.exports=n.p+"assets/dc7ff07f63567f5d44a8.png"}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,n),a.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var s=t.getElementsByTagName("script");s.length&&(e=s[s.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n(607)})();