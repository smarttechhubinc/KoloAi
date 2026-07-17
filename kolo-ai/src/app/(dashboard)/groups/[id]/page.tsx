"use client";

import { useParams } from "next/navigation";

export default function GroupDetailPage() {
  const { id } = useParams();

  return (
    <>
      <TopHeader />
      <KPISection />
      <MainGrid />
    </>
  );
}

/* ===========================
   TOP HEADER
   =========================== */
function TopHeader() {
  return (
    <header
      style={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: "rgba(248, 249, 255, 0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(189, 202, 186, 0.3)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        marginBottom: "24px",
        marginLeft: "-24px",
        marginRight: "-24px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 0",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h2
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "-0.01em",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              color: "#006b2c",
            }}
          >
            Lagos Investment Circle
          </h2>
          <span
            style={{
              backgroundColor: "rgba(130, 81, 0, 0.1)",
              color: "#825100",
              padding: "4px 16px",
              borderRadius: "9999px",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.03em",
              fontWeight: 600,
              fontFamily: "'Geist', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Premium Tier
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ position: "relative" }}>
            <span
              className="material-symbols-outlined"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6e7b6c",
              }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search activities..."
              style={{
                padding: "8px 24px 8px 48px",
                backgroundColor: "#eff4ff",
                border: "none",
                borderRadius: "9999px",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                fontWeight: 500,
                fontFamily: "'Geist', sans-serif",
                outline: "none",
                width: "256px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              padding: "8px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "#3e4a3d",
            }}
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            style={{
              padding: "8px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "#3e4a3d",
            }}
          >
            <span className="material-symbols-outlined">help</span>
          </button>
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(189, 202, 186, 0.3)",
            }}
            alt="Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAgkpe5fuiIHhciMzpc9H4Sw2aQl3XHek9HIZhHL9p75TXWAIFphJjjchwNp9mkIouwY1h3bCd0h_zsz-TwwGvQgn35PLBRrnqRog3oZ8TtBrrzu3_vjroEVNM0adC8G5-C3k-FDiTCWrJPFq1FhLV0877_wU3SQbWL3QCQ5vKCQGddl_85UxUM9tcHwqPPn8J1JHtp7sHwIlPiv3vurYzdLuKzhjZERFK6dwIPM9crqe1kq0sBvHGFbyCAzGtHiHbf7a3yL7tnz2X"
          />
        </div>
      </div>
    </header>
  );
}

/* ===========================
   KPI SECTION
   =========================== */
function KPISection() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
        marginBottom: "24px",
      }}
    >
      {[
        {
          label: "Total Pooled",
          value: "₦12,450,000",
          change: "+12.5% vs last cycle",
          trend: "trending_up",
          large: true,
        },
        {
          label: "Next Payout Date",
          value: "Oct 28, 2023",
          change: "To: Tunde Adeniyi",
          trend: "",
          large: false,
        },
        {
          label: "Current Cycle Members",
          value: "18 / 20",
          change: "",
          trend: "",
          large: false,
          progress: 90,
        },
        {
          label: "Financial Health",
          value: "85%",
          change: "Stable Liquidity",
          trend: "",
          large: false,
          gauge: 85,
        },
      ].map((kpi) => (
        <div
          key={kpi.label}
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0.01em",
              fontWeight: 500,
              fontFamily: "'Geist', sans-serif",
              color: "#3e4a3d",
              marginBottom: "8px",
            }}
          >
            {kpi.label}
          </p>
          {kpi.gauge ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "96px",
                  height: "96px",
                  marginTop: "8px",
                }}
              >
                <svg
                  width="96"
                  height="96"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="#dce9ff"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="#006b2c"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="37.6"
                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                  />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    lineHeight: "32px",
                    letterSpacing: "-0.01em",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    color: "#0b1c30",
                  }}
                >
                  85%
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0.03em",
                  fontWeight: 600,
                  fontFamily: "'Geist', sans-serif",
                  color: "#006b2c",
                  marginTop: "16px",
                }}
              >
                Stable Liquidity
              </p>
            </div>
          ) : (
            <>
              <h3
                style={{
                  fontSize: kpi.large ? "32px" : "24px",
                  lineHeight: kpi.large ? "40px" : "32px",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: kpi.large ? "#006b2c" : "#0b1c30",
                }}
              >
                {kpi.value}
              </h3>
              {kpi.progress && (
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#dce9ff",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    marginTop: "24px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${kpi.progress}%`,
                      backgroundColor: "#006b2c",
                    }}
                  />
                </div>
              )}
              {kpi.change && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: kpi.trend ? "#006b2c" : "#6e7b6c",
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0.03em",
                    fontWeight: 600,
                    fontFamily: "'Geist', sans-serif",
                    marginTop: "24px",
                  }}
                >
                  {kpi.trend && (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      {kpi.trend}
                    </span>
                  )}
                  <span>{kpi.change}</span>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </section>
  );
}

