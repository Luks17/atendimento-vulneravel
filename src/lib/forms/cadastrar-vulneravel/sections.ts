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
    items: ["cesta_basica"] as const,
  },
] as const;
