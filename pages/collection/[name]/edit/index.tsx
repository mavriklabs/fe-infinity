import { BaseCollection } from '@infinityxyz/lib/types/core';
import { useRouter } from 'next/router';
import React from 'react';
import { AvatarImage } from 'src/components/collection/avatar-image';
import SocialsInputGroup from 'src/components/collection/socials-input-group';
import { Button, TextAreaInputBox, TextInputBox } from 'src/components/common';
import { Heading } from 'src/components/common/heading';
import logo from 'src/images/logo-mini-new.svg';
import { useFetch } from 'src/utils';

const spaces = {
  article: 'space-y-5'
};

export default function EditCollectionPage() {
  const router = useRouter();
  const { result: collection } = useFetch<BaseCollection>(
    router.query.name ? `/collections/${router.query.name}` : '',
    { chainId: '1' }
  );

  return (
    <div className="transition w-[100vw] h-[100vh] overflow-y-auto">
      <header className="flex justify-between p-5">
        <img alt="logo" src={logo.src} width={logo.width} />
        <nav className="flex flex-row space-x-2">
          <Button variant="outline" onClick={router.back}>
            Cancel
          </Button>
          <Button>Save</Button>
        </nav>
      </header>
      <main className="flex flex-col my-4 mx-auto w-144 space-y-5">
        <article className="flex flex-row items-center">
          <AvatarImage url={collection?.metadata.profileImage} size="large" />
          <div className="flex flex-col space-y-2 ml-2">
            <Button>Upload</Button>
            <Button variant="outline">Delete</Button>
          </div>
        </article>

        <article className={spaces.article}>
          <Heading as="h3">Edit collection</Heading>
          <TextInputBox
            label="Collection name"
            value=""
            type="text"
            onChange={console.log}
            placeholder="Vortex"
            isFullWidth
          />
          <TextAreaInputBox
            label="Description"
            value=""
            onChange={console.log}
            placeholder=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum."
            rows={7}
          />
        </article>

        <article className={spaces.article}>
          <Heading as="h3">Socials</Heading>
          <SocialsInputGroup>
            <TextInputBox
              label="Twitter"
              value=""
              type="text"
              onChange={console.log}
              placeholder="twitter.com/name"
              isFullWidth
            />
            <TextInputBox
              label="Instagram"
              value=""
              type="text"
              onChange={console.log}
              placeholder="instagram.com/name"
              isFullWidth
            />
          </SocialsInputGroup>
          <SocialsInputGroup>
            <TextInputBox
              label="Facebook"
              value=""
              type="text"
              onChange={console.log}
              placeholder="facebook.com/name"
              isFullWidth
            />
            <TextInputBox
              label="Discord"
              value=""
              type="text"
              onChange={console.log}
              placeholder="discord.com/invite"
              isFullWidth
            />
          </SocialsInputGroup>
          <Button variant="gray" className="w-full">
            Add social
          </Button>
        </article>
      </main>
    </div>
  );
}
