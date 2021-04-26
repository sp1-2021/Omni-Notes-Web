import React from 'react';
import { getSession, signOut, useSession } from 'next-auth/client';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';
import dynamic from 'next/dynamic';
import { Remarkable } from 'remarkable';

import 'react-markdown-editor-lite/lib/index.css';
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});
const remarkable = new Remarkable();

const Home: React.FC = () => {
  const { t, lang } = useTranslation();
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Stack>
      <Heading>
        {t('common:app_name')} - {t('home:title')}
      </Heading>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button onClick={() => setLanguage(lang === 'en' ? 'pl' : 'en')}>
        {t('common:switch_lang')}
      </Button>
      <Button onClick={() => signOut()}>{t('common:sign_out')}</Button>
      <MdEditor
        style={{ height: '500px' }}
        renderHTML={(text) => remarkable.render(text)}
      />
    </Stack>
  );
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
