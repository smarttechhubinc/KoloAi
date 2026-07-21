
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type SettingsTab = "hub" | "profile";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("hub");
  const [fading, setFading] = useState(false);

  const switchTab = (tab: SettingsTab) => {
    if (tab === activeTab) return;
    setFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => setFading(false), 50);
    }, 200);
  };

  return (
    <div className="settings-layout" style={{ display: "flex", gap: "40px", maxWidth: "1100px", margin: "0 auto", alignItems: "flex-start" }}>
      {/* Left Sidebar — ALWAYS FIXED, NEVER MOVES */}
      <div className="settings-sidebar" style={{ width: "240px", flexShrink: 0, position: "sticky", top: "80px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h2 className="sidebar-title" style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "#0b1c30", marginBottom: "4px" }}>Settings</h2>
          <p style={{ color: "#3e4a3d", fontSize: "14px", lineHeight: 1.5 }}>Configure your wealth environment and security protocols.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { key: "hub" as SettingsTab, label: "Overview", icon: "dashboard", desc: "Settings hub & summaries" },
            { key: "profile" as SettingsTab, label: "Edit Profile", icon: "person", desc: "Personal & banking info" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => switchTab(tab.key)}
              style={{
                width: "100%", textAlign: "left", padding: "16px", borderRadius: "12px", border: "none", cursor: "pointer",
                backgroundColor: activeTab === tab.key ? "#ffffff" : "transparent",
                boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0, 0, 0, 0.06)" : "none",
                transition: "background-color 0.3s, box-shadow 0.3s",
                display: "flex", alignItems: "flex-start", gap: "12px",
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: "22px", color: activeTab === tab.key ? "#006b2c" : "#3e4a3d", marginTop: "2px" }}>{tab.icon}</span>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 600, fontFamily: "'Inter', sans-serif", color: activeTab === tab.key ? "#006b2c" : "#0b1c30", marginBottom: "2px" }}>{tab.label}</div>
                <div style={{ fontSize: "12px", color: "#6e7b6c", fontFamily: "'Geist', sans-serif" }}>{tab.desc}</div>
              </div>
              {activeTab === tab.key && <div style={{ marginLeft: "auto", width: "4px", height: "40px", backgroundColor: "#006b2c", borderRadius: "2px", alignSelf: "center" }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content — ONLY FADES, NEVER MOVES */}
      <div className="settings-content" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.2s ease" }}>
          {activeTab === "hub" && <SettingsHub onSwitchToProfile={() => switchTab("profile")} />}
          {activeTab === "profile" && <EditProfile />}
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .settings-layout { flex-direction: column !important; gap: 20px !important; }
          .settings-sidebar { width: 100% !important; position: static !important; top: auto !important; }
          .sidebar-title { font-size: 24px !important; }
        }
      `}</style>
    </div>
  );
}

/* ===================================================================
   SETTINGS HUB
   =================================================================== */
function SettingsHub({ onSwitchToProfile }: { onSwitchToProfile: () => void }) {
  const supabase = createClient();
  const [userData, setUserData] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalClosing, setModalClosing] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("full_name, created_at").eq("id", user.id).maybeSingle();
        setUserData({
          name: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
          email: user.email,
          memberSince: profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Recently",
        });
      }
    }
    fetchUser();
  }, [supabase]);

  const closeModal = () => { setModalClosing(true); setTimeout(() => { setActiveModal(null); setModalClosing(false); }, 200); };
  const getInitials = (n: string) => n?.split(" ").map((x: string) => x[0]).join("").toUpperCase().slice(0, 2) || "U";

  const cards = [
    { id: "security", icon: "shield_lock", title: "Security & Access", desc: "2FA, hardware keys, session management.", status: "Protected", color: "#006b2c", items: [{ l: "2FA", v: "Enabled", a: true },{ l: "Biometrics", v: "Off", a: false },{ l: "Sessions", v: "2 active", a: true }] },
    { id: "accounts", icon: "account_balance", title: "Linked Accounts", desc: "Bank accounts, wallets, APIs.", status: "4 Linked", color: "#825100", items: [{ l: "Wema/Monnify", v: "Connected", a: true },{ l: "GTBank", v: "Expired", a: false },{ l: "Access", v: "Connected", a: true }] },
    { id: "notifications", icon: "notifications_active", title: "Notifications", desc: "Alerts, pings, summaries.", status: "Active", color: "#565e74", items: [{ l: "Push", v: "On", a: true },{ l: "Email", v: "On", a: true },{ l: "SMS", v: "Off", a: false }] },
    { id: "preferences", icon: "tune", title: "Preferences", desc: "Currency, language, theme.", status: "NGN • WAT", color: "#3e4a3d", items: [{ l: "Currency", v: "NGN (₦)", a: true },{ l: "Language", v: "EN", a: true },{ l: "Theme", v: "Light", a: true }] },
    { id: "ai", icon: "psychology_alt", title: "AI Personalization", desc: "Risk appetite, reports.", status: "Moderate", color: "#006b2c", items: [{ l: "Risk", v: "Moderate", a: true },{ l: "Reports", v: "Weekly", a: true },{ l: "Learning", v: "Active", a: true }] },
    { id: "compliance", icon: "gavel", title: "Compliance", desc: "Privacy, data export.", status: "Compliant", color: "#ba1a1a", items: [{ l: "GDPR", v: "Yes", a: true },{ l: "Export", v: "Available", a: true },{ l: "Delete", v: "Request", a: true }] },
  ];

  return (
    <div>
      <div className="hub-top-row" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "20px", marginBottom: "24px" }}>
        <div className="hub-profile" style={{ gridColumn: "span 8", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "14px", padding: "24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#00873a", color: "#f7fff2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: 700, border: "4px solid #00873a", flexShrink: 0 }}>{getInitials(userData?.name || "U")}</div>
          <div style={{ flex: 1, minWidth: "150px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: 600 }}>{userData?.name || "User"}</h3>
            <p style={{ color: "#3e4a3d", fontSize: "13px", marginBottom: "10px", wordBreak: "break-all" }}>{userData?.email}</p>
            <button onClick={onSwitchToProfile} style={{ padding: "8px 18px", backgroundColor: "#0b1c30", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "13px", fontFamily: "'Geist', sans-serif" }}>Edit Profile</button>
          </div>
        </div>
        <div className="hub-plan" style={{ gridColumn: "span 4", background: "linear-gradient(135deg, #0b1c30, #1e3a5f)", color: "#fff", padding: "24px", borderRadius: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div><h3 style={{ fontSize: "18px", fontWeight: 600, color: "#62df7d", marginBottom: "10px" }}>Institutional Elite</h3><p style={{ fontSize: "13px", opacity: 0.7, lineHeight: 1.4 }}>Unlimited AI Treasurer • Multi-jurisdictional compliance</p></div>
          <button style={{ width: "100%", padding: "12px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#fff", fontWeight: 500, fontSize: "14px", cursor: "pointer", marginTop: "16px" }}>Manage Subscription</button>
        </div>
      </div>

      <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "32px" }}>
        {cards.map((c) => (
          <div key={c.id} onClick={() => setActiveModal(c.id)} className="card-item" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "14px", padding: "22px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: `${c.color}15`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}><span className="material-symbols-outlined" style={{ fontSize: "24px" }}>{c.icon}</span></div>
            <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>{c.title}</h4>
            <p className="card-desc" style={{ color: "#3e4a3d", fontSize: "13px", marginBottom: "14px" }}>{c.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(189,202,186,0.3)" }}><span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{c.status}</span><span className="material-symbols-outlined" style={{ color: "#3e4a3d", fontSize: "16px" }}>arrow_forward</span></div>
          </div>
        ))}
      </div>

      <div className="danger-zone" style={{ padding: "20px", border: "1px solid rgba(186,26,26,0.2)", borderRadius: "14px", backgroundColor: "rgba(186,26,26,0.05)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <div><h5 style={{ fontSize: "16px", fontWeight: 600, color: "#ba1a1a", marginBottom: "2px" }}>Termination Zone</h5><p style={{ fontSize: "13px", color: "rgba(147,0,10,0.7)" }}>Permanently delete your data.</p></div>
        <button style={{ padding: "10px 32px", backgroundColor: "#ba1a1a", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "13px", whiteSpace: "nowrap" }}>Deactivate</button>
      </div>

      {activeModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(11,28,48,0.5)", backdropFilter: "blur(4px)", padding: "24px", opacity: modalClosing ? 0 : 1, transition: "opacity 0.2s" }} onClick={closeModal}>
          <div className="modal-content" style={{ background: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "480px", width: "100%", maxHeight: "80vh", overflow: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", transform: modalClosing ? "scale(0.95)" : "scale(1)", transition: "transform 0.2s" }} onClick={(e) => e.stopPropagation()}>
            {(() => {
              const card = cards.find((x) => x.id === activeModal);
              if (!card) return null;
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: `${card.color}15`, color: card.color, display: "flex", alignItems: "center", justifyContent: "center" }}><span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{card.icon}</span></div><h3 style={{ fontSize: "18px", fontWeight: 600 }}>{card.title}</h3></div>
                    <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "#6e7b6c", padding: "4px" }}><span className="material-symbols-outlined">close</span></button>
                  </div>
                  {card.items.map((item: any, i: number) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < card.items.length - 1 ? "1px solid rgba(189,202,186,0.2)" : "none" }}>
                      <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.l}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: item.a ? "#006b2c" : "#6e7b6c", backgroundColor: item.a ? "rgba(0,107,44,0.08)" : "rgba(110,123,108,0.08)", padding: "4px 10px", borderRadius: "9999px" }}>{item.v}</span>
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hub-top-row { grid-template-columns: 1fr !important; }
          .hub-profile { grid-column: span 1 !important; }
          .hub-plan { grid-column: span 1 !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .card-desc { font-size: 12px !important; }
          .danger-zone { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 400px) {
          .hub-profile { flex-direction: column !important; text-align: center !important; }
          .modal-content { padding: 20px !important; margin: 12px !important; }
        }
      `}</style>
    </div>
  );
}

