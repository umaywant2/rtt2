# **gpu-stack — RTT/2 GPU Stack Operator**  
**RTT:** 2  
**Coherence:** Declared  
**Drift:** Bounded  
**Paradox:** Structural  

---

## 1. Overview  
The **GPU Stack Operator** (`gpu-stack`) provides a unified RTT/2 entry point for GPU‑aware structural, drift, and coherence analysis. It ingests a complete **OpenGPU stack** (substrate + rendering + execution) and produces aligned RTT/2 views suitable for downstream operators:

- **regime‑map**  
- **drift‑scan**  
- **coherence‑geometry**

This operator consolidates three GPU adapters:

- **gpu‑substrate‑adapter** → structural topology  
- **gpu‑rendering‑drift‑adapter** → drift vectors and fields  
- **gpu‑execution‑coherence‑adapter** → coherence surfaces and overlays  

---

## 2. Input  
The operator consumes a single object:

```json
{
  "substrate": { ... },
  "rendering": { ... },
  "execution": { ... }
}
```

All sections are required.

### 2.1 Substrate  
GPU substrate primitives and structural relationships.

- nodes: substrate primitives  
- edges: directional relationships  
- tier: S/E/R regime tag  

### 2.2 Rendering  
Rendering primitives, primitive‑stream paths, reconstruction semantics.

- primitives: rendering operators  
- paths: primitive‑stream routes  

### 2.3 Execution  
Execution primitives, scheduling, health, and overlays.

- units: execution primitives  
- overlays: execution drift overlays  

---

## 3. Processing  
The operator internally invokes three RTT/2 adapters:

### 3.1 Substrate Adapter  
`gpu-substrate-adapter.build(openGpuStack.substrate)`  
Produces structural topology for **regime‑map**.

### 3.2 Rendering Drift Adapter  
`gpu-rendering-drift-adapter.build(openGpuStack.rendering)`  
Produces drift vectors and drift fields for **drift‑scan**.

### 3.3 Execution Coherence Adapter  
`gpu-execution-coherence-adapter.build(openGpuStack.execution)`  
Produces coherence surfaces, stability gradients, and alignment vectors for **coherence‑geometry**.

The operator then packages these into a unified RTT/2 GPU view.

---

## 4. Output  
The operator emits:

```json
{
  "regimeView": { ... },
  "driftView": { ... },
  "coherenceView": { ... }
}
```

### 4.1 Regime View  
Structural output for **regime‑map**:

- weights  
- transitions  
- intersections  

### 4.2 Drift View  
Drift output for **drift‑scan**:

- vectors (structural, energetic, resonant, cross)  
- fields (primitive‑stream drift fields)  

### 4.3 Coherence View  
Geometry output for **coherence‑geometry**:

- alignment vectors  
- stability gradients  
- coherence surfaces  

---

## 5. Determinism  
The operator must be fully deterministic:

- same input → same output  
- no randomness  
- no time‑dependent behavior  
- no external calls  

Required for RTT/3 ingestion.

---

## 6. Error Codes  

| Code   | Meaning |
|--------|---------|
| GS‑001 | Missing substrate section |
| GS‑002 | Missing rendering section |
| GS‑003 | Missing execution section |
| GS‑004 | Invalid substrate node or edge |
| GS‑005 | Invalid rendering primitive or path |
| GS‑006 | Invalid execution unit or overlay |
| GS‑007 | Normalization failure |
| GS‑008 | Internal GPU stack error |

Errors must be returned in RTT/2 worker format:

```json
{
  "ok": false,
  "error": "GS-001: Missing substrate section"
}
```

---

## 7. Version  
**Operator Version:** `2026.1`  
Matches RTT/2 engine and protocol versioning.

---

## 8. File Locations  

```
src/gpu/gpu-stack.js
src/gpu/gpu-substrate-adapter.js
src/gpu/gpu-rendering-drift-adapter.js
src/gpu/gpu-execution-coherence-adapter.js

engine/gpu-stack.md        ← this file
engine/gpu-substrate-adapter.md
engine/gpu-rendering-drift-adapter.md
engine/gpu-execution-coherence-adapter.md

docs/gpu-stack-protocol.md
api/gpu-stack.schema.json
```
