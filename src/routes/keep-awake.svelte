<script lang="ts">
  import { onMount } from 'svelte'

  let isLocked = false

  const requestLock = async () => {
    const wakeLock = await navigator.wakeLock.request('screen')
    isLocked = true
    wakeLock.addEventListener('release', () => {
      isLocked = false
    })
  }

  onMount(async () => {
    if (!('wakeLock' in navigator)) return

    document.addEventListener('click', async () => {
      if (isLocked) return
      await requestLock()
    })

    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') {
        await requestLock()
      }
    })
  })
</script>
