import React from 'react';
import { getSession, useSession } from 'next-auth/client';
import { Box, Container, HStack, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Editor } from '@/components/editor/Editor';
import { Navbar } from '@/components/navbar/Navbar';
import { NoteList } from '@/components/notes/NoteList';
import { Sidebar } from '@/components/sidebar/Sidebar';

const Home: React.FC = () => {
  const { t, lang } = useTranslation();
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Stack height="full" spacing={0}>
      <Navbar />
      <Stack direction="row" spacing={0} height="full">
        <Box maxWidth="260px" width="full">
          <Sidebar />
        </Box>
        <Box maxWidth="500px" width="full">
          <NoteList />
        </Box>
        <Box flex={1}>
          <Editor initialEditType="wysiwyg" />
        </Box>
      </Stack>
    </Stack>
  );

  // return (
  //   <Stack>
  //     <Heading>
  //       {t('common:app_name')} - {t('home:title')}
  //     </Heading>
  //     <pre>{JSON.stringify(session, null, 2)}</pre>
  //     <Button onClick={() => setLanguage(lang === 'en' ? 'pl' : 'en')}>
  //       {t('common:switch_lang')}
  //     </Button>
  //     <Button onClick={() => signOut()}>{t('common:sign_out')}</Button>
  //     <MdEditor
  //       style={{ height: '500px' }}
  //       renderHTML={(text) => remarkable.render(text)}
  //     />
  //   </Stack>
  // );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/api/auth/signin',
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
