Component({
  data: {
    features: [
      { icon: '/assets/images/cocktail-icon.png', label: '调酒' },
      { icon: '/assets/images/food-icon.png', label: '美食' },
      { icon: '/assets/images/seat-icon.png', label: '订座' },
      { icon: '/assets/images/shop-icon.png', label: '周边' }
    ],
    navItems: [
      { icon: 'home-icon', label: '主页', active: true },
      { icon: 'menu-icon', label: '菜单', active: false },
      { icon: 'user-icon', label: '我的', active: false }
    ]
  },

  methods: {
    onFeatureTap(e) {
      const { index } = e.currentTarget.dataset
      const feature = this.data.features[index]
      console.log('Feature tapped:', feature.label)
      // 这里可以添加具体的功能实现
    },

    onNavTap(e) {
      const { index } = e.currentTarget.dataset
      const navItems = this.data.navItems.map((item, i) => ({
        ...item,
        active: i === index
      }))
      this.setData({ navItems })
      console.log('Navigation tapped:', this.data.navItems[index].label)
      // 这里可以添加导航切换的具体实现
    }
  }
}) 