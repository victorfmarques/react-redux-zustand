import { create } from "zustand";
import { api } from "../lib/axios";


interface Lesson {
  id: string,
  title: string
  duration: string
}

interface Module {
  id: number
  title: string
  lessons: Array<Lesson>
}

interface Course {
  id: number,
  modules: Array<Module>
}

interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean

  load: () => Promise<void>
  play: (moduleAndLessoIndex: [number, number]) => void
  next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: false,

    load: async () => {
      set({ isLoading: true })
      const response = await api.get("/courses")
      set({
        course: response.data,
        isLoading: false
      })
    },
    play: (moduleAndLessonIndex: [number, number]) => {
      const [currentModuleIndex, currentLessonIndex] = moduleAndLessonIndex
      set({
        currentModuleIndex: currentModuleIndex,
        currentLessonIndex: currentLessonIndex
      })
    },
    next: () => {
      const { currentModuleIndex, currentLessonIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson)
        set({ currentLessonIndex: nextLessonIndex })
      else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0
          })
        }
      }
    }
  }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentLessonIndex, currentModuleIndex } = state;
    const lesson = state.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
    return lesson
  })
}

export const useCurrentModule = () => {
  return useStore(state => {
    const { currentModuleIndex } = state;
    const module = state.course?.modules[currentModuleIndex]
    return module
  })
}
