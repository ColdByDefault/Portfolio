import { CookieBanner } from "@/components/main/cookie-banner"
import { ReeedNavbar } from "@/components/reeed/ReeedNavbar"
// no need to repeat styles, since it is very dumb and complex adjustment that i did there!
import "@/styles/berich.css"
// aslo this one is repeated for no reason
import { ThemeProvider } from "@/components/reeed/theme-provider"






export default function BeRichLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ReeedNavbar />
          <CookieBanner /> 
            <main className="max-w-screen lg:w-full mt-12">{children}</main>
        </ThemeProvider>
    )
}