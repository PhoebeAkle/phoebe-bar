Component({
  options: {
    styleIsolation: 'apply-shared'
  },

  data: {
    email: '',
    phone: '',
    verificationCode: '',
    countdown: 0,
    error: '',
    activeTab: 'email'
  },

  methods: {
    handleEmailLogin() {
      const { email } = this.data
      if (!email) {
        this.setData({ error: '请输入邮箱地址' })
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.setData({ error: '请输入有效的邮箱地址' })
        return
      }
      this.setData({ error: '' })
      this.triggerEvent('login')
    },

    handlePhoneLogin() {
      const { phone, verificationCode } = this.data
      if (!phone) {
        this.setData({ error: '请输入手机号码' })
        return
      }
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        this.setData({ error: '请输入有效的中国大陆手机号码' })
        return
      }
      if (!verificationCode) {
        this.setData({ error: '请输入验证码' })
        return
      }
      this.setData({ error: '' })
      this.triggerEvent('login')
    },

    sendVerificationCode() {
      const { phone } = this.data
      if (!phone) {
        this.setData({ error: '请输入手机号码' })
        return
      }
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        this.setData({ error: '请输入有效的中国大陆手机号码' })
        return
      }

      this.setData({ error: '', countdown: 60 })
      const timer = setInterval(() => {
        if (this.data.countdown <= 1) {
          clearInterval(timer)
          this.setData({ countdown: 0 })
          return
        }
        this.setData({ countdown: this.data.countdown - 1 })
      }, 1000)
    },

    onEmailInput(e) {
      this.setData({
        email: e.detail.value,
        error: ''
      })
    },

    onPhoneInput(e) {
      const value = e.detail.value.replace(/\D/g, '')
      this.setData({
        phone: value,
        error: ''
      })
    },

    onCodeInput(e) {
      this.setData({
        verificationCode: e.detail.value,
        error: ''
      })
    },

    onTabChange(e) {
      const { value } = e.currentTarget.dataset
      this.setData({
        activeTab: value,
        error: ''
      })
    },

    onSkip() {
      this.triggerEvent('skip')
    }
  }
}) 