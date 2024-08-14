<script lang="ts">
  import { onMount } from 'svelte'

  let lock: WakeLockSentinel

  const requestLock = async () => {
    console.log('🥕')
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
  $: checked = false

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

  const clickHandler = async () => {
    if (isActive) {
      lock?.release()
    } else {
      await requestLock()
    }
  }
</script>

<h1>
  <label>Keep awake: <input type="checkbox" value={checked} on:click={clickHandler} /></label>
</h1>
<h1>Lock: {isActive}</h1>
