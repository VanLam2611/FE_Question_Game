<template>
  <div class="question">
    <h1>Hello World</h1>
  </div>
</template>

<script>
export default {
  name: 'Question',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.question{
    width: 70%;
    margin: 0 auto;
    background: yellowgreen;
    padding: 100px;
}
.title {
  background: gray;
  padding: 20px 0;
  margin-bottom: 30px;
  clip-path: polygon(0% 50%, 5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%);
}
.answer {
  background: yellow;
  /* border: 1px solid red; */
  padding: 10px 0;
  margin: 10px 70px;
  clip-path: polygon(0% 50%, 5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%);
}
</style>
