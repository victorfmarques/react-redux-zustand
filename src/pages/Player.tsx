import { useEffect } from "react"

import { MessageCircle } from "lucide-react"
import { Header } from "../components/Header"
import { Module } from "../components/Module"
import { Video } from "../components/Video"
import { useAppSelector } from "../store"
import { start, useCurrentLesson } from "../store/slices/player"
import { api } from "../lib/axios"
import { useDispatch } from "react-redux"


export function Player() {
  const dispatch = useDispatch()
  const modules = useAppSelector(state => state.player.course?.modules)

  const currentLesson = useCurrentLesson()

  useEffect(() => {
    document.title = `Assistindo ${currentLesson?.title}`
  }, [currentLesson])

  useEffect(() => {
    api.get("/courses").then(response => dispatch((start(response.data))))
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-4 py-2 txt-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" /> Deixar feedack
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">

          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbrar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules && modules.map((module, index) =>
              <Module
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOfLessons={module.lessons.length}
              />)}
          </aside>
        </main>
      </div>
    </div>
  )
}