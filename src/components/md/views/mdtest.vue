<template>
  <div>
  <p @click="fn">{{str}}</p>
  </div>
</template>

<script>
export default {
  name: 'Mdtest',
  props: {
    msg: String
  },
  data(){
    return {
      str:"123"
    }
  },
  methods:{
    fn(){
      this.serve.login.loginIn({
      type:'get',
      data:{a:1,b:2},
      success:(res)=>{
        console.log(res)
        this.str=res.data
      },
      error:()=>{
        console.log("aiya")
      }
    })

    }
  },
  mounted(){
    // var self=this
    

    this.serve.shop.shopList({
      type:'get',
      data:{a:1,b:2}
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
