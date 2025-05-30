import { Shield } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 border-t border-gray-800 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">ScamGuard</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
              Empowering scam victims with AI-powered legal assistance and professional documentation to seek justice.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/signin" className="text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/learn-more" className="text-gray-400 hover:text-white transition-colors">
                  Learn More
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-400 hover:text-white transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-slate-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            &copy; 2024 ScamGuard. All rights reserved. Helping victims seek justice through technology.
          </p>
        </div>
      </div>
    </footer>
  )
}
