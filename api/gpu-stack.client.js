// api/gpu-stack.client.js
/**
 * RTT/2 — GPU Stack API Client
 * ----------------------------
 * Wrapper for calling the /api/gpu-stack endpoint.
 */

export async function gpuStack(openGpuStack) {
  const response = await fetch("/api/gpu-stack", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ openGpuStack })
  });

  return response.json();
}
