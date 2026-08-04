/**
 * RTT/2 — Front-End Runtime
 * -------------------------
 * Provides browser-side wrappers for RTT/2 operators:
 *   - regime-map
 *   - drift-scan
 *   - coherence-geometry
 *
 * Each operator is executed via its corresponding Web Worker.
 */

export const RTT2 = {
  version: "2026.1",

  /**
   * Run the Regime Map operator.
   */
  regimeMap(input) {
    return new Promise((resolve) => {
      const worker = new Worker("/assets/js/workers/regime-map.worker.js");

      worker.onmessage = (event) => {
        resolve(event.data);
        worker.terminate();
      };

      worker.postMessage({ input });
    });
  },

  /**
   * Run the Drift Scan operator.
   */
  driftScan(regimeMap) {
    return new Promise((resolve) => {
      const worker = new Worker("/assets/js/workers/drift-scan.worker.js");

      worker.onmessage = (event) => {
        resolve(event.data);
        worker.terminate();
      };

      worker.postMessage({ regimeMap });
    });
  },

  /**
   * Run the Coherence Geometry operator.
   */
  coherenceGeometry(regimeMap, driftScan) {
    return new Promise((resolve) => {
      const worker = new Worker("/assets/js/workers/coherence-geometry.worker.js");

      worker.onmessage = (event) => {
        resolve(event.data);
        worker.terminate();
      };

      worker.postMessage({ regimeMap, driftScan });
    });
  },

  /**
   * Full RTT/2 pipeline:
   *   regime-map → drift-scan → coherence-geometry
   */
  async pipeline(input) {
    const regime = await this.regimeMap(input);
    const drift = await this.driftScan(regime.result);
    const coherence = await this.coherenceGeometry(regime.result, drift.result);

    return {
      engine: "RTT/2",
      version: this.version,
      regime,
      drift,
      coherence
    };
  }
};

