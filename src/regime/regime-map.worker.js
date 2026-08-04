/**
 * RTT/2 — Regime Map Worker
 * -------------------------
 * Worker wrapper for the regime-map engine.
 * Receives upstream structural/contextual input, computes regime weights,
 * transitions, and intersections, and returns the full regime-map result.
 */

import { RegimeMap } from "./regime-map.js";

self.onmessage = function (event) {
  try {
    const input = event.data || {};

    const result = RegimeMap.build({
      input: input.input || {}
    });

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
      engine: "RTT/2",
      operator: "regime-map",
      version: "2026.1",
      error: error.message || "Unknown worker error"
    });
  }
};

