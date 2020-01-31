<template>
  <div>
    <div class="bird" id="bird-1">
      <div class="pic" :style="{backgroundImage:`url(${bg})`}"></div>
      <p @click="test" v-show="false">X</p>
    </div>
    <div class="bird" id="bird-2">
      <div class="pic" :style="{backgroundImage:`url(${bg})`}"></div>
      <p @click="test" v-show="false">X</p>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import '../lib/jQuery.path.js'

export default {
  name: 'Bird',
  props: ['action'],
  data () {
    return {
      bird1Status: null,
      frameIndex1: 0,
      bird1Ele: null,
      bird1Pic: null,
      bird2Status: null,
      frameIndex2: 0,
      bird2Ele: null,
      bird2Pic: null,
      screenW : 0,
      screenH : 0,
      timer: null,
      bg: require("../assets/bird.png"),
      frames: {
        fly: ['0 -54px', '-50px -55px', '-100px -55px', '-150px -55px'],
        flyOp: ['0 10px;', '-50px 10px', '-100px 10px', '-150px 10px'],
        stay: ['-50px -122px'],
        stayOp: ['-2px -122px']
      }
    }
  },
  computed: {
    status(){
      return this.action;
    },
    b1fly1(){
      return {
        start: { 
          x: this.screenW + 20, 
          y: this.screenH * 0.1, 
        },  
        end: { 
          x:135,
          y:this.screenH * 0.1 + 125, 
          angle: 30, 
          length: 0.3
        }
      }
    },
    b2fly1(){
      return {
        start: { 
          x: -100, 
          y: 50, 
        },  
        end: { 
          x:50,
          y:this.screenH * 0.1 + 80, 
          angle: -30, 
          length: 0.2
        }
      }
    },
    b1fly2(){
      return {
        start: { 
          x:190,
          y:this.screenH * 0.1 + 128, 
        },  
        end: { 
          x:-90,
          y:this.screenH * 0.1, 
          angle: 100, 
          length: 0.2
        }
      }
    },
    b2fly2(){
      return {
        start: { 
          x:90,
          y:this.screenH * 0.1 + 72, 
        },  
        end: { 
          x:-90,
          y:this.screenH * 0.1, 
          angle: 100, 
          length: 0.2
        }
      }
    },
    b1fly3(){
      return {
        start: { 
          x:-90,
          y:this.screenH * 0.6, 
        },  
        end: { 
          x:-90,
          y:this.screenW * 0.65, 
          angle: -100, 
          length: 0.2
        }
      }
    },
    b2fly3(){
      return {
        start: { 
          x:-90,
          y:this.screenH * 0.6 + 60, 
        },  
        end: { 
          x:-90,
          y:this.screenW * 0.5, 
          angle: -80, 
          length: 0.35
        }
      }
    }
  },
  methods: {
    init(){
      this.screenW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.screenH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
      this.bird1Ele = $('#bird-1');
      this.bird1Pic = this.bird1Ele.find('.pic');
      this.bird2Ele = $('#bird-2');
      this.bird2Pic = this.bird2Ele.find('.pic');
      this.timer = setInterval(this.nextFrame, 120);
      this.$emit('callback', 'initFinish')
    },
    nextFrame(){
      if(this.bird1Status){
        let f = this.frames[this.bird1Status];
        this.frameIndex1 = this.frameIndex1 < (f.length - 1) ? this.frameIndex1 + 1 : 0; 
        this.showFrame(this.bird1Pic, this.bird1Status, this.frameIndex1);
      }
      if(this.bird2Status){
        let f = this.frames[this.bird2Status];
        this.frameIndex2 = this.frameIndex2 < (f.length - 1) ? this.frameIndex2 + 1 : 0; 
        this.showFrame(this.bird2Pic, this.bird2Status, this.frameIndex2);
      }
    },
    showFrame(pic, status, index){
      if(this.frames[status]){
        pic.css('background-position',this.frames[status][index])
      }
    },
    flyToTree(){
      this.bird1Status = 'fly';
      this.bird2Status = 'flyOp';
      this.bird1Ele.animate({path : new $.path.bezier(this.b1fly1)}, 2500, () =>{
        this.bird1Status = 'stay';
        this.bird2Ele.animate({path : new $.path.bezier(this.b2fly1)}, 1500, () =>{
          this.bird2Status = 'stayOp';
          this.$emit('callback', 'flyToTreeFinish')
        })
      })
    },
    flyAway(){
      this.bird1Status = 'fly';
      this.bird1Ele.animate({path : new $.path.bezier(this.b1fly2)}, 2500, () =>{
        this.bird1Status = 'flyOp';
      })

      setTimeout(() => {
        this.bird2Status = 'fly';
        this.bird2Ele.animate({path : new $.path.bezier(this.b2fly2)}, 1500, () =>{
          this.$emit('callback', 'flyAwayFinish')
          this.bird1Ele.animate({path : new $.path.bezier(this.b1fly3)}, 1500, () =>{
            clearInterval(this.timer)
          })
          this.bird2Ele.animate({path : new $.path.bezier(this.b2fly3)}, 1200)
        })
      }, 1000)
    },
    test(){
      clearInterval(this.timer)
      // this.nextFrame();
    }
  },
  watch: {
    action(val){
      this.frameIndex = 0;
      if(val == 'flyToTree'){
        this.flyToTree();
      }
      if(val == 'flyaway'){
        this.flyAway();
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .bird{
    position: fixed;
    z-index: 9;
    width: 45px;
    height: 60px;
    right: -100px;
    top: -100;
    zoom: 0.65;
    .pic{
      width: 100%;
      height: 100%;
      background-size: 200px;
      background-position: 0 -54px;
    }
  }

</style>
