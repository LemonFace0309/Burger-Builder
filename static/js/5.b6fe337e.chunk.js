(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[5],{100:function(e,r,n){e.exports={Order:"Order_Order__3kYZJ"}},105:function(e,r,n){"use strict";n.r(r);var t=n(0),i=n(10),s=n(11),c=n(13),o=n(12),d=n(1),u=n(16),a=n(18),p=n(100),b=n.n(p),j=function(e){var r=Object.keys(e.ingredients).map((function(r){return Object(t.jsxs)("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 5px",border:"1px solid #ccc",padding:"5px"},children:[" ",r+" ("+e.ingredients[r]+")"," "]})}));return Object(t.jsxs)("div",{className:b.a.Order,children:[Object(t.jsxs)("p",{children:["Ingredients: ",Object(t.jsx)("strong",{children:r})]}),Object(t.jsxs)("p",{children:["Price: ",Object(t.jsxs)("strong",{children:["CAD$",Number.parseFloat(e.price).toFixed(2)]})]})]})},l=n(42),O=n(17),h=n(41),x=function(e){Object(c.a)(n,e);var r=Object(o.a)(n);function n(){return Object(i.a)(this,n),r.apply(this,arguments)}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=Object(t.jsx)(h.a,{});return this.props.loading||(e=Object(t.jsx)("div",{children:this.props.orders.map((function(e){return Object(t.jsx)(j,{ingredients:e.ingredients,price:e.price},e.id)}))})),e}}]),n}(d.Component);r.default=Object(u.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,n){return e(O.d(r,n))}}}))(Object(l.a)(x,a.a))}}]);
//# sourceMappingURL=5.b6fe337e.chunk.js.map