let localCrypto: Crypto
if (typeof window === 'object') {
  localCrypto = window.crypto
}

// strip-code
function showDevelopmentWarning(): void {
  if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    console.warn(`You have enabled a development/testing polyfill, and your environment variables indicate that you are not in a development/testing environment.
    If you're not sure what this means, you probably have made a mistake.`)
  }
}
// end-strip-code

// strip-code
/**
 * Load a polyfill for all browser globals
 */
async function loadPolyfill(): Promise<void> {
  showDevelopmentWarning()
  const { Crypto } = await import('node-webcrypto-ossl')
  localCrypto = new Crypto()
}
// end-strip-code

// These exports pass value by reference.
// This means that when their value is updated from this module,
// their value is updated everywhere they're imported and used.
export {
  // strip-code
  loadPolyfill,
  // end-strip-code
  localCrypto as crypto
}
