<template>
  <div>
    <div v-if="isshowSearch" class="fd-show-search-wrap">
      <Search @getcompanyCode="receiveCode"/>
    </div>
    <div v-else>
      <div class="fd-masking" v-if="isShowChoose"></div>
      <div class="fd-fgs-header">
        <div class="fd-search-box">
          <input @focus="searchShow" type="text" name="" id="" />
          <img src="../assets/images/icon-search.png" alt="">
          <!-- <span class="fd-cancle-btn">取消</span> -->
        </div>
        <div class="fd-heander-content">
          <div class="fd-line-one">
            <span v-text="dataObj.text">上海南京西路营业部</span>
            <span>所辖营业部</span>
            <span @click="jumpToRankDetail">更多&nbsp;></span>
          </div>
        </div>
      </div>
      <div class="fd-choose-wrap" :class="{'fd-z-index': isShowSelect}">
        <div class="fd-choose-item1" @click="chooseQy">{{qyText}}区 <img class="fd-icon-choose-img" src="../assets/images/icon-choose.png" alt="">
        </div>
        <div class="fd-qy-wrap fd-choose-spe-item" v-if="isqySelect">
          <div class="fd-qy-item" v-for="(item,index) in areas" :key="index" :class="{active:areaIndex ==index}" @click="changeAreas(index)">{{item}}区</div>
        </div>
        <div class="fd-choose-item2" @click="chooseQb">全部 <img class="fd-icon-choose-img" src="../assets/images/icon-choose.png" alt="">
        </div>
        <div class="fd-qb-wrap fd-choose-spe-item" v-if="isqbSelect">
          <div class="fd-qb-item">
            <div class="fd-small-item first-item" v-for="(value,index) in allKey"
            :key="index" :class="{active:index ==chooseIndex }" @click="changeAllChoose(index)">{{value}} </div>
          </div>
          <div class="fd-qb-item second-item" style="width: 66.6%;">
            <div class="fd-small-item" v-for="(value,index) in allFiter[chooseKey]" :class="{active:secondIndex == index}" :Key= "index"
            @click="filterAll(index,$event)">{{value}}</div>
          </div>
        </div>
        <div class="fd-choose-item3" @click="chooseJd">{{jdText}} <img class="fd-icon-choose-img" src="../assets/images/icon-choose.png" alt=""></div>
        <div class="fd-jd-wrap fd-choose-spe-item" v-if="isjdSelect">
          <div class="fd-jd-item" v-for="(item,index) in quarter" :key="index" :class="{active:quarterIndex == index}"
          @click="changeQuater(index)">{{item}}</div>
        </div>
      </div>
      <div class="fd-spe-content">
        <div class="fd-rank-top-wrap" v-for="(item,key,index) in pageData" :key="index" >
          <!-- -->
          <div class="fd-rank-title-wrap">
            <img class="fd-icon-rank-common" src="../assets/images/icon-data.png" alt="">
            {{key}}
          </div>
          <div class="fd-moban-common">
            <div class="fd-saiqu-title-wrap">
              <div class="fd-saiqu-left">排名</div>
              <div class="fd-saiqu-middle">{{item[0]['title']}}</div>
              <div class="fd-saiqu-right">较上季排名变化</div>
            </div>
            <div class="fd-list-wrap">
              <div class="fd-list-item" v-for="(i,index) in item" :key="index">
                <!--  -->
                <div class="fd-saiqu-left">
                  <img v-if="i.rank == 1" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                  <img v-if="i.rank == 2" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                  <img v-if="i.rank == 3" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                <span v-if="i.rank > 3" v-text="i.rank"></span>
                </div>
                <div class="fd-saiqu-middle">{{i.name}}</div>
                <div class="fd-saiqu-right">
                  <img v-if="i.num>0" src="../assets/images/icon-up.png" alt="">
                  <img v-if="i.num<0" src="../assets/images/icon-down.png" alt="">
                <span v-text="Math.abs(i.num) > 0 ? Math.abs(i.num) : '-'"></span>
                </div>
              </div>
            </div>
            <div class="fd-more-wrap" v-if="isShowMore[key]">
              <img :class="{'fd-run-style': isClickMore[key]}" @click="clickMore(key)" src="../assets/images/icon-more.png" alt="">
            </div>
          </div>
        </div>
        <!-- <div class="fd-moban-common">
          <div class="fd-saiqu-title-wrap">
            <div class="fd-saiqu-left">排名</div>
            <div class="fd-saiqu-middle">产品销量</div>
            <div class="fd-saiqu-right">较上季排名变化</div>
          </div>
          <div class="fd-list-wrap">
            <div class="fd-list-item" v-for="(item, index) in dataArr" :key="index">
              <div class="fd-saiqu-left">
                <img v-if="index + 1 === 1" class="fd-number-img" src="../assets/images/medal1.png" alt="">
                <img v-if="index + 1 === 2" class="fd-number-img" src="../assets/images/medal2.png" alt="">
                <img v-if="index + 1 === 3" class="fd-number-img" src="../assets/images/medal3.png" alt="">
                <span v-if="index + 1 > 3" v-text="index+1"></span>
              </div>
              <div class="fd-saiqu-middle">北京**营业部</div>
              <div class="fd-saiqu-right">
                <img v-if="true" src="../assets/images/icon-up.png" alt="">
                <img v-else src="../assets/images/icon-down.png" alt="">
                <span>5</span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Search from '@/views/search.vue'
