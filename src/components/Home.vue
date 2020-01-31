<template>
 <div class="canvas" :style="{backgroundImage:`url(${bgImg})`, height: `${canvasHeight()}`, marginTop: `${canvasTop()}`}">
    <Bird :action="birdAction" @callback="birdCallback"></Bird>
    <Search :show="search" @hide="hideSearch"></Search>
    <div class="plum" :style="{backgroundImage:`url(${plumImg})`}"></div>
    <div class="info-box">
      <p v-show="lunarYear">{{lunarYear}}年</p>
      <p>{{lunarCalendar}}</p>
      <p>{{solarTerms}}</p> 
      <p>{{getLunarMonthInfo()}}</p>
      <p>{{tgdz.tiangan}}{{tgdz.dizhi}}日</p>
      <p>旬空 {{getXunkong()}}</p>
      <p>
        {{getHourNum().name}}时
        <span class="hour-points">
          <i v-for="i in getHourNum().num"></i>
        </span>
      </p> 
    </div>
    <p class="search" @click="showSearch">？</p>

    <section class="sec-start">
      <div class="step-1">
        <div class="input-box box-up" :class="activeNumUp" @click="onInput('up')">
          <span>上卦</span>
          <i>{{upNum}}</i>
        </div>
        <div class="input-box box-down" :class="activeNumDown" @click="onInput('down')">
          <span>下卦</span>
          <i>{{downNum}}</i>
        </div>
        <div class="input-box box-change" :class="activeNumChange" @click="onInput('change')">
          <span>动爻</span>
          <i>{{changeNum}}</i>
        </div>
        <p class="q" @click="start" :class="numFilled">起</p>
        <div class="input-numbers" v-show="onInputItem != ''" :class="activeNumChange">
          <p @click="onNumberSet(1)">壹</p>
          <p @click="onNumberSet(2)">贰</p>
          <p @click="onNumberSet(3)">叁</p>
          <p @click="onNumberSet(4)">肆</p>
          <p @click="onNumberSet(5)">伍</p>
          <p @click="onNumberSet(6)">陆</p>
          <p @click="onNumberSet(7)" v-show="onInputItem != 'change'">柒</p>
          <p @click="onNumberSet(8)" v-show="onInputItem != 'change'">捌</p>
          <p></p>
        </div>
      </div>
    </section>

    <section v-show="showResult" class="sec-result">
      <div class="row-mid">
        <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(baseG[0])">
            <div class="img-box"><img :src="gImg(baseG[0])"></div>
          </div>
          <div class="g-grid grid-down" :class="gColorClass(baseG[1])">
            <div class="img-box"><img :src="gImg(baseG[1])"></div>
            <div class="spot">
              <i class="ele-spot" :class="`ele-${getX(baseG[0])}`"></i>
              <i class="ele-spot" :class="`ele-${getX(baseG[1])}`"></i>
            </div>
            <div class="ele">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span dark v-on="on">{{gWord(baseG)}}</span>
                </template>
                <span>{{gWordMore(baseG)}}</span>
              </v-tooltip>
            </div>
          </div>
        </div>

         <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(nextG[0])">
            <div class="img-box"><img :src="gImg(nextG[0])"></div>
          </div>
          <div class="g-grid grid-down" :class="gColorClass(nextG[1])">
            <div class="img-box"><img :src="gImg(nextG[1])"></div>
            <div class="spot">
              <i class="ele-spot" :class="`ele-${getX(nextG[0])}`"></i>
              <i class="ele-spot" :class="`ele-${getX(nextG[1])}`"></i>
            </div>
            <div class="ele">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{gWord(nextG)}}</span>
                </template>
                <span>{{gWordMore(nextG)}}</span>
              </v-tooltip>
            </div> 
          </div>
        </div>

         <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(futureG[0])">
            <div class="img-box"><img :src="gImg(futureG[0])"></div>
          </div>
          <div class="g-grid grid-down" :class="gColorClass(futureG[1])">
            <div class="img-box"><img :src="gImg(futureG[1])"></div>
            <div class="spot">
              <i class="ele-spot" :class="`ele-${getX(futureG[0])}`"></i>
              <i class="ele-spot" :class="`ele-${getX(futureG[1])}`"></i>
            </div>
            <div class="ele">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span dark v-on="on">{{gWord(futureG)}}</span>
                </template>
                <span>{{gWordMore(futureG)}}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>


      <div class="row-top">
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span dark v-on="on"><i class="ele-spot ele-m"></i>金</span>
            </template>
            <div>
              <p>{{xText('M', 'sw')}}</p>
              <p>{{xText('M', 'kw')}}</p>
              <p>{{xText('M', 'ws')}}</p>
              <p>{{xText('M', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span dark v-on="on"><i class="ele-spot ele-wo"></i>木</span>
            </template>
            <div>
              <p>{{xText('Wo', 'sw')}}</p>
              <p>{{xText('Wo', 'kw')}}</p>
              <p>{{xText('Wo', 'ws')}}</p>
              <p>{{xText('Wo', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span dark v-on="on"><i class="ele-spot ele-w"></i>水</span>
            </template>
            <div>
              <p>{{xText('W', 'sw')}}</p>
              <p>{{xText('W', 'kw')}}</p>
              <p>{{xText('W', 'ws')}}</p>
              <p>{{xText('W', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span dark v-on="on"><i class="ele-spot ele-f"></i>火</span>
            </template>
            <div>
              <p>{{xText('F', 'sw')}}</p>
              <p>{{xText('F', 'kw')}}</p>
              <p>{{xText('F', 'ws')}}</p>
              <p>{{xText('F', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span dark v-on="on"><i class="ele-spot ele-e"></i>土</span>
            </template>
            <div>
              <p>{{xText('E', 'sw')}}</p>
              <p>{{xText('E', 'kw')}}</p>
              <p>{{xText('E', 'ws')}}</p>
              <p>{{xText('E', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import B from '../knowledge/basic.js'
import G64 from '../knowledge/gua64.js'
import TGDZ from '../knowledge/tiangandizhi.js'
import $ from 'jquery'
import Bird from './Bird'
import Search from './Search'
export default {
  name: 'Home',
  components: {
    Bird, Search
  },
  data () {
    return {
      lunarYear: '',
      tgdz: {},
      solarTerms: '',
      lunarCalendar: '',
      upNum: '',
      downNum: '',
      changeNum: '',
      showElementDlg: false,
      selectElement: 'E',
      showGuaDlg: false,
      selectGua: '',
      baseG: [],
      nextG: [],
      futureG: [],
      body: null,
      showResult: false,
      plumImg: require("../assets/plum.png"),
      bgImg: require("../assets/bg-small.png"),
      birdAction: '',
      onInputItem: '',
      search: false
    }
  },
  computed: {
    numFilled(){
      return (this.upNum != '' && this.downNum != '' && this.changeNum != '') ? 'c-show' : ''
    },
    activeNumUp(){
      return this.onInputItem == 'up' ? 'active' : '';
    },
    activeNumDown(){
      return this.onInputItem == 'down' ? 'active' : '';
    },
    activeNumChange(){
      return this.onInputItem == 'change' ? 'active' : '';
    },
    bodyUp(){
      return this.changeNum <= 3;
    }
  },
  methods: {
    canvasHeight(){
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
      return h * 0.8 + 'px';
    },
    canvasTop(){
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
      return h * 0.1 + 'px';
    },
    start(){
      this.birdAction = 'flyaway';
      $('.sec-start').fadeOut(800, ()=>{
        $('.sec-start').addClass('bright');
        this.calculate();
      })
    },
    calculate(){
      this.upNum = this.upNum % 8 || 8;
      this.downNum = this.downNum % 8 || 8;
      this.changeNum = this.changeNum % 6 || 6;
      this.baseG = B.getY(this.upNum).concat(B.getY(this.downNum));
      this.futureG = B.getFutureG(this.baseG, this.changeNum);
      this.nextG = B.getNextG(this.baseG);
      this.baseG = B.getGFromY(this.baseG);
      this.nextG = B.getGFromY(this.nextG);
      this.futureG = B.getGFromY(this.futureG);
      this.body = this.changeNum > 3 ? this.baseG[0] : this.baseG[1];
    },
    clear(){
      this.upNum = this.downNum = this.changeNum = '';
      $('.step-1 .input-box span').css({'left':'0', opacity: 1})
      $('.step-2').fadeOut(800 ,function(){
        $('.step-1').fadeIn(800).css('display', 'flex');
      });
    },
    getX(n){
      if(n != null){
        return B.G[n-1].x.toLocaleLowerCase();
      }
    },
    gColorClass(n){
      if(n != null){
        return 'c-' + B.G[n-1].color;
      }
    },
    gImg(n){
      if(n){
        return "./static/img/g" + n + ".png"
      }
    },
    xName(x){
      return B.xName(x);
    },
    xText(x, type){
      return B.xText(x, type);
    },
    getDateStr(){
      let date = new Date();
      let str = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month >= 10 ? '' + month : '0' + month; 
      str += month;
      let day = date.getDate();
      day = day >= 10 ? '' + day : '0' + day;
      return str + day;
    },
    getXunkong(){
      if(this.tgdz.round && this.tgdz.round.miss){
        return this.tgdz.round.miss[0] + this.tgdz.round.miss[1];
      }
    },
    getLunarMonthInfo(){
      if(this.lunarMonth && this.lunarMonth.month){
        return this.lunarMonth.month + '月' + B.xName(this.lunarMonth.x) + '旺';
      }
    },
    getHourNum(){
      return B.getHourNum();
    },
    gWord(g){
      return G64.gWord(g);
    },
    gWordMore(g){
      return G64.gWordMore(g);
    },
    checkElement(n){
      this.selectElement = B.G[n-1].x;
      this.showElementDlg = true;
    },
    checkGua(g){
      this.selectGua = g;
      this.showGuaDlg = true;
    },
    onInput(type){
      this.onInputItem = type;
    },
    onNumberSet(number){
      if(this.onInputItem == 'up'){
        this.upNum = number;
      }
      if(this.onInputItem == 'down'){
        this.downNum = number;
      }
      if(this.onInputItem == 'change'){
        this.changeNum = number;
      }
      this.onInputItem = '';
    },
    showSearch(){
      this.search = true;
    },
    hideSearch(){
      this.search = false;
    },
    birdCallback(msg){
      if(msg == 'initFinish'){
        $('.plum').fadeIn(2500, () =>{
          this.birdAction = 'flyToTree'
        })
        $('.sec-start').animate({'opacity': 1}, 2000)
        $('.info-box').fadeIn(1000);
      }
      if(msg == 'flyToTreeFinish'){
        this.birdAction = 'stay';
      }
      if(msg == 'flyAwayFinish'){
        this.showResult = true;
        $('.sec-result').fadeIn(1600);
        $('.info-box').fadeOut(()=>{
          $('.info-box').addClass('mini').fadeIn();
        });
      }
    }
  },
  mounted() {
    let _this = this;
    this.tgdz = TGDZ.getTGDZ();
    this.$http.get('https://www.mxnzp.com/api/holiday/single/' + this.getDateStr() + '?app_id=fyjtjlhqnadgqqkq&app_secret=aThBVzdhcVhoM1E1VHVsRFFLV1BsQT09').then((res) =>{
      if(res.data.data){
        let data = res.data.data;
        this.solarTerms = data.solarTerms;
        this.lunarYear = data.yearTips;
        this.lunarCalendar = data.lunarCalendar;
        this.lunarMonth = TGDZ.getMonth(this.solarTerms);
      }
    })

    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.8;
    let htop = 100;
    let hbottom = 164;
    let hmid = h - htop - hbottom;
    let mt =  (h - htop - hbottom) * 0.5 + htop - hmid;
    $('.step-1').css({height: hmid + 'px', 'top': htop + 'px'});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .plum{
    width: 180px;
    height: 100px;
    background-size: contain;
    background-position: -20px 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .info-box{
    position: absolute;
    left: 9px;
    bottom: 12px;
    text-align: left;
    color: #666;
    padding: 4px 6px;
    width: 90px;
    display: none;
    &.mini{
      width: 290px;
      p{
        display: inline-block;
        margin-right: 10px;
      }
    }
    p{
      margin: 2px;
      font-size: 14px;
    }
    .hour-points{
      width: 40px;
      display: inline-block;
      line-height: 4px;
      i{
        width: 4px;
        height: 4px;
        background: #555;
        display: inline-block;
        margin-left: 2px;
        border-radius: 100%;
      }
    }
  }
  .search{
    position: absolute;
    top: 8px;
    right: 4px;
    font-size: 20px;
    cursor: pointer;
    z-index: 5;
    color: #666;
  }
  .canvas{
    background-repeat: repeat-x;
    background-size: 100px 100%;
    position: relative;
    &:before{
      content: "";  
      width: 100%;
      height: 3px;
      position: absolute;
      top: -10px;
      left: 0;
      background: #ddd; 
    }
    &:after{
      content: "";  
      width: 100%;
      height: 3px;
      position: absolute;
      bottom: -10px;
      left: 0;
      background: #ddd; 
    }
  }
  section.sec-start{
    width: 75%;
    height: 100%;
    opacity: 0;
    margin-left: 25%;
    .step-1{
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
    }
    .input-box{
      width: 20%;
      margin: 15px 0;
      color: #aaa;
      position: relative;
      display: inline-block;

      span{
        font-size: 16px;
        color: #666;
        display: block;
        width: 100%;
        position: absolute;
        top: 14px;
        text-align: center;
        cursor: pointer;
      }
      &.active span{
        border: 1px solid #888;
      }
      i{
        font-size: 22px;
        /* display: block; */
        position: absolute;
        left: 0px;
        top: 36px;
        width: 100%;
        text-align: center;
        color: #666;
        font-style: normal;
      }
    }
    .q{
      color: darkred;
      font-size: 24px;
      cursor: pointer;
      display: inline-block;
      padding: 30px 0;
      width: 0;
      opacity: 0;
      transition: all .5s;
      -moz-transition: all .5s;
      -webkit-transition: all .5s;
      -o-transition: all .5s;
    }
    .q.c-show{
      width: 10%;
      opacity: 1;
    }
    .input-numbers{
      position: absolute;
      top: 90px;
      left:  15%;
      width: 70%;
      height: 100px;
      z-index: 6;
      &.active p{
        width: 33.333%;
      }
      p{
        cursor: pointer;
        display: block;
        width: 25%;
        float: left;
        margin: 0;
        height: 50%;
        text-align: center;
        color: #555;
        font-size: 18px;
      }
    }
  }
  section.sec-result{
    overflow: hidden;
    height: 100%;
    width: 100%;
    .row-top, .row-bot{
      position: absolute;
      z-index: 1;
    }
    .row-top{
      top: 0;
    }
    .row-mid{
      width: 100%;
      height: 100%;
    }
    .column{
      float: left;
      width: 33.3333333%;
      margin: 0;
      height: 100%;
      position: relative;
    }
    .g-grid {
      position: relative;
    }
    .g-grid.grid-up{
      height: 47%;
    }
    .g-grid.grid-down{
      height: 53%;
    }
    .g-grid .img-box{
      text-align: center;
      line-height: 1;
      img{
        display: inline-block;
        width: 80px;
        margin-top: 12px;
      }
    }
    .g-grid .spot{
      position: absolute;
      left: 50%;
      top: 0;
      width: 20px;
      height: 50px;
      i{
        float: left;
        position: relative;
        left: -42px;
        top: 82px;
        margin-bottom: 4px;
        margin-right: 10px;
        width: 10px;
        height: 10px;
      }
    }
    .body-mark{
      display: none;
    }
    .grid-up{
      .img-box{
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      .name{
        top: 50px;
      }
    }
    .grid-down{
      .img-box{
        width: 100%;
        position: relative;
      }
      .name{
        bottom: 50px;
      }
      .ele{
        width: 100%;
        margin-top: 15px;
        span{
          color: #666;
          cursor: pointer;
        }
      }
    }
    .g-grid.c-green .name{
      color: rgb(96, 204, 41);
    }
    .g-grid.c-white .name{
      color: #fbf309;
    }
    .g-grid.c-red .name{
      color: rgb(243, 62, 62);
    }
    .g-grid.c-black .name{
      color: rgb(11, 132, 177);
    }
    .g-grid.c-yellow .name{
      color: rgb(206, 138, 50);
    }
    .ele-spot{
      display: block;
      width: 15px;
      height: 15px;
      border-radius: 100%;
      &.ele-m{
        background: #f5c500;
      }
      &.ele-wo{
        background: #08ce37;
      }
      &.ele-w{
        background: #31649c;
      }
      &.ele-f{
        background: #e81616;
      }
      &.ele-e{
        background: #927602;
      }
    }
    .row-top{
      overflow: hidden;
      height: 60px;
      right: 36px;
      width: 100%;
      text-align: right;
      .ele{
        height: 60px;
        line-height: 60px;
        width: 25px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        .ele-spot{
          position: relative;
          left: 0;
          top: 16px;
        }
        span{
          display: block;
          color: #666;
          padding: 0 8px;
        }
      }
    }
  }
</style>
