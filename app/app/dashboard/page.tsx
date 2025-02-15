"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, Play, Plus } from "lucide-react"
import Image from "next/image"

interface Song {
  id: string
  title: string
  votes: number
  thumbnail: string
}

export default function Dashboard() {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [currentVideo, setCurrentVideo] = useState("")
  const [songs, setSongs] = useState<Song[]>([])
  const [error, setError] = useState("")

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractVideoId(youtubeUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      return
    }
    setError("")

    try {
      const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
      const data = await response.json()
      const newSong: Song = {
        id: videoId,
        title: data.title,
        votes: 0,
        thumbnail: data.thumbnail_url,
      }
      setSongs((prevSongs) => [...prevSongs, newSong])
      setYoutubeUrl("")
    } catch (error) {
      setError("Error fetching video information")
    }
  }

  const playSong = (id: string) => {
    setCurrentVideo(id)
  }

  const vote = (id: string, increment: number) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) => (song.id === id ? { ...song, votes: song.votes + increment } : song)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Music Stream Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4">
              {currentVideo ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">No video selected</div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="flex-grow bg-gray-800 border-gray-700"
              />
              <Button type="submit">
                <Plus className="mr-2 h-5 w-5" />
                Add
              </Button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {currentVideo && (
              <div className="flex justify-center gap-4 mb-8">
                <Button variant="outline" size="lg" onClick={() => vote(currentVideo, 1)}>
                  <ThumbsUp className="mr-2 h-5 w-5" />
                  Upvote
                </Button>
                <Button variant="outline" size="lg" onClick={() => vote(currentVideo, -1)}>
                  <ThumbsDown className="mr-2 h-5 w-5" />
                  Downvote
                </Button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Song Queue</h2>
            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
              {songs.length === 0 ? (
                <p className="text-gray-500 text-center">No songs in the queue</p>
              ) : (
                songs.map((song) => (
                  <div key={song.id} className="flex items-center space-x-4">
                    <Image
                      src={song.thumbnail || "/placeholder.svg"}
                      alt={song.title}
                      width={80}
                      height={60}
                      className="rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium truncate">{song.title}</h3>
                      <p className="text-sm text-gray-400">{song.votes} votes</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => playSong(song.id)}>
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

