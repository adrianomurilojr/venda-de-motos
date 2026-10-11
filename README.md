# Giro na Moto — marketplace de motos

Frontend responsivo para aproximar pessoas que querem comprar e vender motos.
Feito com Next.js, React, JavaScript, Tailwind CSS e Motion para React.

## Começar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Para validar o projeto:

```bash
npm run lint
npm run build
```

## O que está disponível

- Vitrine de motos com modelo, ano, preço, quilometragem, conservação e
  localização.
- Busca por modelo e cidade/estado e ordenação por preço.
- Cadastro de anúncio com dados do vendedor (nome, idade, CPF e endereço) e
  informações da moto.
- Ação para demonstrar interesse em uma moto.
- Efeito parallax na foto de fundo do destaque e animações suaves ao rolar até
  as seções e os anúncios.

Este projeto é somente o frontend: os anúncios de demonstração são definidos em
`app/page.js`, e os novos anúncios e interesses existem apenas na memória da
página. Eles desaparecem ao recarregar. Nenhum dado é enviado a um servidor ou
salvo no navegador.

## Imagens

Irei colocar imagens locais em `public/images/` e use caminhos como
`/images/minha-moto.jpg`. As fotos atuais da vitrine são links externos de
demonstração.

## Próxima etapa: backend

O formulário já reúne os dados do vendedor e da moto em objetos separados, e a
vitrine consome uma lista de anúncios. Para conectar uma API, substitua os dados
de demonstração e as atualizações locais em `app/page.js` por requisições ao
backend; direcione também a ação de interesse para o endpoint de contato. Antes
de publicar, implemente autenticação, autorização, validação no servidor e
armazenamento adequado para dados pessoais como CPF e endereço.
