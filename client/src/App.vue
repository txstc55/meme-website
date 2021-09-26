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
