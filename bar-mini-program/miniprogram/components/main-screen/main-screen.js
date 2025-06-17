Component({
  data: {
    features: [
      { icon: '/assets/images/cocktail-icon.png', label: '调酒' },
      { icon: '/assets/images/food-icon.png', label: '美食' },
      { icon: '/assets/images/seat-icon.png', label: '订座' },
      { icon: '/assets/images/shop-icon.png', label: '周边' }
    ],
    navItems: [
      { icon: 'home', label: '主页', active: true },
      { icon: 'cart', label: '订单', active: false },
      { icon: 'user', label: '我的', active: false }
    ]
  },

  methods: {
    onFeatureTap(e) {
      const { index } = e.currentTarget.dataset
      const feature = this.data.features[index]
      console.log(feature.label)
    },

    onNavTap(e) {
      const { index } = e.currentTarget.dataset
      const navItems = this.data.navItems.map((item, i) => ({
        ...item,
        active: i === index
      }))
      this.setData({ navItems })
    }
  }
}) 