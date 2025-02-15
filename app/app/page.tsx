import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Play, Users, Radio, Headphones } from "lucide-react"
import { Appbar } from "./components/Appbar";
import { Redirect } from "./components/Redirect";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Appbar />
      <Redirect/>
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">Let Your Fans Drive the Beat</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            FanTune: Where creators and fans unite to create the perfect streaming soundtrack.
          </p>
          <div className="space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-700">Start Streaming</Button>
            <Button className="bg-slate-100 hover:bg-slate-300 text-black">Learn More</Button>
          </div>
        </section>

        <section id="features" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
                <p>Build stronger connections with your fans through shared musical experiences.</p>
              </div>
              <div className="text-center">
                <Radio className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fan-Powered Playlists</h3>
                <p>Let your audience curate the perfect soundtrack for your stream.</p>
              </div>
              <div className="text-center">
                <Headphones className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fan-Powered Playlists</h3>
                <p>Let your audience curate the perfect soundtrack for your stream.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Revolutionize Your Streams?</h2>
            <Button className="bg-purple-600 hover:bg-purple-700">Join FanTune Today</Button>
            <Input
              className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 mt-4 mx-auto"
              placeholder="Enter your email"
              type="email" />
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">FanTune</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering creators and fans through interactive music streaming.</p>
          <nav>
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
          <p className="mt-6 text-sm text-gray-500">&copy; {new Date().getFullYear()} FanTune. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
