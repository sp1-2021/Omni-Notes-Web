import { combine } from 'zustand/middleware';
import create from 'zustand';

export type NoteState = ReturnType<typeof useNoteStore.getState>;

export enum NoteListFilter {
  DEFAULT = '',
  ARCHIVED = '?filter=archived',
  TRASHED = '?filter=trashed',
}

export const useNoteStore = create(
  combine(
    {
      filter: NoteListFilter.DEFAULT,
      selectedNoteId: null,
      isLoading: false,
    },
    (set) => ({
      setSelectedNoteId: (noteId: string | null) =>
        set({ selectedNoteId: noteId }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setFilter: (filter: NoteListFilter) => set({ filter }),
    })
  )
);

export const selectSelectedNoteId = (state: NoteState) => state.selectedNoteId;
export const selectIsLoading = (state: NoteState) => state.isLoading;
export const selectSelectedNoteIdSetter = (state: NoteState) =>
  state.setSelectedNoteId;
export const selectLoadingSetter = (state: NoteState) => state.setLoading;
export const selectNoteListFilter = (state: NoteState) => state.filter;
export const selectNoteListFilterSetter = (state: NoteState) => state.setFilter;
