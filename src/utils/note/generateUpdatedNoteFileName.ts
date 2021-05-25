/**
 * @param name - Note file name in the format of "omni_<id>_<update_time>"
 */
import { getTimestamp } from '@/utils/getTimestamp';

export const generateUpdatedNoteFileName = (name: string) => {
  const nameParts = name.split('_');
  nameParts[2] = getTimestamp().toString();
  return nameParts.join('_');
};
