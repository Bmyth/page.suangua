<template>
 <div class="canvas" :style="{backgroundImage:`url(${bgImg})`, height: `${canvasHeight()}`, marginTop: `${canvasTop()}`}">
    <Bird :action="birdAction" @callback="birdCallback"></Bird>

    <div class="plum" :style="{backgroundImage:`url(${plumImg})`}"></div>
    <div class="info-box">
      <p v-show="lunarYear">{{lunarYear}}年</p>
      <p>{{lunarCalendar}}</p>
      <p>{{solarTerms}}</p> 
      <p>
        {{getHourNum().name}}时
        <span class="hour-points">
          <i v-for="i in getHourNum().num"></i>
        </span>
      </p> 
    </div>

    <section class="sec-start">
      <div class="step-1">
        <div class="input-box box-up" :class="activeNumUp">
          <span>上卦</span>
          <input v-model="upNum" type="number"></input>
        </div>
        <div class="input-box box-down" :class="activeNumDown">
          <span>下卦</span>
          <input v-model="downNum" type="number"></input>
        </div>
        <div class="input-box box-change" :class="activeNumChange">
          <span>动爻</span>
          <input v-model="changeNum" type="number"></input>
        </div>
        <p class="q" @click="start" :class="numFilled">起</p>
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
import G64 from '../knowledge/gua64.js'
import $ from 'jquery'
import Bird from './Bird'
export default {
  name: 'Home',
  components: {
    Bird, Bird
  },
  data () {
    return {
      lunarYear: '',
      solarTerms: '',
      lunarCalendar: '',
      upNum: '',
      downNum: '',
      changeNum: '',
      showElementDlg: false,
      selectElement: 'E',
      showGuaDlg: false,
      selectGua: '',
      G2Y: [
        {g:1, y: [9,9,9]},
        {g:2, y: [6,9,9]},
        {g:3, y: [9,6,9]},
        {g:4, y: [6,6,9]},
        {g:5, y: [9,9,6]},
        {g:6, y: [6,9,6]},
        {g:7, y: [9,6,6]},
        {g:8, y: [6,6,6]},
      ],
      G: [
        {name:'乾', color:'white', x:'M'},
        {name:'兑', color:'white', x:'M'},
        {name:'离', color:'red', x:'F'},
        {name:'震', color:'green', x:'Wo'},
        {name:'巽', color:'green', x:'Wo'},
        {name:'坎', color:'black', x:'W'},
        {name:'艮', color:'yellow', x:'E'},
        {name:'坤', color:'yellow', x:'E'}
      ],
      X: [
        {key: 'M', name: '金', sw: 'E', kw: 'F', ws: 'W', wk: 'Wo'},
        {key: 'Wo', name: '木', sw: 'W', kw: 'M', ws: 'F', wk: 'E'},
        {key: 'W', name: '水', sw: 'M', kw: 'E', ws: 'Wo', wk: 'F'},
        {key: 'F', name: '火', sw: 'Wo', kw: 'W', ws: 'E', wk: 'M'},
        {key: 'E', name: '土', sw: 'F', kw: 'Wo', ws: 'M', wk: 'W'}
      ],
      H: [
        { h: 0, name: '子', num: 1},
        { h: 1, name: '丑', num: 2},
        { h: 2, name: '丑', num: 2},
        { h: 3, name: '寅', num: 3},
        { h: 4, name: '寅', num: 3},
        { h: 5, name: '卯', num: 4},
        { h: 6, name: '卯', num: 4},
        { h: 7, name: '辰', num: 5},
        { h: 8, name: '辰', num: 5},
        { h: 9, name: '巳', num: 6},
        { h: 10, name: '巳', num: 6},
        { h: 11, name: '午', num: 7},
        { h: 12, name: '午', num: 7},
        { h: 13, name: '未', num: 8},
        { h: 14, name: '未', num: 8},
        { h: 15, name: '申', num: 9},
        { h: 16, name: '申', num: 9},
        { h: 17, name: '酉', num: 10},
        { h: 18, name: '酉', num: 10},
        { h: 19, name: '戌', num: 11},
        { h: 20, name: '戌', num: 11},
        { h: 21, name: '亥', num: 12},
        { h: 22, name: '亥', num: 12},
        { h: 23, name: '子', num: 1},
        { h: 24, name: '子', num: 1},
      ],
      baseG: [],
      nextG: [],
      futureG: [],
      body: null,
      showResult: false,
      plumImg: require("../assets/plum.png"),
      bgImg: require("../assets/bg-small.png"),
      birdAction: ''
    }
  },
  computed: {
    numFilled(){
      return (this.upNum != '' && this.downNum != '' && this.changeNum != '') ? 'c-show' : ''
    },
    activeNumUp(){
      return this.upNum != '' ? 'active' : ''
    },
    activeNumDown(){
      return this.downNum != '' ? 'active' : ''
    },
    activeNumChange(){
      return this.changeNum != '' ? 'active' : ''
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
      // $('.info-box').fadeOut();
    },
    calculate(){
      this.upNum = this.upNum % 8 || 8;
      this.downNum = this.downNum % 8 || 8;
      this.changeNum = this.changeNum % 6 || 6;
      this.baseG = this.getY(this.upNum).concat(this.getY(this.downNum));
      this.futureG = this.getFutureG();
      this.nextG = this.getNextG();
      this.baseG = this.getGFromY(this.baseG);
      this.nextG = this.getGFromY(this.nextG);
      this.futureG = this.getGFromY(this.futureG);
      this.body = this.changeNum > 3 ? this.baseG[0] : this.baseG[1];
    },
    clear(){
      this.upNum = this.downNum = this.changeNum = '';
      $('.step-1 .input-box span').css({'left':'0', opacity: 1})
      $('.step-2').fadeOut(800 ,function(){
        $('.step-1').fadeIn(800).css('display', 'flex');
      });
    },
    getGFromY(Y){
      let upY = [Y[0], Y[1], Y[2]]
      let downY = [Y[3], Y[4], Y[5]]
      let upG = this.G2Y.find((i) =>{
        return i.y[0] == Y[0] && i.y[1] == Y[1] && i.y[2] == Y[2]
      })
      let downG = this.G2Y.find((i) =>{
        return i.y[0] == Y[3] && i.y[1] == Y[4] && i.y[2] == Y[5]
      })
      return [upG.g, downG.g];
    },
    getFutureG(){
      return this.baseG.map((i,index) => {
        if(index == 6 - this.changeNum ){
          return this.changeY(i);
        }
        return i;
      })
    },
    getNextG(){
      return [this.baseG[1], this.baseG[2], this.baseG[3], this.baseG[2], this.baseG[3], this.baseG[4]] 
    },
    getY(g){
      let f = this.G2Y.find((i) => {
        return i.g == g;
      })
      return f.y;
    },
    changeY(i){
      return i == 6 ? 9 : 6;
    },
    getX(n){
      if(n != null){
        return this.G[n-1].x.toLocaleLowerCase();
      }
    },
    gColorClass(n){
      if(n != null){
        return 'c-' + this.G[n-1].color;
      }
    },
    gImg(n){
      if(n){
        return "./static/img/g" + n + ".png"
      }
    },
    gWord(g){
      if(g[0] && g[1]){
        let key = g[0] + '' + g[1];
        let gua = G64.find((g) => {return g.key == key});
        return gua.name;
      }
    },
    gWordMore(g){
      if(g[0] && g[1]){
        let key = g[0] + '' + g[1];
        let gua = G64.find((g) => {return g.key == key});
        return gua.word;
      }
    },
    xName(x){
      if(x){
        let i = this.X.find((i) => { return i.key == x})
        if(i){
          return i.name;
        }
      }
    },
    xText(x, type){
      if(x){
        let i = this.X.find((i) => {return i.key == x});
        let iName = i.name;
        let ox = i[type];
        let o = this.X.find((i) => {return i.key == ox});
        let oName = o.name;
        if(type == 'ws'){
          return iName + '生' + oName;
        }
        if(type == 'wk'){
          return iName + '克' + oName;
        }
        if(type == 'sw'){
          return oName + '生' + iName;
        }
        if(type == 'kw'){
          return oName + '克' + iName;
        }
      }
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
    getHourNum(){
      let hour = new Date().getHours();
      let h = this.H.find((i) => {return i.h == hour})
      return h
    },
    checkElement(n){
      this.selectElement = this.G[n-1].x;
      this.showElementDlg = true;
    },
    checkGua(g){
      this.selectGua = g;
      this.showGuaDlg = true;
    },
    birdCallback(msg){
      if(msg == 'initFinish'){
        $('.plum').fadeIn(2500, () =>{
          this.birdAction = 'flyToTree'
        })
      }
      if(msg == 'flyToTreeFinish'){
        this.birdAction = 'stay';
        $('.info-box').fadeIn(2000, () => {
          $('.sec-start').animate({'opacity': 1}, 2000)
        });
      }
      if(msg == 'flyAwayFinish'){
        $('.plum').animate({width: 140}, 1000, () => {
          this.showResult = true;
          $('.sec-result').fadeIn(2000);
        });
        $('.info-box').fadeOut(()=>{
          $('.info-box').addClass('mini').fadeIn();
        });
      }
    }
  },
  mounted() {
    let _this = this;
    this.$http.get('https://www.mxnzp.com/api/holiday/single/' + this.getDateStr()).then((res) =>{
      if(res.data.data){
        let data = res.data.data;
        this.solarTerms = data.solarTerms;
        this.lunarYear = data.yearTips;
        this.lunarCalendar = data.lunarCalendar;
      }
    })

    $('.step-1 .input-box').click(function(){
      $(this).find('input').focus();
    })

    $('.step-1 .input-box input').focus(function(){
      var t = $(this).closest('.input-box').find('span');
      $(t).animate({'top':'95px'})
    })

    $('.step-1 .input-box input').blur(function(){
      if($(this).val() == ''){
        $(this).closest('.input-box').find('span').animate({'top':'0'});
      }
    })

    let h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.8;
    let htop = 204;
    let hbottom = 114;
    let hmid = h - htop - hbottom;
    let mt =  (h - htop - hbottom) * 0.5 + htop - hmid;
    $('.step-1').css({height: hmid + 'px', 'top': htop + 'px'});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .plum{
    width: 300px;
    height: 204px;
    background-size: contain;
    background-position: -20px 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .info-box{
    position: absolute;
    left: 12px;
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
    width: 100%;
    height: 100%;
    opacity: 0;
    .step-1{
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
    }
    .input-box{
      width: 25%;
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
    }
    input{
      display: inline-block;
      width: 100%;
      max-width: 80px;
      font-size: 32px;
      color: #888;
      border: none;
      background: transparent;
      outline: none;
      padding: 10px 0;
      text-align: center;
      border-bottom: 1px solid transparent;
    }
    input:focus{
      border-bottom: 1px solid #777;
      color: #666;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
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
      right: 25px;
      width: 100%;
      text-align: right;
      .ele{
        height: 60px;
        line-height: 60px;
        width: 30px;
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
          padding: 0 12px;
        }
      }
    }
  }
</style>
