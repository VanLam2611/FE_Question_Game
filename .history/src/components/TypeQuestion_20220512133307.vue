<template>
  <div class="link-start">
    <div class="pyro">
      <div class="before"></div>
      <div class="after"></div>
    </div>
    <div id="clock">
      <div id="test">
        <div class="dem"></div>
      </div>
    </div>
    <div class="type-question">
      <h2 class="title-type">TYPE QUESTION</h2>
      <div
        class="type-name victoria"
        v-for="(type, index) in typeQuestion"
        :key="index"
        @click="getQuestion(type.type_id)"
      >
        {{ type.type_name }}
      </div>
      <!-- <button id="back" class="btn btn-secondary mt-3" @click="callBack()">
        Back
      </button> -->
    </div>
    <div class="score">Score : 0</div>

    <div class="back2" @click="unwindType()">&#171; Back</div>
    <div class="item-ques">
      <div id="chan"></div>
      <div
        class="item animated-button1"
        v-for="(item, index) in question"
        :key="index"
        @click="getQuestionById(item.id, index + 1, item.type_id)"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Question {{ index + 1 }}
      </div>
    </div>
    <div class="ques-id" v-bind="getCorrect()">
      <h2 class="text-warning">{{ questionId.title }}</h2>
      <div class="gener">
        {{ questionId.answer_a }}
      </div>
      <div class="gener">
        {{ questionId.answer_b }}
      </div>
      <div class="gener">
        {{ questionId.answer_c }}
      </div>
      <div class="gener">
        {{ questionId.answer_d }}
      </div>
    </div>
    <div class="correct">
      <h1 id="change"></h1>
      <hr />
      <div @click="backCorrect()" class="btn btn-success">OK</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Start from './Start.vue'
