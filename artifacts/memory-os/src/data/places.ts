export type Place = {
  order: number;
  title: string;
  location?: string;
  city: string;
  neighborhood?: string;
  date: string;
  lat: number;
  lng: number;
  photo: string;
  description: string;
};

export const places: Place[] = [
  {
    order: 1,
    title: "Primeira visita ao SENAI",
    location: "SENAI Morvan Figueiredo",
    city: "São Paulo",
    neighborhood: "Mooca",
    date: "07/08/2025",
    lat: -23.5582,
    lng: -46.6027,
    photo: "https://picsum.photos/seed/pl1/600/400",
    description: "Primeira visita técnica realizada nesse dia."
  },
  {
    order: 2,
    title: "Segunda visita ao SENAI",
    location: "SENAI Roberto Simonsen",
    city: "São Paulo",
    neighborhood: "Brás",
    date: "07/08/2025",
    lat: -23.5397,
    lng: -46.6215,
    photo: "https://picsum.photos/seed/pl2/600/400",
    description: "Continuação das visitas técnicas."
  },
  {
    order: 3,
    title: "Terceira visita ao SENAI",
    location: "SENAI Orlando Laviero Ferraiuolo",
    city: "São Paulo",
    neighborhood: "Tatuapé",
    date: "07/08/2025",
    lat: -23.5416,
    lng: -46.5758,
    photo: "https://picsum.photos/seed/pl3/600/400",
    description: "Última visita técnica do dia."
  },
  {
    order: 4,
    title: "Cinema — Lilo & Stitch",
    location: "Shopping Metrô Itaquera",
    city: "São Paulo",
    neighborhood: "Itaquera",
    date: "30/05/2025",
    lat: -23.5386,
    lng: -46.4676,
    photo: "https://picsum.photos/seed/pl4/600/400",
    description: "Nosso dia no cinema assistindo Lilo & Stitch."
  },
  {
    order: 5,
    title: "Torneio Interno 2025",
    location: "SESI AE Carvalho",
    city: "São Paulo",
    neighborhood: "AE Carvalho",
    date: "2025",
    lat: -23.5413,
    lng: -46.4950,
    photo: "https://picsum.photos/seed/pl5/600/400",
    description: "Primeiro torneio da temporada."
  },
  {
    order: 6,
    title: "Museus da USP",
    location: "Museu de Arqueologia, Museu de Zoologia e Instituto de Geociências",
    city: "São Paulo",
    neighborhood: "Butantã",
    date: "Setembro de 2025",
    lat: -23.5594,
    lng: -46.7268,
    photo: "https://picsum.photos/seed/pl6/600/400",
    description: "Visita cultural incrível."
  },
  {
    order: 7,
    title: "Visita Técnica",
    location: "Empresa de Engenharia",
    city: "São Paulo",
    date: "2025",
    lat: -23.5500,
    lng: -46.6333,
    photo: "https://picsum.photos/seed/pl7/600/400",
    description: "Visita técnica à empresa de engenharia."
  },
  {
    order: 8,
    title: "Regional FLL",
    location: "SESI Mogi das Cruzes",
    city: "Mogi das Cruzes",
    date: "04/12/2025",
    lat: -23.5206,
    lng: -46.1854,
    photo: "https://picsum.photos/seed/pl8/600/400",
    description: "Primeira grande competição da temporada."
  },
  {
    order: 9,
    title: "Camp de Preparação",
    location: "Presidente Epitácio",
    city: "Presidente Epitácio",
    date: "26/01/2026",
    lat: -21.7635,
    lng: -52.1156,
    photo: "https://picsum.photos/seed/pl9/600/400",
    description: "Dias intensos de aprendizado e preparação para o Nacional."
  },
  {
    order: 10,
    title: "Festival Nacional FLL",
    location: "Parque Ibirapuera",
    city: "São Paulo",
    neighborhood: "Vila Mariana",
    date: "04/03/2026",
    lat: -23.5874,
    lng: -46.6576,
    photo: "https://picsum.photos/seed/pl10/600/400",
    description: "O maior momento da nossa jornada até aqui."
  },
  {
    order: 11,
    title: "Torneio Interno 2026",
    location: "SESI Ipiranga",
    city: "São Paulo",
    neighborhood: "Ipiranga",
    date: "2026",
    lat: -23.5898,
    lng: -46.6019,
    photo: "https://picsum.photos/seed/pl11/600/400",
    description: "Mais um capítulo importante da nossa história."
  }
];
