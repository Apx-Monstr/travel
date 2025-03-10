"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobeIcon, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destination/egypt" },
    { name: "Customize", href: "/customize" },
    { name: "Contact", href: "/get-in-touch" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <GlobeIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">TravelExplorer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
          <Link href="/get-in-touch">
            <Button>Get in Touch</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/get-in-touch" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get in Touch</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

