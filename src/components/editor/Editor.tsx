import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';

export const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((imported) => imported.Editor),
  {
    ssr: false,
  }
) as React.FC<EditorProps>;
