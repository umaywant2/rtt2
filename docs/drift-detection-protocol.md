# **RTT/2 — Drift Detection Protocol**  
### *docs/drift-detection-protocol.md*

## 1. Purpose  
The **Drift Detection Protocol** defines how RTT/2 identifies, classifies, and validates drift across the **S / E / R** regime model. It governs:

- Structural drift  
- Energetic drift  
- Resonant drift  
- Cross‑regime drift  
- Drift fields  
- Normalization rules  
- Deterministic output guarantees  

This protocol ensures drift detection is **consistent**, **predictable**, and **interoperable** across RTT/2 and RTT/3.

---

## 2. Inputs

### 2.1 Required Input  
The operator consumes one upstream RTT/2 output:

#### **regimeMap**  
From `/regime-map`  
Must contain:

- `weights`  
- `transitions[]`  
- `intersections[]`  

### 2.2 Input Validation Rules  
- All regime labels must be `"S"`, `"E"`, or `"R"`.  
- All transitions must include `from`, `to`, and `weight`.  
- All intersections must include `label` and `regimes[]`.  
- Missing fields must be treated as empty arrays.  
- Null input must trigger protocol error `DD‑001`.

---

## 3. Drift Types

### 3.1 Structural Drift  
Drift induced by structural adjacency between regimes.

### 3.2 Energetic Drift  
Drift induced by energetic transitions.

### 3.3 Resonant Drift  
Drift induced by resonance between regimes.

### 3.4 Cross‑Regime Drift  
Drift across non‑adjacent regimes.

### 3.5 Drift Fields  
Directional surfaces representing drift flow across S/E/R.

---

## 4. Output Specification

The operator must produce:

```json
{
  "vectors": {
    "structural": [],
    "energetic": [],
    "resonant": [],
    "cross": []
  },
  "fields": []
}
```

### 4.1 Drift Vectors  
Each drift vector must include:

- `from`  
- `to`  
- `magnitude`  

Magnitude must be normalized to `[0,1]`.

### 4.2 Drift Fields  
Each field must include:

- `label`  
- `regimes[]`  
- `direction`  

Direction must be a valid S/E/R path (e.g., `"SE"`, `"ER"`).

---

## 5. Detection Rules

### 5.1 Structural Drift Detection  
Structural drift is detected when:

- A structural transition exists  
- Weight exceeds threshold `T_s`  
- Regimes are adjacent  

### 5.2 Energetic Drift Detection  
Energetic drift is detected when:

- Transition weight exceeds energetic threshold `T_e`  
- Drift direction matches energy flow  

### 5.3 Resonant Drift Detection  
Resonant drift is detected when:

- Regimes share resonance conditions  
- Drift magnitude exceeds resonance threshold `T_r`  

### 5.4 Cross‑Regime Drift Detection  
Cross drift is detected when:

- Regimes are non‑adjacent  
- Drift magnitude exceeds cross threshold `T_c`  

### 5.5 Drift Field Construction  
Fields must be constructed from:

- regime intersections  
- drift vector clusters  
- directional coherence  

---

## 6. Inter‑Operator Dependencies

### 6.1 Upstream  
- **Regime Map** → structural topology  

### 6.2 Downstream  
- **Coherence Geometry** → drift overlays  
- **RTT/3 Topology Engine** → drift topology  
- **RTT/12 Multi‑Regime Drift Engine**

Drift detection is the **second stage** of the RTT/2 pipeline.

---

## 7. Error Codes

| Code     | Meaning |
|----------|---------|
| DD‑001   | Missing or null input object |
| DD‑002   | Invalid regime label |
| DD‑003   | Transition missing required fields |
| DD‑004   | Drift vector missing required fields |
| DD‑005   | Drift field missing required fields |
| DD‑006   | Internal drift computation error |

Errors must be returned in the worker response:

```json
{
  "ok": false,
  "error": "DD-001: Missing input"
}
```

---

## 8. Determinism Requirements

The operator must be **fully deterministic**:

- Same input → same output  
- No randomness  
- No external calls  
- No time‑dependent behavior  

This is required for RTT/3 ingestion.

---

## 9. Versioning

**Protocol Version:** `2026.1`  
Matches RTT/2 engine versioning.

---

## 10. File Locations

```
engine/drift-scan.md
src/drift/drift-scan.js
src/drift/drift-scan.graph.js
src/drift/drift-scan.worker.js
src/drift/drift-scan.openapi.yaml
src/drift/drift-scan.schema.json
src/tests/drift.test.json
docs/drift-detection-protocol.md   ← this file
```
