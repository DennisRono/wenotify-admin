import Link from 'next/link'
import { Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 blur-lg" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-center text-gray-700 dark:text-gray-300">
            Page Not Found
          </h2>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col space-y-4 mt-8">
          <Link href="/analytics">
            <Button className="w-full py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-medium rounded-lg text-sm px-5 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            You might be looking for:
          </h3>
          <ul className="space-y-3">
            {['Home', 'Login', 'Contact Us', 'Help Center'].map(item => (
              <li key={item}>
                <Link
                  href={
                    item === 'Home'
                      ? '/'
                      : `/${item.toLowerCase().replace(/\s+/g, '-')}`
                  }
                  className="flex items-center text-sm text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  <span className="mr-2">→</span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Need assistance?{' '}
          <Link
            href="/contact"
            className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
