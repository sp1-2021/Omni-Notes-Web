export interface ListFilesResponse {
  id: string;
  name: string;
  properties: {
    title: string;
    excerpt: string;
    trashed: string;
  };
}
