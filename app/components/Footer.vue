<template>
  <footer class="bg-white border-t-2 border-[#2a2a2a] mt-16 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-600">
          <p>© {{ new Date().getFullYear() }} LikeME. Made with ♥ for the open source community</p>
        </div>
        <div class="flex gap-6 text-sm">
          <NuxtLink
              class="text-[#2a2a2a] hover:underline font-mono"
              to="/imprint"
          >
            Imprint
          </NuxtLink>
          <NuxtLink
              class="text-[#2a2a2a] hover:underline font-mono"
              to="/privacy"
          >
            Privacy Policy
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
</script>

