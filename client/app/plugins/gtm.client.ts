// plugins/gtm.client.ts
export default defineNuxtPlugin(() => {
    const route = useRoute()
    
    // Helper to push events to GTM
    const pushEvent = (eventName: string, data?: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: eventName, ...data })
        console.log(`📊 GTM: ${eventName}`, data)
      }
    }
    
    // Track pageviews on route changes
    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        // Don't track on initial load (wait for GTM)
        if (oldPath === undefined) return
        
        // Wait for DOM to update
        nextTick(() => {
          pushEvent('pageview', {
            pagePath: newPath,
            pageTitle: document.title
          })
        })
      }
    )
    
    // Provide helper to components
    return {
      provide: {
        gtm: {
          event: pushEvent
        }
      }
    }
  })