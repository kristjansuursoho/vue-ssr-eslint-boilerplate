<template>
  <div class="route route--fallback">
    <navbar />
    <h1>Fallback</h1>
  </div>
</template>
<script>
import Navbar from './Navbar'

export default {
  name: 'Fallback',
  components: { Navbar }
}
</script>
