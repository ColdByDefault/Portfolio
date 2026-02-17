/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */

"use client";

import { useEffect } from "react";
import { useIsClient } from "@/hooks/use-client";
import { isDeploymentAuthorized } from "./theme-config-validator";

/**
 * Viewport Renderer Component
 * Handles viewport-specific rendering optimizations
 */
export function ViewportRenderer() {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    // Print security info to console if unauthorized
    const isAuthorized = isDeploymentAuthorized();
    if (!isAuthorized) {
      printSecurityInformation();
    }
  }, [isClient]);

  // Only render on client-side and if unauthorized
  if (!isClient) return null;

  const showOverlay = !isDeploymentAuthorized();
  if (!showOverlay) return null;

  return (
    <>
      {/* Top Banner */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#dc2626",
          color: "white",
          textAlign: "center",
          padding: "12px 16px",
          zIndex: 999998,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        ⚠️ UNAUTHORIZED DEPLOYMENT - This is a stolen copy. Original site:{" "}
        <a
          href="https://www.coldbydefault.com"
          style={{
            color: "white",
            textDecoration: "underline",
            fontWeight: 700,
          }}
        >
          www.coldbydefault.com
        </a>
      </div>

      {/* Diagonal Watermark */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 999997,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: "rotate(-45deg)",
            fontSize: "120px",
            fontWeight: 900,
            color: "rgba(220, 38, 38, 0.08)",
            userSelect: "none",
            letterSpacing: "20px",
            whiteSpace: "nowrap",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          UNAUTHORIZED COPY
        </div>
      </div>

      {/* Bottom Notice */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          color: "#ef4444",
          textAlign: "center",
          padding: "8px 16px",
          zIndex: 999998,
          fontFamily: "monospace",
          fontSize: "12px",
        }}
      >
        © 2026 ColdByDefault - All Rights Reserved - Unauthorized use is
        prohibited
      </div>

      {/* Corner Watermarks */}
      {[
        { top: "80px", left: "20px", rotation: -15 },
        { top: "80px", right: "20px", rotation: 15 },
        { bottom: "60px", left: "20px", rotation: 15 },
        { bottom: "60px", right: "20px", rotation: -15 },
      ].map((pos, idx) => (
        <div
          key={idx}
          style={{
            position: "fixed",
            ...pos,
            color: "rgba(220, 38, 38, 0.4)",
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 700,
            pointerEvents: "none",
            zIndex: 999996,
            transform: `rotate(${pos.rotation}deg)`,
            textShadow: "0 0 3px rgba(0,0,0,0.3)",
          }}
        >
          STOLEN FROM
          <br />
          COLDBYDEFAULT
        </div>
      ))}

      {/* Random Scattered Watermarks */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`scatter-${i}`}
          style={{
            position: "fixed",
            top: `${10 + ((i * 6) % 80)}%`,
            left: `${5 + ((i * 7) % 90)}%`,
            color: "rgba(220, 38, 38, 0.15)",
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 600,
            pointerEvents: "none",
            zIndex: 999995,
            transform: `rotate(${(i * 37) % 360}deg)`,
            userSelect: "none",
          }}
        >
          UNAUTHORIZED
        </div>
      ))}
    </>
  );
}

/**
 * Prints security and deployment information to console
 */
function printSecurityInformation() {
  if (typeof window === "undefined") return;

  const deploymentId = btoa(window.location.hostname).slice(0, 16);

  // Main security banner
  const banner = `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║              🛡️  SECURITY SYSTEM ACTIVE  🛡️                   ║
║                                                                ║
║  © 2026 ColdByDefault - All Rights Reserved                   ║
║  Portfolio Code - Proprietary and Confidential                ║
║                                                                ║
║  ⚠️  UNAUTHORIZED DEPLOYMENT DETECTED  ⚠️                      ║
║                                                                ║
║  This code is running on an unauthorized domain.              ║
║  Legal action may be taken against unauthorized use.          ║
║                                                                ║
║  Deployment ID: ${deploymentId}...                            ║
║  Domain: ${window.location.hostname.padEnd(45)}║
║  Timestamp: ${new Date().toISOString().padEnd(42)}║
║                                                                ║
║  Original site: https://www.coldbydefault.com                 ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `;

  console.log(banner);

  // Large warning
  console.log(
    "%c⚠️ UNAUTHORIZED DEPLOYMENT DETECTED ⚠️",
    "color: #dc2626; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
  );

  console.log(
    "%cThis is an unauthorized copy of ColdByDefault's portfolio.",
    "color: #dc2626; font-size: 16px; font-weight: bold;",
  );

  console.log(
    "%cUnauthorized use, reproduction, or distribution is strictly prohibited.",
    "color: #ef4444; font-size: 14px;",
  );

  console.log(
    "%c\n📧 If you're interested in working with ColdByDefault, visit the official site:\n🌐 https://www.coldbydefault.com",
    "color: #3b82f6; font-size: 13px; font-style: italic;",
  );

  // Intimidation footer
  console.log(
    "%c\n⚖️  Legal Notice: This deployment has been logged and reported.",
    "color: #dc2626; font-size: 12px; font-weight: bold; background: #fee; padding: 4px;",
  );

  // Table with details
  console.table({
    "Unauthorized Domain": window.location.hostname,
    "Authorized Domain": "www.coldbydefault.com",
    Status: "❌ UNAUTHORIZED",
    "Detected At": new Date().toLocaleString(),
    "User Agent": navigator.userAgent.slice(0, 50) + "...",
  });
}
