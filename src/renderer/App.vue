<template>
  <div id="app">
    <p>Enter the city name to check current weather in it</p>
    <section class="weather-input">
      <input type="text" v-model="query">
      <button :disabled="!query.length" @click="showWeather">Check</button>
    </section>
    <section v-if="error" class="weather-error">
      There is no such city in the database
    </section>
    <section v-if="city.length" class="weather-result">
      <h1>{{city}}, {{country}}</h1>
      <p><em>{{weatherDescription}}</em></p>
      <div class="weather-result__main">
        <img :src="icon" alt="Weather icon">
        <div class="weather-result__temp">
          {{temp}}&deg;C
        </div>
      </div>
      <div class="weather-result__details">
        <p>Min: {{tempMin}}&deg;C</p>
        <p>Max: {{tempMax}}&deg;C</p>
        <p>Humidity: {{humidity}}%</p>
      </div>
    </section>
    <br>
    <!-- 初始化地圖設定 -->
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="options"
      style="height: 80vh;">
      <!-- 載入圖資 -->
      <l-tile-layer :url="url" :attribution="attribution" />
      
      <!-- 所在位置 -->
      <l-marker ref="location" :lat-lng="center">
        <l-popup>
          {{city}}
        </l-popup>
      </l-marker>
      <!-- 創建標記點 -->
      <!-- <l-marker :lat-lng="item.local" v-for="item in data" :key="item.id"> -->
        <!-- 標記點樣式判斷 -->
<!--         <l-icon
          :icon-url="item.name === '夢時代購物中心'?icon.type.gold:icon.type.black"
          :shadow-url="icon.shadowUrl"
          :icon-size="icon.iconSize"
          :icon-anchor="icon.iconAnchor"
          :popup-anchor="icon.popupAnchor"
          :shadow-size="icon.shadowSize"
        /> -->
        <!-- 彈出視窗 -->
        <!-- <l-popup> -->
          <!-- {{ item.name }} -->
        <!-- </l-popup> -->
      <!-- </l-marker> -->
    </l-map>
  </div>
</template>

<script>
  export default {
    name: 'weather-app',
    data() {
        return {
          query: '',
          error: false,
          city: '',
          country: '',
          weatherDescription: '',
          temp: null,
          tempMin: null,
          tempMax: null,
          humidity: null,
          icon: '',
          api_key: 'd21dc464301d51371f88a65e68ccc7f1',
          data: [
            { id: 1, name: "夢時代購物中心", local: [22.595153, 120.306923] },
            { id: 2, name: "漢神百貨", local: [22.61942, 120.296386] },
            { id: 3, name: "漢神巨蛋", local: [22.669603, 120.302288] },
            { id: 4, name: "大統百貨", local: [22.630748, 120.318033] }
          ],
          
          zoom: 11,
          center: [23.781389, 120.958699],
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
          options: {
            zoomControl: true
          },
          icon: {
            type: {
              black:
                "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
              gold:
                "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
            },
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            popupContent: {
              maxWidth: 1000
            },
            shadowSize: [41, 41]
          }
        };
    },
    methods: {
      showWeather() {
        this.$http
          .get(`/weather?q=${this.query}&units=metric&&appid=${this.api_key}`)
          .then(response => {
            console.log(response)
            this.city = response.data.name;
            this.country = response.data.sys.country;
            this.weatherDescription = response.data.weather[0].description;
            this.temp = response.data.main.temp;
            this.tempMin = response.data.main.temp_min;
            this.tempMax = response.data.main.temp_max;
            this.humidity = response.data.main.humidity;
            this.icon = `http://openweathermap.org/img/w/${
              response.data.weather[0].icon
            }.png`;
            this.center = [response.data.coord.lat, response.data.coord.lon];
            // this.zoom = 11
            this.$refs.location.mapObject.openPopup();
            this.error = false;
          })
          .catch(() => {
            this.error = true;
            this.city = '';
          });
      },
    },
    mounted() {
      console.log('haha')
        navigator.geolocation.getCurrentPosition(position => { 
          const p = position.coords;
          console.log(p)
          // 將中心點設為目前的位置
          this.center = [p.latitude, p.longitude];
          // 將目前的位置的標記點彈跳視窗打開
          // this.$refs.location.mapObject.openPopup();
        });
      // 等地圖創建後執行
      this.$nextTick(() => {
        // 獲得目前位置
        navigator.geolocation.getCurrentPosition(position => { 
          const p = position.coords;
          console.log(p)
          // 將中心點設為目前的位置
          this.center = [p.latitude, p.longitude];
          // 將目前的位置的標記點彈跳視窗打開
          // this.$refs.location.mapObject.openPopup();
        });
      });
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body,
  #app {
    height: 100%;
  }

  #app {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    padding: 10px;
    background: rgb(228, 233, 237);
    /*background: lightgrey;*/
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(228, 233, 237, 1) 0%,
      rgba(206, 214, 219, 1) 100%
    );
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(228, 233, 237, 1) 0%,
      rgba(206, 214, 219, 1) 100%
    );
    background: radial-gradient(
      ellipse at center,
      rgba(228, 233, 237, 1) 0%,
      rgba(206, 214, 219, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e9edf0', endColorstr='#c0c7cc',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }

  .weather-input {
    display: flex;
    align-items: center;
    padding: 20px 0;
  }

  .weather-result {
    text-align: center;
    &__main {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 5px;
      font-size: 1.3rem;
      font-weight: bold;
    }
    &__details {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: dimgray;
    }
  }

  .weather-error {
    color: red;
    font-weight: bold;
  }

  input {
    width: 75%;
    outline: none;
    height: 20px;
    font-size: 0.8rem;
  }

  button {
    display: block;
    width: 25%;
    height: 25px;
    outline: none;
    border-radius: 5px;
    white-space: nowrap;
    margin: 0 10px;
    font-size: 0.8rem;
  }
</style>
