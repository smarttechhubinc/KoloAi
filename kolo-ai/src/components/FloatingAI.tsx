"use client";

import { useState } from "react";

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 100,
      }}
    >
      {/* Chat Bubble */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: 0,
            backgroundColor: "#0b1c30",
            color: "#f8f9ff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            width: "256px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0.01em",
              fontWeight: 700,
              fontFamily: "'Geist', sans-serif",
              marginBottom: "8px",
            }}
          >
            I&apos;m Treasurer AI
          </p>
          <p style={{ fontSize: "12px", opacity: 0.8, marginBottom: "16px" }}>
            I can help you analyze your portfolio or initiate group
            disbursements. What&apos;s on your mind?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "#f8f9ff",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "11px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Analyze loan defaults
            </button>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "#f8f9ff",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "11px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Generate monthly report
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "56px",
          height: "56px",
          backgroundColor: "#006b2c",
          color: "#ffffff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          boxShadow:
            "0 20px 25px -5px rgba(0, 107, 44, 0.2), 0 10px 10px -5px rgba(0, 107, 44, 0.1)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "28px", position: "relative", zIndex: 10 }}
        >
          {isOpen ? "close" : "psychology"}
        </span>
        {!isOpen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              animation: "pulse 2s infinite",
            }}
          />
        )}
      </button>
    </div>
  );
}