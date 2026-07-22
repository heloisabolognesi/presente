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
    title: "Quando eu descobri a sua existência",
    description: "Nunca esquecerei do (Oque vc faz aqui no SESI - Porra nenhuma) e desde então eu sabia que vc se tornaria especial ",
    photo: "/photos/foto1.jpg"
  },
  {
    id: "primeiro-campeonato",
    date: "2024",
    title: "Quando a gente trocou presente de natal",
    description: "Eu adoro lembra desse dia, foi meio imprevísivel, a gente pegou uma baita chuva e ficamos presas no clube. Mas foi muito especial",
    photo: "/photos/foto2.jpg"
  },
  {
    id: "primeiras-risadas",
    date: "2025",
    title: "Cinema - Lilo & Stitch",
    description: "Eu lembro que comentei uma vez que iriamos assistir juntas, três meses antes de lançar o filme. E você não esqueceu. Desde então, passei a priorizar assistir meus filmes preferidos com você.",
    photo: "/photos/foto4.jpg"
  },
  {
    id: "torneio-interno",
    date: "2025",
    title: "Torneio Interno",
    description: "Esses com certeza foi um dos dias mais importantes pra mim. Um evento que parecia tão simples despertou minha paixão pela robótica. Obrigada mais uma vez. ps: eu amo essa foto demais!!",
    photo: "/photos/foto3.jpg"
  },
  {
    id: "conquistas",
    date: "2025",
    title: "Regional UNEARTHED",
    description: "Acredito que não tenho que falar muito sobre esse dia, porque o tanto que eu chorei foi brincadira.",
    photo: "/photos/foto5.jpg"
  },
  {
    id: "nacionais",
    date: "2026",
    title: "Camp - Epitácio",
    description: "É um pouco difícil dizer sobre Epitácio, admito que foi meio tenebroso. Mas eu lembro no ônibus quando olhamos uma pra cara da outra e falamos 'Cara, a gente ta indo pra Epitácio juntas, quando isso era possível de acontecer?' Naquele momento, percebi que estava realizando um sonho que eu nem sabia que existia.",
    photo: "/photos/foto6.jpg"
  },
  {
    id: "viagens",
    date: "2026",
    title: "Nacional",
    description: "Lembrar do Nacional é lembrar de como vc é incrível, na sua primeira temporada como técnica simplesmente leva uma equipe sem experiência alguma a um Nacional. Fora que vc me deu a oportunidade de soltar um round. Obrigada, Obrigada, Obrigada",
    photo: "/photos/foto7.jpg"
  },
  {
    id: "momentos-especiais",
    date: "2026",
    title: "Torneio Interno Ipiranga",
    description: "Esse pode parecer simples, mas o fato deu ter sido juíza de sala foi como realizar um sonho. Foi uma experiência excepcional, eu fiquei genuinamente feliz.",
    photo: "/photos/foto8.jpg"
  }
];
