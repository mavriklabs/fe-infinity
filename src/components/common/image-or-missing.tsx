import { MISSING_IMAGE_URL } from 'src/utils';

interface Props {
  src?: string;
}

export const ImageOrMissing = ({ src }: Props) => {
  let imageComponent;

  if (src && !src.startsWith('ipfs')) {
    imageComponent = (
      <img
        src={src}
        className="w-full rounded-3xl"
        alt="image url"
        style={{ objectFit: 'cover', transition: 'opacity 400ms ease 0s', height: '100%' }}
      />
    );
  } else {
    imageComponent = (
      <img src={MISSING_IMAGE_URL} className="p-16 opacity-10" alt="image url" style={{ objectFit: 'contain' }} />
    );
  }

  return imageComponent;
};
