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
    async (note: Note) => {
      try {
        await axios.post('notes', note);
        revalidate();
        toast({
          title: 'Sukces',
          status: 'success',
          description: 'Pomyślnie utworzono nową notatkę!',
        });
      } catch (error) {
        toast({
          title: 'Upsss...',
          status: 'error',
          description: 'Podczas tworzenia notatki wystąpił błąd',
        });
        console.error(error);
      }
    },
    [axios, revalidate, toast]
  );

  const remove = useCallback(async (id: string) => {
    try {
      await axios.delete(`notes/${id}`);
      revalidate();
      toast({
        title: 'Sukces',
        status: 'success',
        description: 'Pomyślnie usunięto notatkę',
      });
    } catch (error) {
      toast({
        title: 'Upsss...',
        status: 'error',
        description: 'Podczas usuwania notatki wystąpił błąd',
      });
      console.error(error);
    }
  }, []);

  return {
    create,
    remove,
  };
};
