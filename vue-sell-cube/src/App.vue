<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <header-detail :seller="seller"></header-detail>
    <div class="tab-wrapper">
      <tab :tabs="tabs"
           :initialIndex="0"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header.vue'
import Goods from 'components/goods/goods.vue'
import Ratings from 'components/ratings/ratings.vue'
import Seller from 'components/seller/seller.vue'
import HeaderDetail from 'components/header-detail/header-detail.vue'
import Tab from 'components/tab/tab'
import { getSeller } from 'api'
import qs from 'query-string'

export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  computed: {
    tabs () {
      return [
        { label: '商品', component: Goods, data: { seller: this.seller } },
        { label: '评价', component: Ratings, data: { seller: this.seller } },
        { label: '商家', component: Seller, data: { seller: this.seller } }
      ]
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
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
