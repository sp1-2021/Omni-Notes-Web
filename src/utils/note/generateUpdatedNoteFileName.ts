/**
 * @param name - Note file name in the format of "omni_<id>_<update_time>"
 * @param timestamp - Time used in updated field
 */
export const generateUpdatedNoteFileName = (
  name: string,
  timestamp: number
) => {
  const nameParts = name.split('_');
  nameParts[2] = timestamp.toString();
  return nameParts.join('_');
};
