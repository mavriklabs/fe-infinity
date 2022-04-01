import React from 'react';
import Head from 'next/head';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Header = ({ children, title = 'Home' }: Props) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>{title} | Infinity</title>
      </Head>
      {children}
    </>
  );
};

export default Header;
