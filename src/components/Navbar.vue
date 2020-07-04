<template>
  <nav class="dynamic-component dynamic-component--navbar">
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/about">
      About
    </router-link>
  </nav>
</template>
<script>
export default {
  name: 'NavbarDynamicComponent'
}
</script>