import { Indicator } from 'mint-ui'
import eventBus from '../api/eventBus.js'
import Url from '../api/api.js'
import {fetchGet, fetchPost} from '../api/fetch.js'
export default {
  name: 'xxx',
  components:{
    Search
  },
  data () {
    return {
      isshowSearch: false,
      qyText: '甲',
      jdText: '一季度',
      dataObj:{},
      CompanyCode: '',
      isShowChoose: false,
      isShowSelect: false,
      isqySelect: false,
      isqbSelect: false,
      isjdSelect: false,
      secondIndex:undefined,
      quarterIndex:0,//季度选项
      chooseKey:'',//选择全部选项对应文字
      quarter:['一季度','二季度','三季度','四季度'],//季度
      dataArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      CompanyType:1, //1-分公司，2-营业部
      areas:[],//区域分类，入口传入数据
      areaIndex:0,//区域选择
      allKey:[],
      allFiter:{},//全部选项
      chooseIndex:0,//选择全部，第一次默认加载第一个选项
      pageData:{},//页面所有数据
      prePageData: {},// 展开更新的数据
      isClickMore: {},
      isShowMore: {},
      secondTite: [], // 二级分类标题
    }
  },
  methods: {
    searchShow(flag) {
      if (flag) {
        // 显示搜索组件
        this.isshowSearch = true
      }
    },
    // 接受code
    receiveCode(obj) {
      var str = ''
      this.isShowChoose = false
      if (obj.companyType != 2) {
        this.dataObj.text = obj.companyName
      }
      this.initChooseSelect()
      this.CompanyType = 2
      if (this.CompanyType === 1) {
        str = '分公司排名'
      } else {
        str = '营业部排名'
      }
      if (str === this.titleText) {
        this.isShowSelect = false
      } else {
        this.isShowSelect = false
        this.titleText = str
        // 调用接口
        // this.getSwitchQy(type)
        this.getQyData()
      }
      this.isshowSearch = false
      // this.paramsRank.CompanyCode = obj.companyCode
      // this.CompanyType = obj.companyType
      //  if (this.CompanyType == 2) {
      //     this.getYybData(1, 1)
      //     // 请求分公司内排名数据
      //     this.getYybData(2, 1)
      //   } else {
      //     this.getYybData(1,1)
      //   }
    },
    // 更多点击事件
    clickMore (type) {
      var obj = {}
      obj = this.isClickMore
      obj[type] = !obj[type]
      this.isClickMore = {}
      this.isClickMore = obj
      this.pageData = {}
      for (let key in this.prePageData) {
        if (this.isClickMore[key]) {
          this.pageData[key] = this.prePageData[key]
        } else {
          this.pageData[key] = this.prePageData[key].slice(0,5)
        }
      }
    },
    // 获取列表数据
    getTableData (Quarter,InnerCode,Region) {
      Indicator.open()
      let objParams ={
        CompanyCode: '',
        CompanyType: 2,
        Quarter,
        InnerCode: InnerCode || 9999,
        userInfo: '',
        Region
      }
      fetchPost(Url.filiale.url, objParams).then(res => {
        if (res.data.code == '000000') {
          // 请求成功
          Indicator.close()
          var data = res.data.responseEntity;      
          var title={};
          var pageData = {}
          for(var i = 0;i<data.length;i++){
            title[data[i]['indexAbbr']] = 1;
            if (Object.prototype.toString.call(pageData[data[i]['indexAbbr']]) == '[object Array]') {
              pageData[data[i]['indexAbbr']].push({"name":data[i]['abbrchiname'],"num":data[i]['rankNumberChange'],"rank":data[i]['rankNumber'],"title":data[i]['typeName']})
            } else {
              pageData[data[i]['indexAbbr']] = [];
              pageData[data[i]['indexAbbr']].push({"name":data[i]['abbrchiname'],"num":data[i]['rankNumberChange'],"rank":data[i]['rankNumber'],"title":data[i]['typeName']})
            }
            
          }
          for( let i in title){
            this.secondTite.push(i);
          }
          this.prePageData = pageData;
          this.pageData = {}
          for (let key in pageData){
            if (pageData[key] && pageData[key].length > 5) {
              this.isShowMore[key] = true
              this.pageData[key] = pageData[key].slice(0, 5)
            } else {
              this.isShowMore[key] = false
              this.pageData[key] = pageData[key]
            }
            this.isClickMore[key] = false
          }
        } else {
          console.log(res.data.message)
        }
      })
      // fetchPost(Url.filiale.url,objParams).then(res => {
      //   if (res.data.code == '000000') {
      //     // 请求成功，处理数据
      //     debugger
      //   } else {
      //     console.log(res.data.message)
      //   }
      // })
    },
    // 请求区域接口
    getTjData () {
      var relationParams = Url.Relation.params;
      relationParams.CompanyType=this.CompanyType;
      //获取全部筛选条件接口
      fetchGet(Url.Relation.url,relationParams).then(res=>{
        var res = res.data;
        if(res.code ==="000000"){
          var data = res.responseEntity;
          this.indexCode = data;
          var obj={};
          for(let i=0;i<data.length;i++){
            
            if (Object.prototype.toString.call(obj[data[i]['typeName']]) == '[object Array]') {
            
              obj[data[i]['typeName']].push(data[i]['indexAbbr'])
            } else {
              obj[data[i]['typeName']] = [];
              obj[data[i]['typeName']].push(data[i]['indexAbbr'])
            }
          
          }
          for(let key in obj){
          this.allKey.push(key);
          }
          this.chooseKey = this.allKey[0];
          this.allFiter = obj;
        }else{
          console.log(res.message);
        }
      })
    },
    initChooseSelect () {
      this.isqySelect = false
      this.isqbSelect = false
      this.isjdSelect = false
      this.isShowChoose = false
    },
    // 区域的选择
    chooseQy () {
      if (this.isShowChoose && this.isqySelect) {
        this.initChooseSelect()
      } else {
        this.initChooseSelect()
        this.isShowChoose = true
        this.isqySelect = true
      }  
    },
      //选择区域
    changeAreas(index){ 
      this.areaIndex = index;
      this.qyText = this.areas[index]
      this.secondIndex = undefined
      this.chooseIndex = 0
      this.chooseKey = this.allKey[0]
      var jdNumber = ''
      if (this.jdText == '一季度') {
        jdNumber = 1
      } else if (this.jdText == '二季度') {
        jdNumber = 2
      } else if (this.jdText == '三季度') {
        jdNumber = 3
      } else {
        jdNumber = 4
      }
      this.getTableData(jdNumber, 9999, this.qyText)
      this.initChooseSelect();
    },
    // 全部的选择
    chooseQb () {
       if (this.isShowChoose && this.isqbSelect) {
        this.initChooseSelect()
      } else {
        this.initChooseSelect()
        this.isShowChoose = true
        this.isqbSelect = true
      }
    },
    //选择季度
    changeQuater(index){
      this.quarterIndex = index;
      this.jdText = this.quarter[index]
      this.secondIndex = undefined
      this.chooseIndex = 0
      this.chooseKey = this.allKey[0]
      var jdNumber = ''
      if (this.jdText == '一季度') {
        jdNumber = 1
      } else if (this.jdText == '二季度') {
        jdNumber = 2
      } else if (this.jdText == '三季度') {
        jdNumber = 3
      } else {
        jdNumber = 4
      }
      this.getTableData(jdNumber, 9999, this.qyText)
      this.initChooseSelect();
    },
     //全部选择
    changeAllChoose(index){
      this.chooseIndex = index;
      this.secondIndex = undefined;
      this.chooseKey = this.allKey[index];
    },
    //第二级选择全部
    filterAll(index,e){
      this.secondIndex = index;
      var name = e.target.innerText;
      for(var i = 0; i<this.indexCode.length;i++){
        if(name == this.indexCode[i].indexAbbr){
          var innerCode = this.indexCode[i].innerCode;
          //调用接口
          var jdNumber = ''
          if (this.jdText == '一季度') {
            jdNumber = 1
          } else if (this.jdText == '二季度') {
            jdNumber = 2
          } else if (this.jdText == '三季度') {
            jdNumber = 3
          } else {
            jdNumber = 4
          }
          this.getTableData(jdNumber, innerCode, this.qyText)
          this.initChooseSelect()
        }
      }
      // var innerCode = this.
    },
    // 跳转到排名详情页面
    jumpToRankDetail () {
      var jdNumber = ''
      if (this.jdText == '一季度') {
        jdNumber = 1
      } else if (this.jdText == '二季度') {
        jdNumber = 2
      } else if (this.jdText == '三季度') {
        jdNumber = 3
      } else {
        jdNumber = 4
      }
      this.$router.push({path: '/rankDetail', name: 'rank', query: {CompanyType: 2, qy: this.qyText, jd: jdNumber}})
    },
    // 季度的选择
    chooseJd () {
      if (this.isShowChoose && this.isjdSelect) {
        this.initChooseSelect()
      } else {
        this.initChooseSelect()
        this.isShowChoose = true
        this.isjdSelect = true
      }
    }, 
    // 获取区域的信息接口
    getQyData () {
      var areasParams =Url.getAreas.params;
      areasParams.TypeCode = 2;
      fetchGet(Url.getAreas.url,areasParams).then(res=>{
        var res = res.data;
        if(res.code =="000000"){
          for(var i = 0;i<res.responseEntity.length;i++){
            this.areas.push(res.responseEntity[i].region)
          }
        //获取页面信息接口
        }
      })
    }
  },
  mounted () {
    this.dataObj = JSON.parse(this.$route.query.objData)
    this.CompanyCode = this.$route.query.CompanyCode
    this.getTjData()
    this.getQyData()
    this.getTableData(this.quarterIndex + 1, undefined, this.qyText)
  }
}
</script>
<style scoped>
.fd-rank-title-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  font-size: .24rem;
  height: .9rem;
  width: 100%;
  font-weight: 500;
  /* border-bottom: 1px solid rgba(230,230,230,1); */
}
.fd-icon-rank-common{
  width: .26rem;
  height: .28rem;
  vertical-align: middle;
  margin-right: .2rem;
}
.fd-jd-item{text-indent: -.55rem;text-align: center}
.fd-qy-wrap >.fd-qy-item{text-indent: -.5rem;}
.fd-jd-item.active{color: #3083EB}
.fd-qy-wrap .active{color: #3083EB}
.fd-qb-item .active{color: #3083EB}
.fd-fgs-header{
  width: 100%;
  height: 2.46rem;
  background-color:#3083EB;
  padding: 0.6rem 0.24rem 0.28rem 0.24rem;
  z-index: 200;
  position: fixed;
  left: 0;
  top: 0;
}
.fd-search-box{
  background: #3083EB;
  height: .88rem;
  margin-bottom: .14rem;
  overflow: hidden;
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
  padding-left: .3rem;
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
  left: .3rem;
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
  margin-left: 1.3rem;
}
.fd-choose-wrap{
  width: 100%;
  position: fixed;
  left: 0;
  top: 2.46rem;
  background-color: white;
  min-height: 1rem;
  display: flex;
  z-index: 200;
}
.fd-icon-choose-img{
  width: .2rem;
  height: .1rem;
  margin-left: .3rem;
}
.fd-choose-item1,.fd-choose-item2,.fd-choose-item3{
  color: #222222;
  font-size: .24rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  width: 33.3%;
  justify-content: center;
  border-bottom: 1px solid rgba(230,230,230,1);
  position: relative;
}
.fd-qy-wrap{
  width:33.3%;
  position: absolute;
  left: 0;
  top: calc(1rem - 1px);
}
.fd-qy-wrap >.fd-qy-item{
  height: .6rem;
  line-height: .6rem;
  text-align: center;
}
.fd-choose-spe-item{
  font-size: .24rem;
  line-height: 1rem;
  z-index: 200;
  background-color: white;
}
.fd-qb-wrap{
  width: 100%;
  position: absolute;
  left: 0;
  top: calc(1rem - 1px);
  display: flex;
}
.fd-qb-wrap > .fd-qb-item{
  width: 33.3%;
}
.fd-small-item{
  width: 100%;
  height: .6rem;
  text-align: center;
  line-height: .6rem;
}
.fd-jd-wrap{
  position: absolute;
  right: 0;
  top: calc(1rem - 1px);
  width: 33.3%;
}
.fd-jd-item{
  height: .6rem;
  line-height: .6rem;
}
.fd-z-index{
  z-index: 98!important;
}
.fd-masking{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index:99;
  background-color: rgba(0, 0,0, 0.3)
}
.fd-moban-common{
  padding: 0 .2rem;
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
  width: 29%;
  text-align: center;
}
.fd-saiqu-middle{
  width: 60%;
  text-align: center;
}
.fd-saiqu-title-wrap{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .6rem;
  /* border-top: 1px solid rgba(230,230,230,1); */
  border-bottom: 1px solid rgba(230,230,230,1);
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
.fd-spe-content{
  padding-top: 3.46rem;
  height: 100vh;
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
.fd-more-wrap{
  width: 100%;
  height: .56rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg,rgba(255,255,255,0.49) 0%,rgba(255,255,255,1) 100%)
}
.fd-more-wrap img{
  width: .24rem;
  height: .22rem;
  transform: rotate(90deg);
  transition: all .5s;
}
.fd-run-style{
  transform: rotate(-90deg) !important;
}
.second-item{width: 66.6%;}
.second-item .fd-small-item{text-align: left;}
.first-item{text-align: right;padding-right: .5rem}
.fd-qy-wrap >.fd-qy-item.active{color: #3083EB}
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


