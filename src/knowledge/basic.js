//卦 to 爻
var G2Y= [
        {g:1, y: [9,9,9]},
        {g:2, y: [6,9,9]},
        {g:3, y: [9,6,9]},
        {g:4, y: [6,6,9]},
        {g:5, y: [9,9,6]},
        {g:6, y: [6,9,6]},
        {g:7, y: [9,6,6]},
        {g:8, y: [6,6,6]},
      ]
//卦
var G= [
        {name:'乾', color:'white', x:'M'},
        {name:'兑', color:'white', x:'M'},
        {name:'离', color:'red', x:'F'},
        {name:'震', color:'green', x:'Wo'},
        {name:'巽', color:'green', x:'Wo'},
        {name:'坎', color:'black', x:'W'},
        {name:'艮', color:'yellow', x:'E'},
        {name:'坤', color:'yellow', x:'E'}
      ]
//五行
var X= [
        {key: 'M', name: '金', sw: 'E', kw: 'F', ws: 'W', wk: 'Wo'},
        {key: 'Wo', name: '木', sw: 'W', kw: 'M', ws: 'F', wk: 'E'},
        {key: 'W', name: '水', sw: 'M', kw: 'E', ws: 'Wo', wk: 'F'},
        {key: 'F', name: '火', sw: 'Wo', kw: 'W', ws: 'E', wk: 'M'},
        {key: 'E', name: '土', sw: 'F', kw: 'Wo', ws: 'M', wk: 'W'}
      ]
//时
var H= [
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
      ]
//get爻 from 卦
function getY(g){
  let f = G2Y.find((i) => {
    return i.g == g;
  })
  return f.y;
}
//get变卦
function getFutureG(baseG, changeNum){
  return baseG.map((i,index) => {
    if(index == 6 - changeNum ){
      return changeY(i);
    }
    return i;
  })
}
//变爻
function changeY(i){
  return i == 6 ? 9 : 6;
}
//get 互卦
function getNextG(baseG){
  return [baseG[1], baseG[2], baseG[3], baseG[2], baseG[3], baseG[4]] 
}
//get卦 from 爻
function getGFromY(Y){
  let upY = [Y[0], Y[1], Y[2]]
  let downY = [Y[3], Y[4], Y[5]]
  let upG = G2Y.find((i) =>{
    return i.y[0] == Y[0] && i.y[1] == Y[1] && i.y[2] == Y[2]
  })
  let downG = G2Y.find((i) =>{
    return i.y[0] == Y[3] && i.y[1] == Y[4] && i.y[2] == Y[5]
  })
  return [upG.g, downG.g];
}

function xText(x, type){
  if(x){
    let i = X.find((i) => {return i.key == x});
    let iName = i.name;
    let ox = i[type];
    let o = X.find((i) => {return i.key == ox});
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

function xName(x){
  if(x){
    let i = X.find((i) => { return i.key == x})
    if(i){
      return i.name;
    }
  }
}

function getHourNum(){
  let hour = new Date().getHours();
  let h = H.find((i) => {return i.h == hour})
  return h
}

module.exports = {
    G2Y: G2Y,
    G: G,
    X: X,
    H: H,
    getY: getY,
    getFutureG: getFutureG,
    getNextG: getNextG,
    getGFromY: getGFromY,
    xText: xText,
    xName: xName,
    getHourNum: getHourNum
};