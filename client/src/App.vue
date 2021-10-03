<template>
  <v-app>
    <div id="nav">
      <router-link to="/">IMAGE</router-link> |
      <router-link to="/gif">GIF</router-link> |
      <router-link to="/video">VIDEO</router-link>
    </div>
    <router-view />
  </v-app>
</template>

<style>
body {
  background-color: #0f2031;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #0f2031;
}

#nav {
  padding: 30px;
  font-size: 30px;
}

#nav a {
  /*font-weight: bold;*/
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #44e79e;
  font-weight: bold;
}
</style>

<style global>
.utils {
  margin-top: 2vh;
  padding-left: 20px;
  height: 6vh;
}

.explaination {
  padding-right: 20px;
  text-align: center;
  overflow-y: scroll;
  font-family: Tahoma, sans-serif;
  color: white;
  height: 6vh;
  font-size: 20px;
}

.outpout-button {
  font-weight: bold;
}

.output-button .v-btn__content {
  color: #182750;
}
.output-button .v-btn--disabled.v-btn__content {
  color: #b9e4a6;
}
</style>
