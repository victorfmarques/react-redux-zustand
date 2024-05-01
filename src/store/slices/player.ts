import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";


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
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
}

export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    const response = await api.get("/courses")
    return response.data
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },
    next: (state: PlayerState) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson)
        state.currentLessonIndex = nextLessonIndex
      else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    },)
    builder.addCase(loadCourse.fulfilled, (state, action: PayloadAction<Course>) => {
      state.isLoading = false
      state.course = action.payload
    },)
  }
})

export const player = playerSlice.reducer;

export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector(state => {
    const { currentLessonIndex, currentModuleIndex } = state.player;
    const lesson = state.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex]
    return lesson
  })
}

export const useCurrentModule = () => {
  return useAppSelector(state => {
    const { currentModuleIndex } = state.player;
    const module = state.player.course?.modules[currentModuleIndex]
    return module
  })
}
