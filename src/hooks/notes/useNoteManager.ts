import { useCallback } from 'react';
import { useNoteList } from '@/hooks/notes/useNoteList';
import { useToast } from '@/hooks/utils/useToast';
import { useAxios } from '@/lib/axios/useAxios';
import { Note } from '@/types/note/note';

export const useNoteManager = () => {
  const toast = useToast();
  const axios = useAxios();
  const { revalidate } = useNoteList();

  const create = useCallback(
    async (title: string) => {
      try {
        await axios.post('notes', { title });
        revalidate();
        toast({
          title: 'Hooray!',
          status: 'success',
          description: 'Your new note is ready to go!',
        });
      } catch (error) {
        toast({
          title: 'Whopsss...',
          status: 'error',
          description:
            'An error has occured while creating your note. Please try again!',
        });
        console.error(error);
      }
    },
    [axios, revalidate, toast]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`notes/${id}`);
        revalidate();
        toast({
          title: 'Hooray!',
          status: 'success',
          description: 'Selected note has been successfuly deleted',
        });
      } catch (error) {
        toast({
          title: 'Whopsss...',
          status: 'error',
          description:
            'An error has occured while deleting selected note. Please try again!',
        });
        console.error(error);
      }
    },
    [axios, revalidate, toast]
  );

  const fetch = useCallback(
    async (id: string) => {
      try {
        const response = await axios.get<Note>(`notes/${id}`);
        return response.data;
      } catch (error) {
        toast({
          title: 'Whopsss...',
          status: 'error',
          description:
            'An error has occurred while trying to fetch note content. Please try again!',
        });
        console.error(error);
      }
    },
    [axios, toast]
  );

  const update = useCallback(
    async (id: string, note: Partial<Note>) => {
      try {
        return await axios.put(`notes/${id}`, { note });
      } catch (error) {
        toast({
          title: 'Whopsss...',
          status: 'error',
          description:
            'An error has occurred while trying to fetch note content. Please try again!',
        });
        console.error(error);
      }
    },
    [axios, toast]
  );

  return {
    create,
    remove,
    fetch,
    update,
  };
};
