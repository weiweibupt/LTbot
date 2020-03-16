<template>
  <div>
    <p>{{loginIn}}</p>
    <p>{{str}}</p>
  </div>
</template>

<script>
// import  service from ''
export default {
  name: 'Mdtest',
  data() {
    return {
      loginIn: "loginIn",
      str: "str"
    }
  },
  mounted() {
    this.serve.login.loginIn({
      // type: 'get',
      // vm:this,
      // bindName: 'str',
      success: (res) => {
        console.log(res.data)
      this.str = res.data
      },
      error: () => {
        console.log("aiya")
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
