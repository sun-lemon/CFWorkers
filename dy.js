addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    }
  }
  const vuehtml = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><link rel='shortcut icon' href='https://www.douyu.com/favicon.ico'><title>斗鱼直播免登录订阅</title><style>body {display: flex;flex-flow: wrap;justify-content: space-between;background: black;color: #CCCCFF;}#dytools {width: 100%;display: flex;flex-flow: column;}.center {text-align: center;}.live {display: flex;flex-wrap: wrap;justify-content: space-around;}.liveroom {display: inline-block;width: 320px;margin: 8px;text-align: center;}.name {margin-right: 60px;}img:hover {transform: scale(1.6);}a {color: #CCCCFF; text-decoration: none;width: 100%;display: inline-block;}p {margin: 6px 0;}.now, .nopic {width: 100%}.gcolumn, .nolivetitle {padding-left: 0;box-sizing: border-box;}.gcolumn li {display: inline-flex;width: 220px;border: 1px solid #234;border-radius: 8px;margin: 10px;padding-left: 30px;box-sizing: border-box;height: 45px;line-height: 45px;}.nolivetitle li {display: inline-flex;margin: 8px 16px;padding-left: 30px;border-radius: 8px;border: 1px solid;height: 45px;line-height: 45px;box-sizing: border-box;overflow: hidden;}.delete {width: 36px;float: right;display: inline-block;opacity: 0;border-radius: 0 8px 8px 0;cursor: pointer;}.delete:hover {opacity: 1;background: red;}.saveall, .addrid {position: fixed;bottom: 1em;background: #ccccff;color: black;line-height: 36px;font-size: 18px;padding: 0 20px;border-radius: 12px;opacity: 0.3;box-sizing: border-box;max-width: 45%;text-align: center;}.saveall:hover, .addrid:hover{opacity: 1;}.saveall {right: 1em;cursor: pointer;width: 240px;}.addrid {left: 1em;display: flex;flex-wrap: wrap;align-items: center;justify-content: space-around;}.addrid_input {outline: none;border: none;width: 0;opacity: 0;height: 36px;font-size: 20px;border-radius: 8px;padding: 0 8px;text-align: center;}.addrid_span, .addfav_span{cursor: pointer;}.fadein {animation: fadein 0.6s linear;width: 120px;opacity: 1;width: 120px;}@keyframes fadein {0%{ opacity: 0;width: 0;}100%{ opacity: 1;width: 120px;}}.rotate {animation:rotate 1.2s linear infinite;display: inline-block;margin-right: 1em;}@keyframes rotate {0%{ transform: rotate(0deg);}50%{ transform: rotate(180deg);}100%{ transform: rotate(360deg);}}.gcolumn .addfav {width: fit-content;padding: 0 1em;align-items: center;}input {outline: none;border: none;font-size: 18px;height: 36px;border-radius: 8px;padding: 0 8px;text-align: center;}.favname {width: 120px;}.favurl {width: 260px;margin-right: 1em;}</style><body><div id="dytools"><h2 class='now center'><span v-if="wait" class="rotate">.</span>{{ now }}</h2><div class="live"><div class='liveroom' v-for="room in lives"><a target='_blank' :href="'https://www.douyu.com/' + room.id"><img :src="room['room_thumb']"><p>{{ room['room_name'] }}</p><span class="name">{{ room['owner_name'] }}</span ><span class="hot">{{ room['online'] }}</span></a></div></div><div class="nopic center"><ul class="gcolumn"><li v-for="(url, name) in fav"><a :href="url" target="_blank">{{ name }}</a><span @click="favSiteOp(name, null, true)" class="delete">X</span></li><li class="addfav"><div v-show="addfavshow" @keyup.esc="addfavshow=false"><input class="favname" v-model="favname" type="text" name="name" placeholder="title"><input class="favurl" v-model="favurl" type="text" name="url" placeholder="url"></div><span class="addfav_span" @click="addfav">+</span></li></ul><h3 class="center">还在休息中的主播们</h3><ul class="nolivetitle"><li v-for="room in nolives" :title='room.id'>{{ room.owner_name + ' - ' + room.room_name }}<span @click="roomListOp(room.id, true)" class="delete">X</span></li></ul></div><div class="saveall" @click="save">{{ saveflag ? "保存当前订阅列表" : "保存成功" }}</div><div class="addrid"><input class="addrid_input" :class="{ fadein: arid!==null }" type="text" name="rid" v-model="arid" placeholder="房间号" @keyup.enter="ridAdd"><span class="addrid_span" @click="ridAdd">订阅直播间</span></div></div><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script><script>new Vue({el:"#dytools",data:{now:(new Date).toLocaleString("zh",{hour12:!1}),arid:null,lives:{},nolives:{},fav:{},favname:"",favurl:"",rList:[],wait:!1,saveflag:!0,addfavshow:!1},created(){this.fav=this.favSite(),this.rList=this.roomList(),this.rList.forEach(t=>this.rListShow(t))},methods:{rListShow(t){let e="http://open.douyucdn.cn/api/RoomApi/room/"+t;this.wait=!0,fetch("https://cors-anywhere.herokuapp.com/"+e,{mode:"cors",headers:{"X-Requested-With":"XMLHttpRequest","user-agent":"Mozilla/4.0 MDN","content-type":"application/json"}}).then(t=>t.json()).then(e=>{0==e.error&&e.data.room_status<=1?this.$set(this.lives,"li"+t,{id:t,room_thumb:e.data.room_thumb,room_name:e.data.room_name,owner_name:e.data.owner_name,online:e.data.online}):this.$set(this.nolives,"nl"+t,{id:t,room_name:e.data.room_name,owner_name:e.data.owner_name})}).finally(()=>{this.wait=!1})},favSite(){let t=localStorage.getItem("site");if(t)try{return JSON.parse(t)}catch(t){console.log("localStorage site data wrong",t)}return{"作者Github": "https://github.com/hitop","娱乐天地":"https://douyu.com/directory/columnRoom/yl","一起看":"https://www.douyu.com/g_yqk","户外":"https://www.douyu.com/g_HW"}},favSiteOp(t,e,a=!1){a?this.$delete(this.fav,t):this.$set(this.fav,t,e)},roomList(){let t=localStorage.getItem("rList");if(t)try{return JSON.parse(t)}catch(t){console.log("localStorage rList data wrong",t)}return[67373,156277,2158798,73570,9999,6561105,2135,74751,1209,109064,268932,796449,4632993,1504507,2295410,196,4930412,241123,1335445,244548,452628,562590,594613,431972,229346,599351,265438,5440020,309923,2060620,131977,6566671,540434,3649581,122402,81970,431460,248753,1611559,902379,52787]},roomListOp(t,e=!1){if(e)return this.$delete(this.nolives,"nl"+t),void this.$delete(this.rList,this.rList.indexOf(t));this.rListShow(t),this.rList.push(t)},ridAdd(){null===this.arid?this.arid="":(this.arid?this.roomListOp(Number(this.arid)):alert("no room number"),this.arid=null)},addfav(){this.addfavshow?(this.favname&&this.favurl?this.favSiteOp(this.favname,this.favurl):alert("no title or url"),this.addfavshow=!1):this.addfavshow=!0},save(){this.saveflag&&(localStorage.setItem("site",JSON.stringify(this.fav)),localStorage.setItem("rList",JSON.stringify(this.rList)),this.saveflag=!1,setTimeout(()=>{this.saveflag=!0},5e3))}}});</script></body>`
  return new Response(vuehtml, init)
}