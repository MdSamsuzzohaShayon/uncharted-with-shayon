// types/gtm.d.ts
declare global {
    interface Window {
      dataLayer: any[]
      google_tag_manager?: any
    }
  }
  
  export {}