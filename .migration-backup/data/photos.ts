export type Photo = {
  id: string;
  src: string;
  caption: string;
};

// Troque "src" pelas fotos reais em /public/photos e escreva as legendas.
export const photos: Photo[] = [
  { id: "p1", src: "/photos/placeholder-1.jpg", caption: "Escreva aqui a legenda dessa foto." },
  { id: "p2", src: "/photos/placeholder-2.jpg", caption: "Escreva aqui a legenda dessa foto." },
  { id: "p3", src: "/photos/placeholder-3.jpg", caption: "Escreva aqui a legenda dessa foto." },
  { id: "p4", src: "/photos/placeholder-4.jpg", caption: "Escreva aqui a legenda dessa foto." },
  { id: "p5", src: "/photos/placeholder-5.jpg", caption: "Escreva aqui a legenda dessa foto." },
  { id: "p6", src: "/photos/placeholder-6.jpg", caption: "Escreva aqui a legenda dessa foto." }
];
