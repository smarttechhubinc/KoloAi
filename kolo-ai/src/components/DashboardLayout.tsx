
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
        className="dashboard-main"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          flex: 1,
          width: "100%",
          marginLeft: "0px",
        }}
      >
        {children}
      </main>
      <FloatingAI />

      {/* Responsive margin — only on desktop */}
      <style jsx>{`
        @media (min-width: 1025px) {
          .dashboard-main {
            margin-left: ${sidebarCollapsed ? "80px" : "280px"} !important;
            transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
        @media (max-width: 1024px) {
          .dashboard-main {
            margin-left: 0 !important;
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import FloatingAI from "./FloatingAI";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   return (
//     <div
//       style={{
//         backgroundColor: "#f8f9ff",
//         color: "#0b1c30",
//         fontFamily: "'Inter', sans-serif",
//         minHeight: "100vh",
//         display: "flex",
//       }}
//     >
//       <Sidebar
//         collapsed={sidebarCollapsed}
//         onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
//       />
//       <main
//         style={{
//           marginLeft: sidebarCollapsed ? "80px" : "280px",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           padding: "24px",
//           flex: 1,
//           transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         }}
//       >
//         {children}
//       </main>
//       <FloatingAI />
//     </div>
//   );
// }