(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[20],{888:function(e,t,c){"use strict";c.r(t);var n=c(680),o=c(1),a=c(679),r=c(14),s=function(){var e=Object(o.useState)(""),t=Object(n.a)(e,2),c=t[0],a=t[1],s=Object(o.useState)(""),i=Object(n.a)(s,2),l=i[0],j=i[1];return Object(o.useEffect)((function(){var e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=["January","February","March","April","May","June","July","August","September","October","November","December"],c=setInterval((function(){var c=new Date,n=e[c.getDay()],o=c.getDate(),r=t[c.getMonth()],s=c.getFullYear(),i="".concat(n,", ").concat(o," ").concat(r," ").concat(s);j(i);var l=c.toLocaleTimeString(),u=("0"+l.slice(0,-9)).slice(-2),b=l.slice(-8,-6),d=l.slice(-2).toLocaleLowerCase(),h="".concat(u,":").concat(b," ").concat(d);a(h)}),1e3);return function(){clearInterval(c)}}),[]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h5",{className:"mt-3 mb-4",children:l}),Object(r.jsx)("h4",{className:"display-3",style:{fontWeight:"600"},children:c})]})},i=c(878),l=c(889),j=c(890),u=c(879),b=(c(745),c(686)),d=c.n(b),h=c(746),O=c(747),m=d.a.icon({iconSize:[25,41],iconAnchor:[10,41],popupAnchor:[2,-40],iconUrl:h.a,shadowUrl:O.a});d.a.Marker.prototype.options.icon=m;var x=function(e){var t=e.workLocation,c=e.userLocation;return Object(r.jsx)(a.f,{style:{borderRadius:"10px",boxShadow:"0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19)"},children:Object(r.jsx)(a.g,{className:"p-1",style:{padding:0},children:Object(r.jsxs)(i.a,{center:t,zoom:16,minZoom:0,maxZoom:20,scrollWheelZoom:!1,style:{height:"50vh",width:"100%"},children:[Object(r.jsx)(l.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(r.jsx)(j.a,{center:t,pathOptions:{fillColor:"blue"},radius:100}),c?Object(r.jsx)(u.a,{position:c,icon:m}):Object(r.jsx)(r.Fragment,{})]})})})},p=c(708),g=c(709),f=c(880),k=c(881),y=d.a.icon({iconSize:[25,41],iconAnchor:[10,41],popupAnchor:[2,-40],iconUrl:h.a,shadowUrl:O.a});function S(e){var t=e.workLocation,c=e.setWorkLocation,a=Object(o.useState)(!1),s=Object(n.a)(a,2),i=s[0],l=s[1],j=Object(o.useRef)(null),b=Object(o.useMemo)((function(){return{dragend:function(){var e=j.current;null!=e&&c(e.getLatLng())}}}),[c]),d=Object(o.useCallback)((function(){l((function(e){return!e}))}),[]),h=Object(f.a)({click:function(){h.locate()},locationfound:function(e){c(e.latlng),h.flyTo(e.latlng,16)}});return Object(r.jsx)(u.a,{draggable:i,eventHandlers:b,position:t,ref:j,children:Object(r.jsx)(k.a,{minWidth:90,children:Object(r.jsx)("span",{style:{cursor:"pointer"},onClick:d,children:i?"Marker is draggable":"Click here to make marker draggable"})})})}d.a.Marker.prototype.options.icon=y;var L=function(e){var t=e.isLocationSet,c=e.setIsLocationSet,s=e.workLocation,j=e.setWorkLocation,u=e.setMap,b=e.indonesiaLocation,d=Object(o.useState)(!t),h=Object(n.a)(d,2),O=h[0],m=h[1];return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(a.K,{show:O,size:"lg",children:[Object(r.jsx)(a.N,{children:Object(r.jsx)(a.O,{children:"Set Working Location"})}),Object(r.jsxs)(a.L,{children:[Object(r.jsxs)("ul",{className:"mb-2 ml-1",style:{listStyleType:"none",padding:0,margin:0},children:[Object(r.jsxs)("li",{className:"mt-1 text-primary",children:[Object(r.jsx)(p.a,{icon:g.a,className:"mr-1"}),"Click anywhere to get your location"]}),Object(r.jsxs)("li",{className:"mt-1 text-primary",children:[Object(r.jsx)(p.a,{icon:g.a,className:"mr-1"}),"Click the marker to make it draggable"]})]}),Object(r.jsxs)(i.a,{whenCreated:u,center:b,zoom:4,scrollWheelZoom:!1,style:{height:"50vh",width:"100%"},children:[Object(r.jsx)(l.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(r.jsx)(S,{workLocation:s,setWorkLocation:j})]})]}),Object(r.jsx)(a.M,{children:Object(r.jsx)(a.e,{color:"dark",onClick:function(){m(!O),c(!t)},children:"Set Location"})})]})})},v=function(e){var t=e.isCheckedIn,c=e.isLocationSet,s=e.isCheckedOut,i=e.checkInOutHandler,l=Object(o.useState)(!1),j=Object(n.a)(l,2),u=j[0],b=j[1],d=Object(o.useState)({}),h=Object(n.a)(d,2),O=h[0],m=h[1],x=function(e,t,c,n){b(!u),m({color:e,message:t,colorMessage:c,button:n})};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(a.P,{className:"justify-content-center mt-2",children:[Object(r.jsx)(a.k,{md:"4",className:"mt-2",children:Object(r.jsxs)(a.e,{block:!0,shape:"pill",className:"py-2",color:"primary",disabled:t||!c,onClick:function(){x("primary","Sure to check in?","text-primary text-center","Check in")},children:[Object(r.jsx)(p.a,{icon:g.c}),"\xa0Check In"]})}),Object(r.jsx)(a.k,{md:"4",className:"mt-2",children:Object(r.jsxs)(a.e,{block:!0,shape:"pill",disabled:s,className:"py-2",color:"danger",onClick:function(){x("danger","Sure to check out?","text-danger text-center","Check out")},children:["Check Out \xa0",Object(r.jsx)(p.a,{icon:g.d})]})})]}),Object(r.jsxs)(a.K,{size:"sm",show:u,onClose:function(){return b(!u)},color:O.color,children:[Object(r.jsx)(a.L,{className:O.colorMessage,children:Object(r.jsx)("h4",{children:O.message})}),Object(r.jsxs)(a.M,{children:[Object(r.jsx)(a.e,{color:O.color,onClick:function(){b(!u),i()},children:O.button})," ",Object(r.jsx)(a.e,{color:"secondary",onClick:function(){return b(!u)},children:"Cancel"})]})]})]})};t.default=function(){var e=Object(o.useState)(!1),t=Object(n.a)(e,2),c=t[0],i=t[1],l=Object(o.useState)(!0),j=Object(n.a)(l,2),u=j[0],b=j[1],d=Object(o.useState)(null),h=Object(n.a)(d,2),O=h[0],m=h[1],p=Object(o.useState)(!1),g=Object(n.a)(p,2),f=g[0],k=g[1],y={lat:-2.548926,lng:118.0148634},S=Object(o.useState)(y),w=Object(n.a)(S,2),C=w[0],M=w[1],N=Object(o.useState)(null),I=Object(n.a)(N,2),W=I[0],z=I[1],F=Object(o.useState)(null),A=Object(n.a)(F,2),T=A[0],E=A[1],J=function(){if(navigator.geolocation)return new Promise((function(e,t){navigator.geolocation.getCurrentPosition(e)}));alert("Geolocation is not supported by this browser.")},D=function(e,t,c,n){var o=.017453292519943295,a=Math.cos,r=.5-a((c-e)*o)/2+a(e*o)*a(c*o)*(1-a((n-t)*o))/2;return 12742e3*Math.asin(Math.sqrt(r))};return Object(o.useEffect)((function(){window.dispatchEvent(new Event("resize"))}),[]),Object(o.useEffect)((function(){J().then((function(e){var t=e.coords,c=(t=void 0===t?{}:t).latitude,n=t.longitude;M({lat:c,lng:n}),T&&T.flyTo([c,n],16)})).catch()}),[T]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(L,{isLocationSet:f,setIsLocationSet:k,workLocation:C,setWorkLocation:M,setMap:E,indonesiaLocation:y}),Object(r.jsxs)(a.P,{children:[Object(r.jsx)(a.k,{xs:"12",sm:"12",md:"8",children:Object(r.jsx)(a.f,{style:{borderRadius:"10px",boxShadow:"0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19)"},children:Object(r.jsxs)(a.g,{className:"text-center",children:[Object(r.jsx)(s,{}),Object(r.jsx)("p",{className:"mt-2 text-danger",children:O}),Object(r.jsx)(v,{isCheckedIn:c,isLocationSet:f,isCheckedOut:u,checkInOutHandler:function(){J().then((function(e){var t=e.coords.latitude,n=e.coords.longitude,o=C.lat,a=C.lng;z({lat:t,lng:n});var r=parseInt(D(t,n,o,a));r>100?m("Your distance from the office is ".concat(r-100,"m from what is allowed")):(i(!c),b(!u))}))}})]})})}),Object(r.jsx)(a.k,{xs:"12",sm:"12",md:"4",children:f?Object(r.jsx)(x,{workLocation:C,userLocation:W}):Object(r.jsx)(r.Fragment,{})})]})]})}}}]);
//# sourceMappingURL=20.39bb5fd5.chunk.js.map