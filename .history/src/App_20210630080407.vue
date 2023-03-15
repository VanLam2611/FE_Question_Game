<template>
  <div id="app" v-bind="audio()">
    <Start />
    <p id="result"></p>
    <p id="bounce" class="animate__animated animate__fadeOuts animate__duration-2s"></p>
    <div class="trapezium red "></div>
    <div id="star"></div>
    
  </div>
</template>

<script>
import Start from "./components/Start.vue";
export default {
  components: {
    Start,
  },
  name: "App",
  methods: {
    audio(){
      let audio = new Audio('http://webcoban.vn/file/bell.mp3')
      audio.play()
    }
  }
};
</script>
<style>
body {
  background: url(https://mondaycareer.com/wp-content/uploads/2020/11/background-%C4%91%E1%BA%B9p-3-1024x682.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "Lato", sans-serif;
  position: relative;
}
#star {
    position: absolute;
    top: 30px;
    left: 80px;
    color: #fc2e5a;
    opacity: 0.3;
    z-index: -1;
    display: block;
    animation-name: rotateY;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    border-right: 100px solid transparent;
    border-bottom: 70px solid #fc2e5a;
    border-left: 100px solid transparent;
    transform: rotate(35deg);
    transform: rotate(35deg);
    transform: rotate(35deg);
    transform: rotate(35deg);
}

#star:before {
    height: 0;
    width: 0;
    position: absolute;
    display: block;
    top: -45px;
    left: -65px;
    border-bottom: 80px solid #fc2e5a;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    content: '';
    transform: rotate(-35deg);
    transform: rotate(-35deg);
    transform: rotate(-35deg);
    transform: rotate(-35deg);
}

#star:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    display: block;
    top: 3px;
    left: -105px;
    color: #fc2e5a;
    border-right: 100px solid transparent;
    border-bottom: 70px solid #fc2e5a;
    border-left: 100px solid transparent;
    transform: rotate(-70deg);
    transform: rotate(-70deg);
    transform: rotate(-70deg);
    transform: rotate(-70deg);
}
.trapezium {
  position: absolute;
  top: 50px;
  right: 50px;
  border-bottom: 80px solid black;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	height: 0;
	width: 160px;
}
.red {
    border-bottom-color: rgb(211, 35, 158);
    opacity: 0.4;
    animation-name: move;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    z-index: -1;
  }
#result {
  animation-name: tinhtien;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  position: absolute;
  left: 20px;
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: rgb(245, 98, 245);
  opacity: 0.3;
  border-radius: 10px;
}
#bounce{
  animation-name: rotate;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  position: absolute;
  right: 30px;
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: rgb(85, 54, 221);
  opacity: 0.5;
  border-radius: 10px;
}

