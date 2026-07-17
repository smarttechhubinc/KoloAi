"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "groups", label: "My Groups", href: "/groups" },
    { icon: "psychology", label: "Treasurer AI", href: "/treasurer" },
    {
      icon: "account_balance_wallet",
      label: "Payments",
      href: "/payments",
    },
    { icon: "settings", label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        width: collapsed ? "80px" : "280px",
        backgroundColor: "#213145",
        display: "flex",
        flexDirection: "column",
        padding: collapsed ? "24px 12px" : "24px 16px",
        gap: "8px",
        zIndex: 50,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
    >
      {/* Logo + Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0" : "0 16px",
          marginBottom: "40px",
          minHeight: "48px",
        }}
      >
        {!collapsed && (
          <div>
            <h1
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-0.01em",
                fontWeight: 900,
                fontFamily: "'Inter', sans-serif",
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              SaveCircle AI
            </h1>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                fontWeight: 500,
                fontFamily: "'Geist', sans-serif",
                color: "rgba(211, 228, 254, 0.7)",
                whiteSpace: "nowrap",
              }}
            >
              Institutional Wealth
            </p>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#006b2c",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                color: "#ffffff",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              savings
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundColor: "rgba(211, 228, 254, 0.1)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d3e4fe",
            transition: "background-color 0.2s",
            flexShrink: 0,
            marginLeft: collapsed ? 0 : "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(211, 228, 254, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(211, 228, 254, 0.1)";
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "20px",
              transition: "transform 0.3s",
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {collapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: collapsed ? "0" : "16px",
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "12px" : "12px 24px",
                borderRadius: "8px",
                fontWeight: isActive ? 700 : 400,
                transition: "all 0.2s",
                textDecoration: "none",
                backgroundColor: isActive ? "#00873a" : "transparent",
                color: isActive ? "#f7fff2" : "#d3e4fe",
                transform: isActive ? "translateX(4px)" : "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor =
                    "rgba(63, 70, 92, 0.5)";
                  e.currentTarget.style.color = "#eaf1ff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#d3e4fe";
                }
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "22px", flexShrink: 0 }}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.01em",
                    fontWeight: 500,
                    fontFamily: "'Geist', sans-serif",
                    opacity: collapsed ? 0 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        style={{
          marginTop: "auto",
          padding: collapsed ? "0" : "0 16px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(211, 228, 254, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: collapsed ? "center" : "stretch",
        }}
      >
        {!collapsed ? (
          <>
            <button
              style={{
                width: "100%",
                backgroundColor: "#006b2c",
                color: "#ffffff",
                padding: "16px",
                borderRadius: "12px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                fontFamily: "'Geist', sans-serif",
                transition: "all 0.2s",
              }}
            >
              <span className="material-symbols-outlined">add</span>
              New Contribution
            </button>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "8px",
                backgroundColor: "rgba(211, 228, 254, 0.05)",
                borderRadius: "8px",
              }}
            >
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
                alt="Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD98sc4_zsOKM1zxUUqA1UWT-hb3DCKWZC2q8v6wosON1R3NoQuWCUUAS4AS8V8FRG3_JKIXlb59CJ7ZdhPsCnnb7yO4UJB0Qe6tEOKhuHy18mgEMrk7DhatgrAOTs2VY0jFryzf-nrjrtNhnrXSj1SEQpCgiHwQmONDzY4e1dzuJdh6UlcbG4A_ayvCjYotIr_rgA9xyuzJV9wPAmoYw0TCyimzWwCA813j2df2Mhtf8WYAq73aw9JTTk9FoqgkInYTE19VnlCKnyP"
              />
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0.01em",
                    fontWeight: 500,
                    fontFamily: "'Geist', sans-serif",
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Executive User
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#d3e4fe",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Premium Account
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#006b2c",
                color: "#ffffff",
                borderRadius: "12px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              title="New Contribution"
            >
              <span className="material-symbols-outlined">add</span>
            </button>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
                alt="Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD98sc4_zsOKM1zxUUqA1UWT-hb3DCKWZC2q8v6wosON1R3NoQuWCUUAS4AS8V8FRG3_JKIXlb59CJ7ZdhPsCnnb7yO4UJB0Qe6tEOKhuHy18mgEMrk7DhatgrAOTs2VY0jFryzf-nrjrtNhnrXSj1SEQpCgiHwQmONDzY4e1dzuJdh6UlcbG4A_ayvCjYotIr_rgA9xyuzJV9wPAmoYw0TCyimzWwCA813j2df2Mhtf8WYAq73aw9JTTk9FoqgkInYTE19VnlCKnyP"
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}