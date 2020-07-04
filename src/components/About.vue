<template>
  <div class="route route--about">
    <navbar />
    <h1>About</h1>
  </div>
</template>
<script>
import Navbar from './Navbar'

export default {
  name: 'About',
  components: { Navbar }
}
</script>

<style lang="scss" scoped>

  .route {
    display: flex;
    justify-content: center;

    h1 {
      color: green;
    }
  }

</style>
