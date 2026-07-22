export type OpenWhenNote = {
  id: string;
  label: string;
  text: string;
};

export const openWhenNotes: OpenWhenNote[] = [
  {
    id: "saudade",
    label: "Sentir saudade",
    text: "Escreva aqui o que você diria pra ela num momento de saudade da equipe, dos treinos, de tudo isso."
  },
  {
    id: "desanimada",
    label: "Estiver desanimada",
    text: "Escreva aqui algo que a incentive quando ela estiver sem ânimo — lembre ela do motivo de continuar."
  },
  {
    id: "coragem",
    label: "Precisar de coragem",
    text: "Escreva aqui algumas palavras de coragem pra quando ela estiver enfrentando algo difícil."
  },
  {
    id: "orgulho",
    label: "Estiver orgulhosa de si",
    text: "Escreva aqui o quanto você também tem orgulho dela, e por quê."
  },
  {
    id: "duvida",
    label: "Duvidar de si mesma",
    text: "Escreva aqui algo para lembrá-la do quanto ela é capaz, mesmo quando ela duvidar disso."
  },
  {
    id: "comeco",
    label: "Quiser lembrar do começo",
    text: "Escreva aqui uma lembrança do início de tudo, de quando essa história começou."
  }
];
