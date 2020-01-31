// based on
// https://baike.baidu.com/item/%E6%97%A5%E5%B9%B2%E6%94%AF%E6%8E%A8%E7%AE%97%E8%A1%A8/18738117
var yearNum = {
	'2000':54,
	'2001':59,
	'2002':4,
	'2003':9,
	'2004':15,
	'2005':20,
	'2006':25,
	'2007':30,
	'2008':36,
	'2009':41,
	'2010':46,
	'2011':51,
	'2012':57,
	'2013':2,
	'2014':7,
	'2015':12,
	'2016':18,
	'2017':23,
	'2018':28,
	'2019':33,
	'2020':39,
	'2021':44,
	'2022':49,
	'2023':54,
	'2024':0,
	'2025':5,
	'2026':10,
	'2027':15,
	'2028':21,
	'2029':26
}

var monthNum = {
	'1': 6,
	'2': 37,
	'3': 0,
	'4': 31,
	'5': 1,
	'6': 32,
	'7': 2,
	'8': 33,
	'9': 4,
	'10': 34,
	'11': 5,
	'12': 35
}

var tianGan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
var diZhi = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

var round = {
	'0' : {
		name: '甲子',
		item: ['子','丑','寅','卯','辰','巳','午','未','申','酉'],
		miss: ['戌','亥']
	},
	'1' : {
		name: '甲戌',
		item: ['戌','亥','子','丑','寅','卯','辰','巳','午','未'],
		miss: ['申','酉']
	},
	'2' : {
		name: '甲申',
		item: ['申','酉','戌','亥','子','丑','寅','卯','辰','巳'],
		miss: ['午','未']
	},
	'3' : {
		name: '甲午',
		item: ['午','未','申','酉','戌','亥','子','丑','寅','卯'],
		miss: ['辰','巳']
	},
	'4' : {
		name: '甲辰',
		item: ['辰','巳','午','未','申','酉','戌','亥','子','丑'],
		miss: ['寅','卯']
	},
	'5' : {
		name: '甲辰',
		item: ['寅','卯','辰','巳','午','未','申','酉','戌','亥'],
		miss: ['子','丑']
	}
}

var jieqiMon = [
				{month: '寅', jieqi: '立春雨水', x:'Wo'},
				{month: '卯', jieqi: '惊蛰春分', x:'Wo'},
				{month: '辰', jieqi: '清明谷雨', x:'E'},
				{month: '巳', jieqi: '立夏小满', x:'F'},
				{month: '午', jieqi: '芒种夏至', x:'F'},
				{month: '未', jieqi: '小暑大暑', x:'E'},
				{month: '申', jieqi: '立秋处暑', x:'M'},
				{month: '酉', jieqi: '白露秋分', x:'M'},
				{month: '戌', jieqi: '寒露霜降', x:'E'},
				{month: '亥', jieqi: '立冬小雪', x:'W'},
				{month: '子', jieqi: '大雪冬至', x:'W'},
				{month: '丑', jieqi: '小寒大寒', x:'E'},
			]

function getTGDZ(){
	var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month < 3){
    	year = year - 1;
    }
    var _yearNum = yearNum[year];
    var _monthNum = monthNum[month];
    var num = (_yearNum + _monthNum + day) % 60;
    num = num - 1;
    var _round = round[parseInt(num / 10)];
    var num = num % 10;
    return {
    	tiangan: tianGan[num],
    	dizhi: _round.item[num],
    	round: _round
    }
}

function getMonth(jieqi){
	var jieqi = jieqi.substring(0,2);
	var mon = jieqiMon.find(function(j){
		return j.jieqi.indexOf(jieqi) >= 0;
	})
	return mon;
}

module.exports = {
	yearNum: yearNum,
	monthNum: monthNum,
	tianGan: tianGan,
	diZhi: diZhi,
	round: round,
	getTGDZ: getTGDZ,
	getMonth:getMonth
};