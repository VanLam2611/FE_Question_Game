<template>
  <div class="box-all">
    <div class="set-bg">
      <Loader class="loader" />
    </div>
    <div id="page-home">
      <div class="linkApp">
        <div class="inside">
          <!-- <marquee direction="right" class="welcome"
            >WELCOME TO THE MIRECLE GAME</marquee
          > -->
          <div class="container-ef">
            <div class="text"><span>WELCOME TO THE GAME</span></div>
          </div>
          <div class="start victoria" @click="myFunction()">Start game</div>
          <div class="start victoria high" @click="addHighScore()">
            High Score
          </div>
        </div>
      </div>
      <div class="all-score">
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
            <tbody v-for="(user, index) in players" :key="index">
              <tr class="table-info">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.point }}</td>
                <td>{{ user.correct }}</td>
                <td>{{ user.wrong }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="btn btn-primary" @click="callBack()">Back</div>
      </div>
    </div>
    <TypeQuestion id="type"></TypeQuestion>
    <div id="backhome" @click="backHome()">&#171; Back</div>
  </div>
</template>

<script>
import TypeQuestion from "./TypeQuestion.vue";
import Loader from "./Loader.vue";
import axios from "axios";
export default {
  components: {
    TypeQuestion,
    Loader,
  },
  name: "Start",
  data() {
    return {
      nameUser: "",
      players: [],
    };
  },
  methods: {
    backHome() {
      const home = document.querySelector("#backhome");
      const type = document.querySelector("#type");
      const start = document.querySelector(".linkApp");
      type.style.display = "none";
      home.style.display = "none";
      start.style.display = "block";
    },
    callBack() {
      const back = document.querySelector(".all-score");
      const start = document.querySelector(".linkApp");
      back.style.display = "none";
      start.style.display = "block";
    },
    addHighScore() {
      axios
        .get("http://localhost:8080/public/api/score")
        .then((response) => (this.players = response.data));
      const high = document.querySelector(".all-score");
      const start = document.querySelector(".linkApp");
      start.style.display = "none";
      high.style.display = "block";
    },
    myFunction() {
      const start = document.querySelector(".linkApp");
      const typeQuestion = document.querySelector("#type");
      const loader = document.querySelector(".set-bg");
      const home = document.querySelector("#backhome");
      let person = prompt("Please enter your name:", "Player 1");
      if (person != null) {
        this.nameUser = person;
        axios
          .post("http://localhost:8080/public/api/player", {
            name: this.nameUser,
          })
          .then((res) => {});
        start.style.display = "none";
        loader.style.display = "inline-block";
        typeQuestion.style.display = "block";
        home.style.display = "block";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-ef{
  display: flex;
  justify-content: center;
  margin: 70px auto;
  align-items: center;
}
.text{
  position: relative;
  font-size: 2em;

  text-transform: uppercase;
  letter-spacing: .3em;
  font-weight: bold;
  padding: 5px;
}
.text span{
  color: #fff;
  mix-blend-mode: difference;
}
.text:before{
  content:"";
  position: absolute;
  top:0;
  width:60px;
  height: 100%;
  background: rgb(199, 22, 22);
  opacity: 0.7;
  animation: thangcover 4s linear infinite;
}
@keyframes thangcover {
  0%{
    left: 0;
  }
  50%{
    left: calc( 100% - 60px);
  }
  100%{
    left:0;
  }
}
.box-all {
  text-align: center !important;
}
.welcome {
  font-family: cursive;
  font-size: 3rem;
  color: aquamarine;
  margin-bottom: 100px;
}
.set-bg {
  background: black;
  display: none;
  animation: loader 4s ease-in-out forwards;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loader {
  display: inline-block;
  z-index: 5;
}
.inside {
  margin-top: 10%;
  text-align: center;
}
.start,
.start:visited {
  position: relative;
  display: block;
  width: 300px;
  margin: 30px auto 0;
  padding: 14px 15px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  letter-spacing: 0.08em;
  border-radius: 0;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
.start:after,
.start:visited:after {
  content: "";
  position: absolute;
  height: 0%;
  left: 50%;
  top: 50%;
  width: 150%;
  z-index: -1;
  -webkit-transition: all 0.75s ease 0s;
  -moz-transition: all 0.75s ease 0s;
  -o-transition: all 0.75s ease 0s;
  transition: all 0.75s ease 0s;
}
.start:hover,
.start:visited:hover {
  color: #fff;
  text-shadow: none;
}
.start:hover:after,
.start:visited:hover:after {
  height: 450%;
}
.start,
.start:visited {
  position: relative;
  display: block;
  margin: 30px auto 0;
  padding: 14px 15px;
  color: #fff;
  font-size: 14px;
  border-radius: 0;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  letter-spacing: 0.08em;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(0, 0, 0, 0.2);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
}
.start.victoria {
  border: 2px solid #d24d8b;
}
.start.victoria:after {
  background: #d24d8b;
  -moz-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  -ms-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  transform: translateX(-50%) translateY(-50%) rotate(-25deg);
}
/* .start:hover {
  background: lawngreen;
  color: lightgoldenrodyellow;
} */
#backhome {
  display: none;
  left: 50%;
  position: fixed;
  top: 20px;
  left: 400px;
  font-size: 2rem;
  color: #fff;
}
#backhome:hover {
  color: blue;
}
#type {
  display: none;
}
.name-user {
  width: 100%;
  background: rgb(41, 78, 78);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;
}
.info {
  position: absolute;
  top: 40%;
  left: 30%;
}
.show-user {
  display: none;
}
.all-score {
  display: none;
  margin-top: 50px;
}
@keyframes loader {
  0% {
    opacity: 1;
    z-index: 5;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>
