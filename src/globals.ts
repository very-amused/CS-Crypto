let crypto: Crypto
let atob = function(data: string): string { return '' }
let btoa = function(data: string): string { return '' }
if (typeof window === 'object') {
  ({ crypto, atob, btoa } = window)
}

function showDevelopmentWarning(): void {
  if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    console.warn(`You have enabled a development/testing polyfill, and your environment variables indicate that you are not in a development/testing environment.
    If you're not sure what this means, you probably have made a mistake.`)
  }
}

/**
 * Load a polyfill for all browser globals
 */
export async function loadPolyfill(): Promise<void> {
  showDevelopmentWarning();
  // @ts-ignore
  ({ atob, btoa } = await import('Base64'))
  const { Crypto } = await import('node-webcrypto-ossl')
  crypto = new Crypto()
}

// These exports pass value by reference.
// This means that when their value is updates from this module,
// their value is updated everywhere they're imported and used.
export {
  crypto,
  atob,
  btoa
}
