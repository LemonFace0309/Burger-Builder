(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[5],{104:function(e,r,n){"use strict";n.r(r);var t=n(0),i=n(1),c=n(5),s=n(14),d=n(99),o=n.n(d),u=function(e){var r=Object.keys(e.ingredients).map((function(r){return Object(t.jsx)("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 5px",border:"1px solid #ccc",padding:"5px"},children:r+" ("+e.ingredients[r]+")"},r)}));return Object(t.jsxs)("div",{className:o.a.Order,children:[Object(t.jsxs)("p",{children:["Ingredients: ",Object(t.jsx)("strong",{children:r})]}),Object(t.jsxs)("p",{children:["Price: ",Object(t.jsxs)("strong",{children:["CAD$",Number.parseFloat(e.price).toFixed(2)]})]})]})},a=n(41),b=n(13),j=n(40);r.default=Object(c.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,n){return e(b.d(r,n))}}}))(Object(a.a)((function(e){var r=e.onFetchOrders,n=e.token,c=e.userId;Object(i.useEffect)((function(){r(n,c)}),[r,n,c]);var s=Object(t.jsx)(j.a,{});return e.loading||(s=Object(t.jsx)("div",{children:e.orders.map((function(e){return Object(t.jsx)(u,{ingredients:e.ingredients,price:e.price},e.id)}))})),s}),s.a))},99:function(e,r,n){e.exports={Order:"Order_Order__3kYZJ"}}}]);
//# sourceMappingURL=5.82670624.chunk.js.map