/**
 * RTT/2 — Regime Map Worker
 * --------------------------------
 * Wraps the RTT/2 regime-map engine for use in browser workers.
 */

importScripts("/src/regime/regime-map.js");

self.onmessage = (event) => {
  const { input } = event.data;

  try {
    const result = regimeMap.build(input);

    self.postMessage({
      ok: true,
      engine: "RTT/2",
      operator: "regime-map",
      version: "2026.1",
      result
    });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error.message || "RM-006: Internal mapping error"
    });
  }
};

