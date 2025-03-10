import Link from "next/link"
import { GlobeIcon, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <GlobeIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TravelExplorer</span>
          </Link>
          <p className="text-muted-foreground mb-4">
            Discover the world with our expertly crafted travel experiences. Your dream vacation is just a click away.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/destination/egypt" className="text-muted-foreground hover:text-primary">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/customize" className="text-muted-foreground hover:text-primary">
                Customize Trip
              </Link>
            </li>
            <li>
              <Link href="/get-in-touch" className="text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Popular Destinations</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/destination/egypt" className="text-muted-foreground hover:text-primary">
                Egypt
              </Link>
            </li>
            <li>
              <Link href="/destination/bhutan" className="text-muted-foreground hover:text-primary">
                Bhutan
              </Link>
            </li>
            <li>
              <Link href="/destination/maldives" className="text-muted-foreground hover:text-primary">
                Maldives
              </Link>
            </li>
            <li>
              <Link href="/destination/bali" className="text-muted-foreground hover:text-primary">
                Bali
              </Link>
            </li>
            <li>
              <Link href="/destination/dubai" className="text-muted-foreground hover:text-primary">
                Dubai
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <span className="text-muted-foreground">info@travelexplorer.com</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <span className="text-muted-foreground">+91 7021440919</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TravelExplorer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

