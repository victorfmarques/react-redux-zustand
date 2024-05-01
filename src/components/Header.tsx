import { useCurrentLesson, useCurrentModule } from "../store/slices/player";

export function Header() {

  const module = useCurrentModule()
  const lesson = useCurrentLesson()

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold"> {lesson?.title}</h1>
      <span className="text-sm text-zinc-400"> Módulo "{module?.title}"</span>
    </div>
  )
}