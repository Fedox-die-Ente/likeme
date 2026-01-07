<script lang="ts" setup>
import {computed, ref} from 'vue'

const {user, clear} = useUserSession()

const profileData = ref<any>(null)
const loading = ref(true)
const error = ref('')
const bioEdit = ref('')
const isEditingBio = ref(false)
const savingBio = ref(false)
const showDeleteConfirm = ref(false)
const deleting = ref(false)
const badgeUrl = ref('')
const badgeMarkdown = ref('')
const badgeHtml = ref('')

const fetchProfile = async () => {
  try {
    loading.value = true
    const data = await $fetch('/api/profile') as any
    profileData.value = data
    bioEdit.value = data.bio || ''

    const baseUrl = window.location.origin
    badgeUrl.value = `${baseUrl}/api/badge/${data.name}`
    badgeMarkdown.value = `[![LikeME](${badgeUrl.value})](${baseUrl}/u/${data.name})`
    badgeHtml.value = `<a href="${baseUrl}/u/${data.name}"><img src="${badgeUrl.value}" alt="LikeME" /></a>`
  } catch (e: any) {
    error.value = e.message || 'Failed to load profile'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})

const saveBio = async () => {
  try {
    savingBio.value = true
    await $fetch('/api/profile/bio', {
      method: 'PATCH',
      body: {bio: bioEdit.value}
    })
    if (profileData.value) {
      profileData.value.bio = bioEdit.value
    }
    isEditingBio.value = false
  } catch (e: any) {
    alert(e.message || 'Failed to save bio')
  } finally {
    savingBio.value = false
  }
}

const cancelEdit = () => {
  bioEdit.value = profileData.value?.bio || ''
  isEditingBio.value = false
}

const deleteAccount = async () => {
  try {
    deleting.value = true
    await $fetch('/api/profile/delete', {
      method: 'DELETE'
    })
    await clear()
    navigateTo('/')
  } catch (e: any) {
    alert(e.message || 'Failed to delete account')
    deleting.value = false
  }
}

const copyToClipboard = async (text: string, type: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert(`${type} copied to clipboard!`)
  } catch (e) {
    alert('Failed to copy to clipboard')
  }
}

const accountAge = computed(() => {
  if (!profileData.value?.createdAt) return 'N/A'
  const created = new Date(profileData.value.createdAt)
  const now = new Date()
  const years = now.getFullYear() - created.getFullYear()
  const months = now.getMonth() - created.getMonth()

  if (years > 0) {
    return `${years}y`
  } else if (months > 0) {
    return `${months}mo`
  }
  return 'New'
})

