(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[4],{100:function(e,t,a){e.exports={Auth:"Auth_Auth__1Zul_"}},101:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a(21),r=a(12),u=a(16),l=a(1),c=a(5),s=a(4),o=a(100),d=a.n(o),h=a(94),j=a(95),b=a(31),p=a(40),v=a(13);t.default=Object(c.b)((function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!==e.auth.token,burgerInProgress:e.burgerBuilder.inProgress,authRedirectPath:e.auth.authRedirectPath}}),(function(e){return{onSignup:function(t,a,n){return e(v.b(t,a,n))},onSetAuthRedirectPath:function(){return e(v.j("/"))}}}))((function(e){var t=Object(l.useState)({email:{elType:"input",elConfig:{type:"email",placeholder:"Email Adress"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elType:"input",elConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}}),a=Object(u.a)(t,2),c=a[0],o=a[1],v=Object(l.useState)(!0),g=Object(u.a)(v,2),O=g[0],f=g[1],m=e.burgerInProgress,x=e.authRedirectPath,_=e.onSetAuthRedirectPath;Object(l.useEffect)((function(){m||"/"===x||_()}),[m,x,_]);var I=Object.keys(c).map((function(e){var t=c[e];return Object(n.jsx)(j.a,{elType:t.elType,elConfig:t.elConfig,value:t.value,invalid:!t.valid,touched:t.touched,changed:function(t){return function(e,t){var a=Object(r.a)(Object(r.a)({},c),{},Object(i.a)({},t,Object(r.a)(Object(r.a)({},c[t]),{},{value:e.target.value,valid:Object(h.a)(e.target.value,c[t].validation),touched:!0})));o(a)}(t,e)}},e)})),y=Object(n.jsx)("h3",{children:"Signup"});O||(y=Object(n.jsxs)("div",{children:[Object(n.jsx)("h3",{children:"Login"}),Object(n.jsx)("p",{children:"Email: test@test.com"}),Object(n.jsx)("p",{children:"Password: 123456"})]}));var C=null;if(e.error){var P=e.error.message.split("_").join(" ");C=Object(n.jsx)("p",{style:{color:"red"},children:Object(n.jsx)("strong",{children:P})})}var S=Object(n.jsx)(p.a,{});e.loading||(S=Object(n.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.onSignup(c.email.value,c.password.value,O)},children:[I,Object(n.jsx)(b.a,{btnType:"Success",children:"Submit"})]}));var E=null;return e.isAuthenticated&&(E=Object(n.jsx)(s.a,{to:e.authRedirectPath})),Object(n.jsxs)("div",{className:d.a.Auth,children:[E,y,C,S,Object(n.jsxs)(b.a,{btnType:"Danger",clicked:function(){f(!O)},children:["Switch to ",O?"Login":"Signup"]})]})}))},94:function(e,t,a){"use strict";t.a=function(e,t){if(t.required&&""===e.trim())return!1;if(t.minLength&&e.length<t.minLength)return!1;if(t.maxLength&&e.length>t.maxLength)return!1;if(t.isEmail&&!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e))return!1;return!(t.isNumeric&&!/^\d+$/.test(e))}},95:function(e,t,a){"use strict";var n=a(0),i=a(12),r=(a(1),a(96)),u=a.n(r);t.a=function(e){var t=null,a=null,r=[u.a.InputEl];switch(e.invalid&&e.touched&&(r.push(u.a.Invalid),a=Object(n.jsx)("p",{className:u.a.ValidationError,children:"Please enter a valid value!"})),e.elType){case"input":t=Object(n.jsx)("input",Object(i.a)(Object(i.a)({className:r.join(" ")},e.elConfig),{},{value:e.value,onChange:e.changed}));break;case"textarea":t=Object(n.jsx)("textarea",Object(i.a)(Object(i.a)({className:r.join(" ")},e.elConfig),{},{value:e.value,onChange:e.changed}));break;case"select":t=Object(n.jsx)("select",{className:r.join(" "),value:e.value,onChange:e.changed,children:e.elConfig.options.map((function(e){return Object(n.jsx)("option",{value:e.value,children:e.displayValue},e.value)}))});break;default:t=Object(n.jsx)("input",Object(i.a)(Object(i.a)({className:r.join(" ")},e.elConfig),{},{value:e.value,onChange:e.changed}))}return Object(n.jsxs)("div",{className:u.a.Input,children:[Object(n.jsx)("label",{className:u.a.Label,children:e.label}),t,a]})}},96:function(e,t,a){e.exports={Input:"Input_Input__3r5Ke",Label:"Input_Label__1qyHr",InputEl:"Input_InputEl__2MIlF",Invalid:"Input_Invalid__16Mis",ValidationError:"Input_ValidationError__qMR97"}}}]);
//# sourceMappingURL=4.9126ea35.chunk.js.map