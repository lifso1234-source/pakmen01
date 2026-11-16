import React from "react";

export const appContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "100dvh",
  maxWidth: "440px",
  margin: "0 auto",
  padding: "1rem",
  backgroundColor: "#fafafa",
  color: "#111",
  fontFamily: "system-ui, -apple-system, sans-serif",
  touchAction: "none",
  userSelect: "none",
};

export const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.75rem",
  width: "100%",
  marginBottom: "1rem",
};

export const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: "12px",
  padding: "0.75rem 1rem",
  textAlign: "center",
};

export const statNumberStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  fontWeight: 700,
  margin: "0.2rem 0 0 0",
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

export const dpadGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 64px)",
  gridTemplateRows: "repeat(2, 64px)",
  gap: "0.5rem",
  marginTop: "1.25rem",
  justifyContent: "center",
};

export const dpadBtnStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #dcdcdc",
  borderRadius: "12px",
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#111",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const primaryBtnStyle: React.CSSProperties = {
  backgroundColor: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.6rem 1.2rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer",
};