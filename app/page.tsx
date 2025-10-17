"use client";
import { useState } from "react";

export default function Home() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!jd.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const data = await res.json();
      setResult(data.analysis || data.error || "No result");
    } catch (e: any) {
      setResult(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: "0 16px", fontFamily: "ui-sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>💼 JobMatch (MVP)</h1>
      <p style={{ color: "#555", marginBottom: 16 }}>
        Paste any LinkedIn job description below and I’ll rank your match against your resume.
      </p>

      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Job Description</label>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={10}
        placeholder="Paste the JD text from LinkedIn here…"
        style={{
          width: "100%",
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
          fontFamily: "ui-monospace",
          marginBottom: 12,
        }}
      />

      <button
        onClick={analyze}
        disabled={loading}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #111",
          background: loading ? "#eee" : "#111",
          color: loading ? "#111" : "#fff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Analyzing…" : "Analyze Fit"}
      </button>

      {result && (
        <pre
          style={{
            background: "#fafafa",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 16,
            marginTop: 20,
            whiteSpace: "pre-wrap",
          }}
        >
{result}
        </pre>
      )}

      <div style={{ marginTop: 28, fontSize: 12, color: "#777" }}>
        Resume source: <a href="/resume.pdf" target="_blank">/resume.pdf</a>
      </div>
    </main>
  );
}
