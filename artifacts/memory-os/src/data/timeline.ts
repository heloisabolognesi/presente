export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: string;
};

// Substitua "photo" pelas fotos reais (coloque os arquivos em /public/photos)
export const timelineEvents: TimelineEvent[] = [
  {
    id: "primeiro-treino",
    date: "2024",
    title: "Primeiro treino",
    description: "Escreva aqui como foi o primeiro dia, o que vocês sentiram, o que ainda não sabiam que viria.",
    photo: "https://picsum.photos/seed/tl1/600/450"
  },
  {
    id: "primeiro-campeonato",
    date: "2024",
    title: "Primeiro campeonato",
    description: "Conte a história desse dia: o nervosismo, a torcida, o resultado.",
    photo: "https://picsum.photos/seed/tl2/600/450"
  },
  {
    id: "primeiras-risadas",
    date: "2024",
    title: "Primeiras risadas",
    description: "Aquele momento bobo que virou piada interna da equipe.",
    photo: "https://picsum.photos/seed/tl3/600/450"
  },
  {
    id: "dias-dificeis",
    date: "2024",
    title: "Dias difíceis",
    description: "Um momento de dificuldade que vocês superaram juntas.",
    photo: "https://picsum.photos/seed/tl4/600/450"
  },
  {
    id: "conquistas",
    date: "2025",
    title: "Conquistas",
    description: "A conquista da qual você mais se orgulha.",
    photo: "https://picsum.photos/seed/tl5/600/450"
  },
  {
    id: "nacionais",
    date: "2025",
    title: "Nacionais",
    description: "O que significou chegar até ali.",
    photo: "https://picsum.photos/seed/tl6/600/450"
  },
  {
    id: "viagens",
    date: "2025",
    title: "Viagens",
    description: "Uma lembrança de alguma viagem da equipe.",
    photo: "https://picsum.photos/seed/tl7/600/450"
  },
  {
    id: "momentos-especiais",
    date: "2025",
    title: "Momentos especiais",
    description: "Um momento só de vocês duas, fora da robótica.",
    photo: "https://picsum.photos/seed/tl8/600/450"
  }
];