/* ===========================
   MAIN GRID
   =========================== */
function MainGrid() {
  const members = [
    {
      name: "Chioma Okeke",
      amount: "₦500,000",
      status: "Paid",
      statusColor: "#006b2c",
      score: 782,
      scoreWidth: 80,
      scoreColor: "#006b2c",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNC2HPe5OO4z_26K01sTHGAH1fTRhlLZIlBzIf1tLgyfSrS1PjtdQlsSW3Zot8iJEGyIaNpSc-VEBF_4vgsSWIn-WJm5aqCp6IUA7XtU-_r8n_mwKB6ylmrXnuuZaeq96fqputhZUoGICYNU6cbKNgYlYk3lotZHPS5vb_Dj-B6ThYetSGiiPy9TCKMRcglcn82COPt-Bw8zrWHuun3lbnVfPxk6EcSW9BvJn3nSKpxzxJFvADxqn9CECOSzDyBGeKmInin06VJENN",
    },
    {
      name: "Babajide Sanwo",
      amount: "₦500,000",
      status: "Pending",
      statusColor: "#825100",
      score: 715,
      scoreWidth: 70,
      scoreColor: "#825100",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM95r0AENnYvPzlHllh6cTskhKTYfapAF4VdZSpd41qPRcoNuwtmKBzBeOZFp1anVOdPyEIhf6bZ-HAeP8wUpJQBfDgDnSYG05D3LLLzLo3oFqHAyWG8vChCRGIkSpPxzMkzhvPb8htF3wRdf0VBbUN7zbvza5BJ2ag8cz54DoDd-DSFkVdWyPZ7OwudC8odbYDbuG51FR8m5D6LHbxZCEE90eXk3eFNcVL-lRSQYMDRjeC_hQDqOg0og-DF1QVump0hejpy1RSDUj",
    },
    {
      name: "Ayo Dele",
      amount: "₦500,000",
      status: "Late",
      statusColor: "#ba1a1a",
      score: 640,
      scoreWidth: 40,
      scoreColor: "#ba1a1a",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6hvEDn25xY0FIErGGlQTY2TvCZkj5-nqhDNfqY2TJ1g-aAY3dsZK_FmBo1UQUxqw0B46izFuDRzmmUVhktc6Y5lKPOTj-OBGjm4puHx4TD1M5jB48DWxPq2eGPms4fDn6ha_i3phVmSy3qeo-EwGgHB-6AGXJh_6koX6TA_wzc1QCdZpnsGQ5caXXSjwaXC2pLcWRssZ2ziHkewRunjZc1_70FMpR8iREvUuZ5jZf_ls4SmEQGCbvjXTS72dRfoXITgkkJmiIIcNf",
    },
  ];

  const timeline = [
    {
      title: "Pool Disbursement",
      date: "Sept 28, 2023 • Paid to Ifeoma A.",
      complete: true,
      current: false,
    },
    {
      title: "Oct Contributions Open",
      date: "Oct 01, 2023 • Ongoing",
      complete: false,
      current: true,
    },
    {
      title: "Contribution Deadline",
      date: "Oct 25, 2023 • 8 days left",
      complete: false,
      current: false,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
      }}
    >
      {/* Left: Member Table + Documents */}
      <div
        style={{
          gridColumn: "span 2",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Member Table */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid rgba(189, 202, 186, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-0.01em",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Member Contributions
            </h4>
            <button
              style={{
                color: "#006b2c",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                fontWeight: 500,
                fontFamily: "'Geist', sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                textAlign: "left",
                borderCollapse: "collapse",
              }}
            >
              <thead
                style={{
                  backgroundColor: "#eff4ff",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.01em",
                  fontWeight: 500,
                  fontFamily: "'Geist', sans-serif",
                  color: "#3e4a3d",
                }}
              >
                <tr>
                  <th style={{ padding: "16px 24px" }}>Member</th>
                  <th style={{ padding: "16px 24px" }}>Contribution</th>
                  <th style={{ padding: "16px 24px" }}>Status</th>
                  <th style={{ padding: "16px 24px" }}>Credit Score</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr
                    key={m.name}
                    style={{
                      borderBottom: "1px solid rgba(189, 202, 186, 0.2)",
                      transition: "background-color 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#eff4ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "#dae2fd",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt={m.name}
                            src={m.img}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.01em",
                            fontWeight: 500,
                            fontFamily: "'Geist', sans-serif",
                          }}
                        >
                          {m.name}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "0.01em",
                        fontWeight: 500,
                        fontFamily: "'Geist', sans-serif",
                      }}
                    >
                      {m.amount}
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <span
                        style={{
                          padding: "4px 16px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          lineHeight: "16px",
                          letterSpacing: "0.03em",
                          fontWeight: 600,
                          fontFamily: "'Geist', sans-serif",
                          backgroundColor: `${m.statusColor}10`,
                          color: m.statusColor,
                        }}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.01em",
                            fontWeight: 500,
                            fontFamily: "'Geist', sans-serif",
                            color: "#0b1c30",
                          }}
                        >
                          {m.score}
                        </span>
                        <div
                          style={{
                            width: "64px",
                            height: "6px",
                            backgroundColor: "#e5eeff",
                            borderRadius: "9999px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${m.scoreWidth}%`,
                              backgroundColor: m.scoreColor,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "#006b2c" }}
              >
                description
              </span>
              <h4
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.01em",
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Group Bylaws
              </h4>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Investment_Bylaws_v2.pdf",
                "Emergency_Exit_Rules.pdf",
              ].map((file) => (
                <li
                  key={file}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "8px 0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "0.01em",
                      fontWeight: 500,
                      fontFamily: "'Geist', sans-serif",
                      color: "#3e4a3d",
                      transition: "color 0.2s",
                    }}
                  >
                    {file}
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#6e7b6c" }}
                  >
                    download
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "#006b2c" }}
              >
                gavel
              </span>
              <h4
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.01em",
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Loan Terms
              </h4>
            </div>
            <div
              style={{
                backgroundColor: "#eff4ff",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid rgba(189, 202, 186, 0.3)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "0.03em",
                  fontWeight: 600,
                  fontFamily: "'Geist', sans-serif",
                  color: "#3e4a3d",
                  fontStyle: "italic",
                }}
              >
                &quot;All loans must be repaid with a 5% interest rate to the
                group pool within 90 days of disbursement.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Quick Pay + AI + Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Quick Pay */}
        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            backgroundColor: "#0b1c30",
            color: "#f8f9ff",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "160px",
              height: "160px",
              backgroundColor: "rgba(0, 107, 44, 0.2)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />
          <div style={{ position: "relative", zIndex: 10 }}>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                fontWeight: 500,
                fontFamily: "'Geist', sans-serif",
                opacity: 0.8,
                marginBottom: "8px",
              }}
            >
              Your Contribution
            </p>
            <h3
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-0.01em",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                color: "#62df7d",
              }}
            >
              ₦500,000.00
            </h3>
          </div>
          <button
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#006b2c",
              color: "#ffffff",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "0.01em",
              fontFamily: "'Geist', sans-serif",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              position: "relative",
              zIndex: 10,
              transition: "all 0.2s",
            }}
          >
            <span className="material-symbols-outlined">bolt</span>
            Monnify Quick-Pay
          </button>
        </div>

        {/* AI Insight */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 107, 44, 0.1)",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            borderRadius: "12px",
            padding: "24px",
            backgroundImage:
              "linear-gradient(135deg, rgba(0, 107, 44, 0.05) 0%, rgba(130, 81, 0, 0.05) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
              color: "#006b2c",
            }}
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <h4
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0.01em",
                fontWeight: 700,
                fontFamily: "'Geist', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              AI Treasurer Insight
            </h4>
          </div>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#3e4a3d",
              lineHeight: 1.6,
            }}
          >
            Current liquidity is{" "}
            <span style={{ color: "#006b2c", fontWeight: 700 }}>Optimal</span>.
            The group is on track for the October payout. However, note that 2
            members are still pending for this cycle. If payments aren&apos;t
            received by the 25th, the reserve pool will be utilized to guarantee
            the scheduled payout.
          </p>
        </div>

        {/* Timeline */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h4
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              letterSpacing: "-0.01em",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              marginBottom: "24px",
            }}
          >
            Timeline
          </h4>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "11px",
                top: "8px",
                bottom: "8px",
                width: "2px",
                backgroundColor: "rgba(189, 202, 186, 0.3)",
              }}
            />
            {timeline.map((item, i) => (
              <div
                key={item.title}
                style={{ position: "relative", paddingLeft: "40px" }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "4px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: item.complete
                      ? "#006b2c"
                      : item.current
                      ? "#7ffc97"
                      : "#e5eeff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "4px solid #f8f9ff",
                  }}
                >
                  {item.complete ? (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "12px",
                        color: "#ffffff",
                      }}
                    >
                      check
                    </span>
                  ) : item.current ? (
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "12px",
                        color: "#006b2c",
                      }}
                    >
                      schedule
                    </span>
                  ) : (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#6e7b6c",
                      }}
                    />
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "0.01em",
                      fontWeight: 500,
                      fontFamily: "'Geist', sans-serif",
                      color: item.complete || item.current ? "#0b1c30" : "#6e7b6c",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "0.03em",
                      fontWeight: 600,
                      fontFamily: "'Geist', sans-serif",
                      color: "#6e7b6c",
                    }}
                  >
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}