# **RTT/2 — Coherence Geometry Protocol**  
### *docs/coherence-geometry-protocol.md*  
  [github.com](https://github.com/umaywant2/rtt2/edit/main/docs/coherence-geometry-protocol.md)

## 1. Purpose  
The **Coherence Geometry Protocol** defines how RTT/2 computes, validates, and exchanges coherence‑geometry data across the S/E/R regime model. It specifies:

- Required inputs  
- Allowed transformations  
- Output guarantees  
- Inter‑operator dependencies  
- Validation rules  
- Error conditions  
- Geometry‑level invariants  

This protocol ensures that coherence geometry is **consistent**, **deterministic**, and **interoperable** across RTT/2 and RTT/3.

---

## 2. Inputs

### 2.1 Required Inputs  
The operator consumes two upstream RTT/2 outputs:

#### **regimeMap**  
From `/regime-map`  
Must contain:

- `weights` (S, E, R)  
- `transitions[]`  
- `intersections[]`  

#### **driftScan**  
From `/drift-scan`  
Must contain:

- `vectors.structural[]`  
- `vectors.energetic[]`  
- `vectors.resonant[]`  
- `vectors.cross[]`  
- `fields[]`  

### 2.2 Input Validation Rules  
- All regime labels must be one of: `"S"`, `"E"`, `"R"`.  
- All drift vectors must include `from`, `to`, and `magnitude`.  
- All surfaces must include `label` and `regimes[]`.  
- Missing fields must be treated as empty arrays, not errors.  
- Null inputs must be rejected with protocol error `CG‑001`.

---

## 3. Output Specification

The operator must produce:

```json
{
  "alignment": [],
  "stability": [],
  "drift": [],
  "surfaces": []
}
```

### 3.1 Alignment  
Vectors representing coherence alignment between regimes.

### 3.2 Stability  
Gradients representing stability tendencies across regime boundaries.

### 3.3 Drift  
All drift vectors imported from drift‑scan, normalized into coherence‑geometry format.

### 3.4 Surfaces  
Coherence surfaces representing intersections of regimes.

---

## 4. Processing Rules

### 4.1 Alignment Computation  
Alignment vectors must be derived from:

- regime transitions  
- drift directionality  
- intersection adjacency  

Alignment must satisfy:

- `alignment[i].from != alignment[i].to`  
- Magnitude must be normalized to `[0,1]` if provided.

### 4.2 Stability Computation  
Stability gradients must be computed from:

- regime weights  
- transition weights  
- drift magnitudes  

Stability must satisfy:

- Stability is directional.  
- Stability must not exceed the maximum drift magnitude.

### 4.3 Drift Integration  
All drift vectors from drift‑scan must be merged into a single array:

Order:

1. structural  
2. energetic  
3. resonant  
4. cross  

### 4.4 Surface Construction  
Surfaces must be constructed from:

- regime intersections  
- drift fields  
- alignment clusters  

Surfaces must satisfy:

- `surfaces[i].regimes.length >= 2`  
- Labels must be human‑readable.

---

## 5. Inter‑Operator Dependencies

### 5.1 Upstream  
- **Regime Map** → structural topology  
- **Drift Scan** → drift vectors + drift fields  

### 5.2 Downstream  
- **RTT/3 Topology Engine**  
- **RTT/2 Diagnostic Overlays**  
- **RTT/12 Multi‑Regime Geometry**

Coherence geometry is the **final stage** of the RTT/2 pipeline.

---

## 6. Error Codes

| Code     | Meaning |
|----------|---------|
| CG‑001   | Missing or null input object |
| CG‑002   | Invalid regime label |
| CG‑003   | Drift vector missing required fields |
| CG‑004   | Surface missing required fields |
| CG‑005   | Internal geometry construction error |

Errors must be returned in the worker response:

```json
{
  "ok": false,
  "error": "CG-001: Missing input"
}
```

---

## 7. Determinism Requirements

The operator must be **fully deterministic**:

- Same input → same output  
- No randomness  
- No external calls  
- No time‑dependent behavior  

This is required for RTT/3 topology ingestion.

---

## 8. Versioning

**Protocol Version:** `2026.1`  
Matches RTT/2 engine versioning.

---

## 9. File Locations

```
engine/coherence-geometry.md
src/coherence/coherence-geometry.js
src/coherence/coherence-geometry.graph.js
src/coherence/coherence-geometry.worker.js
src/coherence/coherence-geometry.openapi.yaml
src/coherence/coherence-geometry.schema.json
src/tests/coherence.test.json
docs/coherence-geometry-protocol.md   ← this file
```
