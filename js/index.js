window.onload = function(){
  pan.init();
}

pan = {
  speed: 1000,
  //默认转的圈数
  circle: 0,
  init(){
    this.bindEvent();
  },
  bindEvent(){
    document.getElementById('start').addEventListener('click',()=>{
      //设置中奖概率
      // this.rewardRatio(2); //执行抽中的奖品为iphone X,传入对应的id,对照rewardList对应的id
      // this.rewardRatio(["0.5","0.41","0.01","0.01","0.01","0.01","0.01","0.04"]); //传入概率数组
      this.rewardRatio(); // 设置一个奖品的概率为50%；
      this.animateStart();
    });
    //关闭模态框
    document.getElementById('close').addEventListener('click',()=>{
      document.getElementById('modal').style.display = "none";
    })
  },
  calcRatio(arr,sub){
    let count = 0;
    arr.forEach((item,index)=>{
      //js小数计算精度不准
      index < sub && (count += parseInt(item*10000)/10000) 
    });
    return count;
  },
  rewardRatio(){
    //有参数时按给到的概率计算
    if(arguments.length > 0 && toString.call(arguments[0]) == "[object Number]"){
      this.circle = arguments[0];
    }else if(arguments.length > 0 && toString.call(arguments[0]) == "[object Array]"){
      let ratioArr = arguments[0];
      this.circle = Math.floor(Math.random()*100+1);
      console.log("传入数组生成的概率："+this.circle);
      
      switch(this.circle){
        case this.circle <= this.calcRatio(ratioArr,1)*100 && this.circle:
          this.circle = 1;
          break;
        case this.circle <= this.calcRatio(ratioArr,2)*100 && this.circle:
          this.circle = 2;
          break;
        case this.circle <= this.calcRatio(ratioArr,3)*100 && this.circle:
          this.circle = 3;
          break;
        case this.circle <= this.calcRatio(ratioArr,4)*100 && this.circle:
          this.circle = 4;
          break;
        case this.circle <= this.calcRatio(ratioArr,5)*100 && this.circle:
          this.circle = 5;
          break;
        case this.circle <= this.calcRatio(ratioArr,6)*100 && this.circle:
          this.circle = 6;
          break;
        case this.circle <= this.calcRatio(ratioArr,7)*100 && this.circle:
          this.circle = 7;
          break;
        case this.circle <= this.calcRatio(ratioArr,8)*100 && this.circle:
          this.circle = 8;
          break;
      }
    }else if(arguments.length == 0){
      //设置一个奖品的概率的抽中几率为50%;比如iphone X 对应id为2
      this.circle = Math.floor(Math.random()*2+1)
      if(this.circle % 2 == 0){
        this.circle = 2;
      }else{
        //生成一个1~7之间的随机数(iphone X除外)
        this.circle = Math.floor(Math.random()*7+1);
        this.circle >= 2 && (this.circle += 1);
      }
    }
    console.log("随机数："+this.circle +" 抽到了："+this.rewardList(this.circle));
    //默认跑5圈
    this.circle = 8 * 5 + this.circle;
  },
  rewardList(type){
    let rewardInfo = "恭喜获得：";
    switch(type){
      case 1:
        rewardInfo += "华为"
        break;
      case 2:
        rewardInfo += "iPhone X"
        break;
      case 3:
        rewardInfo = "谢谢惠顾"
        break;
      case 4:
        rewardInfo += "小熊抱抱";
        break;
      case 5:
        rewardInfo += "小度音响";
        break;
      case 6:
        rewardInfo += "电风扇";
        break;
      case 7:
        rewardInfo += "格力冰箱";
        break;
      case 8:
        rewardInfo += "手环";
        break;
    }
    return rewardInfo;
  },
  animateStart(){
    let id = 1;
    let count = 1;
    this.animateRun(id, count);
  },
  animateRun(id, count){
    let timer = setTimeout(()=>{
      //开始和即将停止时速度放慢
      if(count <= 6 || this.circle - count <= 6){
        this.speed = 200;
      }else{
        this.speed <= 50 ? this.speed : this.speed -= 50;
      }
      //超出总圈数时结束并弹窗
      if(count > this.circle){
        clearTimeout(timer);
        setTimeout(()=>{
          clearInterval(timer);
          document.getElementById('price').innerText = this.rewardList(id-1);
          document.getElementById('modal').style.display = "block";
          document.querySelectorAll('.pan__item__reward').forEach((item,index)=>{
            item.classList.remove('pan__item__reward--active');
          })
          document.getElementById('start').classList.add('pan__item__reward--active');
        },500);
        return;
      }
      id > 8 && (id = 1);
      document.querySelectorAll('.pan__item__reward').forEach((item,index)=>{
        item.classList.remove('pan__item__reward--active');
      })
      document.getElementById('reward'+id).classList.add('pan__item__reward--active');
      id++;
      count++;
      this.animateRun(id, count);
    },this.speed)
  }
}