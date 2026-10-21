import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import AppShell from "../components/AppShell";
import CustomizationProvider from "@/features/customization/CustomizationProvider";

export const metadata = {
  title: "Atelier",
  description: "Professional portfolio and commission platform for artists",
};

// Clerk theming — mirrors the site design system:
// white cards with #E7E4DF hairline borders, #FAF8F5 inputs,
// square corners, Georgia serif headings, uppercase buttons
// (black -> #C25E3E hover, matching components/ui/Button primary).
const clerkAppearance = {
  variables: {
    colorPrimary: "#C25E3E",
    colorDanger: "#B91C1C",
    colorText: "#141413",
    colorTextSecondary: "#716E68",
    colorBackground: "#FFFFFF",
    colorInputBackground: "#FAF8F5",
    colorInputText: "#141413",
    colorBorder: "#E7E4DF",
    colorInputBorder: "#E7E4DF",
    borderRadius: "0px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  elements: {
    card: {
      background: "#FFFFFF",
      border: "1px solid #E7E4DF",
      borderRadius: "0px",
      boxShadow: "none",
    },
    headerTitle: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: "400",
      fontSize: "24px",
      color: "#141413",
    },
    headerSubtitle: {
      fontSize: "12px",
      color: "#716E68",
    },
    socialButtonsBlockButton: {
      background: "#FAF8F5",
      border: "1px solid #E7E4DF",
      borderRadius: "0px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontSize: "11px",
      color: "#141413",
    },
    socialButtonsBlockButtonText: {
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontSize: "11px",
      color: "#141413",
    },
    dividerLine: {
      background: "#E7E4DF",
    },
    dividerText: {
      background: "#FFFFFF",
      color: "#716E68",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    formFieldLabel: {
      color: "#716E68",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    formFieldInput: {
      background: "#FAF8F5",
      border: "1px solid #E7E4DF",
      borderRadius: "0px",
      fontSize: "12px",
      color: "#141413",
    },
    formButtonPrimary: {
      background: "#141413",
      border: "1px solid #141413",
      borderRadius: "0px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontSize: "12px",
      fontWeight: "500",
    },
    footerAction: {
      color: "#716E68",
      fontSize: "11px",
    },
    footerActionLink: {
      color: "#C25E3E",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontSize: "11px",
    },
    backButton: {
      color: "#716E68",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontSize: "11px",
    },
  },
};

// Clerk dashboard instance is still named "Workfolio" — override the visible
// titles so the auth UI reads as Atelier (better long-term fix: rename the
// instance in the Clerk dashboard, then this can be removed).
const clerkLocalization = {
  signIn: {
    start: {
      title: "Sign in to Atelier",
    },
  },
  signUp: {
    start: {
      title: "Join Atelier",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={clerkAppearance}
      localization={clerkLocalization}
    >
      <html lang="en">
        <body className="min-h-screen text-[#1B1C1A] font-sans flex flex-col antialiased selection:bg-[#C25E3E] selection:text-white">
          <CustomizationProvider>
            <AppShell>{children}</AppShell>
          </CustomizationProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

