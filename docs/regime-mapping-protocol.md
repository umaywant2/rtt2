# **RTT/2 — Regime Mapping Protocol**  
### *docs/regime-mapping-protocol.md*  

## 1. Purpose  
The **Regime Mapping Protocol** defines how RTT/2 constructs, validates, and exchanges structural regime topology across the **S / E / R** model. It governs:

- regime weight computation  
- regime transition construction  
- regime intersection detection  
- structural normalization  
- deterministic output guarantees  

This protocol ensures regime mapping is **consistent**, **predictable**, and **interoperable** across RTT/2 and RTT/3.

---

## 2. Inputs

### 2.1 Required Input  
The operator consumes a single upstream object:

#### **input**  
Raw structural or contextual data from RTT/1 or RTT/2 upstream modules.

Must contain:

- structural nodes  
- structural edges  
- contextual metadata  

### 2.2 Input Validation Rules  
- All regime labels must be `"S"`, `"E"`, or `"R"`.  
- All edges must include `from`, `to`, and `weight`.  
- All nodes must be unique.  
- Missing fields must be treated as empty arrays.  
- Null input must trigger protocol error `RM‑001`.

---

## 3. Output Specification

The operator must produce:

```json
{
  "weights": {},
  "transitions": [],
  "intersections": []
}
```

### 3.1 Weights  
Each regime must receive a computed weight based on:

- structural density  
- transition frequency  
- contextual metadata  

Weights must be normalized to `[0,1]`.

### 3.2 Transitions  
Each transition must include:

- `from`  
- `to`  
- `weight`  

Transitions must be directional.

### 3.3 Intersections  
Each intersection must include:

- `label`  
- `regimes[]`  

Intersections represent structural overlaps between regimes.

---

## 4. Mapping Rules

### 4.1 Weight Computation  
Weights must be derived from:

- node frequency  
- edge density  
- contextual metadata  

Weight invariants:

- `S + E + R = 1`  
- No weight may be negative.  
- Missing regimes must be assigned weight `0`.

### 4.2 Transition Construction  
Transitions must be constructed from:

- structural edges  
- contextual directionality  

Transition invariants:

- `from != to`  
- weight must be normalized to `[0,1]`  
- transitions must be deterministic  

### 4.3 Intersection Detection  
Intersections must be detected from:

- overlapping structural nodes  
- shared contextual metadata  
- adjacency clusters  

Intersection invariants:

- at least two regimes per intersection  
- labels must be human‑readable  

---

## 5. Inter‑Operator Dependencies

### 5.1 Upstream  
- **RTT/1 structural outputs**  
- **RTT/2 contextual modules**  

### 5.2 Downstream  
- **Drift Scan** → drift vectors  
- **Coherence Geometry** → alignment, stability, surfaces  
- **RTT/3 Topology Engine** → structural topology  

Regime mapping is the **first stage** of the RTT/2 pipeline.

---

## 6. Error Codes

| Code     | Meaning |
|----------|---------|
| RM‑001   | Missing or null input object |
| RM‑002   | Invalid regime label |
| RM‑003   | Transition missing required fields |
| RM‑004   | Intersection missing required fields |
| RM‑005   | Weight computation error |
| RM‑006   | Internal mapping error |

Errors must be returned in the worker response:

```json
{
  "ok": false,
  "error": "RM-001: Missing input"
}
```

---

## 7. Determinism Requirements

The operator must be **fully deterministic**:

- Same input → same output  
- No randomness  
- No external calls  
- No time‑dependent behavior  

This is required for RTT/3 ingestion.

---

## 8. Versioning

**Protocol Version:** `2026.1`  
Matches RTT/2 engine versioning.

---

## 9. File Locations

```
engine/regime-map.md
src/regime/regime-map.js
src/regime/regime-map.graph.js
src/regime/regime-map.worker.js
src/regime/regime-map.openapi.yaml
src/regime/regime-map.schema.json
src/tests/regime.test.json
docs/regime-mapping-protocol.md   ← this file
```
