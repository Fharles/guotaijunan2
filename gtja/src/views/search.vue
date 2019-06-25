<template>
  <div>
    <div class="fd-search-header">
      <input @focus="hidenIconSearch" @input="changeInput" class="fd-search-input" v-model="searchContent" type="text">
      <img v-if="isShowIcon" src="../assets/images/icon-search.png" alt="">
      <div @click="cancleClick" v-if="isshowCancle" class="fd-cancle-btn">取消</div>
    </div>
    <div class="fd-content-wrap-search1" v-if="searchContent && searchContent.length > 0">
      <div class="fd-search-item-style" v-for="(item, index) in searchData" :key="index" >
        <span style="padding-left: .3rem" v-text="item.abbrchiName" @click="clickItem(item.companyCode, item.struCode, item.abbrchiName)"></span>
      </div>
    </div>
    <div v-else class="fd-content-wrap-search">
      <div class="fd-item-wrap" v-for="(item, key,index) of allData" :key="index">
        <div class="fd-item-title" v-text="key == 0 ? '总部' : key">
        </div>
        <div v-for="(item1, index1) in item" :key="index1">
          <div class="fd-item-fgsName" ><span @click="zbClick(item1, key)">{{item1.abbrchiName}}</span>
            <span style="float:right">
              <img class="fd-more-img" :class="{'fd-run-style': item1.isZk}" v-if="key != 0" @click="clickMore(key,index1,item1)" src="../assets/images/icon-more.png" alt="">
            </span>
          </div>
          <div v-show="item1.isZk">
            <div class="fd-children-item-style" v-for="(item2, index2) in item1.children" :key="index2" v-text="item2.abbrchiName" @click="clickItem(item2.companyCode, item2.struCode,item2.abbrchiName)"></div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import Url from '../api/api.js'
import { fetchPost } from '../api/fetch';
export default {
  name: 'search',
  data () {
    return {
      searchContent: '',
      isShowIcon: true, // 是否展示搜索图标
      isshowCancle: false, // 表示取消按钮的展示
      allData: {0:[],A: [], B: []},
      searchData: [], // 用来存放输入框搜索的数据
    }
  },
  methods: {
    // 区别总别的点击事件
    zbClick (item, key) {
        // 说明是总部的点击事件
        this.$emit('getcompanyCode', {companyCode: item.companyCode, companyType: item.struCode - 1, companyName: item.abbrchiName})
    },
    // 点击具体公司跳转
    clickItem (companyCode, companyType, companyName) {
      this.$emit('getcompanyCode', {companyCode, companyType: companyType - 1})
    },
    clickMore (key, index, item) {
      this.$set(this.allData[key][index], 'isZk', !this.allData[key][index]['isZk'])
      // 判断是否要调用接口请求子节点
      if (this.allData[key][index]['children'] && this.allData[key][index]['children'].length > 0) {
        // 说明有数据
      } else {
        // 说明之前没有调用数据
        fetchPost(Url.childrenData, {quota: 10000177, userInfo: '', companyCode: item.companyCode}).then(res => {
          if (res.data.code == '000000') {
            // 说明请求成功
            this.$set(this.allData[key][index], 'children', res.data.responseEntity)
          } else {
            // 请求失败
            console.log(res.data.message)
          }
        })
      }     
    },
    // 请求全部数据
    getAllData () {
      fetchPost(Url.searchData.url, {quota: 10000177, userInfo: ''}).then(res => {
        if (res.data.code == '000000') {
          // 请求成功
          this.allData = res.data.responseEntity
          for (let key in this.allData) {
            // 处理数据
            if (key == 0) {
              continue
            } else {
             for (let i= 0; i< this.allData[key].length; i++) {
               this.$set(this.allData[key][i], 'isZk', false)
             }
            }
          }
        } else {
          // 请求失败
          console.log(res.data.message)
        }
      })
    },
    // 取消按钮点击事件
    cancleClick () {
      this.isShowIcon = true
      this.searchContent = ''
      this.isshowCancle = false

    },
    // 输入框聚焦事件
    hidenIconSearch () {
      this.isShowIcon = false
    },
    // 改变input输入框的值
    changeInput () {
      if (this.searchContent.length > 0) {
        this.isshowCancle = true
      } else {
        this.isshowCancle = false
      }
    }
  },
  watch: {
    searchContent: {
      handler (n, o) {
        if (n != o) {
          // 调用数据接口
          if (this.searchContent.length > 0) {
            // 调用接口渲染数据
            this.searchData = []
            fetchPost(Url.searchData.url, {quota: 10000177, userInfo: '', companyName: n}).then(res => {
              if (res.data.code == '000000') {
                // 请求成功
                var data  = res.data.responseEntity
                for (let key in data) {
                  for (let k= 0; k < data[key].length; k++) {
                    this.searchData.push(data[key][k])
                  }
                }
              } else {
                // 请求失败
                conosle.log(res.data.message)
              }
            })
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getAllData()
  }
}
</script>
<style scoped>
.fd-search-header{
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  height: 1rem;
  width: 100vw;
  background-color: #3083eb;
  display: flex;
  justify-content: center;
  align-items:center;
}
.fd-search-input{
  display: block;
  width: 96%;
  margin: auto;
  height: .6rem;
  color: #fff;
  border: none;
  outline: none;
  text-align: left;
  background: #2069e3;
  border-radius: .1rem;
  padding-left: .2rem;
}
.fd-search-header img{
  position: absolute;
  display: block;
  width: .32rem;
  height: .32rem;
  top: .34rem;
  left: 0.4rem;
}
.fd-cancle-btn{
  position: absolute;
  right: .4rem;
  top: .3rem;
  color: white;
}
.fd-content-wrap-search, .fd-content-wrap-search1{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  padding-top: 1rem;
  padding-bottom: .5rem;
}
.fd-content-wrap-search1{
  padding-left: .3rem;
}
.fd-item-wrap{
  width: 100vw;
}
.fd-item-title{
  width: 100vw;
  height: .8rem;
  line-height: .8rem;
  padding:0 .24rem;
  background-color: #fafafa;
  color: #666;
  font-size: .25rem;
}
.fd-item-fgsName{
  width: 100vw;
  height: .8rem;
  line-height: .8rem;
  padding: 0 .24rem;
  background-color: white;
  font-size: .3rem;
}
.fd-more-img{
  width: .24rem;
  height: .22rem;
  transform: rotate(90deg);
  transition: all .5s;
}
.fd-run-style{
  transform: rotate(-90deg) !important;
}
.fd-children-item-style{
  width: 100ww;
  padding: 0 .3rem;
  background-color: white;
  font-size: .3rem;
  color: #686868;
  height: .6rem;
  line-height: .6rem;
}
.fd-search-item-style{
  width: 100%;
  /* text-indent: .1rem; */
  line-height: .8rem;
  height: .8rem;
  font-size: .3rem;
  color: #646464;
  border-bottom: 1px solid #e2e2e2;
}
</style>


