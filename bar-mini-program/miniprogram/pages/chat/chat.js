Page({
  data: {
    messages: [
      {
        id: Date.now(),
        from: 'kitty',
        text: '你好！今天想喝什么？'
      }
    ],
    inputValue: '',
    loading: false
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },
  onSend() {
    const val = this.data.inputValue.trim()
    if (!val || this.data.loading) return
    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: val
    }
    const msgs = this.data.messages.concat(userMsg)
    this.setData({
      messages: msgs,
      inputValue: '',
      loading: true
    }, this.scrollToBottom)
    this.sendToMoonshot(msgs)
  },
  sendToMoonshot(msgs) {
    const API_KEY = 'sk-L1HYvgkcWsbGMUeZ0BrkqR1jChWDfeNLP5arN28ZTaNdquP3'; // 你的Moonshot API密钥
    const url = 'https://api.moonshot.cn/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY
    };
    const moonMsgs = msgs.map(m => ({
      role: m.from === 'user' ? 'user' : 'assistant',
      content: m.text
    }))
    wx.request({
      url,
      method: 'POST',
      timeout: 20000,
      header: headers,
      data: {
        model: 'moonshot-v1-8k',
        messages: moonMsgs
      },
      success: (res) => {
        let reply = ''
        try {
          reply = res.data.choices[0].message.content.trim()
        } catch (e) {
          reply = ''
        }
        if (reply) {
          const aiMsg = {
            id: Date.now() + 1,
            from: 'kitty',
            text: reply
          }
          this.setData({
            messages: this.data.messages.concat(aiMsg),
            loading: false
          }, this.scrollToBottom)
        } else {
          this.showError('AI未能理解您的问题，请重试')
        }
      },
      fail: () => {
        this.showError('连接失败，请稍后重试')
      }
    })
  },
  showError(msg) {
    const errMsg = {
      id: Date.now() + 2,
      from: 'kitty',
      text: msg
    }
    this.setData({
      messages: this.data.messages.concat(errMsg),
      loading: false
    }, this.scrollToBottom)
  },
  scrollToBottom() {
    // 兼容小程序页面自动滚动到底部
    wx.pageScrollTo({
      scrollTop: 99999,
      duration: 300
    })
  }
}) 