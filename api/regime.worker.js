/**
 * RTT/2 — Regime Worker
 * --------------------------------
 * Wraps the RTT/2 regime analysis engine for browser workers.
 */

importScripts("/src/regime/regime.js");

self.onmessage = (event) => {
  const { input } = event.data;

  try {
    const result = regime.build(input);

    self.postMessage({
      ok: true,
      engine: "RTT/2",
      operator: "regime",
      version: "2026.1",
      result
    });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error.message || "RG-006: Internal regime error"
    });
  }
};