export default {
  components: {
    Start
  },
  name: 'TypeQuestion',
  data () {
    return {
      typeQuestion: [],
      question: [],
      questionId: [],
      scorePlayer: [],
      temp: [],
      player: [],
      typeId: [],
      idQuestion: [],
      check: false
    }
  },
  methods: {
    callBack () {
      const type = document.querySelector('.type-question')
      const start = document.querySelector('.start')
      type.style.display = 'none'
      start.style.display = 'block'
    },
    unwindType () {
      const questionNum = document.querySelector('.item-ques')
      const type = document.querySelector('.type-question')
      const back = document.querySelector('#backhome')
      document.querySelector('.back2').style.display = 'none'
      document.querySelector('.score').style.display = 'none'
      questionNum.style.display = 'none'
      type.style.display = 'block'
      back.style.display = 'block'
    },
    backCorrect () {
      const allQuestion = document.querySelector('.item-ques')
      const getQuestion = document.querySelector('.ques-id')
      const back = document.querySelector('.back2')
      const clock = document.querySelector('#clock')
      const correct = document.querySelector('.correct')
      const pyro = document.querySelector('.pyro')
      correct.style.display = 'none'
      allQuestion.style.display = 'block'
      getQuestion.style.display = 'none'
      clock.style.display = 'none'
      back.style.display = 'block'
      pyro.style.display = 'none'
    },
    getCorrect () {
      const temp = document.querySelectorAll('.gener')
      temp.forEach((e) => {
        e.addEventListener('click', () => {
          let t = this.questionId.correct
          for (let i = 0; i < temp.length; i++) {
            temp[i].style.background = 'darkcyan'
          }
          e.style.background = 'green'
          console.log('Chon: '+ typeof t)
          console.log('Right: '+ typeof this.questionId.correct)
          if (e.textContent === t) {
            this.check = true
            console.log('win')
            return
          } else {
            this.check = false
          }
        })
      })
    },
    getQuestion: function ($id) {
      axios
        .get('http://localhost:8080/public/api/type/' + $id)
        .then((response) => (this.question = response.data))
      this.typeId = $id
      const type = document.querySelector('.type-question')
      const score = document.querySelector('.score')
      const back = document.querySelector('#backhome')
      const back2 = document.querySelector('.back2')
      document.querySelector('.item-ques').style.display = 'block'
      type.style.display = 'none'
      score.style.display = 'block'
      back.style.display = 'none'
      back2.style.display = 'block'
    },
    getQuestionById: function ($id, index, type) {
      axios
        .get('http://localhost:8080/public/api/home/' + $id)
        .then((response) => (this.questionId = response.data))
      axios
        .get('http://localhost:8080/public/api/player')
        .then((response) => (this.player = response.data))
      this.idQuestion = $id
      const allQuestion = document.querySelector('.item-ques')
      const score = document.querySelector('.score')
      allQuestion.style.display = 'none'
      const getQuestion = document.querySelector('.ques-id')
      document.querySelector('.type-question').style.display = 'none'
      const back = document.querySelector('.back2')
      back.style.display = 'none'
      getQuestion.style.display = 'block'
      const clock = document.querySelector('#clock')
      clock.style.display = 'block'
      const test = document.querySelector('.dem')
      const temp = document.querySelectorAll('.gener')
      const pyro = document.querySelector('.pyro')
      const correct = document.querySelector('.correct')
      const change = document.querySelector('#change')
      let second = 6
      for (let i = 1; i > 0; i--) {
        let times = setInterval(() => {
          second--
          test.textContent = second + 's'
          if (second === 0) {
            test.textContent = 'Het gio'
            clearInterval(times)
            if (this.check === true) {
              axios
                .post(
                  'http://localhost:8080/public/api/point/' +
                    this.player[0].id,
                  {
                    point: this.player[0].point + 10,
                    correct: this.player[0].correct + 1,
                    wrong: this.player[0].wrong
                  }
                )
                .then((res) => {
                  console.log(res)
                })
              change.textContent = 'Chuc mung ban da tra loi dung'
              pyro.style.display = 'block'
              correct.style.display = 'block'
              for (let i = 0; i < temp.length; i++) {
                temp[i].style.background = 'darkcyan'
              }
              this.check = false
              const countItem = document.querySelectorAll('.item')
              countItem.forEach((e) => {
                if (
                  e.textContent === '\n      Question ' + index + '\n    ' &&
                  type === this.typeId &&
                  this.idQuestion === $id
                ) {
                  e.style.background = 'dark!important'
                  e.style.zIndex = 0
                }
              })
              score.textContent = 'Score : ' + (this.player[0].point + 10)
            } else {
              axios
                .post(
                  'http://localhost:8080/public/api/point/' +
                    this.player[0].id,
                  {
                    point: this.player[0].point,
                    correct: this.player[0].correct,
                    wrong: this.player[0].wrong + 1
                  }
                )
                .then((res) => {
                  console.log(res)
                })
              change.textContent = 'Hết giờ! Tiếc quá, không có điểm rồi!!!'
              correct.style.display = 'block'
              for (let i = 0; i < temp.length; i++) {
                temp[i].style.background = 'darkcyan'
              }
              this.check = false
            }
          }
        }, 1000)
      }
    }
  },
  created () {
    axios
      .get('http://localhost:8080/public/api/type')
      .then((response) => (this.typeQuestion = response.data))
    axios
      .get('http://localhost:8080/public/api/player')
      .then((response) => (this.player = response.data))
  },
  mounted () {
    axios
      .get('http://localhost:8080/public/api/player')
      .then((response) => (this.scorePlayer = response.data))
  }
}
</script>
<!---->
<style scoped>
.link-start {
  height: 450px;
}
.type-name,
.type-name:visited {
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
.type-name:after,
.type-name:visited:after {
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
.type-name:hover,
.type-name:visited:hover {
  color: #fff;
  text-shadow: none;
}
.type-name:hover:after,
.type-name:visited:hover:after {
  height: 450%;
}
.type-name,
.type-name:visited {
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
.type-name.victoria {
  border: 2px solid #d24d8b;
  z-index: 3;
}
.type-name.victoria:after {
  background: #d24d8b;
  -moz-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  -ms-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  -webkit-transform: translateX(-50%) translateY(-50%) rotate(-25deg);
  transform: translateX(-50%) translateY(-50%) rotate(-25deg);
}

/* .type-name {
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 25px;
  padding: 30px 100px;
  background: darkblue;
  color: white;
} */

.animated-button1 {
  background: linear-gradient(-30deg, #3d0b0b 50%, #2b0808 50%);
  transform: translate(0%, 0%);
  overflow: hidden;
  color: #f7d4d4;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.animated-button1::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ad8585;
  opacity: 0;
  -webkit-transition: 0.2s opacity ease-in-out;
  transition: 0.2s opacity ease-in-out;
}

.animated-button1:hover::before {
  opacity: 0.2;
}

.animated-button1 span {
  position: absolute;
}

.animated-button1 span:nth-child(1) {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, rgba(43, 8, 8, 0), #d92626);
  animation: 2s animateTop linear infinite;
}

@keyframes animateTop {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.animated-button1 span:nth-child(2) {
  top: 0px;
  right: 0px;
  height: 100%;
  width: 2px;
  background: linear-gradient(to top, rgba(43, 8, 8, 0), #d92626);
  animation: 2s animateRight linear -1s infinite;
}

@keyframes animateRight {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.animated-button1 span:nth-child(3) {
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(43, 8, 8, 0), #d92626);
  animation: 2s animateBottom linear infinite;
}

@keyframes animateBottom {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animated-button1 span:nth-child(4) {
  top: 0px;
  left: 0px;
  height: 100%;
  width: 2px;
  background: linear-gradient(to bottom, rgba(43, 8, 8, 0), #d92626);
  animation: 2s animateLeft linear -1s infinite;
}

@keyframes animateLeft {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.title-type {
  margin-top: 50px;
  font-family: cursive;
  color: aliceblue;
}
.item-ques {
  padding: 70px 0;
  margin: 0 auto;
  width: 450px;
  z-index: 2;
}
.item {
  padding: 20px 30px;
  color: aliceblue;
  margin-top: 20px;
  /* transition: filter 0.5s;
}
.item:hover {
  filter: brightness(50%); */
}
.ques-id {
  display: none;
  border: 1px solid red;
  padding: 25px 100px;
  clip-path: polygon(0% 50%, 5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%);
  background: url(https://chiase24.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-c%C3%A1c-h%C3%ACnh-%E1%BA%A3nh-background-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-21.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  margin: 171px 50px;
}
.gener {
  padding: 15px;
  margin-top: 25px;
  background: darkcyan;
  color: white;
  clip-path: polygon(0% 50%, 5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%);
  transition: filter 0.7s;
}
.gener:hover {
  filter: brightness(50%);
}
#clock {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////t7e3u7u4AAADr6+vs7Ozx8fH09PT4+Pj6+vro6Oji4uLc3NzHx8fZ2dnAwMCampqioqK0tLSsrKympqa7u7vS0tKfn5+Tk5Ovr69+fn6+vr7MzMw1NTVJSUlzc3NqamqJiYlPT09VVVWDg4MhISE/Pz8xMTFkZGRdXV0dHR15eXlubm4pKSlDQ0MUFBSl7iZ8AAAgAElEQVR4nN1dCZuqOg8uVLuwy66CigvquP3/f/c1LbjMKOAcZ5z78dxzTq6U0tA2eZOmKUJwabquaz9CUUZNOwrT3WaxWGzxxwceLfebxXy+2aVDf+wQRn+4Bein6iei5Yafbo+zfO46FHhlaIFxKingy8JOUmzKySi0GaKU/Kc4pMzwl/Nt6huE8eH+zLWNsXYu56wQoaKPWRwsT9s06rP/DIc8mk5WE7P6jWT5+S7PJ5dy9vzyLDadwawsXEHqP8JhX9O03gsoQpnpTfa+ycM5rX8zsepXYphWWhgaNcQQFnejHSKiGfJZzOA34k/nXsyo3n9hq5CgNFVh7x8pHSEznSxtRomgMOrrBCajNsa7zSQ/bqbL1PO8NE29YrTfliU+pX4ME5RQ96jaIr5QhtfLWLD+qlZpLxoUghtmebmYZZSo3zAXczHdlIsiiC2ivqaT+ePItR3LNJjOUS9zw9HkOEv9aVrXRxyMel65Ez35mqGqv4hDSoPj3kK4J38TDBn44zDzbPiW5niw3OT4ZCPLstcRFpefwt+iN4fivuF608MiiREiRKfeEuqLl3lq/CUO9VEZwohMPaQLORpMy8JGTEwscTeKCRdaAp+goB/YwJsj+YzVVIUZyFDmTeZpxtDRlr9R5m5nzks41M5TsvctSvSStZ1mjOjiNx0jJy03Ib8tRzxgCKiid8Vhpl/XIq5ouZpgXf3WJ2JKHn1E/rF9lUD93sOKinLcU51BmIPxMkPoy2dzgCGX9Ekh9Ly4bB/+tr5+LET9Yxlqqr5dyoN18q/tQ/8wAIBy85SeAiVJgnJmP9DawFBCdTIUQvbMoXO3ZtYbHLdyqGIi5Fd8TN+n8QnK8oEQMv5J8GUsjyFh5METuWBoz/TYECIIOIwec6iJOWgmq8LwRlT+Fs9TQt/CIcsmiaQ4tu35zgQl9uiJAkQN1y1UcThu4hDEA4o3OOUVVnXy8OG368jhNzADNTbTiqILHLY8IfvMIGLwaXJKulKWNr+DFyfBmPxtgVcu+2ZLv4lpCAqFcOxLargeC53T+IQuRU0GlJyHWSx78rMs/YKRgkNAhDBla1F669BfxDTMPoH4F7CahaWLrNQlzU8w4GgA1BWHLml/m3vwhLbEeIr4dke/MVS/pfGpvh2BWqOE++sAWZOotRY2h14ASs7DzOnIYS/U/I+EYjA6mL0eP29gfYdDFq0E9kAzHMe5hzLR9qT1WZoqnV9xaHflEKFwwEJcyN8IK7bf4PB5TLOYUgJUgqcshr6pZmTTs0QqQBOwiuRQ6v2x3uFtxMADnuaG/I06x+yJln4L0zD7A9Ai0pmXW3Qbyi5R37jxWSIBN7AkiUxJni7vFb3/4RqTqepwtpzSLh/mu5hG58VWvcnJA+65cYKmkkXe+qw0JmjNYaw47DDIpIzCqeWCKBaobngqnafa/ByHvTLlkvLmNDKFSJ4heunExme3otTmlkO7w3vZTlUfpXS35QAYHDof/hiHzmo+Aw77uU0XMYjuQsEVIVfbnk2gFHuWQxKr2nVi2AK/R2gxErZzuHmaw274IFgQiiOKwgkS82jHxW+uEMayDaO2WiSKMSoOhxWHre/lRygYCa0v2ztdYwp3rZJeicgXYRqNbQoO/hcz99hGdoS424t0NJQsWnpjLUrTx7om51UkBZRPWt8rrcmcVb/pbIxhEvaJkdsd2vwcptHXPgNqh524kBxiR1g3lhBsH/A/G94yoaBQSAVM/8xh03tPsq8v5Qg/DBSq2kbtbX5K45NTTIFK5sj2GZ+ofiO6oVUfWvRPM4cgaqYVh35HDgdQbHv77ZZb2Wa+TF/KobkyCZTepOBXEd/yAO8+acq8kfwumhEVBVEjDCj2BIfya2DzExp1T6aQPH28n70Q0zgl0vsa6cvRL3G/UlMlk+UkQlH66mEtRPa0UXHYk/KGtLx3BKWWtP/pbh+7jH6EAjB2aH0nTEOjibDlxCf5cOgZTCkxvpHllOSZs8ZazOorwNQaSFw6bnmvLIS/3tXROtkuuUazdYfWo5aBApd/5DYmKP7g5HKXSqSJl1JrydbjZhNKiRollxSHUct7Jea9r903GKYXjcv21nfgcHwUs2f4Eea3d5k0F7DHQIxItZ/zx7VwRBeiyAyhlfgnsTpwKEfJ6sHdYstBtPbyF3DoToAHtNp+vsv3quco3JZkRB/WEqPagFp35VAKM/fR3UEuVxx75T9jGvsI05nvp1/vskWlM8RvUq6v2KNaYoKUAcWk282rOGxCI/6VgL5XLlxR6YSetKCbFkxD7LXU8+mO37mry8/8ARUqAB49wBYkIf3KgOIlzEMJ9YImTCNL414DanFXQFE/b6ilHdPEK6nxvOndu5WEmYDgGVaC7+6QoQWsJEGBVCpP75rDu0+omb1sHIIuRoRaeLl9WEu7xqfYgqk12D9qudIZe/EbX8tG30d8WQhaG1DNXErIVHIYPuZQwVjc0HKgbKzFOOL29PscrjbYpCx4bKxQ6QjFCdOJq9p0rz66FPhOjARZAPhMaQuHbKa+V5uYFxpWjI5B8l1MszZ5gZ1gfv+uUvay2dinfelOwwm9U45/cD12/f0pz4/FbLuZb6VcDdmD915rimZ1nhw4UFP7W5iGbQE42vjYjFWUzjAr0IK/lDMiL90FJI57EG8iu5QxypCRDQdFrN+tmcuvBWZhqxcHUJXOyvhhOfRwoFBvBGK0d2gRRkwKVDDy5cgqPpUjdqwG493hex8FqbG/4F2MglkqUdXhYbnHHNoll/CetmhU4gNKwYe6Ez/7M8jzjmomzUKj+cvWVAmQg1jHpzlkWH7fg9nWIt1QpsUcsSX8u0NyQb4rN/fEl6fq6fgEjsXbaFY0cngHC+Qx0fp8Nr5/95qq3UVTrtVTMrH1pida6pOmFeZdn6C4pwt74xQ/hWnYUs6nYMc6eHGYcjNhDxakMF570i/61ApRjX1Cn4KjRCqUzutgsTCi6GmZG/fWsu5jmj61Jea1yk6T3a5dipGELZ7WZT3iwQCNC7uazk88m+x87HLzeM/L8EjjYzHy9uy+/v5CxSbiW9mseIg9+kzbvlCEmrKq4KlatpgRnQ7TO3fvc8jmNiFisFgd2yawGl1XA5V+h69byprgQ4OpeY8CsajzuXGPw3uYZrgHM2jgdV3+GAnxAL6lPXtuXeghZS/65KknzAMT0qZXfr17D9MIWQaUowBRh5fQPVSTYZvdRyjPUwSl8TNP6FYh426GwobpgGn4QkKgk9k1apd6vvjsHiL/PkAvlKU/8QSxszWMUD6xvuCLrxwSV9pbadjrXL+7QYXzEr6+S9HEAJyuG0feb+WQQqAyMiZO1DnymuDiLXxdUSwMwITii+FnVaWuKyzACmm2rbnA3R3RCFsOO5X7OUrnITbWOiIZxuTT3S+Yhgq93aPeoMCX31qowvgOfnklZRwFlDLXHEkw1IJphAmkE+NgBcUCdRsoVsdyP0WRClGFI28hcfEN7P+s8QnYCSshTTOKvH8MCvwdinDlfAfHHE7d2DAWrIlDnvuBtz/uXVOg2LBLKMGbKeZMKv42RuJL2DayyQ2HN5iGqDInI6Xwm83b4mTeTZFRxV9uI7J11oC9+zm7KvcZ05zExyHBIBmIh/U+6f9zE36S0vmwHqADDj7yRbwB5rzsMaaJUgo+BBBJU59+P6bzNyidOceKv30fZbBYgLO5xDQ3axm3HEK4IU0CJZvwrMNC+xs5rAdomSFjpsiVuYAl8cR+xGGUCiOBfhj4fG0i/vqdSC+horqJPuJeTc/9jQwnKB9hmhUEcnjD0Qe+ukpfY7Up8z7U8okyagm6FAZ43dzcEfB4AsImdfR7mEaPluAbWRGXO976msmZK+6+F7XcUNquatgkRsolIDU+I4gPZxZlw9P8/MQ1pmETTUzToe/BDituBsdrJoXg+U6E7ispolXUWcVHqFqIFtdIl36PwDwkeG/Oztb+tcZ3cEooOiC7uoPocH7D5PiyobU5duZnqFBhFaus2lPUkTwwAXusLrfYGow4u3scTr0JLsB1cVWrEd4wOcqqu+Ydj8hPU05Adcqn9QDtof6ibpd9VS7eC2bZ/MLhBdMcOHM2n4I7NMKMcHHLJKOEFei23K/gl9BhZ6np1x5MDEHYN+WwJlCLHaLPmIaAKwKZe/q1avalJwNT+1XmKuos5NMq1lGKQXq7oEd8AcgQPdTQDdVDgcnVm1F8b8VBCB433V7xCHrzDeJGBWLhBUFmrS3Wd7wnMA7p0ia3Gp/Ecsf1Qyc3zQTyq3ty9S6BCmr+NEaohjNylfhLOZAWurWntxxSKUSi4WN/WQDbtxIpyN7ndZrjlPPkLN17d8uZG0Gx8obDvsY+AAvMm2JTUo5gt2/6Mb1393coY4DG9WQsY6bdL3eApZeg8knVmCbzYE/SRmm8eziir9GZqtAz9bdhGpqcZZ77sBxJPIZ4srnFNDsDaTSNmowJ0pNKhgz+YTPgv1O1um9qaQ8PSpzktxo/F03na9ZYPzFhKdl4qWv7aUpCtq3JmlAVW2xNAe4icsVhjA9e5kxb9sATc40MU38rh+iADzZrdlbTEJwxfEOvMM1Ss7wTdkmb0rXz9N0ODHeE9LZyfRmKMycXTMMOjBAwD9tewnbuc7uOXk/RtC14WlwTIQ2Jp+Ky5eXswD8zQ60DhU3Z55WP36aIb7WXC4U4JFZx4dDziU4iv7V+4rrv907Rh1G1F0qfg4ExuXA4h4iUKWvncMDeKWQqqot/DItBSZfkzGHONI3JqKIWbEEa7/4haicGGxn7km1N020QrsbyW3ul/yZFXLDkDbAFZVC/BxtFguifQrX+FqUDhMlSzJTGZ3JZe/8Wk+/HqLWwI9PSqDiUQRol+yNtew1VDIWaHwgdIeYhhMLsgqC4F93736WigdAZcaGUmzu0hulH8Aea9TpKszawQKj27yPPIJQXKo74rwyyf6YEEBVUpfM3CNI6/HT+wt/mcAIDdKm4OgKHd0MX/8MUXcIqVKC2C88EFhDKUdLvRyMvokgIcUGx3DUcF4r8G2jkZZQpLFkdOk4nQ2B26P6FofVSaos0wicM6TSF3eCp8fYWvZpaI2q6J+BwBxHgs/e36Dmq196HGOMDJkLoLCiT4QstylR/txK/oUjYUo67y5gxDlGhsKlzNT+ytqrpX2FOUUFLukESKIsJfDU5Ylk4i+2bLv5KBfyvDFBJDRmlVNnw5ExRuBTFwwBwqAtG8AY2gy6jZtRGkNf97b9BRUkYhoPhMAiCJPE8LxwMkiQtimJZLEe76Xa+tKHFlhjNtIBNnl7wmEPCuBns5n+BrwuV4ZZrbxbQ9lRoRsEqicIQ7yC3sXaDD6Rv1ElkxFFrBprfpcw2DhdEbj8fIeLCPuvIDVCcjgbKFQkTVn4oPVjm9RPCfvwTWEVRutHEnVx8QzNh8dINIsOACjESh0IzUpIZyJRTl/WzwebmCe+fdvu8nCJtHB4QhNKyLaKDSJgZoZiR8BwMyx4KB7vVlyfCv8Wh7pumaTiW+JtDpjFCGVfmEVd/fDRRYSfUgyX9xGQQkEAZdVWw9Kdrng7+GIck4OIS/JlW3zBMM7Ntd5yJP1EQCCEbBFt0ZITRXAibWCAgTw+Q5nqbO8zlowjCg8zguZ1IP02xtlGKhYHv7GD3rgcTrzB2H3cKlQGIHiJXs6w/w5yi7rX3lsMFhFUcIJHaiKBdb//p/iaNzGp3uU4Ej7x9VeN3qa+S4jOHc6OQWTsgdmNW6tPLrbnn0qud5MyJXI1b8Z/g60Kd2vsQ8thilcshXfRUyOZ6FDjss8dGJ046Obwiffgrqb2XJIOhLy4B3IZD17Xt2M7EZTnisu0ll67EI/RhgvjI2OFNKBO/k2phmMAlKSFiOcoAmb8dyVxRAyFATQqNtMTlGFKgZkKkxvCX7+84bPoRdgUtMqahVIfNWbzqPsN04syJbTcKB15apMVutjj55P1I5orqIEu3tK+xAwInhoY8wzt9nBqH9h/Th7SdQ4lpPoTGB0wzsMK2B5K/xaHezqHENCdEE6HKBS4dtj1Q/CkOidXW3pPANLIPSZiQHvLd6HHZ1bo8zo/Tr5uI3+mncQeuEJ9+FI1dxxEINXaEvBEikYu7UkR6aELFp1gjZCdCH/gDH5eLza4oUi8J/bEdO7Fl9tQnY/L0ovSvMKco3zjLekAklyCwKtCQFhyWZagw3J1ClLG9SJmG9Ozz0D8tev8xL0bQEl5HU/1IGDIhxdUM/DSjrC1KpTVp0+9SWQuHRGXUxqmwpIR9YXubXtBSK4R7vZ2vJygaielnTENkyIjNvGTqBKr3Y5VXUSQBEJNGSGcrpyfjS/8GVnkdlRq6Rje24HABe343f2NovZKSS9sHE+l0OYa1J/PtLXo1BZsQOYa1p0FCIGT47S16NbUVlHYC/5MLIXyW934l/lrKgDXgTO4+4HPxo76lv/Pi36JIEArx4stdX+gEUzL/P4s2oQXEYqQKx8BJi3T7Z9r2Goodueizieq3NCY6SzvEFrdhwV+jLNrOIcbbxFWJKpErkI078yTdiBSCXtPdX6QGreX0eGmFxQo25FXLOIt0f5vX5d56j+k33P1FSh+0+4wgGooNUyJjhDmkOkSHtvhSwu3GjL2/R42N9gRPM0HRnU1kBC2dgUVYOM1R0Ax2vrceRfIr1Gaqt+xf0mVUIjtRFSNMBzD67KRxT5pKOJ78BQ7hyISAN3Noykh28EXJWH1Lrgdv72xyPlP1svn9u79LyezoudlUjiTgog/S2r2NTkzT6MOEyBqz6n2NR//9OWtqT+m0Tx+35cj6Gt0pmxeuqdCINHm09kLqne/rjBxbDlv5eYqMz5kiwocxsXxGpSfxfPmQecco7pc+73z3YZ3KfnfOGra/7OXOrQfl/CHViTO6cKjnsJ+pvFf6Kk+KA0t28+Yp/uMUifDBQsaiHqr3I7W2ns54al84pHND70ME5id8QNCyqqnUULUEbp/vvgXTcHWkKcrqRZbw6kDdc7nVApeJOsGk2svt+3BgZEo+4YNznhQX1YN/UrRinx+lqjmTclSvtHzEn8uRMEAoOu4ocHze6bzA68HqSoz04fS4qo4CxfUXGyPvvfujlnVuIPsyHeG0u5upOgFhMbCvdzqjbUoZ32UX5zhl9cr+hLA6J0YKZ6kc2Ps4pEJ81gNrblyERHqTPNWcAfZaV+im4jAKxCSOdzRWZSg9i+ToPEAXpiIH71uF0mWmgVp7CVkZ1YPLr4/WreO6jV3FoVZNzlyMX1byQpbhfv1gcU6qdXLPpKG/SdkziKeYGJfkUAnn9fc/1kkkMp5DOHDqyGcrTAO5gAHmDN3AEkPhnBtlwfWaDJG+qEg4zf49mKZaNFxecikdYsTr6TSCyJ8+DWKBnvtsXUU9o2oAkEyqxwkveJ3eDX/YrFYWs/55aJQmMt7lejyHxAhZWS/pbnUU10m7EkaIbcBJkCRKP2Vv0bnUHksrPScn8lBQUXl8rk+Md+jr9yRWEFOo/uSi7855vkbkLH1WY5QyOFKFbXv6Jw5pAsftGft+VXZP4louB8g559eiCu3G7+DQBJRm1nNlK8ZSnbctROcMUvlYepzMDbvhUMYDy51sRypH9dqsIYyQNaQeHDPzbGAZv45p+jIKaq+h8VkKUs4qo2dtI1o1WFiPuz4aZXVu8auce7uMEJ4mcPbC4AJhLGWOwcCwqzA35kzVzsXfxTSV/Byic+Owy88ZaEWXuhDMNwyDXoG3Z1PwOueeueUBLldosSFu9ZlOEbIPVRWDOtlnNMejN8DvoB6SYqga9QArY0RrwbGkXHQGOjBCycSun73OSMdmeOUiP7CiWkN4yKgVz1KrfBzhCbTQ74vR2OVW3S7IV1oLiZnBaS38BQhP5KZ7lp+fveZQd+aIANipKprx83AQAEkCOVMiwegdqSMy2Il2tgSEpj9L9/SCoNepxGokHFxxqF3UKpsbYsS7gQyDXzln0/cEXa5ROlQSNWvy5/wsRUj9zQ/2RXNA+yq4lQQuYLPDZZnpjGlkNVYBt3M+g/l8zmGbUKITQmrlaL220U9S9NysjXFp4jHmCpGQFSAZAbIvT6CboQBHLJFxSifVYS9YGpsCh0dRlWZybbzZi0Euw9PjFw/LVNxa4EHhgzhcXz9xy6E5EpYRL1FQW5c5oFXTG+jjakJ+4/SmV1P07Blb2Vf5IQNIf3+AM6r84WMO0UbAMZLt6pxhsMkvLgZ6rRNnbzQNrymjHp4zhnqLml83m9mQDer25E51ndGDvmWazmdEdtmIcBRsxojwak6n/F3emS/UOdAwufha1hpeJkO3uI1m/nQ2AhuZiMa7EpV4riNjNHEZ0avD467Punt7xAzVahcGZIpUEtY56CDtS379xOezEdSRqXnqOzvk5luTgRithoH7IF9dt9OjX03pyKzdSFuCyBaylxQI/OFx49kIKqedydfCdN7JQDZiVOghfui7ENbLe6ZlrcAE+BLD1jhROPNxxPRmDsX4jCjJZlyeIdCnlVn9YTasTC2dN+W24edtTHbfXUh3POafR+UVplGUeRLTlE5tB5xStFpzKhvz3O2FDHrVQUjPUcyuNwct7A0o+2HwqdwtppEU20tcnrOYaqzSqAvakGlPnik+0d+FcypFxuSxrMaBfV6PQl8HAJFLNs6MJ7U6nfKmIaNOkS2Grz3vqTtFwf4Zb6Bf2CLucN6TTqIlUDt3PK/VYNObFGDdoPzovAkPMPc0U4dU+aOvZs8dDnW2AXRND1R5L/xmMaI2PjCYsMu25fUfonhqYplC/ePON1bXZ4/ICji0S3n4d9aCMpYKWcgZPw8/n7b0GxSJ4jKHeJJtfCcn4N0zLHV7xkSnzDwOarA5xkZqk5M6YmKNWDIkL4mYsbvvHNeNKE3REBdC43+9++BcbjYdTkW/b5wobLbnNS4BT6Z8kDC4nQ6xLu0UHUWdB7xuxMLaI8Zx/cwZluxDOqvynvf1MLprSp1VvVBHAcvzCHTmv8DA0k2cdTVEdSoVBc/Ne7mFH3FITKky+IEX/ab6mZx+5Oo4Z1YErxA3bA550Ts9QaWUYVP/7nsfnstN/BlQ2ZEbDeEl6uTeFEkHjsoY4+KX7I8ivgrAan+CHyVC8Wfsbrk7mKampgk0NRo1vYQrTSE1Yg7yS4yu5b8yV1ECC/e6QMEiZaJDnPWjcuhOx1Z6dJ3BhCrChoEinTm+CuEx4bwEtsavOmhO2Hx5h6VYfy4pzB6Ve8yheEpO3Yn96HhYNf2Oajl9B7/xGT48bNE5O879qf+ZAiQxb0xMDlSMpyAO1tnDco851IiF5enx2H5gOHHpOnasWsxobFDNxnv1GcVsVIRB4Ed2v1Nvgh7aNGcCFN84O8043waPo9TV9WDnkHsQyL2HPrK75z0R6R8ZKRc5RDfCCZKYP6pPU5MWUdJL6b36PlO2qr6hnOqDcrIbscf1PTiXu6IiXOpER2vz7l3ZYmk74TXXYIMKfPTH9Ul5BPGQEFfVjlXUbu204WRwioW21vl801DLA0xzptKZNJzye3uGpKYYqJ6B3YAMOtNuMKGwmlkaEli3i55Ti57Dh6iKYtg8SuNJUy2PNH5N8V0h15ly84u4kRL0oEzIHTiSpWBtajnc30oOw05YpYqScB8gCIb7gE2cVXMtbYKNz1I52ddfxI0EatVB6MKApL5S/i0c7plODOmD7yBQY7W0EN/Db0RCmT6xVv0WDh9gmnrC9vlWnVj+4d5iFUf2iBR4GHwjTPr2jCblLHubCgEGR/F0UftZtdR+ZzFICBkIjyWWgAWNtTRgmjMlelHr6wjE5UVCMbk0TGM5VME3wpQcafhYctGuQHIC610ijfu6z9SCnvElpaGBV1Twqa94Wy2oZaDAtS24zvJoV1z9FqoxKVfD5clK8oewAXTrpnpERsV0MxxowHT5JVef78YfvFxwMQd5ay1dOOSzPTp6gokNI/V+d6XbpJ9rI8WtbEmTaahsZQj2F+M57GYaOS5VOqO8Fag+GIQfI+fE22vpwqHGR1hG88frHlEnE0jXxZBXQ0jXVIK4aZO5rMuZG6qvs+y2U456FPXkSxZXoQO8AEtU1/CqC85VV5tHhKfqyERrFTvylAE56ZQ4TakuDKy0Gq6Pa9FjJZSkmjl2y1pMhlYdzDbj1W86nchjwKl9rEzt5lqaMc0Vuln15d6FuY9GBpfz35SdcoIZppTjqbkW1YdEuQUql1frewdEU3pIghuNgA/QgihlNp63PdsJ01yoDDtSjKRT7kkv417lonIRj6rlvKS5FtWHlA7UjO32Xg/AkgI3KSe9AMUHCnf5ctfe5k4a/0wJGB9J3Y8Ppmyrkp4LJrfKybAb0lyLXAIZEgVkm9DdNdULCUw8yWJopzzFGpg9bOF1aPNzHGqETsB8Pw7JxEN7nCgxYzGPqZ1IeN5Si+QsIjpTeqXje/fSyatigrL+elgcwK8mIFZnDpsxzTUlPuURDTaozwd5P1MnWy55KDcYye5pqUXOP5doEqHvup7EELhSfM0hbtaHHSTlCGUHs/VkqprqgmmuKNENcm2HHhMVw4icRDRVAZwr+XXvWbW+Ad8DfAKrju/tI9gG2qPOykFbMTJ7uoE3s2fajDp2djUZe8dESe0kN501dvkC4L2cl8u2Z8MaYkqi83sL0VDqeygqwWkogNo6fKrNz3EII7WULFJjUfDhUMbmsJHqnS4cGoipCWl2fa85RbbL+gtlADD74Dy3r/5ZDnUWnyCYWOPR+uDCfneiEot9tPa/1BIa4gqlRJ3fi4ueEKGZGju72bMHL6vrmfUeHY3mHNGp0E+D0jSoz2TnDFpXiKRWo8IkksLU6/Q28Z9nIfvgpvJER6Mcs2dXprpimiuqz7JTegDZSbTd3KmcDabe9qw8PtQgAnSD9lx0PF0qQlmeyrk7okWVFqFrS5/DNGKfVAUAAANQSURBVNcUYaCCxwCNjf1Gh5CpeeNCuKTkl9BJQhTVuLB8oeL5SKNV3JPb6j79Sj2h8W8oSrbYrqjZto+WM0Lb3i7BObXCau+A0eVt5nZqSIPFhcD176zbfZdDDYDqkKnooz6e2GyQth3FIy0u7rtEWQtuW3tFufmeAvYRY66Y611R0PcxzRcq/Ig4YAuOWXFI1KawhiekW4l7jqbs56QxL7FO6TA/EeWTYW5pf3eR50lMc0sRlJYxpGECe9ad72xGG/wvKt4cCWzbYyeJEJpqJuk6jLFaMIuPHvt+mmb0dLffUHw5sasVHKQt16n5eJ1Bhr1gJPC5Jvcz5o9qJowEk1kMO3sCSgR/KfreAP2mxv9M8ZFoa5WrlrmTUnpg7nIoo3PgvGVNbW58VC7arFVmIGKfkF/+a+jjP3OIKPGqFgnlYefZtEwdRr8iD3aUgPsIHAYVbvssWoT6m+GFw6ovxvEp/ef2qevf4loIDcqRAeCBjsActrzjduCwT+UYBIetjT04qqUx7EOu4nqVlxBIB3/cBmywqZar6bL02b/H53wD09yjWLzPpRtNLnqJZo2Xp23q9qp9D8QPxjIgZeUvpdYGepYN/TFS5xQYmTeZeLboel0db0/9uYzM+qdWfR/TPBAP85G3v9R3Cl1vf9ykvsUpY2Zmu5EfeJ6XRFoQJEHouzGYQ9wKi0U+k7BTeTY2Y2TtykR/TWquf9D4XyiCaDjZjWU/QDcROP8FGeNktJhsd+nQjU3dEB2scc50w/ZDb7kvj3svjAlDhyopB6ECgk7ETH5F3NGrOZQU9eabAPomyy8Bf5RRI878MEl3i3w/XRapN/DCoV1IA0MuAqapLKf504lndF3q/3FMc99ZQUUr54U7Sjm5DhZRqJUv50iNPiK62J3Wd4l1gp0d5XZgvrAt/4xpHlPMDEflCA5WgKTp2uV1HCzEczmSgyoHSg9wvk2t17XgZZjmEQXyEWXJdL4tQlt1CxHMwuZkDzIbVzmOMSKOP9hNFmlgMvYzO6p+iMMzJTjwdtvJfF+kSTBWHhopVYcDbznDk02RxKA5yY8l2/hpDjWQqJLV2B2G3jAIhLzxvEFgxwaDPNr0p/fCqesiun6OAtFyOTuM/Np7/wdFfYHpE08w5gAAAABJRU5ErkJggg==");
  background-repeat: no-repeat;
  background-size: cover;
  height: 150px;
  width: 150px;
  position: fixed;
  z-index: 2;
  top: 20px;
  right: 20px;
  color: black;
  font-size: 2rem;
  display: none;
}
.dem {
  margin-top: 50px;
}
.score {
  position: fixed;
  top: 20px;
  left: 250px;
  font-family: cursive;
  font-size: 2rem;
  color: yellow;
  display: none;
}
.back2 {
  display: none;
  position: fixed;
  top: 20px;
  right: 300px;
  font-size: 2rem;
  color: white;
}
.back2:hover {
  color: blue;
}
/* #chan{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: red;
  opacity: 0.5;
  z-index: 1;
} */
.correct {
  display: none;
  z-index: 10;
  padding: 20px;
  font-family: monospace;
  text-align: center;
  position: fixed;
  top: 30%;
  left: 30%;
  width: 600px;
  height: 250px;
  background: url(https://lh3.googleusercontent.com/proxy/z0kHPqS9NaLSK8zupUihntQ0l9MQsl7ib5c_HqHuUmeugY6HzoB26cykomQx39gG03xV_YlJfkSls1opMQj8NjrH8JMcBg9Yls-VotoIh7WUCAkeMjL7j9VPBwwhuD4Z_fw);
  background-size: cover;
  border: 1px solid black;
  color: aliceblue;
  filter: saturate(200%);
}
.correct div {
  margin-top: 20px;
  padding: 10px 30px;
}
#change{
  animation: text 1s infinite alternate;
}
@keyframes text {
  0%{
    color: green;
  }100%{
    color: red;
  }
}
.pyro {
  display: none;
}
.pyro > .before,
.pyro > .after {
  position: absolute;
  width: 7px;
  height: 7px;
  pointer-events: none;
  z-index: 10;
  border-radius: 50%;
  box-shadow: -120px -218.66667px blue, 248px -16.66667px #00ff84,
    190px 16.33333px #002bff, -113px -308.66667px #ff009d,
    -109px -287.66667px #ffb300, -50px -313.66667px #ff006e,
    226px -31.66667px #ff4000, 180px -351.66667px #ff00d0,
    -12px -338.66667px #00f6ff, 220px -388.66667px #99ff00,
    -69px -27.66667px #ff0400, -111px -339.66667px #6200ff,
    155px -237.66667px #00ddff, -152px -380.66667px #00ffd0,
    -50px -37.66667px #00ffdd, -95px -175.66667px #a6ff00,
    -88px 10.33333px #0d00ff, 112px -309.66667px #005eff,
    69px -415.66667px #ff00a6, 168px -100.66667px #ff004c,
    -244px 24.33333px #ff6600, 97px -325.66667px #ff0066,
    -211px -182.66667px #00ffa2, 236px -126.66667px #b700ff,
    140px -196.66667px #9000ff, 125px -175.66667px #00bbff,
    118px -381.66667px #ff002f, 144px -111.66667px #ffae00,
    36px -78.66667px #f600ff, -63px -196.66667px #c800ff,
    -218px -227.66667px #d4ff00, -134px -377.66667px #ea00ff,
    -36px -412.66667px #ff00d4, 209px -106.66667px #00fff2,
    91px -278.66667px #000dff, -22px -191.66667px #9dff00,
    139px -392.66667px #a6ff00, 56px -2.66667px #0099ff,
    -156px -276.66667px #ea00ff, -163px -233.66667px #00fffb,
    -238px -346.66667px #00ff73, 62px -363.66667px #0088ff,
    244px -170.66667px #0062ff, 224px -142.66667px #b300ff,
    141px -208.66667px #9000ff, 211px -285.66667px #ff6600,
    181px -128.66667px #1e00ff, 90px -123.66667px #c800ff,
    189px 70.33333px #00ffc8, -18px -383.66667px #00ff33,
    100px -6.66667px #ff008c;
  animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  animation-duration: 1.25s, 1.25s, 6.25s;
}
@keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white; } }

@keyframes gravity {
  to {
    transform: translateY(200px);
    opacity: 0;
  }
}
@keyframes position {
  0%,
  19.9% {
    margin-top: 0%;
    margin-left: 20%;
  }

  20%,
  39.9% {
    margin-top: 0%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 0%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 0%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 0%;
    margin-left: 80%;
  }
}
</style>
