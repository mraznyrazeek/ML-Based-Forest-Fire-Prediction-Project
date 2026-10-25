
<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-950 p-6">
    <div class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl">
      <div class="mb-5 text-5xl">🌲🔥</div>

      <h1 class="mb-3 text-3xl font-bold text-white">
        Forest Fire Prediction System
      </h1>

      <p class="mb-6 text-slate-400">
        Machine Learning-Based Burned Area Prediction
      </p>

      <Button
        label="PrimeVue is Working!"
        icon="pi pi-check"
        severity="success"
      />
    </div>
  </div>
</template>

