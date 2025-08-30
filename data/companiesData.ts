/**
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

export interface CompanyLogo {
  id: string;
  name: string;
  logo?: string; // Made optional since we now support text fallbacks
  url?: string;
  period?: string;
}

export const companiesData: CompanyLogo[] = [
  {
    id: "avarno",
    name: "Avarno-GmbH",
    logo: "/assets/companies/avarno.png",
    url: "https://avarno.de",
    period: "2025~",
  },
  {
    id: "Botgenossen",
    name: "Botgenossen",
    logo: "/assets/companies/botgenossen.png",
    url: "https://botgenossen.de",
    period: "2025~",
  },
  {
    id: "beRichHub",
    name: "beRich.Hub",
    url: "https://berich-hub.vercel.app/",
    period: "2024~",
  },
  {
    id: "avarno",
    name: "Avarno-GmbH",
    logo: "/assets/companies/avarno.png",
    url: "https://avarno.de",
    period: "2025~",
  },
  {
    id: "Botgenossen",
    name: "Botgenossen",
    logo: "/assets/companies/botgenossen.png",
    url: "https://botgenossen.de",
    period: "2025~",
  },
  {
    id: "beRichHub",
    name: "beRich.Hub",
    url: "https://berich-hub.vercel.app/",
    period: "2024~",
  },
  {
    id: "avarno",
    name: "Avarno-GmbH",
    logo: "/assets/companies/avarno.png",
    url: "https://avarno.de",
    period: "2025~",
  },
  {
    id: "Botgenossen",
    name: "Botgenossen",
    logo: "/assets/companies/botgenossen.png",
    url: "https://botgenossen.de",
    period: "2025~",
  },
  {
    id: "beRichHub",
    name: "beRich.Hub",
    url: "https://berich-hub.vercel.app/",
    period: "2024~",
  },
];
