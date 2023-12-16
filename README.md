# Vuetify birtday picker

[Demo](https://igorexa34314.github.io/vuetify-birthdaypicker/)


This package is only for Vuetify 3
[![demo](https://i.postimg.cc/7ZZPy4cN/1.png)](https://postimg.cc/0bh1pT96)

## Usage

```vue
<template>
   <h1 class="mb-5">Pick your birthday date to access this page</h1>
	<v-birthday-picker v-model="birthdayDate" :max-width="450" order="mmm-dd-yyyy" :from-year="1960"  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VBirthdayPicker } from 'vuetify-birthdaypicker';

const birthdayDate = ref(new Date());

</script>
```
