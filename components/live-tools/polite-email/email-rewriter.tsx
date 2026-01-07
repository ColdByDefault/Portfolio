"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ToneSelector } from "@/components/live-tools/polite-email/tone-selector";
import { EmailResult } from "./email-result";
import {
  MAX_EMAIL_LENGTH,
  MAX_USES_PER_IP,
} from "@/data/live-tools/email-rewriter";
import type { ToneType } from "@/types/live-tools/email-rewriter";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";

export function EmailRewriter() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState<ToneType>("professional");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    // Fetch remaining uses on mount
    fetch("/api/email-rewrite/remaining")
      .then((res) => res.json())
      .then((data) => setRemaining(data.remaining))
      .catch(() => setRemaining(MAX_USES_PER_IP));
  }, []);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter an email to rewrite");
      return;
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      setError(`Email must be under ${MAX_EMAIL_LENGTH} characters`);
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/email-rewrite/rewriter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data.rewrittenEmail);
      setRemaining(data.remaining);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isLimitReached = remaining === 0;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Card className="border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Polite Email Rewriter</CardTitle>
          <CardDescription>
            Transform rough drafts into polished, professional emails
          </CardDescription>
          {remaining !== null && (
            <p className="pt-1 text-xs text-muted-foreground">
              {remaining} of {MAX_USES_PER_IP} uses remaining today
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {isLimitReached && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Daily limit reached. Come back tomorrow for more rewrites.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="email-input" className="text-sm font-medium">
              Your Draft Email
            </label>
            <Textarea
              id="email-input"
              placeholder="Where is the money? You are late..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || isLimitReached}
              className="min-h-32 resize-none"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <p className="text-right text-xs text-muted-foreground">
              {email.length}/{MAX_EMAIL_LENGTH}
            </p>
          </div>

          <ToneSelector
            value={tone}
            onChange={setTone}
            disabled={loading || isLimitReached}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading || isLimitReached || !email.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rewriting...
              </>
            ) : (
              "Rewrite Email"
            )}
          </Button>
        </CardContent>
      </Card>

      {result && <EmailResult result={result} />}
    </div>
  );
}
