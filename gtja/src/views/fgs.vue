<template>
  <div class="fd-main-content">
    <div v-if="isshowSearch" class="fd-show-search-wrap">
      <Search @getcompanyCode="receiveCode"/>
    </div>
    <!-- <div class="fd-show-data"></div> -->
    <div v-else>
    <FgsTop @showSearch="showSearch" style="position:fixed;top:0;left:0;" :dataObj="topDataObj" :code="paramsRank.CompanyCode" :type="CompanyType"/>
    <div style="padding-top:3.9rem;height:100%;padding-bottom:.86rem">
      <div class="fd-nav-wrap">
        <div :class="{'fd-current-index': currentIndex === 1}" @click="changeJd(1)">一季度</div>
        <div :class="{'fd-current-index': currentIndex === 2}" @click="changeJd(2)">二季度</div>
        <div :class="{'fd-current-index': currentIndex === 3}" @click="changeJd(3)">三季度</div>
        <div :class="{'fd-current-index': currentIndex === 4}" @click="changeJd(4)">四季度</div>
      </div>
      <div class="fd-content-rank-wrap" v-if="CompanyType == 2">
        <div class="fd-rank-top-wrap">
          <div class="fd-rank-title-wrap">
            <img class="fd-icon-rank-common" src="../assets/images/icon-jiangbei.png" alt="">
            {{topDataObj.type}}赛区
          </div>
          <!-- 赛区产品销量 -->
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">产品销量</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div v-if="sqCpxs &&sqCpxs.length >0" class="fd-list-wrap">
              <div class="fd-list-item" v-for="(item,index) in sqCpxs" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">公墓基金销量</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">资产规模</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap" v-if="sqZcgm && sqZcgm.length > 0">
              <div class="fd-list-item" v-for="(item,index) in sqZcgm" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">整体资产规模增长</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
        </div>
        <div class="fd-rank-bottom-wrap">
          <div class="fd-rank-title-wrap">
            <img class="fd-icon-rank-common" src="../assets/images/icon-rank.png" alt="">
            分公司内排名
          </div>
          <!-- 赛区产品销量 -->
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">产品销量</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap" v-if="fgsCpxs && fgsCpxs.length > 0">
              <div class="fd-list-item" v-for="(item,index) in fgsCpxs" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">公墓基金销量</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">资产规模</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap" v-if="fgsZcgm && fgsZcgm.length > 0">
              <div class="fd-list-item" v-for="(item,index) in fgsZcgm" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">整体资产规模增长</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="fd-content-rank-wrap" v-else>
        <div class="fd-rank-top-wrap">
          <!-- 客户数 -->
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">客户数</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div v-if="Fgskhs &&Fgskhs.length >0" class="fd-list-wrap">
              <div class="fd-list-item" v-for="(item,index) in Fgskhs" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">公墓基金销量</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
          <!-- 产品销量 -->
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">产品销量</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div v-if="Fgscpxl &&Fgscpxl.length >0" class="fd-list-wrap">
              <div class="fd-list-item" v-for="(item,index) in Fgscpxl" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">公墓基金销量</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
          <!-- 资产规模 -->
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">资产规模</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap" v-if="Fgszcgm && Fgszcgm.length > 0">
              <div class="fd-list-item" v-for="(item,index) in Fgszcgm" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">整体资产规模增长</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
          <!-- 资产规模 -->
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">服务体系推进</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap" v-if="Fgsfwtxtj && Fgsfwtxtj.length > 0">
              <div class="fd-list-item" v-for="(item,index) in Fgsfwtxtj" :key="index">
                <div class="fd-saiqu-left">
                  <img v-if="item.rankNumber == '1'" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="item.rankNumber == '2'" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="item.rankNumber == '3'" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                  <span v-if="item.rankNumber > 3" v-text="item.rankNumber"></span>
                </div>
                <div class="fd-saiqu-middle" v-text="item.indexAbbr">整体资产规模增长</div>
                <div class="fd-saiqu-right">
                  <img v-if="item.rankNumberChange > 0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="item.rankNumberChange < 0" src="../assets/images/icon-down.png" alt="">
                  <span v-text="Math.abs(item.rankNumberChange) > 0 ? Math.abs(item.rankNumberChange) : '-'"></span>
                </div>
              </div>
            </div>
            <div v-else class="fd-list-item" style="justify-content:center">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fd-bottom-wrap">
      <img class="fd-ck-img" src="../assets/images/icon-house.png" alt="">
      <span v-if="CompanyType == 2" @click="ckFgs">查看所属分公司</span>
      <span v-if="CompanyType == 1" @click="ckYyb">查看所辖营业部</span>
    </div>
    </div>
  </div>
