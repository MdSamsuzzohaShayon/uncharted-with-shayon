<template>
  <div>
    <!-- GTM noscript immediately after opening body -->
    <div v-html="gtmNoScript"></div>

    <slot />
  </div>
</template>

<script setup>
import { useHead } from '#imports'

// Inject GTM script into <head>
useHead({
  script: [
    {
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P6XB3VM3');`,
      type: 'text/javascript',
    },
  ],
  // Needed to allow raw JS injection
  __dangerouslyDisableSanitizersByTagID: {
    'gtm-script': ['innerHTML']
  }
});

// GTM noscript for <body>
const gtmNoScript = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6XB3VM3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
</script>