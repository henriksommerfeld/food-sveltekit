<script lang="ts">
  import { onMount } from 'svelte'

  let lock: WakeLockSentinel

  const requestLock = async () => {
    lock = await navigator.wakeLock.request('screen')
    lock.addEventListener('release', () => {
      console.log('Released')
      isActive = false
    })

    isActive = true
    console.log('Activated')
    return isActive
  }

  $: isActive = false

  onMount(async () => {
    if (!('wakeLock' in navigator)) {
      console.log('😔')
      return
    }

    await requestLock()

    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') {
        await requestLock()
      }
    })
  })
</script>

<h1>Lock: {isActive}</h1>
