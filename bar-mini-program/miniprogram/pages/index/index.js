Page({
  data: {
    currentScreen: 'splash',
    isTransitioning: false
  },

  onLoad() {
    console.log('Page Load')
    // 缓冲页面停留1.5秒后跳转到登录界面
    setTimeout(() => {
      this.handleTransition('login')
    }, 1500)
  },

  onShow() {
    console.log('Page Show')
  },

  handleTransition(nextScreen) {
    this.setData({
      isTransitioning: true
    })
    setTimeout(() => {
      this.setData({
        currentScreen: nextScreen,
        isTransitioning: false
      })
    }, 300)
  },

  handleLogin() {
    console.log('Login clicked')
    this.handleTransition('main')
  },

  handleSkip() {
    console.log('Skip clicked')
    this.handleTransition('main')
  }
}) 