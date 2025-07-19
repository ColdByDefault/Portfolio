/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Mail, Globe } from "lucide-react";

interface Stats {
  totalSubmissions: number;
  last24h: number;
  suspicious: number;
  blockedIPs: number;
  blockedEmails: number;
  topIPs: [string, number][];
}

interface SuspiciousSubmission {
  ip: string;
  email: string;
  name: string;
  subject: string;
  message: string;
  timestamp: number;
  spamScore: number;
  suspicious: boolean;
}

export default function AdminContactPage() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [suspicious, setSuspicious] = useState<SuspiciousSubmission[]>([]);
  const [blockIP, setBlockIP] = useState("");
  const [blockEmail, setBlockEmail] = useState("");
  const [message, setMessage] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const authenticate = async () => {
    try {
      // Validate token against server
      const response = await fetch("/api/admin/contact?action=stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setMessage("Authenticated successfully");
        loadData();
      } else {
        setMessage("Invalid token");
      }
    } catch (error) {
      setMessage("Authentication failed" + error);
    }
  };

  const loadData = async () => {
    try {
      // Load stats
      const statsResponse = await fetch("/api/admin/contact?action=stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load suspicious activity
      const suspiciousResponse = await fetch(
        "/api/admin/contact?action=suspicious&hours=24",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (suspiciousResponse.ok) {
        const suspiciousData = await suspiciousResponse.json();
        setSuspicious(suspiciousData);
      }

      // Update last refresh time
      setLastRefresh(new Date());
    } catch (error) {
      setMessage("Error loading data" + error);
    }
  };

  const handleBlockIP = async () => {
    if (!blockIP) return;

    try {
      const response = await fetch("/api/admin/contact", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "block_ip", ip: blockIP }),
      });

      if (response.ok) {
        setMessage(`IP ${blockIP} blocked successfully`);
        setBlockIP("");
        loadData();
      }
    } catch (error) {
      setMessage("Error blocking IP" + error);
    }
  };

  const handleBlockEmail = async () => {
    if (!blockEmail) return;

    try {
      const response = await fetch("/api/admin/contact", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "block_email", email: blockEmail }),
      });

      if (response.ok) {
        setMessage(`Email ${blockEmail} blocked successfully`);
        setBlockEmail("");
        loadData();
      }
    } catch (error) {
      setMessage("Error blocking email" + error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Authentication
            </CardTitle>
            <CardDescription>
              Enter your admin token to access contact form monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && authenticate()}
            />
            <Button onClick={authenticate} className="w-full">
              Authenticate
            </Button>
            {message && (
              <p
                className={`text-sm ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Contact Form Security Dashboard
            </h1>
            {lastRefresh && (
              <p className="text-sm text-muted-foreground mt-1">
                Last refreshed: {lastRefresh.toLocaleString()}
              </p>
            )}
          </div>
          <Button onClick={loadData} variant="outline">
            Refresh Data
          </Button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("success") || message.includes("Authenticated")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Submissions
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.totalSubmissions ?? 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last 24h</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.last24h ?? 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspicious</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats?.suspicious ?? 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(stats?.blockedIPs ?? 0) + (stats?.blockedEmails ?? 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.blockedIPs ?? 0} IPs, {stats?.blockedEmails ?? 0} emails
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Block Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Block IP Address</CardTitle>
              <CardDescription>
                Block specific IP addresses from submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="192.168.1.100"
                value={blockIP}
                onChange={(e) => setBlockIP(e.target.value)}
              />
              <Button onClick={handleBlockIP} className="w-full">
                Block IP
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Block Email Address</CardTitle>
              <CardDescription>
                Block specific email addresses from submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="spammer@example.com"
                value={blockEmail}
                onChange={(e) => setBlockEmail(e.target.value)}
              />
              <Button onClick={handleBlockEmail} className="w-full">
                Block Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top IPs */}
        {stats && stats.topIPs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top IP Addresses (Last 24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.topIPs.map(([ip, count]) => (
                  <div key={ip} className="flex justify-between items-center">
                    <span className="font-mono">{ip}</span>
                    <Badge variant="secondary">{count} submissions</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Suspicious Activity */}
        {suspicious.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activity (Last 24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suspicious.map((submission, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        {submission.name} ({submission.email})
                      </span>
                      <Badge variant="destructive">
                        Spam Score: {submission.spamScore}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <span>IP: {submission.ip}</span>
                      <span>
                        Time: {new Date(submission.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <strong>Subject:</strong> {submission.subject}
                    </div>
                    <div className="text-sm">
                      <strong>Message:</strong>{" "}
                      {submission.message.substring(0, 200)}...
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
