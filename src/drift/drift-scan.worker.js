/**
 * RTT/2 — Drift Scan Worker
 * -------------------------
 * Worker wrapper for the drift-scan engine.
 * Receives regime-map input, computes drift vectors and drift fields,
 * and returns the full drift-scan result.
 */

import { DriftScan } from "./drift-scan.js";

self.onmessage = function (event) {
  try {
    const input = event.data || {};

    const result = DriftScan.build({
      regimeMap: input.regimeMap || {}
    });

    self.postMessage({
      ok: true,
      engine: "RTT/2",
      operator: "drift-scan",
      version: "2026.1",
      result
    });

  } catch (error) {
    self.postMessage({
      ok: false,
      engine: "RTT/2",
      operator: "drift-scan",
      version: "2026.1",
      error: error.message || "Unknown worker error"
    });
  }
};

