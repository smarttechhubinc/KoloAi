"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import FloatingAI from "./FloatingAI";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#f8f9ff",
        color: "#0b1c30",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "280px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          flex: 1,
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </main>
      <FloatingAI />
    </div>
  );
}