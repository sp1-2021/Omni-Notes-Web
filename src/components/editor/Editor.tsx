import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';
import { Text } from '@chakra-ui/react';

export const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((imported) => imported.Editor),
  {
    ssr: false,
    loading: () => <Text p={8}>Loading the editor...</Text>,
  }
) as React.FC<EditorProps>;
