# **RTT/2 — GPU Stack Protocol**  
### *docs/gpu-stack-protocol.md*  

## 1. Purpose  
The **GPU Stack Protocol** defines how RTT/2 ingests a complete **OpenGPU stack** and produces aligned structural, drift, and coherence views suitable for RTT/3 and RTT/12.

This protocol governs:

- substrate → structural mapping  
- rendering → drift mapping  
- execution → coherence mapping  
- unified RTT/2 GPU operator behavior  
- determinism, normalization, and regime discipline  

The GPU Stack Operator (`gpu-stack`) is a first‑class RTT/2 operator.

---

## 2. Input Specification  
The operator consumes a single object:

### **openGpuStack**

```json
{
  "substrate": { ... },
  "rendering": { ... },
  "execution": { ... }
}
```

All three sections are required.

---

### 2.1 Substrate View  
Represents GPU substrate primitives and structural relationships.

Required fields:

- `nodes[]` — substrate primitives  
- `edges[]` — directional relationships  
- `tier` — S/E/R regime tag  

Validation rules:

- all nodes must have unique `id`  
- all edges must include `from`, `to`, `weight`  
- all weights normalized to `[0,1]`  
- all tiers must be `"S"`, `"E"`, or `"R"`  

---

### 2.2 Rendering View  
Represents rendering primitives, primitive‑stream paths, and reconstruction semantics.

Required fields:

- `primitives[]` — rendering operators  
- `paths[]` — primitive‑stream routes  

Validation rules:

- instability values normalized to `[0,1]`  
- path regimes must be S/E/R  
- direction must be a canonical path signature  

---

### 2.3 Execution View  
Represents GPU execution primitives, scheduling, and health.

Required fields:

- `units[]` — execution primitives  
- `overlays[]` — execution drift overlays  

Validation rules:

- stability and alignment normalized to `[0,1]`  
- regimes must be S/E/R  
- overlays must include `label` and `magnitude`  

---

## 3. Processing Model  
The GPU Stack Operator internally invokes three RTT/2 adapters:

### **3.1 Substrate Adapter**  
Input: `openGpuStack.substrate`  
Output: structural topology for regime‑map.

Responsibilities:

- convert substrate primitives → RTT/2 nodes  
- convert substrate relationships → RTT/2 edges  
- enforce S/E/R tier discipline  
- normalize weights  

---

### **3.2 Rendering Drift Adapter**  
Input: `openGpuStack.rendering`  
Output: drift vectors and drift fields for drift‑scan.

Responsibilities:

- convert rendering primitives → drift vectors  
- convert primitive‑stream paths → drift fields  
- classify drift type (structural, energetic, resonant, cross)  
- normalize instability values  

---

### **3.3 Execution Coherence Adapter**  
Input: `openGpuStack.execution`  
Output: coherence geometry overlays for coherence‑geometry.

Responsibilities:

- convert execution units → coherence surfaces  
- compute stability gradients  
- compute alignment vectors  
- emit execution drift overlays  

---

## 4. Unified Output Specification  
The GPU Stack Operator produces:

```json
{
  "regimeView": { ... },
  "driftView": { ... },
  "coherenceView": { ... }
}
```

These views match RTT/2 operator expectations.

---

### 4.1 Regime View  
Produced by regime‑map using substrate‑derived structure.

Includes:

- `weights` — S/E/R regime weights  
- `transitions[]` — directional regime transitions  
- `intersections[]` — multi‑regime overlaps  

All values normalized to `[0,1]`.

---

### 4.2 Drift View  
Produced by drift‑scan using rendering‑derived drift vectors and fields.

Includes:

- `vectors.structural[]`  
- `vectors.energetic[]`  
- `vectors.resonant[]`  
- `vectors.cross[]`  
- `fields[]` — primitive‑stream drift fields  

All magnitudes normalized to `[0,1]`.

---

### 4.3 Coherence View  
Produced by coherence‑geometry using execution‑derived surfaces and overlays.

Includes:

- `alignment[]` — alignment vectors  
- `stability[]` — stability gradients  
- `surfaces[]` — coherence surfaces  

All magnitudes normalized to `[0,1]`.

---

## 5. Inter‑Operator Dependencies  

### **Upstream**
- OpenGPU substrate  
- OpenGPU rendering  
- OpenGPU execution  

### **Downstream**
- RTT/3 topology engine  
- RTT/12 meta‑engine  

The GPU Stack Operator is a **pre‑stage** for all RTT/2 operators.

---

## 6. Error Handling  

Errors must use GPU‑specific codes:

| Code     | Meaning |
|----------|---------|
| GS‑001   | Missing substrate section |
| GS‑002   | Missing rendering section |
| GS‑003   | Missing execution section |
| GS‑004   | Invalid substrate node or edge |
| GS‑005   | Invalid rendering primitive or path |
| GS‑006   | Invalid execution unit or overlay |
| GS‑007   | Normalization failure |
| GS‑008   | Internal GPU stack error |

Errors must be returned in RTT/2 worker format:

```json
{
  "ok": false,
  "error": "GS-001: Missing substrate section"
}
```

---

## 7. Determinism Requirements  

The GPU Stack Operator must be fully deterministic:

- same input → same output  
- no randomness  
- no time‑dependent behavior  
- no external calls  

This is required for RTT/3 ingestion.

---

## 8. Versioning  

**Protocol Version:** `2026.1`  
Matches RTT/2 engine, schema, and operator versions.

---

## 9. File Locations  

```
src/gpu/gpu-stack.js
src/gpu/gpu-substrate-adapter.js
src/gpu/gpu-rendering-drift-adapter.js
src/gpu/gpu-execution-coherence-adapter.js

engine/gpu-stack.md
engine/gpu-substrate-adapter.md
engine/gpu-rendering-drift-adapter.md
engine/gpu-execution-coherence-adapter.md

docs/gpu-stack-protocol.md   ← this file
api/gpu-stack.schema.json
```
