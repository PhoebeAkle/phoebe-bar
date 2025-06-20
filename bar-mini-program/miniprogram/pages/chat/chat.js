Page({
  data: {
    messages: [],
    inputValue: ''
  },
  onLoad() {
    // Kitty 首次发言
    this.setData({
      messages: [
        {
          id: Date.now(),
          from: 'kitty',
          text: '你好，今天想喝些什么。'
        }
      ]
    })
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },
  onSend() {
    const val = this.data.inputValue.trim()
    if (!val) return
    const newMsg = {
      id: Date.now(),
      from: 'user',
      text: val
    }
    const msgs = this.data.messages.concat(newMsg)
    this.setData({
      messages: msgs,
      inputValue: ''
    })
    // 可在此处添加Kitty自动回复逻辑
  }
}) 