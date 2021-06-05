import { combine } from 'zustand/middleware';
import create from 'zustand';

export type NoteState = ReturnType<typeof useNoteStore.getState>;

export const useNoteStore = create(
  combine({ selectedNoteId: null, isLoading: false }, (set) => ({
    setSelectedNoteId: (noteId: string | null) =>
      set({ selectedNoteId: noteId }),
    setLoading: (isLoading: boolean) => set({ isLoading }),
  }))
);

export const selectSelectedNoteId = (state: NoteState) => state.selectedNoteId;
export const selectIsLoading = (state: NoteState) => state.isLoading;
export const selectSelectedNoteIdSetter = (state: NoteState) =>
  state.setSelectedNoteId;
export const selectLoadingSetter = (state: NoteState) => state.setLoading;
