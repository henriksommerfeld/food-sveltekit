<script lang="ts">
  import { onMount } from 'svelte'

  const requestLock = () => navigator.wakeLock.request('screen')

  onMount(async () => {
    if (!('wakeLock' in navigator)) return

    await requestLock()

    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState === 'visible') {
        await requestLock()
      }
    })
  })
</script>
