<template>
 <div class="v-container">
    <section class="info" v-show="!showResult">
      <p v-show="lunarYear">{{lunarYear}}年</p>
      <p>{{lunarCalendar}}</p>
      <p>{{solarTerms}}</p> 
      <p>{{getHourNum().name}}时({{getHourNum().num}})</p> 
    </section>

    <section v-show="!showResult" class="sec-start">
      <div class="step-1">
        <div class="input-box box-up" :class="activeNumUp">
          <span>上</span>
          <input v-model="upNum" type="number"></input>
        </div>
        <div class="input-box box-down" :class="activeNumDown">
          <span>下</span>
          <input v-model="downNum" type="number"></input>
        </div>
        <div class="input-box box-change" :class="activeNumChange">
          <span>动</span>
          <input v-model="changeNum" type="number"></input>
        </div>
      </div>
      <div class="step-2">
        <p class="q" @click="start">起</p>
        <p class="x" @click="clear">消</p>
      </div>
    </section>

    <section v-show="showResult" class="sec-result">
      <div class="row-top">
        <span v-show="lunarYear">{{lunarYear}}年</span>
        <span>{{lunarCalendar}}</span>
        <span>{{solarTerms}}</span> 
        <span>{{getHourNum().name}}时</span> 
      </div>
      <div class="row-mid">
        <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(baseG[0])">
            <p class="name">{{gName(baseG[0])}}</p>
            <img :src="gImg(baseG[0])">
          </div>
          <div class="g-grid grid-down" :class="gColorClass(baseG[1])">
            <p class="name">{{gName(baseG[1])}}</p>
            <img :src="gImg(baseG[1])">
          </div>
        </div>

         <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(nextG[0])">
            <p class="name">{{gName(nextG[0])}}</p>
            <img :src="gImg(nextG[0])">
          </div>
          <div class="g-grid grid-down" :class="gColorClass(nextG[1])">
            <p class="name">{{gName(nextG[1])}}</p>
            <img :src="gImg(nextG[1])">
          </div>
        </div>

         <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(futureG[0])">
            <p class="name">{{gName(futureG[0])}}</p>
            <img :src="gImg(futureG[0])">
          </div>
          <div class="g-grid grid-down" :class="gColorClass(futureG[1])">
            <p class="name">{{gName(futureG[1])}}</p>
            <img :src="gImg(futureG[1])">
          </div>

        </div>
      </div>
      <div class="row-bot">
        <div class="ele">
          <span>{{gWord(baseG)}}</span>
        </div>
        <div class="ele">
          <span>{{gWord(nextG)}}</span>
        </div>    
        <div class="ele">
          <span>{{gWord(futureG)}}</span>
        </div>
      </div>
    </section>

    <v-dialog v-model="showElementDlg" max-width="290" dark>
      <v-card>
        <v-card-text>
          <p>{{xText(selectElement, 'sw')}}</p>
          <p>{{xText(selectElement, 'ws')}}</p>
          <p>{{xText(selectElement, 'kw')}}</p>
          <p>{{xText(selectElement, 'wk')}}</p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showGuaDlg" max-width="290" dark>
      <v-card>
        <v-card-text>
          <p>{{gWord(selectGua)}}</p>
          <p>{{gWordMore(selectGua)}}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import G64 from '../knowledge/gua64.js'