</template>
<script>
import Search from '@/views/search.vue'
import Url from '../api/api.js'
import {fetchPost, fetchGet} from '../api/fetch.js'
import FgsTop from '@/components/FgsTop.vue'
import eventBus from '../api/eventBus.js'
export default {
  name: 'fgs',
  components: {
    FgsTop,
    Search
  },
  data () {
    return {
      isshowSearch: false,
      CompanyType: 2,
      bfCode: '',
      isLoading: false,
      sqZcgm: [], // 赛区的资产规模数组
      sqCpxs: [], // 赛区的产品销售
      fgsZcgm: [], // 赛区的资产规模数组
      fgsCpxs: [], // 赛区的产品销售
      Fgskhs: [], // 客户数数据
      Fgszcgm: [], // 分公司的资产规模
      Fgsfwtxtj: [], // 分公司的服务体系推进
      Fgscpxl: [], // 分公司的产品销量
      currentIndex: 1, // 表示当前季度的高亮下标
      dataArr: [1,2,3,4,5],
      topDataObj: {
        type: '甲' // 表示什么赛区
      },
      paramsRank: {
        Quarter: 1, //季度：1--第一季度, 2--第二季度, 3--第三季度, 4--第四季度
        userInfo: '', // 用户信息
        RankType: 1, // 1--赛区 2--分公司
        CompanyCode: 'b8307' // 机构代码 营业部 b8307 分公司 a1100
      }
    }
  },
  methods: {
    receiveCode(obj) {
      this.isshowSearch = false
      this.paramsRank.CompanyCode = obj.companyCode
      this.CompanyType = obj.companyType
       if (this.CompanyType == 2) {
          this.getYybData(1, 1)
          // 请求分公司内排名数据
          this.getYybData(2, 1)
        } else {
          this.getYybData(1,1)
        }
    },
    showSearch(flag) {
      if (flag) {
        // 显示搜索组件
        this.isshowSearch = true
      }
    },
    // 请求用户信息接口
    getUser () {
      fetchPost(Url.getUser.url, {userInfo: '0'}).then(res => {
        if (res.data.code == '000000') {
          // 请求成功
          this.paramsRank.CompanyCode = res.data.responseEntity[0].companyCode
          this.CompanyType = parseInt(res.data.responseEntity[0].struCode)
          if (this.CompanyType == 2) {
            this.getYybData(1, 1)
            // 请求分公司内排名数据
            this.getYybData(2, 1)
          } else {
            this.getYybData(1,1)
          }
        } else {
          console.log(res.data.message)
        }
      })
    },
    // 请求营业部排名数据
    getYybData (RankType, Quarter) {
      this.isLoading = true
      let obj = {
        Quarter,
        userInfo: '',
        RankType,
        CompanyCode: this.paramsRank.CompanyCode
      }
      let _this = this
      fetchGet(Url.yybRank.url, obj).then(res => {
        if (res.data.code === '000000') {
          //请求成功
          // 清空数据 资产规模和产品销售
          if (RankType == 1) {
            // 表示赛区
            _this.sqZcgm = []
            _this.sqCpxs = []
          } else if (RankType == 2) {
            // 表示分公司
            _this.fgsZcgm = []
            _this.fgsCpxs = []
          }
          if (_this.CompanyType == 1) {
            // 说明是分公司数据
            _this.Fgskhs = []
            _this.Fgszcgm = []
            _this.Fgscpxl = []
            _this.Fgsfwtxtj = []
          }
          let dataArr = res.data.responseEntity || []
          if (dataArr && dataArr.length > 0) {
            _this.topDataObj = {}
            for (let i = 0; i < dataArr.length; i++) {
              // 处理拿到的数据
              if (dataArr[i]['typeCode'] == '1') {
                // 赛区类型
                _this.topDataObj.type = dataArr[i]['indexAbbr']
                _this.bfCode = dataArr[i]['parentCode']
              }
              if (dataArr[i]['typeCode'] == '2') {
                _this.topDataObj.text = dataArr[i]['indexAbbr']
              }
              if (dataArr[i]['typeCode'] == '3') {
                // 历史最好
                _this.topDataObj.lsNumber = dataArr[i]['rankNumber']
                _this.topDataObj.lsName = dataArr[i]['indexAbbr']
              }
              if (dataArr[i]['typeCode'] == '4') {
                // 本季最好
                _this.topDataObj.bestNumber = dataArr[i]['rankNumber']
                _this.topDataObj.bestName = dataArr[i]['indexAbbr']
              }
              if (dataArr[i]['typeCode'] == '999') {
                // 表示赛区数组数据
                if (_this.CompanyType == 2) {
                  if (RankType == 1) {
                    // 表示赛区
                    if (dataArr[i]['typeName'] == '资产规模'){
                      _this.sqZcgm.push(dataArr[i])
                    } else if (dataArr[i]['typeName'] == '产品销售') {
                      _this.sqCpxs.push(dataArr[i])
                    }
                  }
                  if (RankType == 2) {
                    // 表示为分公司的数据
                    if (dataArr[i]['typeName'] == '资产规模'){
                      _this.fgsZcgm.push(dataArr[i])
                    } else if (dataArr[i]['typeName'] == '产品销售') {
                      _this.fgsCpxs.push(dataArr[i])
                    }
                  }
                } else if (_this.CompanyType == 1) {
                  if (dataArr[i]['typeName'] == '资产规模'){
                      _this.Fgszcgm.push(dataArr[i])
                    } else if (dataArr[i]['typeName'] == '产品销售') {
                      _this.Fgscpxl.push(dataArr[i])
                    } else if (dataArr[i]['typeName'] == '服务体系推进') {
                      _this.Fgsfwtxtj.push(dataArr[i])
                    } else if (dataArr[i]['typeName'] == '客户数') {
                      _this.Fgskhs.push(dataArr[i])
                    }
                }
              }
            }
          }
        } else {
          console.log(res.message)
        }
      })
    },
    // 季度的切换
    changeJd (index) {
      this.$store.dispatch('changeJd', index)
      if (index === this.currentIndex) {
        return 
      } else {
        this.currentIndex = index
        // 掉接口换数据
        if (this.CompanyType == 2) {
          this.getYybData(1, index)
          this.getYybData(2, index)
        } else {
          this.getYybData(1, index)
        }
      }
    },
    // 查看所辖营业部
    ckYyb () {
      // eventBus.$emit('getCompanyCode', this.paramsRank.CompanyCode)
      // eventBus.$emit('getHeaderTitle', this.topDataObj)
      // this.$store.commit('getCode', this.paramsRank.CompanyCode)
      // this.$store.commit('getHeaderData', this.topDataObj)
      this.$router.push({ path: '/detail',name: 'xxx', query:{CompanyCode: this.paramsRank.CompanyCode, objData: JSON.stringify(this.topDataObj)}})
    },
    // 查看所属分公司点击
    ckFgs () {
      this.paramsRank.CompanyCode = this.bfCode
      this.CompanyType = 1
      this.currentIndex = 1
      this.getYybData(1, 1)
    }
  },
  mounted () {
    this.$store.dispatch('changeJd', 1)
    // 为营业部时
    // 请求赛区数据
    this.getUser()
  }
}
</script>
<style scoped>
*{
  box-sizing: border-box;
}
.fd-main-content{
  width: 100vw;
  height: 100vh;
}
.fd-nav-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .74rem;
  position: fixed;
  left: 0;
  top: calc(3.16rem - 1px);
  width: 100vw;
  background-color: white;
}
.fd-nav-wrap div{
  width: 25%;
  height: 100%;
  line-height: .74rem;
  color: #CCCCCC;
  font-size: .24rem;
  border-bottom: 2px solid rgba(230,230,230,1);
  text-align: center;
}
.fd-current-index{
  border-bottom: 2px solid rgba(248,139,59,1) !important;
  color: rgba(248,139,59,1) !important;
}
.fd-content-rank-wrap{
  width: 100%;
  /* padding-top: .74rem; */
  /* overflow-y: scroll; */
}
.fd-rank-title-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  font-size: .24rem;
  height: .7rem;
  width: 100%;
  border-bottom: 1px solid rgba(230,230,230,1);
}
.fd-icon-rank-common{
  width: .26rem;
  height: .28rem;
  vertical-align: middle;
  margin-right: .2rem;
}
.fd-saiqu-left{
  padding-left: .2rem;
  width: 11%;
  text-align: center;
}
.fd-saiqu-right{
  padding-right: .2rem;
  width: 26%;
  text-align: center;
}
.fd-saiqu-middle{
  width: 63%;
  text-align: center;
}
.fd-saiqu-title-wrap{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .6rem;
}
.fd-saiqu-title-wrap{
  font-size: .22rem;
  color: #9C9C9C;
}
.fd-list-item{
  font-size: .24rem;
  color: #444444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .83rem;
  /* border-top: 2px solid rgba(230,230,230,1);  */
}
.fd-number-img{
  width: .4rem;
  height: .51rem;
}
.fd-list-wrap{
  border-bottom: 2px solid rgba(230,230,230,1);
}
.fd-bottom-wrap{
  display: flex;
  width: 100%;
  height: .86rem;
  justify-content: center;
  align-items: center;
  font-size: .24rem;
  color: #222;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
}
.fd-ck-img{
  width: .29rem;
  height: .25rem;
  margin-right: .3rem;
}
.fd-show-data{
  width:calc(100vw - 0.48rem);
  height:200px;
  background: red;
  position:fixed;
  left:0.24rem;
  top:1.2rem;
  z-index:3000;
}
.fd-show-search-wrap{
  position: fixed;
  width: 100vw;
  overflow-y: scroll;
  /* height: 100vh; */
  left: 0;
  top: 0;
  z-index: 5000000;
}
</style>

