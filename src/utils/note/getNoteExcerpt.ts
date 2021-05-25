import { Note } from '@/types/note/note';

/**
 * Extract excerpt from note content by removing all redundant
 * whitespaces and returning first 117 characters
 *
 * (Excerpt is stored as Google Drive file metadata property,
 * which is a key-value pair. The maximum size of this pair is 124B,
 * and the key "excerpt" takes 7B from that pool, so we return 117 characters.)
 */
export const getNoteExcerpt = (content: string) => {
  return content ? content.replace(/\s+/g, ' ').trim().substr(0, 117) : '';
};
