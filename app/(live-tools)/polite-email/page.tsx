/**
 * @author © ColdByDefault
 * @license Copyright (c) 2026 ColdByDefault. All rights reserved.
 * @version 6.x.x
 */

import { EmailRewriter } from "@/components/live-tools/polite-email/email-rewriter";

export default function Page() {
  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <EmailRewriter />
    </main>
  );
}
