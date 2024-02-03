<script setup>

import Home from '@/views/Home.vue'
import Navbar from '@/components/ui/Navbar.vue'
import { RouterView } from 'vue-router';

</script>

<template>
  <main>
    <Navbar />
    <body class="flex flex-cols justify-center">
      <RouterView/>
    </body>
  </main>
</template>


