import { useAppSelector } from "../store";
import { useCurrentLesson, useCurrentModule } from "../store/slices/player";

export function Header() {

  const module = useCurrentModule()
  const lesson = useCurrentLesson()
  const isCourseLoading = useAppSelector(state => state.player.isLoading)

  if (isCourseLoading) {
    return (
      <h1 className="text-2xl font-bold"> Carregando... </h1>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold"> {lesson?.title}</h1>
      <span className="text-sm text-zinc-400"> Módulo "{module?.title}"</span>
    </div>
  )
}