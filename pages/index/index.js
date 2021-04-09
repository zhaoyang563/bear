
// audio.js
const innerAudioContext = wx.createInnerAudioContext();
Page({
  onReady: function (e) {
    innerAudioContext.src = 'https://7878-xx-2gtw34asc662577e-1305545390.tcb.qcloud.la/%E8%B4%B0%E4%BD%B0%E5%AD%97%20%E4%B8%BA%E4%BD%A0%E8%AF%BB%E8%AF%97%20-%20%E4%BB%8E%E4%BD%A0%E7%9A%84%E5%85%A8%E4%B8%96%E7%95%8C%E8%B7%AF%E8%BF%87%20(%E8%8A%82%E7%9B%AE).mp3?sign=a7403920669afe30b524c48066a26f66&t=1617952153'
    innerAudioContext.play()
    this.setImgAndText()
  },
  data: {
    isPlay:true,
    imgUrl:'',
    text:'',
    textColor:'',
    index:0,
    list:[
      {
        id:0,
        imgUrl:'../../assets/img/dc1.jpg',
        text:'第一张图',
        color:'#fff'
      },
      {
        id:1,
        imgUrl:'../../assets/img/dc2.gif',
        text:'第二张图',
        color:'red'
      },
      {
        id:2,
        imgUrl:'../../assets/img/dc3.gif',
        text:'第三张图',
        color:'blue'
      }
    ]
  },
  // 点击图播放或暂停音乐
  setAudio:function(){
    console.log(this.data.isPlay)
    if(this.data.isPlay == true){
      innerAudioContext.pause()
      this.setData({
        isPlay:false
      })
    }else{
      innerAudioContext.play()
      this.setData({
        isPlay:true
      })
    }
  },
  // 设置要显示图片和文字
  setImgAndText:function(){
    this.setData({
      imgUrl:this.data.list[0].imgUrl,
      text:this.data.list[0].text,
    })
  },
  // 查看下一个
  seeNext(){
    console.log(this.data.index)
    if(this.data.index+1 == this.data.list.length){
      wx.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/video/video',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      this.setData({
        index:this.data.index+1
      },() => {
        this.setData({
          imgUrl:this.data.list[this.data.index].imgUrl,
          text:this.data.list[this.data.index].text,
          textColor:this.data.list[this.data.index].color,
          index:this.data.index
        })
      })
    }
  },
})
