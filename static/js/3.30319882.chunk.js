(window["webpackJsonpmy-app"]=window["webpackJsonpmy-app"]||[]).push([[3],{291:function(e,t,a){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__1lBKX",pageStatus:"ProfileInfo_pageStatus__1ObSr"}},292:function(e,t,a){e.exports={profile_content:"Profile_profile_content__1NdEi"}},293:function(e,t,a){e.exports={wrapper:"WideColumn_wrapper__rsFNK",infoBlock:"WideColumn_infoBlock__muins",pageName:"WideColumn_pageName__d61lS"}},294:function(e,t,a){e.exports={postsBlock:"MyPosts_postsBlock__2-_Vk",posts:"MyPosts_posts__1xhhY",postsHeader:"MyPosts_postsHeader__LknIj",wallPosts:"MyPosts_wallPosts__1Z9C-"}},295:function(e,t,a){e.exports={item:"Post_item__jA5FH"}},296:function(e,t,a){e.exports={wrapper:"NarrowColumn_wrapper__2Ekkw"}},297:function(e,t,a){e.exports=a.p+"static/media/pavel-durov.7e094df1.jpg"},298:function(e,t,a){"use strict";a.r(t);var n=a(26),s=a(27),o=a(29),r=a(28),l=a(30),c=a(0),u=a.n(c),i=a(292),p=a.n(i),m=a(293),d=a.n(m),f=a(126),E=a(291),_=a.n(E),h=function(e){var t=Object(c.useState)(!1),a=Object(f.a)(t,2),n=a[0],s=a[1],o=Object(c.useState)(e.status),r=Object(f.a)(o,2),l=r[0],i=r[1];Object(c.useEffect)(function(){i(e.status)},[e.status]);return u.a.createElement("div",{className:_.a.pageStatus},!n&&u.a.createElement("div",null,u.a.createElement("span",{onDoubleClick:function(){s(!0)}},e.status||"")),n&&u.a.createElement("div",null,u.a.createElement("input",{autoFocus:!0,onBlur:function(){s(!1),e.updateStatus(l)},onChange:function(e){i(e.currentTarget.value)},value:l})))},b=a(8),v=a(294),g=a.n(v),k=a(295),w=a.n(k),j=function(e){return u.a.createElement("div",{className:"".concat(w.a.item," page-block")},e.message,u.a.createElement("div",null,u.a.createElement("span",null,"like")," ",e.likesCount))},N=a(124),P=a(125),S=a(36),O=a(32),y=Object(S.a)(10),x=Object(P.a)({form:"postMessageTextArea"})(function(e){return u.a.createElement("form",{onSubmit:e.handleSubmit},u.a.createElement("div",null,u.a.createElement("div",null,u.a.createElement(N.a,{name:"newPostElement",cols:"70",rows:"5",placeholder:"Enter your message",validate:[S.b,y],component:O.b}))),u.a.createElement("div",null,u.a.createElement("button",null,"Add post")))}),B=function(e){var t=e.posts.map(function(e){return u.a.createElement(j,{key:e.id,message:e.message,likesCount:e.likesCount})});return u.a.createElement("div",{className:"".concat(g.a.postsBlock)},u.a.createElement("div",{className:"page-block"},u.a.createElement(x,{onSubmit:function(t){e.addPost(t.newPostElement)}})),u.a.createElement("div",{className:g.a.posts},u.a.createElement("div",{className:"".concat(g.a.postsHeader," page-block")},u.a.createElement("h3",null,"My posts")),u.a.createElement("div",{className:g.a.wallPosts},t)))},C=a(49),I=Object(b.b)(function(e){return{posts:e.profileReducer.posts,newPostText:e.profileReducer.newPostText}},function(e){return{addPost:function(t){return e(Object(C.e)(t))}}})(B),M=function(e){return u.a.createElement("div",{className:d.a.wrapper},u.a.createElement("div",{className:"".concat(d.a.infoBlock," page-block")},u.a.createElement("h2",{className:d.a.pageName},e.profile?e.profile.fullName:""),u.a.createElement(h,{status:e.status,updateStatus:e.updateStatus})),u.a.createElement(I,null))},R=a(296),A=a.n(R),D=a(61),H=a(297),T=a.n(H),U=function(e){return u.a.createElement("div",{className:_.a.descriptionBlock},u.a.createElement("img",{width:"300",height:"326",src:e.profile.photos.large?e.profile.photos.large:T.a,alt:"Pavel Durov"}))},F=function(e){return u.a.createElement("div",{className:A.a.wrapper},u.a.createElement(U,{profile:e.profile,status:e.status,updateStatus:e.updateStatus}))},W=function(e){return e.profile?u.a.createElement("div",{className:p.a.profile_content},u.a.createElement(F,e),u.a.createElement(M,e)):u.a.createElement(D.a,null)},z=a(23),J=(a(92),a(7)),K=function(e){function t(){return Object(n.a)(this,t),Object(o.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.userId;e||(e=this.props.authorizedUserID)||this.props.history.push("/login"),this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"render",value:function(){return u.a.createElement(W,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),t}(u.a.Component);t.default=Object(J.d)(Object(b.b)(function(e){return{profile:e.profileReducer.profile,status:e.profileReducer.status,authorizedUserID:e.authReducer.userId,isAuth:e.authReducer.isAuth}},{getUserProfile:C.g,getStatus:C.f,updateStatus:C.h}),z.f)(K)}}]);
//# sourceMappingURL=3.30319882.chunk.js.map