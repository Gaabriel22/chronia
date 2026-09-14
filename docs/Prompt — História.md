Quero criar um projeto autoral de portfólio focado principalmente em frontend visual, motion design e experiência interativa.

A ideia é desenvolver um site sobre a história do universo e da humanidade, percorrendo grandes acontecimentos desde o Big Bang até o mundo contemporâneo.

Não quero cobrir cada ano ou cada evento histórico. Quero selecionar grandes marcos que ajudem a entender como chegamos ao presente.

Não quero criar um curso tradicional, LMS, enciclopédia ou uma página composta simplesmente por textos e cards.

O protagonista deve ser a experiência visual da passagem do tempo.

## Conceito

A experiência deve funcionar como uma narrativa interativa/scrollytelling.

Conforme o usuário avança pela página, o tempo também avança.

Possíveis momentos:

- Big Bang
- primeiras estrelas
- formação das galáxias
- formação do Sistema Solar
- formação da Terra
- surgimento da vida
- dinossauros
- grandes extinções
- evolução humana
- agricultura
- primeiras civilizações
- Egito e Mesopotâmia
- Grécia
- Roma
- Idade Média
- Renascimento
- expansão marítima
- colonização das Américas
- revoluções
- Revolução Industrial
- Primeira Guerra Mundial
- Segunda Guerra Mundial
- Guerra Fria
- corrida espacial
- surgimento da internet
- mundo contemporâneo

Isso é apenas uma referência de escopo futuro. Não tente implementar tudo inicialmente.

## Escala temporal

A escala do tempo deve fazer parte da experiência.

Bilhões de anos, milhões de anos, milhares de anos, séculos e décadas não devem parecer equivalentes.

Conforme nos aproximamos do presente, a própria representação da timeline pode mudar de escala.

Por exemplo:

- início do universo → bilhões de anos
- formação da Terra e evolução → milhões de anos
- primeiras civilizações → milhares de anos
- história moderna → séculos
- história contemporânea → décadas

Quero que essa mudança de escala seja percebida visualmente.

## História simultânea

Evite representar a história mundial como uma única linha exclusivamente eurocêntrica.

Quando fizer sentido, mostre acontecimentos simultâneos em diferentes regiões.

Exemplo conceitual:

Ano 500:

Europa → transformações após a queda do Império Romano do Ocidente  
Ásia → dinastias e impérios contemporâneos  
África → reinos e centros importantes  
Américas → civilizações presentes naquele período

Isso pode aparecer por meio de:

- mapas
- timelines paralelas
- divisões visuais
- overlays
- transições entre regiões

Não force simultaneidade em todas as cenas. Use quando enriquecer a compreensão histórica.

## Direção visual

Quero uma experiência:

- cinematográfica
- editorial
- autoral
- imersiva
- elegante
- visualmente memorável

Evite aparência de:

- landing page de SaaS
- template genérico
- livro didático
- Wikipedia animada
- sequência de cards
- dashboard

Movimento deve servir à narrativa.

Nem tudo precisa estar constantemente animado. Momentos de silêncio visual e pouca movimentação são desejáveis para aumentar o impacto das grandes transições.

## Stack

Considere:

- Next.js
- React
- TypeScript
- GSAP
- ScrollTrigger
- CSS animations
- SVG
- Canvas
- Three.js
- React Three Fiber
- Remotion

Cada tecnologia deve resolver um problema específico.

Não use Three.js, Canvas, WebGL ou Remotion apenas para aumentar a complexidade técnica.

## Estratégia de animação

Use este princípio:

Interativo ou dependente do input do usuário → renderização no browser.

Cinematográfico, complexo e predeterminado → considerar Remotion.

Visual orgânico, fotorealista ou extremamente complexo para produzir em código → considerar vídeo ou asset gerado por IA.

Essas abordagens podem ser combinadas.

## Papel do GSAP

Use GSAP e ScrollTrigger principalmente para:

- sincronização com scroll
- transições entre cenas
- parallax
- entrada e saída de elementos
- timelines interativas
- controle de câmera quando apropriado
- sincronização entre texto, vídeo e elementos visuais

O scroll deve controlar diretamente a progressão das animações sempre que isso fizer sentido.

## Papel do Remotion

Quero considerar Remotion como ferramenta importante para produzir sequências visuais predeterminadas que não precisam ser calculadas interativamente pelo navegador.

Exemplos potenciais:

- Big Bang
- formação de galáxias
- nascimento de estrelas
- formação do Sistema Solar
- evolução da Terra primitiva
- movimentações geológicas
- expansão e queda de impérios
- mapas históricos animados
- rotas marítimas
- industrialização
- conflitos em escala geográfica
- corrida espacial
- transições entre períodos históricos

Essas sequências podem ser renderizadas previamente como vídeo e utilizadas como assets dentro do site.

Remotion também pode ser usado para:

- tipografia animada
- mapas
- timelines
- overlays
- legendas
- câmera
- partículas
- composição de imagens
- composição de vídeos gerados por IA
- transições entre diferentes fontes visuais

Não quero transformar toda a experiência em vídeo.

Remotion deve ser utilizado quando uma sequência for essencialmente determinística e não precisar responder continuamente ao usuário.

## Vídeos gerados por IA

Vídeos gerados por IA podem ser usados pontualmente quando ajudarem em cenas difíceis de produzir em código.

Exemplos:

