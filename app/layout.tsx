import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/providers/language-provider"
import { AuthProvider } from "@/providers/auth-provider"
import { ReduxProvider } from "@/providers/redux-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import "./globals.css"
// Importez le ThemeScript
import { ThemeScript } from "./theme-script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "University Management System",
  description: "A comprehensive university management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeScript />
        <ReduxProvider>
          <AuthProvider>
            <LanguageProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </ThemeProvider>
            </LanguageProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
