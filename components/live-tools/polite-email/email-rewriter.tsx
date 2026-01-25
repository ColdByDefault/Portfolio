/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
 */
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
import { EmailResult } from "@/components/live-tools/polite-email/email-result";
import { ContextInput } from "@/components/live-tools/polite-email/context-input";
import { ModeSelector } from "@/components/live-tools/polite-email/mode-selector";
import { AnalysisResult } from "@/components/live-tools/polite-email/analysis-result";
import {
  MAX_EMAIL_LENGTH,
  MAX_USES_PER_IP,
} from "@/data/live-tools/email-rewriter";
import type {
  ToneType,
  AppMode,
  AnalyzeResponse,
} from "@/types/live-tools/email-rewriter";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";

export function EmailRewriter() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState<ToneType>("professional");
  const [mode, setMode] = useState<AppMode>("analyze");
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(
    null,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/email-rewrite/remaining")
      .then((res) => res.json())
      .then((data) => setRemaining(data.remaining))
      .catch(() => setRemaining(MAX_USES_PER_IP));
  }, []);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter an email");
      return;
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      setError(`Email must be under ${MAX_EMAIL_LENGTH} characters`);
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setAnalysisResult(null);

    try {
      if (mode === "analyze") {
        const response = await fetch("/api/email-rewrite/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, context: context || undefined }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Something went wrong");
          return;
        }

        setAnalysisResult(data);
        setRemaining(data.remaining);
      } else {
        const response = await fetch("/api/email-rewrite/rewriter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, tone, context: context || undefined }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Something went wrong");
          return;
        }

        setResult(data.rewrittenEmail);
        setRemaining(data.remaining);
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    setResult("");
    setAnalysisResult(null);
    setError("");
  };

  const isLimitReached = remaining === 0;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column - Input */}
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Email Assistant</CardTitle>
              <CardDescription>
                Analyze incoming emails with AI-suggested replies, or rewrite
                your drafts
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
                    Daily limit reached. Come back tomorrow.
                  </AlertDescription>
                </Alert>
              )}

              <ModeSelector
                value={mode}
                onChange={handleModeChange}
                disabled={loading}
              />

              <div className="space-y-2">
                <label htmlFor="email-input" className="text-sm font-medium">
                  {mode === "analyze" ? "Email to Analyze" : "Your Draft Email"}
                </label>
                <Textarea
                  id="email-input"
                  placeholder={
                    mode === "analyze"
                      ? "Paste the email you received here..."
                      : "Where is the money? You are late..."
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || isLimitReached}
                  className="min-h-64 resize-y overflow-y-auto"
                  maxLength={MAX_EMAIL_LENGTH}
                />
                <p className="text-right text-xs text-muted-foreground">
                  {email.length}/{MAX_EMAIL_LENGTH}
                </p>
              </div>

              {mode === "rewrite" && (
                <ToneSelector
                  value={tone}
                  onChange={setTone}
                  disabled={loading || isLimitReached}
                />
              )}

              <ContextInput
                value={context}
                onChange={setContext}
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
                    {mode === "analyze" ? "Analyzing..." : "Rewriting..."}
                  </>
                ) : mode === "analyze" ? (
                  "Analyze & Generate Replies"
                ) : (
                  "Rewrite Email"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {mode === "rewrite" && result && <EmailResult result={result} />}

          {mode === "analyze" && analysisResult && (
            <AnalysisResult
              summary={analysisResult.summary}
              sentiment={analysisResult.sentiment}
              keyPoints={analysisResult.keyPoints}
              responseOptions={analysisResult.responseOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
