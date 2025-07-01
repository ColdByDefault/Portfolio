"use client";


import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { FaXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaSpotify } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";

export default function ContactBox() {


  return (
    <Card className="w-fit mx-auto max-w-md border-0 bg-transparent shadow-none">
      <CardContent className="p-6 space-y-6">
        {/* Social Media Links */}
        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-3">
            Get in touch
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Instagram"
            >
              <FaSquareInstagram className="h-5 w-5 text-pink-600" />
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="GitHub"
            >
              <FaGithub className="h-5 w-5 text-slate-700" />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5 text-blue-600" />
            </Link>

            <Link
              href="https://x.com"
              target="_blank"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="X (Twitter)"
            >
              <FaXTwitter />
            </Link>

            <Link
              href="https://discord.gg/yourserver"
              target="_blank"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Discord"
            >
              <IoLogoDiscord className="h-5 w-5 text-indigo-600" />
            </Link>

            <Link
              href="https://open.spotify.com/user/yourprofile"
              target="_blank"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Spotify"
            >
              <FaSpotify className="h-5 w-5 text-green-600" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
