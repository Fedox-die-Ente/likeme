<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'

const route = useRoute()
const username = route.params.user as string
const {loggedIn, user: currentUser} = useUserSession()

const userData = ref<any>(null)
const loading = ref(true)
const error = ref('')
const isLiked = ref(false)
const likesCount = ref(0)
const liking = ref(false)

const fetchUserData = async () => {
  try {
    loading.value = true
    const data = await $fetch(`/api/users/${username}`) as any
    userData.value = data
    likesCount.value = data.likesCount || 0
    isLiked.value = data.isLikedByCurrentUser || false
  } catch (e: any) {
    error.value = e.message || 'User not found'
  } finally {
    loading.value = false
  }
}

const toggleLike = async () => {
  if (!loggedIn.value) {
    window.location.href = '/api/auth/github'
    return
  }

  if (liking.value) return

  try {
    liking.value = true
    if (isLiked.value) {
      await $fetch(`/api/users/${username}/unlike`, {method: 'POST'})
      isLiked.value = false
      likesCount.value--
    } else {
      await $fetch(`/api/users/${username}/like`, {method: 'POST'})
      isLiked.value = true
      likesCount.value++
    }
  } catch (e: any) {
    alert(e.message || 'Failed to update like')
  } finally {
    liking.value = false
  }
}

const accountAge = computed(() => {
  if (!userData.value?.createdAt) return 'N/A'
  const created = new Date(userData.value.createdAt)
  const now = new Date()
  const years = now.getFullYear() - created.getFullYear()

  if (years > 0) {
    return `${years}y`
  }
  const months = now.getMonth() - created.getMonth()
  if (months > 0) {
    return `${months}mo`
  }
  return 'New'
})

const formatCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

const badgeUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/api/badge/${username}`
})

onMounted(() => {
  fetchUserData()
})

useSeoMeta({
  title: `@${username} - LikeME Profile`,
  description: `Check out the LikeME profile of @${username}. See their bio, likes, and get your own badge!`
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="mb-6">
        <NuxtLink
            class="inline-block text-[#2a2a2a] hover:underline text-sm"
            to="/"
        >
          ← Back to Home
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2a2a2a] border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Loading profile...</p>
      </div>

      <div v-else-if="error" class="bg-red-50 border-2 border-red-500 p-6 text-center">
        <p class="text-red-600 font-bold">{{ error }}</p>
      </div>

      <div v-else-if="userData"
           class="relative bg-white border-2 border-[#2a2a2a] p-12 shadow-[8px_8px_0_rgba(42,42,42,0.1)]">
        <div
            class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-[#2a2a2a] pointer-events-none opacity-30"></div>

        <div class="flex items-center justify-center text-center mb-6">
          <img
              :src="userData.avatarUrl || 'https://avatars.githubusercontent.com/u/1?v=4'"
              alt="User Avatar"
              class="w-30 h-30 rounded-full border-[3px] border-[#2a2a2a] shadow-[4px_4px_0_rgba(42,42,42,0.1)] object-cover"
          />
        </div>

        <h1 class="text-[28px] font-bold text-center mb-2 tracking-[-0.5px]">@{{ userData.name }}</h1>
        <p class="text-center text-[#666] text-sm mb-8 leading-relaxed">
          {{ userData.bio || 'No bio yet' }}
        </p>

        <div class="text-center mb-8 py-6 border-t border-b border-dashed border-[#ddd]">
          <button
              :class="[
                'py-3.5 px-12 text-base font-mono cursor-pointer transition-all duration-200 font-bold tracking-[0.5px] border-2',
                isLiked
                  ? 'bg-white text-[#e74c3c] border-[#e74c3c] shadow-[4px_4px_0_rgba(231,76,60,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(231,76,60,0.2)]'
                  : 'bg-[#2a2a2a] text-white border-[#2a2a2a] shadow-[4px_4px_0_rgba(42,42,42,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(42,42,42,0.2)]',
                liking ? 'opacity-50 cursor-not-allowed' : '',
                'active:translate-x-1 active:translate-y-1 active:shadow-none'
              ]"
              :disabled="liking"
              @click="toggleLike"
          >
            <span>{{ isLiked ? '♥ Liked' : '♡ Like Profile' }}</span>
          </button>
          <div class="mt-4 text-sm text-[#666]">
            <strong class="text-[#2a2a2a] text-lg">{{ formatCount(likesCount) }}</strong> likes
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="relative py-4 px-3 bg-[#fafafa] border border-[#e0e0e0]">
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2a2a2a]"></div>
            <div class="text-xl font-bold mb-1 text-[#2a2a2a]">{{ formatCount(likesCount) }}</div>
            <div class="text-[11px] text-[#888] uppercase tracking-[0.5px]">Likes</div>
          </div>
          <div class="relative py-4 px-3 bg-[#fafafa] border border-[#e0e0e0]">
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2a2a2a]"></div>
            <div class="text-xl font-bold mb-1 text-[#2a2a2a]">{{ userData.githubId }}</div>
            <div class="text-[11px] text-[#888] uppercase tracking-[0.5px]">GitHub ID</div>
          </div>
          <div class="relative py-4 px-3 bg-[#fafafa] border border-[#e0e0e0]">
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2a2a2a]"></div>
            <div class="text-xl font-bold mb-1 text-[#2a2a2a]">{{ accountAge }}</div>
            <div class="text-[11px] text-[#888] uppercase tracking-[0.5px]">Active</div>
          </div>
        </div>

        <div class="mt-6 text-center pt-6 border-t border-dashed border-[#ddd]">
          <div class="text-[11px] text-[#999] mb-2 uppercase tracking-[1px]">Badge URL</div>
          <a
              :href="badgeUrl"
              class="inline-block py-2 px-4 bg-white border border-dashed border-[#ccc] text-[#666] no-underline text-xs transition-all duration-200 hover:border-[#2a2a2a] hover:text-[#2a2a2a]"
              target="_blank"
          >
            {{ badgeUrl }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
