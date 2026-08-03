<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    if (!('wakeLock' in navigator)) return

    let wakeLock: WakeLockSentinel | null = null

    const requestLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request('screen')
        wakeLock.addEventListener('release', () => {
          wakeLock = null
        })
      } catch (e) {
        console.warn('Wake Lock request failed:', e)
      }
    }

    requestLock()

    const onVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && !wakeLock) {
        await requestLock()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      wakeLock?.release()
    }
  })
</script>
