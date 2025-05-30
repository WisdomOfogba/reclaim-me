import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-black dark:via-gray-900 dark:to-gray-700  flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have wandered off into the
            digital void. Don&apos;t worry though – we&apos;ll help you find
            your way back!
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:bg-black px-8 py-3 rounded-lg transition-all duration-300 w-full"
          >
            <Link href="/contact" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/help"
              className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2"
            >
              Visit our help center
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2"
            >
              get in touch
            </Link>
          </p>
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 dark:from-purple-400/70 dark:to-blue-400/70 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-purple-400/70 dark:to-blue-400/70 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
