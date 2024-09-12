import { Buffer } from 'buffer';

// Ensure Buffer is available globally in the browser environment
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer;
}
