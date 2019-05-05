 <template>
  <div>
    <Row class="one">
      <Col :span="8">
      <i-input v-model="title"
               type="text"
               style="width:200px"
               placeholder="请输入题目"></i-input>
      </Col>
      <Col :span="8">
      <i-select :model.sync="type"
                style="width:200px"
                @on-change="selectChange">
        <Option-group label="测试">
          <i-option v-for="(item,index) in testList"
                    :value="item.value"
                    :key="index">{{ item.label }}</i-option>
        </Option-group>
        <Option-group label="vue">
          <i-option v-for="(item,index) in vueList"
                    :value="item.value"
                    :key="index">{{ item.label }}</i-option>
        </Option-group>
        <Option-group label="js">
          <i-option v-for="(item,index) in jsList"
                    :value="item.value"
                    :key="index">{{ item.label }}</i-option>
        </Option-group>
      </i-select>
      </Col>
      <Col :span="8">
      <Date-picker type="date"
                   placeholder="选择日期"
                   style="width: 200px"
                   @on-change="changeDate"></Date-picker>
      </Col>
    </Row>
    <div class="markdown-wrapper">
      <div class="plugins-tips">
        mavonEditor：基于Vue的markdown编辑器。 访问地址：
        <a href="https://github.com/hinesboy/mavonEditor"
           target="_blank">mavonEditor</a>
      </div>
      <mavon-editor v-model="content"
                    ref="md"
                    @imgAdd="$imgAdd"
                    @change="change"
                    style="min-height: 600px" />
      <Button type="primary"
              @click="submit">提交</Button>
      <!-- <el-button class="editor-btn" type="primary" ></el-button> -->
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import axios from 'axios'
import qs from 'qs'
import 'mavon-editor/dist/css/index.css'
// import { url } from 'inspector'
export default {
  name: 'page_2_1',
  data () {
    return {
      title: '',
      content: '',
      html: '',
      configs: {},
      testList: [
        {
          value: 'test',
          label: '测试'
        }
      ],
      vueList: [
        {
          value: 'vuex',
          label: 'vuex'
        }
      ],
      jsList: [
        {
          value: 'js',
          label: 'js'
        }
      ],
      type: '',
      date: '',
      read: 0
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      // this.$axios({
      //   url: '/common/upload',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then(url => {
      //   this.$refs.md.$img2Url(pos, url)
      // })
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.html = render
    },
    changeDate (value) {
      this.date = value
    },
    selectChange (value) {
      this.type = value
    },
    submit () {
      if (!this.html || !this.content || !this.type || !this.date || !this.title) {
        this.$Message.info('请输入完整信息')
        return
      }
      const LOCALURL = 'http://localhost:3000/'
      let urls = LOCALURL + 'article/submitArticle'
      let data = qs.stringify({
        type: this.type,
        createTime: this.date,
        html: this.html,
        content: this.content,
        title: this.title,
        read: this.read,
        updateTime: this.date
      })
      console.log('data', data)
      axios.post(urls, data).then(res => {
        this.$Message.success(res.data.message)
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
.one {
  z-index: 1501;
}
</style>
<style lang="less">
</style>
