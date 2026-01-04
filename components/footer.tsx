import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 overflow-x-hidden">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">Shopz</h2>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            Online brand clothing founded in 2008 in Japan. Heavenly focuses on selling only quality and branded items,
            limited edition collections by best fashion designer.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-6">About Us</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Information
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Store Locator
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Bulk Purchase
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Alteration Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-6">Help</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Online Shopping Guide
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-6">Social Media</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Twitter className="w-4 h-4" />
              <Link href="#" className="hover:text-white">
                Twitter
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Facebook className="w-4 h-4" />
              <Link href="#" className="hover:text-white">
                Facebook
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="w-4 h-4" />
              <Link href="#" className="hover:text-white">
                Instagram
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Youtube className="w-4 h-4" />
              <Link href="#" className="hover:text-white">
                Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 overflow-x-hidden">
        <p>@Shopz 2023. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}