@keyframes rotateY {
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(360deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes move {
  from {
    top: 0px;
  }
  to {
    top: 50px;
  }
}
@keyframes tinhtien {
  0% {
    transform: matrix3d(-0, 1, 0, 0, -1, -0, 0, 0, 0, 0, 1, 0, 598, 0, 0, 1);
  }

  1% {
    transform: matrix3d(0.00008, 1, 0, 0, -1, 0.00008, 0, 0, 0, 0, 1, 0, 597.97009, 0, 0, 1);
  }

  2% {
    transform: matrix3d(0.00032, 1, 0, 0, -1, 0.00032, 0, 0, 0, 0, 1, 0, 597.88037, 0, 0, 1);
  }

  3% {
    transform: matrix3d(0.00071, 1, 0, 0, -1, 0.00071, 0, 0, 0, 0, 1, 0, 597.73083, 0, 0, 1);
  }

  4% {
    transform: matrix3d(0.00126, 1, 0, 0, -1, 0.00126, 0, 0, 0, 0, 1, 0, 597.52142, 0, 0, 1);
  }

  5% {
    transform: matrix3d(0.00197, 1, 0, 0, -1, 0.00197, 0, 0, 0, 0, 1, 0, 597.25201, 0, 0, 1);
  }

  6% {
    transform: matrix3d(0.00283, 1, 0, 0, -1, 0.00283, 0, 0, 0, 0, 1, 0, 596.92261, 0, 0, 1);
  }

  7% {
    transform: matrix3d(0.00386, 0.99999, 0, 0, -0.99999, 0.00386, 0, 0, 0, 0, 1, 0, 596.53308, 0, 0, 1);
  }

  8% {
    transform: matrix3d(0.00504, 0.99999, 0, 0, -0.99999, 0.00504, 0, 0, 0, 0, 1, 0, 596.08331, 0, 0, 1);
  }

  9% {
    transform: matrix3d(0.00638, 0.99998, 0, 0, -0.99998, 0.00638, 0, 0, 0, 0, 1, 0, 595.57318, 0, 0, 1);
  }

  10% {
    transform: matrix3d(0.00954, 0.99995, 0, 0, -0.99995, 0.00954, 0, 0, 0, 0, 1, 0, 594.37109, 0, 0, 1);
  }

  11% {
    transform: matrix3d(0.01135, 0.99994, 0, 0, -0.99994, 0.01135, 0, 0, 0, 0, 1, 0, 593.67877, 0, 0, 1);
  }

  12% {
    transform: matrix3d(0.01333, 0.99991, 0, 0, -0.99991, 0.01333, 0, 0, 0, 0, 1, 0, 592.92535, 0, 0, 1);
  }

  13% {
    transform: matrix3d(0.01547, 0.99988, 0, 0, -0.99988, 0.01547, 0, 0, 0, 0, 1, 0, 592.1106, 0, 0, 1);
  }

  15% {
    transform: matrix3d(0.01778, 0.99984, 0, 0, -0.99984, 0.01778, 0, 0, 0, 0, 1, 0, 591.23425, 0, 0, 1);
  }

  16% {
    transform: matrix3d(0.02023, 0.9998, 0, 0, -0.9998, 0.02023, 0, 0, 0, 0, 1, 0, 590.29596, 0, 0, 1);
  }

  17% {
    transform: matrix3d(0.02286, 0.99974, 0, 0, -0.99974, 0.02286, 0, 0, 0, 0, 1, 0, 589.29553, 0, 0, 1);
  }

  18% {
    transform: matrix3d(0.02565, 0.99967, 0, 0, -0.99967, 0.02565, 0, 0, 0, 0, 1, 0, 588.2326, 0, 0, 1);
  }

  19% {
    transform: matrix3d(0.02861, 0.99959, 0, 0, -0.99959, 0.02861, 0, 0, 0, 0, 1, 0, 587.10687, 0, 0, 1);
  }

  20% {
    transform: matrix3d(0.03173, 0.9995, 0, 0, -0.9995, 0.03173, 0, 0, 0, 0, 1, 0, 585.91797, 0, 0, 1);
  }

  21% {
    transform: matrix3d(0.03502, 0.99939, 0, 0, -0.99939, 0.03502, 0, 0, 0, 0, 1, 0, 584.66541, 0, 0, 1);
  }

  22% {
    transform: matrix3d(0.03848, 0.99926, 0, 0, -0.99926, 0.03848, 0, 0, 0, 0, 1, 0, 583.34894, 0, 0, 1);
  }

  23% {
    transform: matrix3d(0.0421, 0.99911, 0, 0, -0.99911, 0.0421, 0, 0, 0, 0, 1, 0, 581.96802, 0, 0, 1);
  }

  24% {
    transform: matrix3d(0.04589, 0.99895, 0, 0, -0.99895, 0.04589, 0, 0, 0, 0, 1, 0, 580.52222, 0, 0, 1);
  }

  25% {
    transform: matrix3d(0.04986, 0.99876, 0, 0, -0.99876, 0.04986, 0, 0, 0, 0, 1, 0, 579.01099, 0, 0, 1);
  }

  26% {
    transform: matrix3d(0.054, 0.99854, 0, 0, -0.99854, 0.054, 0, 0, 0, 0, 1, 0, 577.43396, 0, 0, 1);
  }

  27% {
    transform: matrix3d(0.0583, 0.9983, 0, 0, -0.9983, 0.0583, 0, 0, 0, 0, 1, 0, 575.79047, 0, 0, 1);
  }

  28% {
    transform: matrix3d(0.06279, 0.99803, 0, 0, -0.99803, 0.06279, 0, 0, 0, 0, 1, 0, 574.08002, 0, 0, 1);
  }

  29% {
    transform: matrix3d(0.06746, 0.99772, 0, 0, -0.99772, 0.06746, 0, 0, 0, 0, 1, 0, 572.30194, 0, 0, 1);
  }

  30% {
    transform: matrix3d(0.07229, 0.99738, 0, 0, -0.99738, 0.07229, 0, 0, 0, 0, 1, 0, 570.45563, 0, 0, 1);
  }

  31% {
    transform: matrix3d(0.07731, 0.99701, 0, 0, -0.99701, 0.07731, 0, 0, 0, 0, 1, 0, 568.54047, 0, 0, 1);
  }

  32% {
    transform: matrix3d(0.0825, 0.99659, 0, 0, -0.99659, 0.0825, 0, 0, 0, 0, 1, 0, 566.55566, 0, 0, 1);
  }

  33% {
    transform: matrix3d(0.08788, 0.99613, 0, 0, -0.99613, 0.08788, 0, 0, 0, 0, 1, 0, 564.50061, 0, 0, 1);
  }

  34% {
    transform: matrix3d(0.09344, 0.99562, 0, 0, -0.99562, 0.09344, 0, 0, 0, 0, 1, 0, 562.37439, 0, 0, 1);
  }

  35% {
    transform: matrix3d(0.09919, 0.99507, 0, 0, -0.99507, 0.09919, 0, 0, 0, 0, 1, 0, 560.17633, 0, 0, 1);
  }

  36% {
    transform: matrix3d(0.10512, 0.99446, 0, 0, -0.99446, 0.10512, 0, 0, 0, 0, 1, 0, 557.90546, 0, 0, 1);
  }

  37% {
    transform: matrix3d(0.11125, 0.99379, 0, 0, -0.99379, 0.11125, 0, 0, 0, 0, 1, 0, 555.56097, 0, 0, 1);
  }

  38% {
    transform: matrix3d(0.11755, 0.99307, 0, 0, -0.99307, 0.11755, 0, 0, 0, 0, 1, 0, 553.14191, 0, 0, 1);
  }

  39% {
    transform: matrix3d(0.12407, 0.99227, 0, 0, -0.99227, 0.12407, 0, 0, 0, 0, 1, 0, 550.64728, 0, 0, 1);
  }

  40% {
    transform: matrix3d(0.13076, 0.99141, 0, 0, -0.99141, 0.13076, 0, 0, 0, 0, 1, 0, 548.07605, 0, 0, 1);
  }

  41% {
    transform: matrix3d(0.13766, 0.99048, 0, 0, -0.99048, 0.13766, 0, 0, 0, 0, 1, 0, 545.42712, 0, 0, 1);
  }

  42% {
    transform: matrix3d(0.14475, 0.98947, 0, 0, -0.98947, 0.14475, 0, 0, 0, 0, 1, 0, 542.6994, 0, 0, 1);
  }

  43% {
    transform: matrix3d(0.15204, 0.98837, 0, 0, -0.98837, 0.15204, 0, 0, 0, 0, 1, 0, 539.89166, 0, 0, 1);
  }

  44% {
    transform: matrix3d(0.15954, 0.98719, 0, 0, -0.98719, 0.15954, 0, 0, 0, 0, 1, 0, 537.00269, 0, 0, 1);
  }

  45% {
    transform: matrix3d(0.16724, 0.98592, 0, 0, -0.98592, 0.16724, 0, 0, 0, 0, 1, 0, 534.03107, 0, 0, 1);
  }

  46% {
    transform: matrix3d(0.17515, 0.98454, 0, 0, -0.98454, 0.17515, 0, 0, 0, 0, 1, 0, 530.97552, 0, 0, 1);
  }

  47% {
    transform: matrix3d(0.18326, 0.98306, 0, 0, -0.98306, 0.18326, 0, 0, 0, 0, 1, 0, 527.83453, 0, 0, 1);
  }

  48% {
    transform: matrix3d(0.19159, 0.98147, 0, 0, -0.98147, 0.19159, 0, 0, 0, 0, 1, 0, 524.60657, 0, 0, 1);
  }

  49% {
    transform: matrix3d(0.20014, 0.97977, 0, 0, -0.97977, 0.20014, 0, 0, 0, 0, 1, 0, 521.29004, 0, 0, 1);
  }

  50% {
    transform: matrix3d(0.2089, 0.97794, 0, 0, -0.97794, 0.2089, 0, 0, 0, 0, 1, 0, 517.88318, 0, 0, 1);
  }

  51% {
    transform: matrix3d(0.21787, 0.97598, 0, 0, -0.97598, 0.21787, 0, 0, 0, 0, 1, 0, 514.38428, 0, 0, 1);
  }

  52% {
    transform: matrix3d(0.22708, 0.97388, 0, 0, -0.97388, 0.22708, 0, 0, 0, 0, 1, 0, 510.79141, 0, 0, 1);
  }

  53% {
    transform: matrix3d(0.2365, 0.97163, 0, 0, -0.97163, 0.2365, 0, 0, 0, 0, 1, 0, 507.1026, 0, 0, 1);
  }

  54% {
    transform: matrix3d(0.24616, 0.96923, 0, 0, -0.96923, 0.24616, 0, 0, 0, 0, 1, 0, 503.31567, 0, 0, 1);
  }

  55% {
    transform: matrix3d(0.25604, 0.96667, 0, 0, -0.96667, 0.25604, 0, 0, 0, 0, 1, 0, 499.42847, 0, 0, 1);
  }

  56% {
    transform: matrix3d(0.26616, 0.96393, 0, 0, -0.96393, 0.26616, 0, 0, 0, 0, 1, 0, 495.43857, 0, 0, 1);
  }

  57% {
    transform: matrix3d(0.27651, 0.96101, 0, 0, -0.96101, 0.27651, 0, 0, 0, 0, 1, 0, 491.34354, 0, 0, 1);
  }

  58% {
    transform: matrix3d(0.2871, 0.9579, 0, 0, -0.9579, 0.2871, 0, 0, 0, 0, 1, 0, 487.14066, 0, 0, 1);
  }

  59% {
    transform: matrix3d(0.29793, 0.95459, 0, 0, -0.95459, 0.29793, 0, 0, 0, 0, 1, 0, 482.82715, 0, 0, 1);
  }

  60% {
    transform: matrix3d(0.30901, 0.95106, 0, 0, -0.95106, 0.30901, 0, 0, 0, 0, 1, 0, 478.39999, 0, 0, 1);
  }

  61% {
    transform: matrix3d(0.32035, 0.9473, 0, 0, -0.9473, 0.32035, 0, 0, 0, 0, 1, 0, 473.85605, 0, 0, 1);
  }

  62% {
    transform: matrix3d(0.33193, 0.9433, 0, 0, -0.9433, 0.33193, 0, 0, 0, 0, 1, 0, 469.19189, 0, 0, 1);
  }

  63% {
    transform: matrix3d(0.34377, 0.93905, 0, 0, -0.93905, 0.34377, 0, 0, 0, 0, 1, 0, 464.4039, 0, 0, 1);
  }

  64% {
    transform: matrix3d(0.35586, 0.93454, 0, 0, -0.93454, 0.35586, 0, 0, 0, 0, 1, 0, 459.48819, 0, 0, 1);
  }

  65% {
    transform: matrix3d(0.36822, 0.92974, 0, 0, -0.92974, 0.36822, 0, 0, 0, 0, 1, 0, 454.44067, 0, 0, 1);
  }

  66% {
    transform: matrix3d(0.38084, 0.92464, 0, 0, -0.92464, 0.38084, 0, 0, 0, 0, 1, 0, 449.25684, 0, 0, 1);
  }

  67% {
    transform: matrix3d(0.39374, 0.91922, 0, 0, -0.91922, 0.39374, 0, 0, 0, 0, 1, 0, 443.93195, 0, 0, 1);
  }

  68% {
    transform: matrix3d(0.40691, 0.91347, 0, 0, -0.91347, 0.40691, 0, 0, 0, 0, 1, 0, 438.46085, 0, 0, 1);
  }

  69% {
    transform: matrix3d(0.42035, 0.90736, 0, 0, -0.90736, 0.42035, 0, 0, 0, 0, 1, 0, 432.83801, 0, 0, 1);
  }

  70% {
    transform: matrix3d(0.43409, 0.90087, 0, 0, -0.90087, 0.43409, 0, 0, 0, 0, 1, 0, 427.05743, 0, 0, 1);
  }

  71% {
    transform: matrix3d(0.4481, 0.89398, 0, 0, -0.89398, 0.4481, 0, 0, 0, 0, 1, 0, 421.11261, 0, 0, 1);
  }

  72% {
    transform: matrix3d(0.46241, 0.88667, 0, 0, -0.88667, 0.46241, 0, 0, 0, 0, 1, 0, 414.99649, 0, 0, 1);
  }

  73% {
    transform: matrix3d(0.477, 0.8789, 0, 0, -0.8789, 0.477, 0, 0, 0, 0, 1, 0, 408.70139, 0, 0, 1);
  }

  74% {
    transform: matrix3d(0.4919, 0.87065, 0, 0, -0.87065, 0.4919, 0, 0, 0, 0, 1, 0, 402.2189, 0, 0, 1);
  }

  75% {
    transform: matrix3d(0.5071, 0.86189, 0, 0, -0.86189, 0.5071, 0, 0, 0, 0, 1, 0, 395.53983, 0, 0, 1);
  }

  76% {
    transform: matrix3d(0.5226, 0.85258, 0, 0, -0.85258, 0.5226, 0, 0, 0, 0, 1, 0, 388.65399, 0, 0, 1);
  }

  77% {
    transform: matrix3d(0.53842, 0.84268, 0, 0, -0.84268, 0.53842, 0, 0, 0, 0, 1, 0, 381.55023, 0, 0, 1);
  }

  78% {
    transform: matrix3d(0.55455, 0.83215, 0, 0, -0.83215, 0.55455, 0, 0, 0, 0, 1, 0, 374.21616, 0, 0, 1);
  }

  79% {
    transform: matrix3d(0.571, 0.82095, 0, 0, -0.82095, 0.571, 0, 0, 0, 0, 1, 0, 366.63788, 0, 0, 1);
  }

  80% {
    transform: matrix3d(0.58778, 0.80902, 0, 0, -0.80902, 0.58778, 0, 0, 0, 0, 1, 0, 358.79999, 0, 0, 1);
  }

  81% {
    transform: matrix3d(0.6049, 0.7963, 0, 0, -0.7963, 0.6049, 0, 0, 0, 0, 1, 0, 350.68506, 0, 0, 1);
  }

  82% {
    transform: matrix3d(0.62234, 0.78275, 0, 0, -0.78275, 0.62234, 0, 0, 0, 0, 1, 0, 342.27338, 0, 0, 1);
  }

  83% {
    transform: matrix3d(0.64013, 0.76827, 0, 0, -0.76827, 0.64013, 0, 0, 0, 0, 1, 0, 333.54251, 0, 0, 1);
  }

  84% {
    transform: matrix3d(0.65826, 0.75279, 0, 0, -0.75279, 0.65826, 0, 0, 0, 0, 1, 0, 324.46667, 0, 0, 1);
  }

  85% {
    transform: matrix3d(0.67674, 0.73622, 0, 0, -0.73622, 0.67674, 0, 0, 0, 0, 1, 0, 315.01605, 0, 0, 1);
  }

  86% {
    transform: matrix3d(0.69558, 0.71845, 0, 0, -0.71845, 0.69558, 0, 0, 0, 0, 1, 0, 305.15582, 0, 0, 1);
  }

  87% {
    transform: matrix3d(0.71478, 0.69934, 0, 0, -0.69934, 0.71478, 0, 0, 0, 0, 1, 0, 294.84494, 0, 0, 1);
  }

  88% {
    transform: matrix3d(0.73435, 0.67877, 0, 0, -0.67877, 0.73435, 0, 0, 0, 0, 1, 0, 284.03427, 0, 0, 1);
  }

  89% {
    transform: matrix3d(0.75429, 0.65654, 0, 0, -0.65654, 0.75429, 0, 0, 0, 0, 1, 0, 272.6644, 0, 0, 1);
  }

  90% {
    transform: matrix3d(0.77462, 0.63243, 0, 0, -0.63243, 0.77462, 0, 0, 0, 0, 1, 0, 260.66217, 0, 0, 1);
  }

  91% {
    transform: matrix3d(0.79531, 0.6062, 0, 0, -0.6062, 0.79531, 0, 0, 0, 0, 1, 0, 247.93573, 0, 0, 1);
  }

  92% {
    transform: matrix3d(0.81642, 0.57746, 0, 0, -0.57746, 0.81642, 0, 0, 0, 0, 1, 0, 234.36719, 0, 0, 1);
  }

  93% {
    transform: matrix3d(0.83791, 0.54581, 0, 0, -0.54581, 0.83791, 0, 0, 0, 0, 1, 0, 219.80058, 0, 0, 1);
  }

  94% {
    transform: matrix3d(0.8598, 0.51063, 0, 0, -0.51063, 0.8598, 0, 0, 0, 0, 1, 0, 204.02232, 0, 0, 1);
  }

  95% {
    transform: matrix3d(0.88211, 0.47105, 0, 0, -0.47105, 0.88211, 0, 0, 0, 0, 1, 0, 186.72543, 0, 0, 1);
  }

  96% {
    transform: matrix3d(0.90483, 0.42578, 0, 0, -0.42578, 0.90483, 0, 0, 0, 0, 1, 0, 167.44, 0, 0, 1);
  }

  97% {
    transform: matrix3d(0.92797, 0.37266, 0, 0, -0.37266, 0.92797, 0, 0, 0, 0, 1, 0, 145.37674, 0, 0, 1);
  }

  98% {
    transform: matrix3d(0.95154, 0.30751, 0, 0, -0.30751, 0.95154, 0, 0, 0, 0, 1, 0, 119.0005, 0, 0, 1);
  }

  99% {
    transform: matrix3d(0.97555, 0.21978, 0, 0, -0.21978, 0.97555, 0, 0, 0, 0, 1, 0, 84.35828, 0, 0, 1);
  }

  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

 }
</style>
