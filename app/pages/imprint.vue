<script lang="ts" setup>
</script>
<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <NuxtLink
            class="inline-block text-[#2a2a2a] hover:underline text-sm"
            to="/"
        >
          ← Back to Home
        </NuxtLink>
      </div>

      <div class="relative bg-white border-2 border-[#2a2a2a] p-8 md:p-12 shadow-[8px_8px_0_rgba(42,42,42,0.1)]">
        <div
            class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-[#2a2a2a] pointer-events-none opacity-30"></div>

        <h1 class="text-4xl font-bold text-[#2a2a2a] mb-8 tracking-tight">Impressum</h1>

        <div class="prose max-w-none">
          <h2 class="text-2xl font-bold text-[#2a2a2a] mb-4 mt-8">Allgemeine Informationen</h2>
          <p class="text-gray-700 mb-4">
            Florian Ohldag
            <br/>
            c/o Autorenglück #25795
            <br/>
            Albert-Einstein-Straße 47
            <br/>
            02977 Hoyerswerda
          </p>
          <h2 class="text-2xl font-bold text-[#2a2a2a] mb-4 mt-8">Kontakt</h2>
          <p class="text-gray-700 mb-4">
            Email: f3dox@proton.me
            <br/>
            Telefon: +49 173 3753285*
            <br/>
            * Unter dieser Telefonnummer ist kein technischer Support verfügbar.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
