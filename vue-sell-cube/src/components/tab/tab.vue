<template>
  <div class="tab">
    <cube-tab-bar :showSlider=true
                  :useTransition=false
                  v-model="selectedLabel"
                  :data="tabs"
                  ref="tabBar"
                  class="border-bottom-1px">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide :loop=false
                  :auto-play=false
                  :show-dots=false
                  :initial-index="index"
                  ref="slide"
                  @scroll="onScroll"
                  @change="onChange"
                  :options="slideOptions">

        <cube-slide-item v-for="(tab,index) in tabs"
                         :key="index">
          <component :is="tab.component"
                     :data="tab.data"
                     ref="conponent"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    selectedLabel: {
      get () {
        return this.tabs[this.index].label
      },
      set (newVal) {
        this.index = this.tabs.findIndex((value) => {
          return value.label === newVal
        })
      }
    }
  },
  components: {
  },
  mounted () {
    this.onChange(this.index)
  },
  methods: {
    onChange (current) {
      this.index = current
      const conponent = this.$refs.conponent[current]
      conponent.fetch && conponent.fetch()
    },
    onScroll (pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth // 组件的dom $el
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transfrom = -pos.x / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transfrom)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tab
  >>> .cube-tab
    padding 10px 0
  display flex
  flex-direction column
  height 100%
  .slide-wrapper
    flex 1
    overflow hidden
</style>
