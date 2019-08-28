<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <header-detail :seller="seller"></header-detail>
    <div class="tab-wrapper">
      <tab></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header.vue'
import HeaderDetail from 'components/header-detail/header-detail.vue'
import Tab from 'components/tab/tab'
import { getSeller } from 'api'

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      getSeller().then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    HeaderDetail,
    Tab
  }

}
</script>
<style lang="stylus" scoped>
#app
  .tab-wrapper
    position fixed
    top 136px
    left 0
    right 0
    bottom 0
</style>
