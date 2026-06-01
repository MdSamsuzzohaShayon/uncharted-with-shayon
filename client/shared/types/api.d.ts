declare module '#app' {
  interface NuxtApp {
    _api?: ReturnType<typeof $fetch.create>
  }
}

export {}
