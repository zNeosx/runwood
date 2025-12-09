import React from 'react';
import Image from 'next/image';

const Sticker = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Conteneur du Sticker */}
      <div className="relative w-64 h-64 group cursor-pointer">
        {/* 1. Le fond vert (ce qu'on voit SOUS le sticker quand il se décolle) */}
        <div className="absolute inset-0 bg-green-700 rounded-full"></div>

        {/* 2. Le Sticker principal (Docker Hub) */}
        {/* On utilise clip-path pour "couper" le coin en bas à droite */}
        <div
          className="absolute inset-0 bg-white rounded-full flex items-center justify-center z-10 transition-all duration-300 ease-in-out"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)',
            // Ce polygone coupe le coin bas-droit
          }}
        >
          {/* Logo Docker (ou votre image) */}
          <div className="relative w-40 h-40">
            {/* Remplacez par votre source d'image */}
            <Image
              src="/images/IMG-20251201-WA0012.jpg"
              alt="Docker Logo"
              fill
              style={{ objectFit: 'contain' }}
            />
            <h2 className="absolute -bottom-4 w-full text-center font-bold text-gray-700 text-2xl">
              docker HUB
            </h2>
          </div>
        </div>

        {/* 3. L'effet de "Pli" (Le coin corné) */}
        {/* C'est un triangle positionné en bas à droite avec un dégradé pour simuler la 3D */}
        <div className="absolute bottom-0 right-0 w-[20%] h-[20%] z-20">
          {/* La partie repliée (dos du sticker) */}
          <div className="absolute inset-0 bg-gray-200 rounded-tl-xl shadow-[-5px_-5px_10px_rgba(0,0,0,0.3)]">
            {/* Ajout d'un dégradé pour le réalisme du papier courbé */}
            <div className="w-full h-full bg-gradient-to-br from-white via-gray-200 to-gray-400 opacity-80 rounded-tl-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sticker;
