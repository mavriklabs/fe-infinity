import type { FC } from 'react';
interface Props {
  trait: any;
  description: string;
}

export const Trait: FC<Props> = ({ trait, description }) => {
  return (
    <div className="border border-gray-400 rounded-3xl px-5 py-5 flex flex-col justify-between">
      <div>
        <p className="text-center text-sm text-theme-light-800 mb-1 font-body">{trait.trait_type}</p>
        <p className="text-center text-sm font-body font-semibold">{trait.value}</p>
      </div>
      <p className="text-center text-xs text-theme-light-800 bg-theme-light-300 rounded-3xl py-1 mt-3 font-body tracking-tighter">
        {description}
      </p>
    </div>
  );
};

export default Trait;
