export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: string;
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "primeiro-treino",
    date: "2024",
    title: "Primeiro treino",
    description: "Escreva aqui como foi o primeiro dia, o que vocês sentiram, o que ainda não sabiam que viria.",
    photo: "/photos/placeholder-1.jpg"
  },
  {
    id: "primeiro-campeonato",
    date: "2024",
    title: "Primeiro campeonato",
    description: "Conte a história desse dia: o nervosismo, a torcida, o resultado.",
    photo: "/photos/placeholder-2.jpg"
  },
  {
    id: "primeiras-risadas",
    date: "2024",
    title: "Primeiras risadas",
    description: "Aquele momento bobo que virou piada interna da equipe.",
    photo: "/photos/placeholder-3.jpg"
  },
  {
    id: "dias-dificeis",
    date: "2024",
    title: "Dias difíceis",
    description: "Um momento de dificuldade que vocês superaram juntas.",
    photo: "/photos/placeholder-4.jpg"
  },
  {
    id: "conquistas",
    date: "2025",
    title: "Conquistas",
    description: "A conquista da qual você mais se orgulha.",
    photo: "/photos/placeholder-5.jpg"
  },
  {
    id: "nacionais",
    date: "2025",
    title: "Nacionais",
    description: "O que significou chegar até ali.",
    photo: "/photos/placeholder-6.jpg"
  },
  {
    id: "viagens",
    date: "2025",
    title: "Viagens",
    description: "Uma lembrança de alguma viagem da equipe.",
    photo: "/photos/placeholder-7.jpg"
  },
  {
    id: "momentos-especiais",
    date: "2025",
    title: "Momentos especiais",
    description: "Um momento só de vocês duas, fora da robótica.",
    photo: "/photos/placeholder-8.jpg"
  }
];
