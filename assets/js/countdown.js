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

function CDT(){
  var today = new Date();
  var timelimit = new Date(today.getDate());
  var timer = new CountdownTimer('CDT', timelimit, 'TIME UP');
  timer.countDown();
  console.log(today);
}

window.onload = function() {
  CDT();
}

