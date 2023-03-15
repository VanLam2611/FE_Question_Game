<template>
  <div id="high-score">
    <h1 class="text-light">Top Score</h1>
    <div class="container">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Correct</th>
            <th scope="col">Wrong</th>
          </tr>
        </thead>
        <tbody v-for="index in 5" :key="index">
          <tr class="table-info">
            <th scope="row">1</th>
            <td>Mark</td>
            <td>100</td>
            <td>4</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "highscore",
  data() {
    return {
      players: [],
    };
  },
  methods: {
    getPlayers() {
      axios
        .get("http://localhost:8080/public/api/score")
        .then((response) => (this.players = response.data));
      return console.log(this.players);
    },
  },
};
</script>

<style>
</style>