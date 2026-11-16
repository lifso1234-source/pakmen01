import React from "react";

export const appContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "100dvh",
  maxWidth: "480px",
  margin: "0 auto",
  padding: "0.75rem",
  backgroundColor: "#fafafa",
  color: "#111",
  fontFamily: "system-ui, -apple-system, sans-serif",
  touchAction: "none",
  userSelect: "none",
};

export const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "0.5rem",
  width: "100%",
  marginBottom: "0.65rem",
};

export const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: "10px",
  padding: "0.5rem",
  textAlign: "center",
};

export const statNumberStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 700,
  margin: "0.15rem 0 0 0",
  color: "#111",
};

export const canvasWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: "12px",
  overflow: "hidden",
};

export const legendRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "0.6rem",
  fontSize: "0.72rem",
  color: "#555",
  marginTop: "0.45rem",
};

export const bigPadContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "0.75rem",
  paddingBottom: "0.5rem",
};

export const bigPadButtonStyle: React.CSSProperties = {
  position: "relative",
  width: "164px",
  height: "164px",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  border: "2px solid #e0e0e0",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  outline: "none",
  WebkitTapHighlightColor: "transparent",
};

export const primaryBtnStyle: React.CSSProperties = {
  backgroundColor: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.65rem 1.25rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer",
};