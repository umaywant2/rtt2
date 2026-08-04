/**
 * RTT/2 — Coherence Geometry Worker
 * ---------------------------------
 * Worker wrapper for the coherence-geometry engine.
 * Receives regime-map + drift-scan input, computes coherence geometry,
 * and returns alignment vectors, stability gradients, drift vectors,
 * and coherence surfaces.
 */

import { CoherenceGeometry } from "./coherence-geometry.js";

self.onmessage = function (event) {
  try {
    const input = event.data || {};

    const result = CoherenceGeometry.build({
      regimeMap: input.regimeMap || {},
      driftScan: input.driftScan || {}
    });

    self.postMessage({
      ok: true,
      engine: "RTT/2",
      operator: "coherence-geometry",
      version: "2026.1",
      result
    });

  } catch (error) {
    self.postMessage({
      ok: false,
      engine: "RTT/2",
      operator: "coherence-geometry",
      version: "2026.1",
      error: error.message || "Unknown worker error"
    });
  }
};

