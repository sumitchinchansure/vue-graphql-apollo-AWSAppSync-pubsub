<template>
<section>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/apollo">Apollo</router-link> |
      <router-link to="/fromscript">FromScript</router-link> |
      <router-link to="/conversation">Conversation</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  <div id="app" v-if="hydrated">
    <router-view/>
  </div>
  </section>
</template>

<script>
export default {
  name: 'App',
  data: () => ({ hydrated: false }),
  async mounted() {
    await this.$apollo.provider.defaultClient.hydrated();
    this.hydrated = true;
  },
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
