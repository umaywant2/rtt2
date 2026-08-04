/**
 * RTT/2 — GPU Stack Operator
 * --------------------------
 * Unified entry point for GPU-aware RTT/2 analysis.
 *
 * Consumes a full OpenGPU stack:
 *   - substrate
 *   - rendering
 *   - execution
 *
 * Internally invokes:
 *   - gpu-substrate-adapter       → regime-map input
 *   - gpu-rendering-drift-adapter → drift-scan input
 *   - gpu-execution-coherence-adapter → coherence-geometry input
 *
 * Emits:
 *   - regimeView
 *   - driftView
 *   - coherenceView
 */

import { buildSubstrateStructure } from "./gpu-substrate-adapter.js";
import { buildRenderingDrift } from "./gpu-rendering-drift-adapter.js";
import { buildExecutionCoherence } from "./gpu-execution-coherence-adapter.js";

export const GpuStack = {
  version: "2026.1",

  /**
   * Build unified RTT/2 GPU views from a full OpenGPU stack.
   *
   * @param {Object} openGpuStack
   * @returns {Object} { regimeView, driftView, coherenceView }
   */
  build(openGpuStack) {
    if (!openGpuStack || !openGpuStack.substrate) {
      throw new Error("GS-001: Missing substrate section");
    }
    if (!openGpuStack.rendering) {
      throw new Error("GS-002: Missing rendering section");
    }
    if (!openGpuStack.execution) {
      throw new Error("GS-003: Missing execution section");
    }

    // Substrate → structural topology → regimeView
    const structure = buildSubstrateStructure(openGpuStack.substrate);

    const regimeView = {
      // regime-map will typically compute these; here we keep the
      // structure ready and allow downstream operators to fill in
      // weights/transitions/intersections.
      structure
    };

    // Rendering → drift vectors/fields → driftView
    const driftView = buildRenderingDrift(openGpuStack.rendering);

    // Execution → coherence geometry → coherenceView
    const coherenceView = buildExecutionCoherence(openGpuStack.execution);

    return {
      engine: "RTT/2",
      operator: "gpu-stack",
      version: this.version,
      regimeView,
      driftView,
      coherenceView
    };
  }
};

