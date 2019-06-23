<template>
 <div class="v-container">
    <section v-show="!showResult" class="sec-start">
      <div class="input-box first">
        <span>上</span>
        <input v-model="upNum" type="number"></input>
      </div>
      <div class="input-box">
        <span>下</span>
        <input v-model="downNum" type="number"></input>
      </div>
      <div class="input-box">
        <span>动</span>
        <input v-model="changeNum" type="number"></input>
      </div>
      <div class="btn">
        <p class="x" @click="clear">消</p>
        <p class="q" @click="start">起</p>
      </div>
    </section>

    <section v-show="showResult" class="sec-result">
      <div class="row-top">
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">金</v-btn>
            </template>
            <div>
              <p>{{xText('M', 'sw')}}</p>
              <p>{{xText('M', 'ws')}}</p>
              <p>{{xText('M', 'kw')}}</p>
              <p>{{xText('M', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
          
        <div class="ele">
         <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">木</v-btn>
            </template>
            <div>
              <p>{{xText('Wo', 'sw')}}</p>
              <p>{{xText('Wo', 'ws')}}</p>
              <p>{{xText('Wo', 'kw')}}</p>
              <p>{{xText('Wo', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
              
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">水</v-btn>
            </template>
            <div>
              <p>{{xText('W', 'sw')}}</p>
              <p>{{xText('W', 'ws')}}</p>
              <p>{{xText('W', 'kw')}}</p>
              <p>{{xText('W', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
 
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">火</v-btn>
            </template>
            <div>
              <p>{{xText('F', 'sw')}}</p>
              <p>{{xText('F', 'ws')}}</p>
              <p>{{xText('F', 'kw')}}</p>
              <p>{{xText('F', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
          
        <div class="ele">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">土</v-btn>
            </template>
            <div>
              <p>{{xText('E', 'sw')}}</p>
              <p>{{xText('E', 'ws')}}</p>
              <p>{{xText('E', 'kw')}}</p>
              <p>{{xText('E', 'wk')}}</p>
            </div>
          </v-tooltip>
        </div>
      </div>
      <div class="row-mid">
        <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(baseG[0])">
            <p class="name">{{gName(baseG[0])}}</p>
            <div class="img-box">
              <img :src="gImg(baseG[0])">
            </div>
          </div>
          <div class="g-grid grid-down" :class="gColorClass(baseG[1])">
            <p class="name">{{gName(baseG[1])}}</p>
            <div class="img-box">
              <img :src="gImg(baseG[1])">
            </div>
          </div>
        </div>

         <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(nextG[0])">
            <p class="name">{{gName(nextG[0])}}</p>
            <div class="img-box">
              <img :src="gImg(nextG[0])">
            </div>
          </div>
          <div class="g-grid grid-down" :class="gColorClass(nextG[1])">
            <p class="name">{{gName(nextG[1])}}</p>
            <div class="img-box">
              <img :src="gImg(nextG[1])">
            </div>
          </div>
        </div>

         <div class="column">
          <div class="g-grid grid-up" :class="gColorClass(futureG[0])">
            <p class="name">{{gName(futureG[0])}}</p>
            <div class="img-box">
              <img :src="gImg(futureG[0])">
            </div>
          </div>
          <div class="g-grid grid-down" :class="gColorClass(futureG[1])">
            <p class="name">{{gName(futureG[1])}}</p>
            <div class="img-box">
              <img :src="gImg(futureG[1])">
            </div>
          </div>

        </div>
      </div>
      <div class="row-bot">
        <div class="ele">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">本 ({{gWord(baseG)}})</v-btn>
            </template>
            <div>
              <p>{{gWordMore(baseG)}}</p>
            </div>
          </v-tooltip>
        </div>
        <div class="ele">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">互 ({{gWord(nextG)}})</v-btn>
            </template>
            <div>
              <p>{{gWordMore(nextG)}}</p>
            </div>
          </v-tooltip>
        </div>    
        <div class="ele">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on">变 ({{gWord(futureG)}})</v-btn>
            </template>
            <div>
              <p>{{gWordMore(futureG)}}</p>
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
export default {
  name: 'Home',
  data () {
    return {
      upNum: null,
      downNum: null,
      changeNum: null,
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
      baseG: [],
      nextG: [],
      futureG: [],
      body: null,
      showResult: false
    }
  },
  methods: {
    start(){
      if(this.upNum != null && this.downNum != null){
        $('.sec-start').animate({width: '7px'}, 600, ()=>{
          $('.sec-start').addClass('bright');
          this.calculate();
        })
        $('.sec-start div').animate({'opacity': 0})
      }
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
      $('.sec-result').fadeIn('slow');
      $('.sec-start div').css({'opacity': 1});
      $('.sec-start').css({width: '120px'});
    },
    clear(){
      this.upNum = this.downNum = this.changeNum = null;
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
    }
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
    .input-box{
      width: 85%;
      margin: 10px auto;
      span{
        font-size: 14px;
        color: #888;
      }
    }
    .input-box.first{
      padding-top: 120px;
      margin-top: 0;
    }
    input{
      display: inline-block;
      width: 100%;
      font-size: 24px;
      color: #777;
      border: none;
      background: transparent;
      border-bottom: 1px solid #acacac;
      outline: none;
      padding: 10px 0;
      text-align: center;
    }
    input:focus{
      border-bottom: 1px solid #666;
      color: #333;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
    .btn{
      width: 80%;
      margin: 10px auto;
      p{
        display: inline-block;
        width: 45%;
        cursor: pointer;
        margin: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #777;
      }
      p:hover{
        color: #333;
      }
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
    .img-box{
      position: absolute;
      width: 100%;
      height: 30%;
      left: 0;
      text-align: center;
    }
    .g-grid img{
        width: 100%;
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
    }
    .grid-up{
      .img-box{
        bottom: 0px;
      }
      .name{
        top: 40px;
      }
    }
    .grid-down{
      .img-box{
        top: 0px;
      }
      .name{
        bottom: 40px;
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
      .ele{
        width: 20%;
        float: left;
        text-align: center;
      }
    }
    .row-bot{
      overflow: hidden;
      .ele{
        width: 33.3333%;
        float: left;
        text-align: center;
      }
    }
    .row-top, .row-bot{
      /deep/ button{
        margin: 0;
        padding: 0;
        background: transparent;
        width: 100%;
        font-size: 18px;
        .v-btn__content{
          text-align: center;
        }
      }
      /deep/ button:not, button:hover{
        background: transparent;
      }
    }
  }
</style>
