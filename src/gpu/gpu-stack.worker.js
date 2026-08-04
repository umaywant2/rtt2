// src/gpu/gpu-stack.worker.js
/**
 * RTT/2 — GPU Stack Worker
 * ------------------------
 * Wraps the GPU Stack Operator for use in browser workers.
 */

importScripts("/src/gpu/gpu-stack.js");

self.onmessage = (event) => {
  const { openGpuStack } = event.data;

  try {
    const result = GpuStack.build(openGpuStack);

    self.postMessage({
      ok: true,
      engine: "RTT/2",
      operator: "gpu-stack",
      version: GpuStack.version,
      result
    });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error.message || "GS-008: Internal GPU stack error"
    });
  }
};
