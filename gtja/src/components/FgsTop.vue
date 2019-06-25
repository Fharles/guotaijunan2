<template>
  <div class="fd-fgs-header">
    <div class="fd-search-box">
      <input  @focus="searchShow" v-model="sousuoText" :class="{'fd-text-left': !iconShow}" type="text" name="" id=""/>
      <img v-if="iconShow" src="../assets/images/icon-search.png" alt="">
      <!-- <span class="fd-cancle-btn">取消</span> -->
    </div>
    <div class="fd-heander-content">
      <div class="fd-line-one">
        <span v-text="code.indexOf('a') > -1 ? dataObj.text : dataObj.text + '营业部'">上海南京西路营业部</span>
        <span>{{dataObj.type}}赛区</span>
        <span @click="jumpToRankDetail">更多&nbsp;></span>
      </div>
      <div class="fd-line-two">
        <div class="fd-line-two-left fd-line-item">
          <div class="fd-title-describtion-style">历史最好成绩</div>
          <div class="fd-rank-style-text">No{{dataObj.lsNumber}} {{dataObj.lsName}}</div>
        </div>
        <div class="fd-line-two-right fd-line-item">
          <div class="fd-title-describtion-style">本季最好成绩</div>
          <div class="fd-rank-style-text">No{{dataObj.bestNumber}} {{dataObj.bestName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Url from '../api/api.js'
import {fetchPost, fetchGet} from '../api/fetch.js'
export default {
  name: 'FgsTop',
  props: {
    dataObj:{
      type: Object,
      default: function () {
        return {}
      }
    },
    code: {
      type: String,
      default: ''
    },
    type: {
      type: Number || String,
      default: 1
    }
  },
  data () {
    return {
      iconShow: true,
      sousuoText: ''
    }
  },
  methods: {
    searchShow () {
      this.$emit('showSearch', true)
    },
    changeText () {
      fetchPost(Url.searchData.url, {userInfo: '', companyName: this.sousuoText, quota: 10000001}).then(res => {
        if (res.data.code == '000000') {
          // 请求成功
        } else {
          console.log(res.data.message)
        }
      })
    },
    // enter事件
    search () {
      this.$store.dispatch('searchText', this.sousuoText)
      fetchPost(Url.searchData.url, {userInfo: '', companyName: this.sousuoText, quota: 10000001}).then(res => {
        if (res.data.code == '000000') {
          // 请求成功
        } else {
          console.log(res.data.message)
        }
      })
    },
    // 搜索框输入事件
    changeValue () {
      this.iconShow = false
    },
    // 更多的点击跳转
    jumpToRankDetail () {
      this.$router.push({path: '/rankDetail', name: 'rank', query: {CompanyType: this.type, qy: this.dataObj.type, jd: this.$store.state.jd}})
    }
  }
}
</script>
<style scoped>
.fd-fgs-header{
  width: 100%;
  height: 3.16rem;
  background-color:#3083EB;
  padding: 0.6rem 0.24rem 0.28rem 0.24rem;
}
.fd-search-box{
  background: #3083EB;
  height: .88rem;
  margin-bottom: .14rem;
  /* overflow: hidden; */
  position: relative;
}
.fd-search-box input{
  display: block;
  width: 100%;
  height: .6rem;
  color: #fff;
  border: none;
  outline: none;
  text-align: left;
  background: #2069e3;
  border-radius: .1rem;
}
.fd-search-box input::-webkit-input-placeholder{
  color: #F0F0F0;
}
.fd-search-box img{
  position: absolute;
  display: block;
  width: .32rem;
  height: .32rem;
  top: .16rem;
  left: 0.3rem;
}
.fd-search-box span{
  position: absolute;
  font: 0.24rem/0.4rem "microsoft yahei";
  color: #F0F0F0;
  cursor: pointer;
  top: .11rem ;
  right: .4rem;
}
.fd-heander-content{
  width: 100%;
}
.fd-line-one{
  height: .6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fd-line-one span:first-child{
  font-size: 0.4rem;
  color: #fff;
  margin-bottom: .2rem;
}
.fd-line-one span:nth-child(2){
  color: #98C6FF;
  font-size: 0.24rem;
  margin-left: .2rem;
}
.fd-line-one span:last-child{
  color: #FFFFFF;
  font-size: .24rem;
  margin-right: .3rem;
}
.fd-line-two{
  display: flex;
}
.fd-line-item{
  width: 2.55rem;
  margin-right: 0.6rem;
  text-align: left;
}
.fd-title-describtion-style{
  color: #98C6FF;
  font-size: .2rem;
  /* line-height: .4rem; */
}
.fd-rank-style-text{
  color: #fff;
  font-size: .24rem;
  /* line-height: .4rem; */
}
.fd-text-left{
  text-align:left !important;
  padding-left: .3rem !important;
}
</style>
