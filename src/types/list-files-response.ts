export interface ListFilesResponse {
  id: string;
  modifiedTime: string;
  properties: {
    title: string;
    excerpt: string;
  };
}
