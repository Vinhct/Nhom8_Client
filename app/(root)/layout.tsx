import type { Metadata } from "next";
import "../globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Borelle Store",
  description: "Cửa hàng quần áo Borelle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToasterProvider />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
