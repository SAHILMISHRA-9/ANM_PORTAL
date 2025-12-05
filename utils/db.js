// utils/db.js
// Temporary in-memory DB shim to avoid installing mysql2.
// Acts like mysql2/promise pool with `await db.query(sql, params)` returning [rows].
// Replace with a real DB later.

const now = () => new Date().toISOString();

// Seed sample health_records (add more as you need)
const health_records = [
  {
    id: 1,
    phc_id: 1,
    family_id: 101,
    member_id: 1001,
    member_name: "Sita Devi",
    case_type: "ANC",
    anm_id: 11,
    asha_id: 21,
    area_id: 301,
    created_at: now(),
    data_json: {
      risk_level: "high",
      category: "pregnancy",
      risk_reason: "Severe anemia (Hb 6.2 g/dL), BP 150/100"
    }
  },
  {
    id: 2,
    phc_id: 1,
    family_id: 102,
    member_id: 1002,
    member_name: "Raju Kumar",
    case_type: "Child",
    anm_id: 12,
    asha_id: 22,
    area_id: 302,
    created_at: now(),
    data_json: {
      risk_level: "high",
      category: "child",
      risk_reason: "MUAC 10.8 cm (severe malnutrition)"
    }
  },
  {
    id: 3,
    phc_id: 1,
    family_id: 103,
    member_id: 1003,
    member_name: "Mohit",
    case_type: "TB",
    anm_id: 13,
    asha_id: 23,
    area_id: 303,
    created_at: now(),
    data_json: {
      risk_level: "high",
      category: "tb",
      risk_reason: "Cough > 3 weeks, weight loss"
    }
  },
  {
    id: 4,
    phc_id: 1,
    family_id: 104,
    member_id: 1004,
    member_name: "Radha",
    case_type: "NCD",
    anm_id: 11,
    asha_id: 21,
    area_id: 301,
    created_at: now(),
    data_json: {
      risk_level: "emergency",
      category: "ncd",
      risk_reason: "BP 200/120, immediate referral"
    }
  }
];

// Simple helper to deep-clone rows when returning
function cloneRows(rows) {
  return rows.map(r => JSON.parse(JSON.stringify(r)));
}

export default {
  // Emulates mysql2/promise .query(sql, params) => returns [rows]
  query: async (sql = "", params = []) => {
    // Normalize sql for simple detection
    const s = String(sql).toLowerCase();

    // If querying health_records (high-risk endpoint)
    if (s.includes("from health_records")) {
      // If query asks for id = ? (single record)
      if (s.includes("where") && (s.includes("id = ?") || s.includes("hr.id = ?"))) {
        const idParam = params && params.length ? params[0] : null;
        const row = health_records.find(r => Number(r.id) === Number(idParam));
        return [row ? [cloneRows([row])[0]] : []].map(x => (Array.isArray(x) ? x : []))[0] ? [[row]] : [[row]].slice(0,1);
      }

      // If query filters by phc_id param
      let phc_id = params && params.length ? Number(params[0]) : null;

      // Filter records with risk_level = 'high' in data_json OR 'emergency'
      let rows = health_records.filter(r =>
        (r.data_json && (r.data_json.risk_level === "high" || r.data_json.risk_level === "emergency")) &&
        (phc_id ? Number(r.phc_id) === phc_id : true)
      );

      return [cloneRows(rows), undefined].slice(0,1);
    }

    // Generic fallback: if sql requests by id from health_records via param
    if (s.includes("where id =") || s.includes("where hr.id =")) {
      const idParam = params && params.length ? params[0] : null;
      const row = health_records.find(r => Number(r.id) === Number(idParam));
      return [[ ...(row ? [cloneRows([row])[0]] : []) ]];
    }

    // Default: return empty array
    return [[]];
  }
};
