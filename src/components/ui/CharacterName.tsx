import type { Character } from '@/types';

type Props = {
  character: Character;
};

export default function CharacterName({ character }: Props) {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-base-content mb-4">
        {character.name_ja}
      </h1>
      
      {character.description && (
        <p className="text-lg text-base-content/80 leading-relaxed">
          {character.description}
        </p>
      )}
    </div>
  );
}