<template>
  <div class="pic-box">
    <div class="pic">{{getMsg}}</div>
  </div>
</template>

<script>


import axios from "axios"
// let json_data =require("./test.json")
export default {
  data(){
    return{ 

    }
  },
  created(){
    this.getJson()
  },
  components: {
    
  },
  computed: {
    // es6
    getMsg(){
      const a = [1,2,3.4,3,45] 
      let arr = [...a]
      return arr
    }
  },
  methods:{
    getJson(){
      axios.get("http://localhost:3001/public/test.json").then(res=>{
        console.log(res)
      })
    }
  }
}
</script>


<style lang="less">
@import "vue_test.less";
@nice-red: red;

.pic-box{
  display: flex;
  width:500px;
  height:500px;
  background: @nice-red;
}
</style>