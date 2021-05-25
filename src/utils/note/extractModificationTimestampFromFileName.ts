/**
 * @param fileName - Note file name in the format of "omni_<id>_<update_time>"
 */
export const extractModificationTimestampFromFileName = (fileName: string) => {
  return fileName.split('_')[2];
};
