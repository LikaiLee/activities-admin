webpackJsonp([0],{"T+/8":function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=o("Dd8w"),r=o.n(t),i=o("NYxO");var a={name:"login",data:function(){return{loginForm:{username:"admin",password:"password123"},loginRules:{username:[{required:!0,trigger:"blur",validator:function(e,n,o){["admin","editor"].indexOf(n.trim())>=0?o():o(new Error("请输入正确的用户名"))}}],password:[{required:!0,trigger:"blur",validator:function(e,n,o){n.length<5?o(new Error("密码不能小于5位")):o()}}]},loading:!1}},methods:r()({handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(n){if(!n)return console.log("error submit!!"),!1;e.loading=!0,e.login(e.loginForm).then(function(n){e.loading=!1,e.$router.push({path:"/"})}).catch(function(){e.loading=!1})})}},Object(i.b)(["login"])),computed:r()({},Object(i.c)(["token"]))},l={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"login"},[o("div",{staticClass:"login-cont"},[o("el-card",{staticClass:"box-card"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("i",{staticClass:"el-icon-fa-arrow-circle-right"}),e._v("\n        欢迎登录\n      ")]),e._v(" "),o("el-form",{ref:"loginForm",attrs:{autoComplete:"on",model:e.loginForm,rules:e.loginRules}},[o("el-form-item",{attrs:{prop:"username"}},[o("el-input",{attrs:{autoComplete:"on",placeholder:"用户名","prefix-icon":"el-icon-fa-user"},model:{value:e.loginForm.username,callback:function(n){e.$set(e.loginForm,"username",n)},expression:"loginForm.username"}})],1),e._v(" "),o("el-form-item",{attrs:{prop:"username"}},[o("el-input",{attrs:{autoComplete:"on",placeholder:"密码",type:"password","prefix-icon":"el-icon-fa-eye"},nativeOn:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;e.handleLogin(n)}},model:{value:e.loginForm.password,callback:function(n){e.$set(e.loginForm,"password",n)},expression:"loginForm.password"}})],1),e._v(" "),o("el-form-item",[o("el-button",{staticClass:"btn-submit",attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(n){n.preventDefault(),e.handleLogin(n)}}},[e._v("登录\n            "),o("i",{staticClass:"el-icon-fa-chevron-circle-right el-icon--right"})])],1)],1)],1)],1)])},staticRenderFns:[]};var s=o("VU/8")(a,l,!1,function(e){o("tx1m")},"data-v-1936ad9c",null);n.default=s.exports},tx1m:function(e,n){}});
//# sourceMappingURL=0.4f390661ffb28f1a56e5.js.map