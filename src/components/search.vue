<template>
  <div class="search-page" :style="{marginLeft:`${pos}`}">
    <div class="overlay" @click="hide"></div>
    <div class="content">
      <p class="close" @click="hide">X</p>
      <section id="page0" class="content-page">
        <p @click="showPage(1)">先后天八卦</p>
        <p @click="showPage(2)">天干地支</p>
        <p @click="showPage(3)">十二长生</p>
      </section>
      <section id="page1" class="content-page">
        <p class="back" @click="back">>></p>
        <div>
          <p>先天八卦</p>
          <img :src="gImg('xtbg.png')">
          <p>后天八卦</p>
          <img :src="gImg('htbg.png')">
        </div>
      </section>
      <section id="page2" class="content-page">
        <p class="back" @click="back">>></p>
        <div>
          <img :src="gImg('tgdz1.jpg')">
          <img :src="gImg('tgdz2.png')">
        </div>
      </section>
      <section id="page3" class="content-page">
        <p class="back" @click="back">>></p>
        <div>
          <img :src="gImg('12zs.png')">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Search',
  props: ['show'],
  data () {
    return {
      bird1Status: null,
    }
  },
  computed: {
    pos(){
      let p = this.show ? '0' : '100%';
      return p;
    }
  },
  methods: {
    hide(){
      this.$emit('hide');
    },
    showPage(index){
      $('.content-page').fadeOut(function(){
        $('#page' + index).fadeIn();
      });
    },
    back(){
      $('.content-page').fadeOut(function(){
        $('#page0').fadeIn();
      });
    },
    gImg(img){
      return './static/img/' + img;
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
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; 
      this.pageHeight = h * 0.8 + 'px'; 
      this.pageTop = h * 0.1 + 'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .search-page{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    transition: all .8s;
    -moz-transition: all .8s; /* Firefox 4 */
    -webkit-transition: all .8s; /* Safari 和 Chrome */
    -o-transition: all .8s; /* Opera */
    .content{
      width: 75%;
      height: 100%;
      margin-left: 25%;
      background: #ddd;
      overflow-y: scroll;
      position: relative;
    }
    .overlay{
      height: 100%;
      width: 25%;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
    }
    section{
      width: 100%;
      height: 100%;
      position: relative;
      text-align: center;
      img{
        max-width: 800px;
      }
    }
    #page0{
      p{
        text-align: right;
        margin: 20px 10px;
        line-height: 20px;
        cursor: pointer;
      }
    }
    #page1{
      p{
        margin: 10px;
        line-height: 20px;
      }
      img{
        width: 75%;
      }
    }
    #page2{
      img{
        width: 85%;
        margin-top: 25px;
      }
    }
    #page3{
      img{
        width: 85%;
        margin-top: 40px;
      }
    }
    .close{
      position: absolute;
      left: 10px;
      top: 6px;
      margin: 0 !important;
      font-size: 18px;
      color: #666;
      cursor: pointer;
      z-index: 11;
    }
    .back{
      position: absolute;
      right: 10px;
      top: 0;
      margin: 0 !important;
      font-size: 18px;
      color: #666;
      cursor: pointer;
      z-index: 11;
    }
    .content-page{

    }
  }

</style>
