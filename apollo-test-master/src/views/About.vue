<template>
  <div class="about">
    <h1>This is an about page</h1>
    <amplify-authenticator></amplify-authenticator>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue'

export default {
  name: 'about', 
  components: {
    ...components
  }
}
</script>