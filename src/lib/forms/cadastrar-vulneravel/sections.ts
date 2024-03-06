export const sections = [
  {
    label: "Situação Familiar",
    value: "situacaoFamiliar",
    items: [
      "nome",
      "total_adultos",
      "moradia",
      "problemas_saude_familia",
      "despesas_saude",
      "perdas_catastrofes",
    ] as const,
  },
  {
    label: "Solicitações",
    value: "solicitacoes",
    items: [] as const,
  },
] as const;