useSeoMeta({
  title: 'Profile - LikeME',
  description: 'Manage your LikeME profile and settings'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-bold text-[#2a2a2a] mb-2 tracking-tight">My Profile</h1>
          <p class="text-gray-600">Manage your LikeME profile and settings</p>
        </div>
        <NuxtLink
            class="bg-white text-[#2a2a2a] border-2 border-[#2a2a2a] py-2 px-6 text-sm font-mono cursor-pointer transition-all duration-200 shadow-[4px_4px_0_rgba(42,42,42,0.2)] font-bold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(42,42,42,0.2)]"
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

      <div v-else-if="profileData" class="space-y-6">
        <div class="relative bg-white border-2 border-[#2a2a2a] p-8 shadow-[8px_8px_0_rgba(42,42,42,0.1)]">
          <div
              class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-[#2a2a2a] pointer-events-none opacity-30"></div>

          <div class="flex items-start gap-6">
            <img
                :src="profileData.avatarUrl || 'https://avatars.githubusercontent.com/u/1?v=4'"
                alt="Profile Avatar"
                class="w-24 h-24 rounded-full border-[3px] border-[#2a2a2a] shadow-[4px_4px_0_rgba(42,42,42,0.1)] object-cover"
            />
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-[#2a2a2a] mb-1">@{{ profileData.name }}</h2>
              <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>GitHub ID: {{ profileData.githubId }}</span>
                <span>•</span>
                <span>Joined: {{ accountAge }}</span>
              </div>

              <div class="mt-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-bold text-[#2a2a2a] uppercase tracking-wider">Bio</label>
                  <button
                      v-if="!isEditingBio"
                      class="text-xs text-[#2a2a2a] border border-[#2a2a2a] px-3 py-1 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                      @click="isEditingBio = true"
                  >
                    Edit
                  </button>
                </div>

                <div v-if="!isEditingBio" class="bg-gray-50 border border-gray-200 p-4 min-h-20">
                  <p class="text-gray-700">{{ profileData.bio || 'No bio set yet. Click edit to add one!' }}</p>
                </div>


                <div v-else class="space-y-3">
                  <textarea
                      v-model="bioEdit"
                      class="w-full border-2 border-[#2a2a2a] p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0_rgba(42,42,42,0.2)]"
                      maxlength="500"
                      placeholder="Tell others about yourself... (max 500 characters)"
                      rows="4"
                  ></textarea>

                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">{{ bioEdit.length }}/500 characters</span>
                    <div class="flex gap-2">
                      <button
                          :disabled="savingBio"
                          class="bg-white text-[#2a2a2a] border-2 border-[#2a2a2a] py-2 px-4 text-sm font-mono hover:bg-gray-50 disabled:opacity-50"
                          @click="cancelEdit"
                      >
                        Cancel
                      </button>
                      <button
                          :disabled="savingBio"
                          class="bg-[#2a2a2a] text-white border-2 border-[#2a2a2a] py-2 px-4 text-sm font-mono hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50"
                          @click="saveBio"
                      >
                        {{ savingBio ? 'Saving...' : 'Save Bio' }}
                      </button>
                    </div>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  It might take a few minutes for changes to appear on your public profile.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-dashed border-gray-300">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="py-4 px-3 bg-[#fafafa] border border-[#e0e0e0]">
                <div class="text-2xl font-bold mb-1 text-[#2a2a2a]">{{ profileData.likesCount }}</div>
                <div class="text-xs text-[#888] uppercase tracking-wider">Total Likes</div>
              </div>
              <div class="py-4 px-3 bg-[#fafafa] border border-[#e0e0e0]">
                <div class="text-2xl font-bold mb-1 text-[#2a2a2a]">{{ accountAge }}</div>
                <div class="text-xs text-[#888] uppercase tracking-wider">Account Age</div>
              </div>
              <div class="py-4 px-3 bg-[#fafafa] border border-[#e0e0e0]">
                <div class="text-2xl font-bold mb-1 text-[#2a2a2a]">
                  <NuxtLink :to="`/u/${profileData.name}`" class="hover:underline">
                    View
                  </NuxtLink>
                </div>
                <div class="text-xs text-[#888] uppercase tracking-wider">Public Profile</div>
              </div>
            </div>
          </div>
        </div>

        <div class="relative bg-white border-2 border-[#2a2a2a] p-8 shadow-[8px_8px_0_rgba(42,42,42,0.1)]">
          <div
              class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-[#2a2a2a] pointer-events-none opacity-30"></div>

          <h3 class="text-xl font-bold text-[#2a2a2a] mb-4">Your Badge</h3>
          <p class="text-sm text-gray-600 mb-4">Add this badge to your GitHub README or other markdown files</p>

          <div class="space-y-4">
            <div class="bg-gray-50 border border-gray-200 p-6 text-center">
              <img :src="badgeUrl" alt="Profile Badge" class="inline-block max-w-full h-auto"/>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-bold text-[#2a2a2a] uppercase tracking-wider">Markdown</label>
                <button
                    class="text-xs text-[#2a2a2a] border border-[#2a2a2a] px-3 py-1 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                    @click="copyToClipboard(badgeMarkdown, 'Markdown')"
                >
                  Copy
                </button>
              </div>
              <div class="bg-[#2a2a2a] text-white p-3 font-mono text-xs overflow-x-auto">
                {{ badgeMarkdown }}
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-bold text-[#2a2a2a] uppercase tracking-wider">HTML</label>
                <button
                    class="text-xs text-[#2a2a2a] border border-[#2a2a2a] px-3 py-1 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                    @click="copyToClipboard(badgeHtml, 'HTML')"
                >
                  Copy
                </button>
              </div>
              <div class="bg-[#2a2a2a] text-white p-3 font-mono text-xs overflow-x-auto">
                {{ badgeHtml }}
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-bold text-[#2a2a2a] uppercase tracking-wider">Badge URL</label>
                <button
                    class="text-xs text-[#2a2a2a] border border-[#2a2a2a] px-3 py-1 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                    @click="copyToClipboard(badgeUrl, 'URL')"
                >
                  Copy
                </button>
              </div>
              <div class="bg-[#2a2a2a] text-white p-3 font-mono text-xs overflow-x-auto">
                {{ badgeUrl }}
              </div>
            </div>
          </div>
        </div>

        <div class="relative bg-white border-2 border-[#2a2a2a] p-8 shadow-[8px_8px_0_rgba(42,42,42,0.1)]">
          <div
              class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-[#2a2a2a] pointer-events-none opacity-30"></div>

          <h3 class="text-xl font-bold text-[#2a2a2a] mb-4">People Who Like You</h3>

          <div v-if="profileData.likesReceived.length === 0" class="text-center py-8 text-gray-500">
            <div class="text-4xl mb-2">♡</div>
            <p>No likes yet. Share your profile to get likes!</p>
          </div>

          <div v-else class="space-y-3 max-h-96 overflow-y-auto">
            <div
                v-for="like in profileData.likesReceived"
                :key="like.id"
                class="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 hover:border-[#2a2a2a] transition-colors"
            >
              <img
                  :src="like.fromUser.avatarUrl || 'https://avatars.githubusercontent.com/u/1?v=4'"
                  alt="User Avatar"
                  class="w-12 h-12 rounded-full border-2 border-[#2a2a2a] object-cover"
              />
              <div class="flex-1">
                <NuxtLink
                    :to="`/u/${like.fromUser.name}`"
                    class="font-bold text-[#2a2a2a] hover:underline"
                >
                  @{{ like.fromUser.name }}
                </NuxtLink>
                <p class="text-xs text-gray-500">
                  {{
                    new Date(like.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  }}
                </p>
              </div>
              <span class="text-xl">♥</span>
            </div>
          </div>
        </div>

        <div class="relative bg-white border-2 border-red-500 p-8 shadow-[8px_8px_0_rgba(239,68,68,0.1)]">
          <div
              class="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 border border-dashed border-red-500 pointer-events-none opacity-30"></div>

          <h3 class="text-xl font-bold text-red-600 mb-2">Danger Zone</h3>
          <p class="text-sm text-gray-600 mb-4">Once you delete your account, there is no going back. This action cannot
            be undone.</p>

          <div v-if="!showDeleteConfirm">
            <button
                class="bg-white text-red-600 border-2 border-red-500 py-2 px-6 text-sm font-mono cursor-pointer transition-all duration-200 shadow-[4px_4px_0_rgba(239,68,68,0.2)] font-bold hover:bg-red-50"
                @click="showDeleteConfirm = true"
            >
              Delete Account
            </button>
          </div>

          <div v-else class="space-y-4">
            <div class="bg-red-50 border border-red-200 p-4">
              <p class="text-sm font-bold text-red-700 mb-2">⚠️ Are you absolutely sure?</p>
              <p class="text-xs text-red-600">This will permanently delete your account, all likes you've received, and
                all likes you've given. This action cannot be undone.</p>
            </div>
            <div class="flex gap-2">
              <button
                  :disabled="deleting"
                  class="bg-white text-gray-700 border-2 border-gray-300 py-2 px-6 text-sm font-mono hover:bg-gray-50 disabled:opacity-50"
                  @click="showDeleteConfirm = false"
              >
                Cancel
              </button>
              <button
                  :disabled="deleting"
                  class="bg-red-600 text-white border-2 border-red-600 py-2 px-6 text-sm font-mono cursor-pointer transition-all duration-200 shadow-[4px_4px_0_rgba(239,68,68,0.2)] font-bold hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50"
                  @click="deleteAccount"
              >
                {{ deleting ? 'Deleting...' : 'Yes, Delete My Account' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

