(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{375:function(t,e,n){var content=n(530);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(27).default)("0746a308",content,!0,{sourceMap:!1})},434:function(t,e){},436:function(t,e){},447:function(t,e){},449:function(t,e){},474:function(t,e){},476:function(t,e){},477:function(t,e){},483:function(t,e){},485:function(t,e){},503:function(t,e){},506:function(t,e){},522:function(t,e){},525:function(t,e){},529:function(t,e,n){"use strict";var r=n(375);n.n(r).a},530:function(t,e,n){(e=n(26)(!1)).push([t.i,".item[data-v-1a6e8d1e]{margin:4rem .75rem .75rem;text-align:left}.item__input-rows[data-v-1a6e8d1e]{margin:.25rem 0 .25rem .5rem}.item__input-row[data-v-1a6e8d1e]{display:flex;margin-bottom:.25rem}.item__input-actions[data-v-1a6e8d1e]{margin-left:.5rem}.item__adds[data-v-1a6e8d1e]{width:100%}.item__add[data-v-1a6e8d1e]{width:33.333%}.item__actions[data-v-1a6e8d1e]{margin-top:1rem;display:flex;justify-content:center}.item__save[data-v-1a6e8d1e]{width:50%}",""]),t.exports=e},540:function(t,e,n){"use strict";n.r(e);n(28),n(12),n(50),n(21);var r=n(3),o=(n(94),n(196),n(427)),c=n.n(o),l={name:"EditDay",data:function(){return{dayCopy:{},dialogSearchVisible:!1,dialogSearchMealType:void 0}},computed:{dayKey:function(){return this.$route.params.key},day:function(){return this.$store.getters.day(this.dayKey)},suggestions:function(){return this.$store.getters.suggestions}},created:function(){this.$store.dispatch("activateClosableHeader");var t=this.dayKey.match(/^\d{4}-\d{2}-\d{2}$/g),e=isNaN(new Date(this.dayKey).getTime());!t&&e&&this.$router.replace({path:"/"}),this.dayCopy=JSON.parse(JSON.stringify(this.day))},beforeDestroy:function(){this.$store.dispatch("deactivateClosableHeader")},methods:{displayStringFirstCap:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},addItem:function(t){var e=this;this.dayCopy[t].push("");var n=this.dayCopy[t].length-1;setTimeout((function(){e.$refs[t+n][0].focus()}),0)},addRandomItem:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!((r=e.suggestions[t].length)<1)){n.next=5;break}e.addItem(t),n.next=15;break;case 5:if(1!==r){n.next=9;break}n.t0=0,n.next=12;break;case 9:return n.next=11,c()(0,r-1);case 11:n.t0=n.sent;case 12:o=n.t0,e.dayCopy[t].push(e.suggestions[t][o]),e.update();case 15:case"end":return n.stop()}}),n)})))()},update:function(){for(var t=JSON.parse(JSON.stringify(this.dayCopy)),e=0,n=Object.keys(t);e<n.length;e++){var r=n[e],o=t[r];o=o.map((function(t){return t.replace(/\s+/g," ").trim()})),t[r]=o.filter((function(t){return""!==t}))}this.$store.dispatch("saveDay",{day:t,dayKey:this.dayKey})},deleteItem:function(t,e){this.dayCopy[t].splice(e,1),this.update()},searchItem:function(t){this.dialogSearchMealType=t,this.dialogSearchVisible=!0},handleTableRowClick:function(t){this.dayCopy[this.dialogSearchMealType].push(t.key),this.dialogSearchVisible=!1,this.update()},close:function(){window.History.length>0?this.$router.replace("/"):this.$router.push("/")}}},d=(n(529),n(15)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",{staticClass:"item"},[t._l(t.dayCopy,(function(e,r){return n("div",{key:r},[n("div",[t._v(t._s(t.displayStringFirstCap(r)))]),t._v(" "),n("div",{staticClass:"item__input-rows"},[t._l(e,(function(e,o){return n("div",{key:o,staticClass:"item__input-row"},[n("el-input",{ref:r+o,refInFor:!0,attrs:{type:"textarea",autosize:"",resize:"none",placeholder:"Please input"},on:{change:t.update},model:{value:t.dayCopy[r][o],callback:function(e){t.$set(t.dayCopy[r],o,e)},expression:"dayCopy[mealKey][index]"}}),t._v(" "),n("div",{staticClass:"item__input-actions"},[n("el-button",{attrs:{size:"small",icon:"el-icon-delete"},on:{click:function(e){return t.deleteItem(r,o)}}})],1)],1)})),t._v(" "),n("el-button-group",{staticClass:"item__adds"},[n("el-button",{staticClass:"item__add",attrs:{size:"small",icon:"el-icon-plus",round:""},on:{click:function(e){return t.addItem(r)}}}),t._v(" "),n("el-button",{staticClass:"item__add",attrs:{size:"small",icon:"el-icon-search",round:""},on:{click:function(e){return t.searchItem(r)}}}),t._v(" "),n("el-button",{staticClass:"item__add",attrs:{size:"small",icon:"el-icon-magic-stick",round:""},on:{click:function(e){return t.addRandomItem(r)}}})],1)],2)])})),t._v(" "),n("div",{staticClass:"item__actions"},[n("el-button",{staticClass:"item__save",attrs:{size:"small",type:"primary"},on:{click:t.close}},[t._v("\n      Save\n    ")])],1),t._v(" "),t.dialogSearchMealType?n("el-dialog",{attrs:{title:"Select a Meal",visible:t.dialogSearchVisible,fullscreen:!0},on:{"update:visible":function(e){t.dialogSearchVisible=e}}},[n("el-table",{attrs:{data:t.suggestions[t.dialogSearchMealType].map((function(t){var e={};return e.key=t,e})),"row-class-name":"table__row",stripe:!0},on:{"row-click":t.handleTableRowClick}},[n("el-table-column",{attrs:{prop:"key"}})],1)],1):t._e()],2)}),[],!1,null,"1a6e8d1e",null);e.default=component.exports}}]);