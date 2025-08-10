/**
 * German Homepage
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
import { Metadata } from "next";
import { seoConfigDE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Startseite",
  description: seoConfigDE.description,
  alternates: {
    canonical: `${seoConfigDE.siteUrl}/de`,
  },
};

// This will use your existing components but signal to them that the language is German
// You can update your components to read from process.env or a context provider
export default function GermanHomePage() {
  // Set language context for your existing components
  return (
    <div lang="de">
      {/* Your existing homepage components will go here */}
      {/* They should read the language context and display German content */}
      <main>
        <h1>Willkommen auf meinem Portfolio</h1>
        <p>Diese Seite wird bald mit deutschen Inhalten gefüllt.</p>
      </main>
    </div>
  );
}
