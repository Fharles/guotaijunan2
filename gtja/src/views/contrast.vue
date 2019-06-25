<template>
	<div>
		<header class="head ">
			<p class="head-title">对比</p>
			<div class="search_box hasBack">
			<a href="javascript:;" class="back" @click="back()"></a>
				<input type="text" name="" id="" @focus="foucs()" v-model="input" placeholder="分公司或营业部名称"/>
				<img src="@/assets/img/icon_search.png" v-if="iconShow"/>
				<span class="cancel_btn" :class="{show: show}">取消</span>
			</div>
		</header>
		
		<contrast-search></contrast-search>	 

	</div>
</template>
<script>

import contrastSearch from "@/views/contrastSearch"
export default {
    data() {
        return {
            show:false,
            iconShow:true,
            input:''
        }
    },
    components:{
		contrastSearch
    },
    computed:{
        searchResult(){
            if(this.input.trim()!=''){

            }
        }
    },

    methods:{
        foucs(){
            this.iconShow = false
        },
        back(){
			window.location.href = "http://172.16.60.62:6060/app/contrast/contrast_add.html"
        }
    }
}
</script>