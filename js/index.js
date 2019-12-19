window.onload = function(){
  pan.init();
}

pan = {
  //默认转的圈数
  circle: 0,
  init(){
    this.bindEvent();
  },
  bindEvent(){
    document.getElementById('start').addEventListener('click',()=>{
      this.circle = Math.floor(Math.random()*8+1);
      console.log("随机数："+this.circle +" 抽到了："+this.rewardList(this.circle));
      //默认跑4圈
      this.circle = 8 * 4 + this.circle;
      this.animate();
    });
    //关闭模态框
    document.getElementById('close').addEventListener('click',()=>{
      document.getElementById('modal').style.display = "none";
    })
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
  animate(){
    let reward = "reward";
    let id = 1;
    let count = 1;
    let timer = setInterval(() => {
      if(count > this.circle){
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
      reward = 'reward' + id;
      document.querySelectorAll('.pan__item__reward').forEach((item,index)=>{
        item.classList.remove('pan__item__reward--active');
      })
      document.getElementById(reward).classList.add('pan__item__reward--active');
      id++;
      count++;
    }, 100);
  }
}