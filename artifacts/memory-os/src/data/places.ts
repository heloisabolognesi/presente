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
    photo: "/photos/foto1.jpg",
    description: "Esse foi o dia que eu conheci meu Senai 🥹."
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
    photo: "/photos/senai.jpg",
    description: "Nesse dia tbm conhecemos o seu Senai, lembro de vc toda felizinha lá."
  },
  {
    order: 4,
    title: "Cinema — Lilo & Stitch",
    location: "Shopping Itaquera",
    city: "São Paulo",
    neighborhood: "Itaquera",
    date: "30/05/2025",
    lat: -23.5386,
    lng: -46.4676,
    photo: "/photos/filme.jpg",
    description: "Quando a gente foi assistir Stitch."
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
    photo: "/photos/torneio.jpg",
    description: "Primeiro torneio da temporada e da minha vida."
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
    photo: "/photos/foto15.jpg",
    description: "Amo demais essa fotooo."
  },
  {
    order: 7,
    title: "Visita Técnica",
    location: "Modine - Empresa de Engenharia",
    city: "São Paulo",
    date: "2025",
    lat: -23.5500,
    lng: -46.6333,
    photo: "/photos/foto16.jpg",
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
    photo: "/photos/foto17.jpg",
    description: "Me arrisco a dizer que esse foi um dos dias que mudou a minha vida "
  },
  {
    order: 9,
    title: "Camp",
    location: "Presidente Epitácio",
    city: "Presidente Epitácio",
    date: "26/01/2026",
    lat: -21.7635,
    lng: -52.1156,
    photo: "/photos/foto18.jpg",
    description: "Esses dias foram complicados mas eu viveria tudo de novo sem pensar duas vezes"
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
    photo: "/photos/foto19.jpg",
    description: "Foi meio turbulento, mas valeu muito a pena."
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
    photo: "/photos/foto8.jpg",
    description: "Foi muito especial"
  }
];
