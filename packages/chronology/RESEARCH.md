# Fluxo de pesquisa histórica e científica

## Critérios de fonte

1. Começar por agências científicas, instituições de pesquisa e publicações primárias.
2. Confirmar se a página sustenta exatamente a data, relação ou processo descrito.
3. Preferir a formulação mais conservadora quando fontes confiáveis apresentam intervalos diferentes.
4. Registrar título, publicador, URL canônica, data de acesso e tipo da fonte.
5. Não transformar hipótese, modelo ou estimativa em fato exato.

## Revisão editorial

Cada afirmação factual precisa apontar para pelo menos um `SourceRecord`. O texto visível deve refletir `precision` e `uncertainty`: valores arredondados usam “cerca de”; intervalos permanecem intervalos; interpretações e disputas são declaradas. Uma cena sem fonte ou conteúdo acessível falha durante a validação do build.

## Registro de citação

```ts
interface SourceRecord {
  readonly id: string
  readonly title: string
  readonly publisher: string
  readonly url: string
  readonly accessedAt: string
  readonly kind: 'primary' | 'institutional' | 'scholarly'
}
```

`accessedAt` usa `YYYY-MM-DD`. O identificador deve permanecer estável mesmo se o título da página mudar. URLs de busca, agregadores e resumos sem autoria não entram no registro final.

## Fontes revisadas para o MVP

- NASA Science, “Overview: The Universe’s History”: idade do universo, inflação, recombinação e fundo cósmico de micro-ondas.
- NASA Science, “What Were the First Stars Like?”: composição e possível época das primeiras estrelas.
- European Space Agency, “History of cosmic structure formation”: formação das primeiras estrelas e galáxias e grau de incerteza.
- NASA Science, “How did our Solar System form?”: colapso da nuvem molecular e disco protoplanetário.
- U.S. Geological Survey, “Geologic Time: Age of the Earth”: estimativa isotópica de 4,54 bilhões de anos e sua incerteza.

URLs e datas de acesso ficam em `src/sources.ts`, evitando divergência entre documentação e dados publicados.