import $ from 'jquery'
export default {
  name: 'Home',
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
      showResult: false
    }
  },
  computed: {
    activeNumUp(){
      return this.upNum != '' ? 'active' : ''
    },
    activeNumDown(){
      return this.downNum != '' ? 'active' : ''
    },
    activeNumChange(){
      return this.changeNum != '' ? 'active' : ''
    }
  },
  methods: {
    start(){
      $('.sec-start').animate({width: '7px'}, 600, ()=>{
        $('.sec-start').addClass('bright');
        this.calculate();
      })
      $('.sec-start div').animate({'opacity': 0})
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
      this.showResult = true;
      $('.sec-result').fadeIn(3000);
      $('.sec-start div').css({'opacity': 1});
      $('.sec-start').css({width: '120px'});
    },
    clear(){
      this.upNum = this.downNum = this.changeNum = '';
      $('.step-1 .input-box span').css('left', '0')
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
    gName(n){
      if(n != null){
        return this.G[n-1].name + this.xName(this.G[n-1].x);
      }
    },
    gColorClass(n){
      if(n != null){
        return 'c-' + this.G[n-1].color;
      }
    },
    gImg(n){
      return "./static/img/g" + n + ".jpg"
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
      $(this).closest('.input-box').find('span').animate({'left':'-100%', opacity: 0});
    })

    $('.step-1 .input-box input').blur(function(){
      if($(this).val() != ''){
        $(this).closest('.input-box').find('span').animate({opacity: 1})
      }else{
        $(this).closest('.input-box').find('span').animate({'left':'0', opacity: 1});
      }

      if( _this.upNum != '' && _this.downNum != '' && _this.changeNum != ''){
        $('.step-1').fadeOut(800 ,function(){
          $('.step-2').fadeIn(800).css('display', 'flex');
        });
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .v-container{
    height: 100%;
  }
  section.sec-start{
    height: 100%;
    width: 120px;
    background: #ccc;
    margin: 0 auto;
    &.bright{
      background: #fff;
    }
    .step-1, .step-2{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .step-2{
      display: none;
    }
    .input-box{
      width: 100%;
      margin: 15px 0;
      color: #aaa;
      position: relative;
      span{
        font-size: 14px;
        color: #888;
        display: block;
        width: 100%;
        position: absolute;
        top: 14px;
        text-align: center;
      }
    }
    .input-box.active{
      span{
        text-align: right;
        left: -100%;
        color: #fff;
        padding: 4px 10px;
      }
    }
    input{
      display: inline-block;
      width: 100%;
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
      border-bottom: 1px solid #aaa;
      color: #666;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
    .step-2{
      p{
        width: 100%;
        margin: 0;
        color: #666;
        font-size: 24px;
        position: relative;
        padding: 20px;
        cursor: pointer;
      }
      p.q{
        border-bottom: 1px solid #aaa;
      }
      p.q:hover{
        color: #333;
      }
      p.x:hover{
        color: #aaa;
      }
      p{

      }
    }
  }
  section.info{
      position: fixed;
      right: 18px;
      top: 18px;
      text-align: right;
      border: 1px solid #ccc;
      color: #ccc;
      padding: 6px 8px;
    p{
      margin: 4px;
    }
  }
  section.sec-result{
    overflow: hidden;
    background: #fff;
    height: 100%;
    .row-top, .row-bot{
      background: #333;
      width: 100%;
      position: absolute;
      z-index: 2;
    }
    .row-top{
      top: 0;
      left: 0;
    }
    .row-bot{
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .row-mid{
      background: #fff;
      width: 100%;
      height: 100%;
    }
    .column{
      float: left;
      width: 33.3333333%;
      margin: 0;
      height: 100%;
    }
    .g-grid {
      position: relative;
      height: 50%;
      border: 1px dashed #aaa;
      box-sizing: border-box;
    }
    .g-grid img{
        position: absolute;
        width: 69%;
        left: 15.5%;
        display: inline-block;
    }
    .g-grid .name{
      position: absolute;
      left: 0;
      font-size: 20px;
      padding: 1px 5px;
      color: #444;
      text-align: center;
      width: 100%;
      margin: 0;
      z-index: 2;
    }
    .grid-up{
      img{
        bottom: 0px;
      }
      .name{
        top: 50px;
      }
    }
    .grid-down{
      img{
        top: 0px;
      }
      .name{
        bottom: 50px;
      }
    }
    .g-grid.c-green{
      background: rgba(96, 204, 41, 0.5);
    }
    .g-grid.c-white{
      background: rgba(249, 229, 89, 0.5);
    }
    .g-grid.c-red{
      background: rgba(243, 62, 62, 0.5);
    }
    .g-grid.c-black{
      background: rgba(11, 132, 177, 0.5);
    }
    .g-grid.c-yellow{
      background: rgba(206, 138, 50, 0.5);
    }
    .row-top{
      overflow: hidden;
      span{
        display: inline-block;
        color: #fff;
        padding: 5px 10px;
      }
    }
    .row-bot{
      overflow: hidden;
      .ele{
        width: 33.3333%;
        float: left;
        text-align: center;
        span{
          display: inline-block;
          color: #fff;
          padding: 5px 10px;
        }
      }
    }
  }
</style>
