<script lang="ts" setup>
const {loggedIn, user, session, fetch, clear, openInPopup} = useUserSession()
useSeoMeta({
  title: 'LikeME - Add beautiful like badges to your markdown files',
  description: 'Add beautiful like badges to your markdown files with LikeME. Easy setup, modern design, and engagement tracking for your GitHub projects.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-[#2a2a2a] mb-4 tracking-tight">
          LikeME
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Add <strong class="text-[#2a2a2a]">beautiful</strong> like badges to your markdown files
        </p>
      </div>

      <div class="relative bg-white border-2 border-[#2a2a2a] p-8 md:p-12 shadow-[8px_8px_0_rgba(42,42,42,0.1)] mb-8">
        <div
            class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-[#2a2a2a] pointer-events-none opacity-30"></div>

        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="text-center p-6 bg-gray-50 border border-gray-200">
            <div class="text-4xl mb-3">⚡</div>
            <h3 class="font-bold text-lg mb-2 text-[#2a2a2a]">Quick Setup</h3>
            <p class="text-sm text-gray-600">Add like badges to your README in seconds</p>
          </div>
          <div class="text-center p-6 bg-gray-50 border border-gray-200">
            <div class="text-4xl mb-3">🎨</div>
            <h3 class="font-bold text-lg mb-2 text-[#2a2a2a]">Beautiful Design</h3>
            <p class="text-sm text-gray-600">Clean, modern badges that match your style</p>
          </div>
          <div class="text-center p-6 bg-gray-50 border border-gray-200">
            <div class="text-4xl mb-3">📊</div>
            <h3 class="font-bold text-lg mb-2 text-[#2a2a2a]">Track Engagement</h3>
            <p class="text-sm text-gray-600">See who loves your projects and content</p>
          </div>
        </div>

        <div class="mb-8 border-t border-b border-dashed border-gray-300 py-8">
          <h2 class="text-2xl font-bold text-center mb-6 text-[#2a2a2a]">How It Works</h2>
          <div class="space-y-4 max-w-2xl mx-auto">
            <div class="flex items-start gap-4">
              <div
                  class="flex-shrink-0 w-8 h-8 bg-[#2a2a2a] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 class="font-bold text-[#2a2a2a] mb-1">Login with GitHub</h4>
                <p class="text-sm text-gray-600">Connect your GitHub account to get started</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                  class="flex-shrink-0 w-8 h-8 bg-[#2a2a2a] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 class="font-bold text-[#2a2a2a] mb-1">Generate Your Badge</h4>
                <p class="text-sm text-gray-600">Get a custom badge link for your profile or projects</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                  class="flex-shrink-0 w-8 h-8 bg-[#2a2a2a] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 class="font-bold text-[#2a2a2a] mb-1">Add to README</h4>
                <p class="text-sm text-gray-600">Paste the badge code into your markdown files</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button
              v-if="!loggedIn"
              class="bg-[#2a2a2a] text-white border-2 border-[#2a2a2a] py-4 px-12 text-lg font-mono cursor-pointer transition-all duration-200 shadow-[4px_4px_0_rgba(42,42,42,0.2)] font-bold tracking-[0.5px] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(42,42,42,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <a class="flex items-center gap-3" href="/api/auth/github">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Login with GitHub</span>
            </a>
          </button>
          <div v-else class="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <NuxtLink
                class="bg-[#2a2a2a] text-white border-2 border-[#2a2a2a] py-4 px-12 text-lg font-mono cursor-pointer transition-all duration-200 shadow-[4px_4px_0_rgba(42,42,42,0.2)] font-bold tracking-[0.5px] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(42,42,42,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none inline-block"
                to="/profile"
            >
              My Profile
            </NuxtLink>
            <button
                class="bg-white text-[#2a2a2a] border-2 border-[#2a2a2a] py-4 px-12 text-lg font-mono cursor-pointer transition-all duration-200 shadow-[4px_4px_0_rgba(42,42,42,0.2)] font-bold tracking-[0.5px] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(42,42,42,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                @click="clear"
            >
              Logout
            </button>
          </div>
          <p v-if="loggedIn" class="mt-4 text-sm text-gray-600">
            Welcome back, <strong class="text-[#2a2a2a]">{{ (user as any)?.name || 'User' }}</strong>!
          </p>
        </div>
      </div>

      <div class="text-center text-sm text-gray-500">
        <p>Made with ♥ for the open source community</p>
      </div>
    </div>
  </div>
</template>