/* ===================================================================
   EDIT PROFILE
   =================================================================== */
function EditProfile() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) return;
      setUser(u);
      const { data: p } = await supabase.from("profiles").select("full_name").eq("id", u.id).maybeSingle();
      setFullName(p?.full_name || u.user_metadata?.full_name || "");
      setEmail(u.email || "");
      setLoading(false);
    })();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setMessage("");
    try {
      const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, updated_at: new Date().toISOString() }, { onConflict: "id" });
      if (error) throw error;
      await supabase.auth.updateUser({ data: { full_name: fullName } });
      setMessage("Profile updated!"); setMessageType("success");
    } catch (err: any) { setMessage(err.message || "Failed"); setMessageType("error"); }
    finally { setSaving(false); setTimeout(() => setMessage(""), 3000); }
  };

  const signOut = async () => { await supabase.auth.signOut(); window.location.href = "/login"; };
  const initials = (n: string) => n?.split(" ").map((x: string) => x[0]).join("").toUpperCase().slice(0, 2) || "U";

  if (loading) return <div style={{ textAlign: "center", padding: "60px", color: "#3e4a3d" }}>Loading...</div>;

  const inp: React.CSSProperties = { width: "100%", padding: "13px 16px", border: "1px solid rgba(189,202,186,0.5)", borderRadius: "10px", outline: "none", fontSize: "14px", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" };
  const lbl: React.CSSProperties = { fontSize: "13px", fontWeight: 500, fontFamily: "'Geist', sans-serif", color: "#3e4a3d", marginBottom: "6px", display: "block" };

  return (
    <div>
      {message && <div style={{ padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px", fontWeight: 500, textAlign: "center", backgroundColor: messageType === "success" ? "rgba(0,107,44,0.1)" : "#ffdad6", color: messageType === "success" ? "#006b2c" : "#93000a" }}>{message}</div>}
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="profile-avatar-card" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "14px", padding: "28px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ width: "90px", height: "90px", borderRadius: "18px", backgroundColor: "#00873a", color: "#f7fff2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px", fontWeight: 700, border: "4px solid #fff", flexShrink: 0 }}>{initials(fullName || email)}</div>
          <div style={{ flex: 1, minWidth: "150px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700 }}>{fullName || "User"}</h2>
            <p style={{ color: "#5c647a", fontSize: "14px", wordBreak: "break-all" }}>{email}</p>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "14px", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(189,202,186,0.3)", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#fff" }}><span className="material-symbols-outlined" style={{ color: "#006b2c", fontSize: "20px" }}>person</span><h3 style={{ fontSize: "16px", fontWeight: 600 }}>Personal Information</h3></div>
          <div className="profile-form-grid" style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div><label style={lbl}>Full Name</label><input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>Email</label><input value={email} disabled style={{ ...inp, backgroundColor: "#eff4ff", color: "#6e7b6c" }} /></div>
            <div><label style={lbl}>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" style={inp} /></div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,107,44,0.2)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "14px", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(189,202,186,0.3)", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(0,107,44,0.05)" }}><span className="material-symbols-outlined" style={{ color: "#006b2c", fontSize: "20px" }}>account_balance</span><h3 style={{ fontSize: "16px", fontWeight: 600 }}>Banking</h3></div>
          <div className="profile-form-grid" style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div><label style={lbl}>Bank Name</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>Account Number</label><div style={{ position: "relative" }}><input type={showAccount ? "text" : "password"} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={{ ...inp, paddingRight: "44px" }} /><button type="button" onClick={() => setShowAccount(!showAccount)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#3e4a3d" }}><span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{showAccount ? "visibility_off" : "visibility"}</span></button></div></div>
          </div>
        </div>
        <div className="profile-actions" style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(189,202,186,0.3)", flexWrap: "wrap", gap: "12px" }}>
          <button type="button" onClick={signOut} style={{ padding: "12px 24px", border: "1px solid #ba1a1a", borderRadius: "10px", background: "transparent", color: "#ba1a1a", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Sign Out</button>
          <button type="submit" disabled={saving} style={{ padding: "12px 28px", backgroundColor: saving ? "#6e7b6c" : "#006b2c", color: "#fff", borderRadius: "10px", fontWeight: 700, fontSize: "14px", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 10px 15px -3px rgba(0,107,44,0.2)" }}><span className="material-symbols-outlined" style={{ fontSize: "16px" }}>check_circle</span>{saving ? "Saving..." : "Save Changes"}</button>
        </div>
      </form>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 600px) {
          .profile-form-grid { grid-template-columns: 1fr !important; }
          .profile-avatar-card { flex-direction: column !important; text-align: center !important; }
          .profile-actions { flex-direction: column !important; }
          .profile-actions button { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}



// "use client";

// import { useState, useEffect } from "react";
// import { createClient } from "@/lib/supabase/client";

// type SettingsTab = "hub" | "profile";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState<SettingsTab>("hub");
//   const [fading, setFading] = useState(false);

//   const switchTab = (tab: SettingsTab) => {
//     if (tab === activeTab) return;
//     setFading(true);
//     setTimeout(() => {
//       setActiveTab(tab);
//       setTimeout(() => setFading(false), 50);
//     }, 200);
//   };

//   return (
//     <div style={{ display: "flex", gap: "40px", maxWidth: "1100px", margin: "0 auto", alignItems: "flex-start" }}>
//       {/* Left Sidebar — ALWAYS FIXED, NEVER MOVES */}
//       <div style={{ width: "240px", flexShrink: 0, position: "sticky", top: "80px" }}>
//         <div style={{ marginBottom: "32px" }}>
//           <h2 style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "#0b1c30", marginBottom: "4px" }}>Settings</h2>
//           <p style={{ color: "#3e4a3d", fontSize: "14px", lineHeight: 1.5 }}>Configure your wealth environment and security protocols.</p>
//         </div>

//         <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//           {[
//             { key: "hub" as SettingsTab, label: "Overview", icon: "dashboard", desc: "Settings hub & summaries" },
//             { key: "profile" as SettingsTab, label: "Edit Profile", icon: "person", desc: "Personal & banking info" },
//           ].map((tab) => (
//             <button key={tab.key} onClick={() => switchTab(tab.key)}
//               style={{
//                 width: "100%", textAlign: "left", padding: "16px", borderRadius: "12px", border: "none", cursor: "pointer",
//                 backgroundColor: activeTab === tab.key ? "#ffffff" : "transparent",
//                 boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0, 0, 0, 0.06)" : "none",
//                 transition: "background-color 0.3s, box-shadow 0.3s",
//                 display: "flex", alignItems: "flex-start", gap: "12px",
//               }}>
//               <span className="material-symbols-outlined" style={{ fontSize: "22px", color: activeTab === tab.key ? "#006b2c" : "#3e4a3d", marginTop: "2px" }}>{tab.icon}</span>
//               <div>
//                 <div style={{ fontSize: "15px", fontWeight: 600, fontFamily: "'Inter', sans-serif", color: activeTab === tab.key ? "#006b2c" : "#0b1c30", marginBottom: "2px" }}>{tab.label}</div>
//                 <div style={{ fontSize: "12px", color: "#6e7b6c", fontFamily: "'Geist', sans-serif" }}>{tab.desc}</div>
//               </div>
//               {activeTab === tab.key && <div style={{ marginLeft: "auto", width: "4px", height: "40px", backgroundColor: "#006b2c", borderRadius: "2px", alignSelf: "center" }} />}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right Content — ONLY FADES, NEVER MOVES */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.2s ease" }}>
//           {activeTab === "hub" && <SettingsHub onSwitchToProfile={() => switchTab("profile")} />}
//           {activeTab === "profile" && <EditProfile />}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===================================================================
//    SETTINGS HUB
//    =================================================================== */
// function SettingsHub({ onSwitchToProfile }: { onSwitchToProfile: () => void }) {
//   const supabase = createClient();
//   const [userData, setUserData] = useState<any>(null);
//   const [activeModal, setActiveModal] = useState<string | null>(null);
//   const [modalClosing, setModalClosing] = useState(false);

//   useEffect(() => {
//     async function fetchUser() {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const { data: profile } = await supabase.from("profiles").select("full_name, created_at").eq("id", user.id).maybeSingle();
//         setUserData({
//           name: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
//           email: user.email,
//           memberSince: profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Recently",
//         });
//       }
//     }
//     fetchUser();
//   }, [supabase]);

//   const closeModal = () => { setModalClosing(true); setTimeout(() => { setActiveModal(null); setModalClosing(false); }, 200); };
//   const getInitials = (n: string) => n?.split(" ").map((x: string) => x[0]).join("").toUpperCase().slice(0, 2) || "U";

//   const cards = [
//     { id: "security", icon: "shield_lock", title: "Security & Access", desc: "2FA, hardware keys, session management.", status: "Protected", color: "#006b2c", items: [{ l: "2FA", v: "Enabled", a: true },{ l: "Biometrics", v: "Off", a: false },{ l: "Sessions", v: "2 active", a: true }] },
//     { id: "accounts", icon: "account_balance", title: "Linked Accounts", desc: "Bank accounts, wallets, APIs.", status: "4 Linked", color: "#825100", items: [{ l: "Wema/Monnify", v: "Connected", a: true },{ l: "GTBank", v: "Expired", a: false },{ l: "Access", v: "Connected", a: true }] },
//     { id: "notifications", icon: "notifications_active", title: "Notifications", desc: "Alerts, pings, summaries.", status: "Active", color: "#565e74", items: [{ l: "Push", v: "On", a: true },{ l: "Email", v: "On", a: true },{ l: "SMS", v: "Off", a: false }] },
//     { id: "preferences", icon: "tune", title: "Preferences", desc: "Currency, language, theme.", status: "NGN • WAT", color: "#3e4a3d", items: [{ l: "Currency", v: "NGN (₦)", a: true },{ l: "Language", v: "EN", a: true },{ l: "Theme", v: "Light", a: true }] },
//     { id: "ai", icon: "psychology_alt", title: "AI Personalization", desc: "Risk appetite, reports.", status: "Moderate", color: "#006b2c", items: [{ l: "Risk", v: "Moderate", a: true },{ l: "Reports", v: "Weekly", a: true },{ l: "Learning", v: "Active", a: true }] },
//     { id: "compliance", icon: "gavel", title: "Compliance", desc: "Privacy, data export.", status: "Compliant", color: "#ba1a1a", items: [{ l: "GDPR", v: "Yes", a: true },{ l: "Export", v: "Available", a: true },{ l: "Delete", v: "Request", a: true }] },
//   ];

//   return (
//     <div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "24px", marginBottom: "24px" }}>
//         <div style={{ gridColumn: "span 8", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "12px", padding: "24px", display: "flex", alignItems: "center", gap: "24px" }}>
//           <div style={{ width: "96px", height: "96px", borderRadius: "50%", backgroundColor: "#00873a", color: "#f7fff2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", fontWeight: 700, border: "4px solid #00873a", flexShrink: 0 }}>{getInitials(userData?.name || "U")}</div>
//           <div style={{ flex: 1 }}>
//             <h3 style={{ fontSize: "24px", fontWeight: 600 }}>{userData?.name || "User"}</h3>
//             <p style={{ color: "#3e4a3d", fontSize: "14px", marginBottom: "12px" }}>{userData?.email}</p>
//             <button onClick={onSwitchToProfile} style={{ padding: "8px 20px", backgroundColor: "#0b1c30", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "14px", fontFamily: "'Geist', sans-serif" }}>Edit Profile</button>
//           </div>
//         </div>
//         <div style={{ gridColumn: "span 4", background: "linear-gradient(135deg, #0b1c30, #1e3a5f)", color: "#fff", padding: "24px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//           <div><h3 style={{ fontSize: "18px", fontWeight: 600, color: "#62df7d", marginBottom: "12px" }}>Institutional Elite</h3><p style={{ fontSize: "13px", opacity: 0.7 }}>Unlimited AI Treasurer • Multi-jurisdictional compliance</p></div>
//           <button style={{ width: "100%", padding: "12px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#fff", fontWeight: 500, fontSize: "14px", cursor: "pointer", marginTop: "16px" }}>Manage Subscription</button>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "40px" }}>
//         {cards.map((c) => (
//           <div key={c.id} onClick={() => setActiveModal(c.id)} style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "12px", padding: "24px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
//             onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
//             <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: `${c.color}15`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><span className="material-symbols-outlined" style={{ fontSize: "26px" }}>{c.icon}</span></div>
//             <h4 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "6px" }}>{c.title}</h4>
//             <p style={{ color: "#3e4a3d", fontSize: "13px", marginBottom: "16px" }}>{c.desc}</p>
//             <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(189,202,186,0.3)" }}><span style={{ fontSize: "11px", fontWeight: 600, color: c.color }}>{c.status}</span><span className="material-symbols-outlined" style={{ color: "#3e4a3d", fontSize: "18px" }}>arrow_forward</span></div>
//           </div>
//         ))}
//       </div>

//       <div style={{ padding: "24px", border: "1px solid rgba(186,26,26,0.2)", borderRadius: "12px", backgroundColor: "rgba(186,26,26,0.05)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
//         <div><h5 style={{ fontSize: "18px", fontWeight: 600, color: "#ba1a1a" }}>Termination Zone</h5><p style={{ fontSize: "14px", color: "rgba(147,0,10,0.7)" }}>Permanently delete your data.</p></div>
//         <button style={{ padding: "12px 40px", backgroundColor: "#ba1a1a", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 500, fontSize: "14px" }}>Deactivate</button>
//       </div>

//       {activeModal && (
//         <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(11,28,48,0.5)", backdropFilter: "blur(4px)", padding: "24px", opacity: modalClosing ? 0 : 1, transition: "opacity 0.2s" }} onClick={closeModal}>
//           <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", maxWidth: "480px", width: "100%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", transform: modalClosing ? "scale(0.95)" : "scale(1)", transition: "transform 0.2s" }} onClick={(e) => e.stopPropagation()}>
//             {(() => {
//               const card = cards.find((x) => x.id === activeModal);
//               if (!card) return null;
//               return (
//                 <>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}><div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: `${card.color}15`, color: card.color, display: "flex", alignItems: "center", justifyContent: "center" }}><span className="material-symbols-outlined">{card.icon}</span></div><h3 style={{ fontSize: "20px", fontWeight: 600 }}>{card.title}</h3></div>
//                     <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "#6e7b6c" }}><span className="material-symbols-outlined">close</span></button>
//                   </div>
//                   {card.items.map((item: any, i: number) => (
//                     <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: i < card.items.length - 1 ? "1px solid rgba(189,202,186,0.2)" : "none" }}>
//                       <span style={{ fontSize: "14px", fontWeight: 500 }}>{item.l}</span>
//                       <span style={{ fontSize: "13px", fontWeight: 600, color: item.a ? "#006b2c" : "#6e7b6c", backgroundColor: item.a ? "rgba(0,107,44,0.08)" : "rgba(110,123,108,0.08)", padding: "4px 12px", borderRadius: "9999px" }}>{item.v}</span>
//                     </div>
//                   ))}
//                 </>
//               );
//             })()}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ===================================================================
//    EDIT PROFILE
//    =================================================================== */
// function EditProfile() {
//   const supabase = createClient();
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error">("success");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [showAccount, setShowAccount] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { data: { user: u } } = await supabase.auth.getUser();
//       if (!u) return;
//       setUser(u);
//       const { data: p } = await supabase.from("profiles").select("full_name").eq("id", u.id).maybeSingle();
//       setFullName(p?.full_name || u.user_metadata?.full_name || "");
//       setEmail(u.email || "");
//       setLoading(false);
//     })();
//   }, [supabase]);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault(); setSaving(true); setMessage("");
//     try {
//       // DIRECT upsert with onConflict to handle missing rows
//       const { error } = await supabase.from("profiles").upsert({
//         id: user.id,
//         full_name: fullName,
//         updated_at: new Date().toISOString(),
//       }, { onConflict: "id" });

//       if (error) {
//         console.error("Upsert error:", error);
//         throw error;
//       }

//       await supabase.auth.updateUser({ data: { full_name: fullName } });
//       setMessage("Profile updated!"); setMessageType("success");
//     } catch (err: any) {
//       setMessage(err.message || "Failed"); setMessageType("error");
//     } finally { setSaving(false); setTimeout(() => setMessage(""), 3000); }
//   };

//   const signOut = async () => { await supabase.auth.signOut(); window.location.href = "/login"; };
//   const initials = (n: string) => n?.split(" ").map((x: string) => x[0]).join("").toUpperCase().slice(0, 2) || "U";

//   if (loading) return <div style={{ textAlign: "center", padding: "60px", color: "#3e4a3d" }}>Loading...</div>;

//   const inp: React.CSSProperties = { width: "100%", padding: "14px 16px", border: "1px solid rgba(189,202,186,0.5)", borderRadius: "12px", outline: "none", fontSize: "15px", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" };
//   const lbl: React.CSSProperties = { fontSize: "14px", fontWeight: 500, fontFamily: "'Geist', sans-serif", color: "#3e4a3d", marginBottom: "8px", display: "block" };

//   return (
//     <div>
//       {message && <div style={{ padding: "12px 16px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px", fontWeight: 500, textAlign: "center", backgroundColor: messageType === "success" ? "rgba(0,107,44,0.1)" : "#ffdad6", color: messageType === "success" ? "#006b2c" : "#93000a" }}>{message}</div>}
//       <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
//         <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "12px", padding: "32px", display: "flex", alignItems: "center", gap: "32px" }}>
//           <div style={{ width: "112px", height: "112px", borderRadius: "20px", backgroundColor: "#00873a", color: "#f7fff2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "42px", fontWeight: 700, border: "4px solid #fff", flexShrink: 0 }}>{initials(fullName || email)}</div>
//           <div><h2 style={{ fontSize: "28px", fontWeight: 700 }}>{fullName || "User"}</h2><p style={{ color: "#5c647a", fontSize: "15px" }}>{email}</p></div>
//         </div>
//         <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "12px", overflow: "hidden" }}>
//           <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(189,202,186,0.3)", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#fff" }}><span className="material-symbols-outlined" style={{ color: "#006b2c" }}>person</span><h3 style={{ fontSize: "18px", fontWeight: 600 }}>Personal Information</h3></div>
//           <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
//             <div><label style={lbl}>Full Name</label><input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inp} /></div>
//             <div><label style={lbl}>Email</label><input value={email} disabled style={{ ...inp, backgroundColor: "#eff4ff", color: "#6e7b6c" }} /></div>
//             <div><label style={lbl}>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" style={inp} /></div>
//           </div>
//         </div>
//         <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(0,107,44,0.2)", boxShadow: "0 4px 20px rgba(15,23,42,0.04)", borderRadius: "12px", overflow: "hidden" }}>
//           <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(189,202,186,0.3)", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(0,107,44,0.05)" }}><span className="material-symbols-outlined" style={{ color: "#006b2c" }}>account_balance</span><h3 style={{ fontSize: "18px", fontWeight: 600 }}>Banking</h3></div>
//           <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
//             <div><label style={lbl}>Bank Name</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} style={inp} /></div>
//             <div><label style={lbl}>Account Number</label><div style={{ position: "relative" }}><input type={showAccount ? "text" : "password"} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={{ ...inp, paddingRight: "48px" }} /><button type="button" onClick={() => setShowAccount(!showAccount)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#3e4a3d" }}><span className="material-symbols-outlined">{showAccount ? "visibility_off" : "visibility"}</span></button></div></div>
//           </div>
//         </div>
//         <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid rgba(189,202,186,0.3)", flexWrap: "wrap", gap: "16px" }}>
//           <button type="button" onClick={signOut} style={{ padding: "12px 24px", border: "1px solid #ba1a1a", borderRadius: "12px", background: "transparent", color: "#ba1a1a", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Sign Out</button>
//           <button type="submit" disabled={saving} style={{ padding: "12px 32px", backgroundColor: saving ? "#6e7b6c" : "#006b2c", color: "#fff", borderRadius: "12px", fontWeight: 700, fontSize: "14px", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 10px 15px -3px rgba(0,107,44,0.2)" }}><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>{saving ? "Saving..." : "Save Changes"}</button>
//         </div>
//       </form>
//     </div>
//   );
// }