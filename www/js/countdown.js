var getStationList = function(json) {
  var lat = json.rest.latitude;
  var lng = json.rest.longitude;
  // 駅取得apiたたくイメージ
  (function(lat, lng) {
    var stationJson = {"response":
      {"station":[
        {"x":139.702208,"next":"千駄ケ谷","prev":"新宿","distance":"400m","y":35.683794,"line":"JR総武線","postal":"1510051","name":"代々木","prefecture":"東京都"},
        {"x":139.702208,"next":"新宿","prev":"千駄ケ谷","distance":"400m","y":35.683794,"line":"JR中央線","postal":"1510051","name":"代々木","prefecture":"東京都"},
        {"x":139.702208,"next":"新宿","prev":"原宿","distance":"400m","y":35.683794,"line":"JR山手線","postal":"1510051","name":"代々木","prefecture":"東京都"},
          {"x":139.701527,"next":"新宿","prev":"国立競技場","distance":"450m","y":35.683777,"line":"都営大江戸線","postal":"1510053","name":"代々木","prefecture":"東京都"},
          {"x":139.706537,"next":"曙橋","prev":"新宿","distance":"550m","y":35.690841,"line":"都営新宿線","postal":"1600022","name":"新宿三丁目","prefecture":"東京都"},
            {"x":139.710913,"next":"新宿三丁目","prev":"四谷三丁目","distance":"550m","y":35.688524,"line":"東京メトロ丸ノ内線","postal":"1600022","name":"新宿御苑前","prefecture":"東京都"}
      ]}
    };

    console.log(stationJson);
  })(lat, lng);
}
var getStoreInfo = function(storeId, func) {
  var params = {
    keyid: '89fb80136ae38ae3f80c1af231f9a3c8',
    format: 'json',
    "id": storeId
  };
  $.getJSON('http://api.gnavi.co.jp/ver1/RestSearchAPI/?callback=?', params, func);
};
var viewStationList = function(storeId) {
  getStoreInfo(storeId, getStationList);
}

var getUrlVars = function(){
    var vars = {};
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    }
    return vars;
}


function CountdownTimer(elm, tl, mes) {
  this.initialize.apply(this,arguments);
}

function computeDuration(ms){
  var h = String(Math.floor(ms / 3600000) + 100).substring(1);
  var m = String(Math.floor((ms - h * 3600000)/60000)+ 100).substring(1);
  var s = String(Math.round((ms - h * 3600000 - m * 60000)/1000)+ 100).substring(1);
  return h+':'+m+':'+s;
}

CountdownTimer.prototype = {
  initialize:function(elm, tl, mes) {
    this.elem = document.getElementById(elm);
    this.tl = tl;
    this.mes = mes;
   },
   countDown:function() {
    var timer = '';
    var today = new Date();
    var hour = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
    var min = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
    var sec = Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
    var me = this;


    if ((this.tl - today) > 0) {
      if (hour) timer += '<span class="hour">'+hour+':</span>';
      timer += '<span class="min">'+this.addZero(min)+':</span><span class="sec">'+this.addZero(sec)+'</span>';
      this.elem.innerHTML = timer;
      tid = setTimeout(function(){me.countDown();},10);
    } else {
      this.elem.innerHTML = this.mes;
      return;
    }
  },
  addZero:function(num) {return ('0'+num).slice(-2);}
}

function CDT(stationElm,timelimit){
  var today = new Date();
  //var timelimit = new Date(today.getDate());
  var timer = new CountdownTimer(stationElm, timelimit, 'TIME UP');
  timer.countDown();
  console.log(timelimit);
  console.log(stationElm);
}