- Terra primitiva
- ambientes pré-históricos
- cidades antigas
- ambientes históricos
- atmosferas
- sequências abstratas ou cinematográficas

Eles devem servir como matéria-prima visual, não como substituto da experiência web.

Quando possível, considere combinar esses vídeos com Remotion para adicionar:

- câmera
- enquadramento
- texto
- mapas
- overlays
- partículas
- transições
- correções visuais

## Vídeo + scroll

Quando fizer sentido, vídeos podem ser sincronizados ou parcialmente controlados pelo scroll.

Considere cuidadosamente:

- seeking
- preload
- codecs
- tamanho de arquivo
- mobile
- autoplay
- consumo de memória
- acessibilidade
- reduced motion

Evite um único vídeo gigantesco contendo toda a experiência.

Prefira cenas menores e independentes.

## Conteúdo

Quero separar claramente:

- conteúdo histórico
- componentes de apresentação
- lógica de animação
- configuração das cenas
- timelines
- assets
- vídeos
- composições Remotion

Evite colocar dados históricos diretamente dentro de componentes visuais.

A arquitetura deve permitir adicionar novos períodos futuramente sem reescrever toda a aplicação.

## Rigor histórico

Não invente informações históricas.

Datas, acontecimentos, mapas e relações históricas devem usar fontes confiáveis.

Quando existir debate historiográfico ou simplificação necessária para a experiência visual, isso deve ser tratado adequadamente.

A experiência visual não deve transmitir certeza onde existe controvérsia histórica.

## Engenharia

Apesar do foco visual, quero que o projeto seja tecnicamente sólido e apresentável como portfólio.

Quero garantir:

- excelente performance
- boas métricas Lighthouse
- bons Core Web Vitals
- SEO técnico adequado
- HTML semântico
- acessibilidade WCAG 2.2 AA
- navegação por teclado
- bom contraste
- suporte a prefers-reduced-motion
- responsividade real
- excelente experiência mobile
- progressive enhancement
- carregamento eficiente de assets
- bundle controlado
- testes onde fizer sentido

As animações não devem destruir:

- LCP
- CLS
- INP

Server Components devem ser usados por padrão quando possível.

Client Components devem existir apenas quando a interação exigir.

## Reduced motion

A experiência deve continuar funcional com prefers-reduced-motion.

Não basta simplesmente remover todas as animações.

Crie uma versão alternativa da narrativa que preserve:

- conteúdo
- contexto
- ordem dos acontecimentos
- navegação
- compreensão

Substitua movimentos intensos por transições mais simples quando necessário.

## Mobile

Não trate mobile como uma versão reduzida construída no final.

Considere desde o início:

- orientação vertical
- performance
- memória
- ausência de hover
- controles por toque
- tamanho de vídeo
- WebGL limitado
- scroll behavior
- legibilidade

Algumas cenas podem possuir composição diferente entre desktop e mobile.

## Primeiro MVP

Não implemente toda a história.

Construa primeiro uma proof of concept:

Big Bang → formação da Terra.

Essa primeira experiência deve validar:

- direção artística
- scrollytelling
- arquitetura das cenas
- passagem do tempo
- mudanças de escala
- integração com scroll
- uso de Remotion
- estratégia de vídeos
- estratégia de assets
- performance
- responsividade
- mobile
- acessibilidade
- prefers-reduced-motion

## Antes de implementar

Primeiro analise o problema e proponha:

1. arquitetura geral
2. stack final recomendada
3. estrutura de diretórios
4. modelo para definição das cenas
5. estratégia de animação
6. estratégia de scroll
7. estratégia de vídeo
8. papel do Remotion
9. papel de GSAP
10. papel de Three.js/WebGL
11. estratégia mobile
12. estratégia de prefers-reduced-motion
13. estratégia de performance
14. estratégia de acessibilidade
15. riscos técnicos

Depois classifique as cenas propostas entre:

- DOM/CSS
- SVG
- Canvas
- Three.js/WebGL
- Remotion
- vídeo/asset gerado por IA

Justifique cada decisão.

## Implementação inicial

Depois da análise, implemente somente:

Big Bang → formação da Terra.

Não tente construir toda a história neste momento.

Priorize:

- impacto visual
- narrativa
- fluidez
- performance
- acessibilidade
- código sustentável
- base arquitetural expansível

Ao final, documente:

- principais decisões técnicas
- por que cada tecnologia foi usada
- como novas eras devem ser adicionadas
- quais partes podem ser reutilizadas
- quais decisões foram tomadas especificamente para performance e acessibilidade

Antes de implementar uma experiência visual,
considere se alguma destas ferramentas resolve
melhor o problema:

Motion:
- GSAP
- Motion
- Anime.js
- Theatre.js

3D:
- Three.js
- React Three Fiber
- Drei
- OGL
- Babylon.js
- Spline

Interactive graphics:
- Rive
- PixiJS
- Paper.js
- Konva
- Fabric.js

Physics:
- Rapier
- Matter.js

Data / educational visualization:
- D3
- p5.js
- rough.js

Scrolling:
- GSAP ScrollTrigger
- Lenis

Video / animation:
- Remotion
- Motion Canvas

Maps:
- MapLibre GL

Games / simulations:
- Phaser

State:
- XState

Do not use a library merely because it is listed.
Choose tools based on the visual requirement,
performance, bundle size and maintainability.
Prefer combining a small number of complementary
tools.