/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */
"use client";

import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "cooldown"
  >("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const [cooldownTime, setCooldownTime] = useState<number>(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Check for existing submission cooldown
  useEffect(() => {
    const lastSubmission = localStorage.getItem("lastContactSubmission");
    if (lastSubmission) {
      const timeSince = Date.now() - parseInt(lastSubmission);
      const cooldownPeriod = 15 * 60 * 1000; // 15 minutes

      if (timeSince < cooldownPeriod) {
        setSubmitStatus("cooldown");
        setCooldownTime(Math.ceil((cooldownPeriod - timeSince) / 1000 / 60));
      }
    }
  }, []);

  // Set form start time when dialog opens
  useEffect(() => {
    if (isOpen && formStartTime === 0) {
      setFormStartTime(Date.now());
    }
  }, [isOpen, formStartTime]);

  // Update cooldown timer
  useEffect(() => {
    if (submitStatus === "cooldown" && cooldownTime > 0) {
      const timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setSubmitStatus("idle");
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [submitStatus, cooldownTime]);

  const onSubmit = async (data: FormData) => {
    // Check if still in cooldown
    if (submitStatus === "cooldown") {
      return;
    }

    // Check if form was filled too quickly (minimum 3 seconds)
    const timeTaken = Date.now() - formStartTime;
    if (timeTaken < 3000) {
      form.setError("root", {
        message: "Please take your time filling out the form.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          honeypot: "", // Honeypot field for bot detection
          timestamp: formStartTime,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();

        // Set cooldown in localStorage
        localStorage.setItem("lastContactSubmission", Date.now().toString());

        // Close dialog after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus("cooldown");
          setCooldownTime(15); // 15 minutes cooldown
        }, 3000);
      } else {
        console.error("Error:", responseData.error);

        // Handle specific error types
        if (response.status === 429) {
          setSubmitStatus("cooldown");
          setCooldownTime(15);
          localStorage.setItem("lastContactSubmission", Date.now().toString());
        } else {
          setSubmitStatus("error");
        }

        form.setError("root", {
          message: responseData.error || "Failed to send message",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      form.setError("root", {
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 cursor-pointer"
          disabled={submitStatus === "cooldown"}
        >
          <Mail className="h-4 w-4" />
          {submitStatus === "cooldown"
            ? `Wait ${cooldownTime}min`
            : "Contact Me"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send me a message
          </DialogTitle>
          <DialogDescription>
            I&apos;d love to hear from you! Send me a message and I&apos;ll get
            back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-lg font-semibold mb-2">
              Message sent successfully!
            </div>
            <p className="text-muted-foreground">
              Thank you for reaching out. I&apos;ll get back to you soon!
            </p>
          </div>
        ) : submitStatus === "cooldown" ? (
          <div className="text-center py-8">
            <div className="text-orange-600 text-lg font-semibold mb-2">
              Please wait before sending another message
            </div>
            <p className="text-muted-foreground">
              You can send another message in {cooldownTime} minute
              {cooldownTime !== 1 ? "s" : ""}.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot field - hidden from users but visible to bots */}
              <div style={{ display: "none" }}>
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        {...field}
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's this about?"
                        {...field}
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me more about your project, question, or how I can help you..."
                        className="min-h-[120px] resize-none"
                        maxLength={1000}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/1000 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="text-red-600 text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isSubmitting || submitStatus !== "idle"}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
