# **RTT/2 — Integration Notes**  
### *docs/integration-notes.md*

## 1. Overview  
RTT/2 introduces a three‑operator pipeline:

1. **Regime Map**  
2. **Drift Scan**  
3. **Coherence Geometry**

These operators form the structural, drift, and geometric foundation for RTT/3’s topology engine.  
This document explains how they integrate with each other and with upstream/downstream RTT systems.

---

## 2. Upstream Integration (RTT/1 → RTT/2)

RTT/2 consumes structural outputs from RTT/1:

- structural nodes  
- structural edges  
- contextual metadata  
- clarity/diagnostic geometry (optional)  

RTT/1 → RTT/2 integration rules:

- RTT/1 structural outputs must be normalized into the RTT/2 `input` object.  
- Missing RTT/1 fields must be treated as empty arrays.  
- RTT/1 geometry is optional; RTT/2 can operate without it.  
- RTT/1 regime labels must map cleanly to RTT/2’s S/E/R model.

---

## 3. RTT/2 Pipeline Integration

RTT/2 operators integrate in a strict pipeline:

### **Stage 1 — Regime Map**  
Produces:

- regime weights  
- regime transitions  
- regime intersections  

Consumed by:

- drift‑scan  
- coherence‑geometry  

---

### **Stage 2 — Drift Scan**  
Consumes:

- regime‑map  

Produces:

- structural drift  
- energetic drift  
- resonant drift  
- cross‑regime drift  
- drift fields  

Consumed by:

- coherence‑geometry  
- RTT/3 topology engine  

---

### **Stage 3 — Coherence Geometry**  
Consumes:

- regime‑map  
- drift‑scan  

Produces:

- alignment vectors  
- stability gradients  
- drift overlays  
- coherence surfaces  

Consumed by:

- RTT/3  
- RTT/12  
- RTT/2 diagnostic overlays  

---

## 4. Downstream Integration (RTT/2 → RTT/3)

RTT/3 consumes RTT/2 outputs:

- full coherence geometry  
- drift vectors  
- drift fields  
- regime topology  

RTT/3 integration rules:

- RTT/2 outputs must be deterministic.  
- No randomness or time‑dependent behavior.  
- All regime labels must be S/E/R.  
- Drift magnitudes must be normalized to `[0,1]`.  
- Surfaces must include human‑readable labels.  

---

## 5. Data Flow Summary

```
RTT/1 → RTT/2 (regime-map)
RTT/2 (regime-map) → RTT/2 (drift-scan)
RTT/2 (regime-map + drift-scan) → RTT/2 (coherence-geometry)
RTT/2 (coherence-geometry) → RTT/3 topology engine
```

---

## 6. Integration Guarantees

RTT/2 guarantees:

- deterministic outputs  
- stable pipeline order  
- consistent S/E/R regime model  
- schema‑validated structures  
- worker‑safe computation  
- graph‑compatible geometry  

---

## 7. Error Handling

Integration errors must use the operator‑specific codes:

- **RM‑*** for regime‑map  
- **DD‑*** for drift‑scan  
- **CG‑*** for coherence‑geometry  

Errors must be returned via worker responses:

```json
{
  "ok": false,
  "error": "RM-001: Missing input"
}
```

---

## 8. Versioning

**RTT/2 Version:** `2026.1`  
Matches all RTT/2 engine, schema, and protocol files.

---

## 9. File Locations

```
engine/rtt2_manifest.md
engine/regime-map.md
engine/drift-scan.md
engine/coherence-geometry.md

docs/regime-map-protocol.md
docs/drift-detection-protocol.md
docs/coherence-geometry-protocol.md
docs/integration-notes.md   ← this file
```
