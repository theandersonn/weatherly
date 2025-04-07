# 🌤️ Weatherly

Weatherly é uma aplicação web desenvolvida com **Next.js** que exibe a previsão do tempo atual e dos próximos dias. A aplicação utiliza **React Query** para consumo eficiente de APIs, com uma interface moderna, responsiva e focada na experiência do usuário.

## 🚀 Demonstração

> https://weatherly-seven-ochre.vercel.app/

## 🧩 Funcionalidades

### ✅ Requisitos obrigatórios

- ✅ Componentização e reutilização de componentes
- ✅ Uso de biblioteca de ícones (ex: `react-icons`)
- ✅ Organização de código por funcionalidades (`features/`)
- ✅ Cobertura de testes unitários com Jest e Testing Library
- ✅ Consumo de API meteorológica via React Query

### ✨ Funcionalidades extras

- 🌍 Geolocalização para detectar a cidade atual
- 🏙️ Busca por qualquer cidade
- 🌗 Suporte a tema claro/escuro (dark/light mode)
- 📱 Interface responsiva
- 🌡️ Alternância entre unidades de temperatura (Celsius/Fahrenheit)
- ☁️ Ícones animados de clima

## 📁 Estrutura de Pastas

O projeto segue uma organização modular e funcional, separando cada parte conforme sua responsabilidade principal:

```sh
src/
├── app/                      # Arquivos do App Router (layout, page)
├── components/               # Componentes genéricos reutilizáveis
├── features/
│   ├── weather/              # Dashboard e lógica relacionada ao clima
│   ├── components/           # Componentes específicos das features
│   ├── constants/            # Constants específicas das features
│   ├── hooks/                # Hooks customizados
│   ├── services/             # Funções de consumo de API
│   └── types/                # Tipagens TypeScript
├── lib/                      # Funções utilitárias
├── theme/                    # Temas
```

🧠 Decisões Estratégicas

Quando criar arquivos separados?

- Utilitário único e pequeno → arquivo próprio (ex: validateSearchInput.ts).
- Funções relacionadas entre si → agrupamento em arquivo único (ex: forecastUtils.ts).

## ⚙️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [React Query (TanStack)](https://tanstack.com/query)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Animated Weather](https://www.npmjs.com/package/react-animated-weather)
- [Framer Motion](https://www.framer.com/motion/)
- [Geo-tz](https://www.npmjs.com/package/geo-tz) e [tz-lookup](https://www.npmjs.com/package/tz-lookup)

🧪 Testes
Para executar os testes:

```sh
yarn test
```

Ou para modo interativo (watch mode):

```sh
yarn test:watch
```

🛠️ Como rodar o projeto localmente

1. Clone o repositório:

```sh
git clone https://github.com/theandersonn/weatherly.git
cd weatherly
```

2. Instale as dependências:

```sh
yarn install
```

3. Crie um arquivo .env coms respectivas chaves:

```sh
NEXT_PUBLIC_WEATHER_BASE_URL=
NEXT_PUBLIC_WEATHER_API_KEY=
NEXT_PUBLIC_WEATHER_LANG=

NEXT_PUBLIC_MAPS_BASE_URL=
NEXT_PUBLIC_MAPS_API_KEY=
```

4. Inicie o servidor de desenvolvimento:

```sh
yarn dev
```

5. Acesse em http://localhost:3000

🌐 API Utilizada

Este projeto utiliza duas APIs externas para fornecer dados meteorológicos completos e localização baseada em coordenadas:

☁️ [OpenWeatherMap API](https://openweathermap.org/api)
Utilizada para obter dados meteorológicos em tempo real, incluindo:

- Condições atuais (temperatura, pressão, umidade)
- Previsão para os próximos dias
- Horários de nascer/pôr do sol
- Localização baseada em coordenadas

Para utilizá-la, é necessário criar uma conta gratuita e gerar uma **API Key**, que deve ser adicionada ao `.env`:

```env
NEXT_PUBLIC_WEATHER_API_KEY=sua_api_key_aqui
```

🌍 Nominatim Reverse Geocoding (via Maps.co)
Utilizada para converter coordenadas geográficas (latitude e longitude) em nomes de cidades e países legíveis, através de geocodificação reversa.

Essa API é gratuita e baseada no serviço de código aberto Nominatim (OpenStreetMap).

Para utilizá-la com autenticação, é necessário:

Gerar uma chave de API gratuita em https://geocode.maps.co/

Adicionar a chave ao arquivo .env:

```env
NEXT_PUBLIC_MAPS_API_KEY=sua_api_key_aqui
```

Essas duas APIs trabalham em conjunto no Weatherly para:

Detectar a cidade do usuário com base na geolocalização

Exibir o nome correto da cidade

Buscar e exibir a previsão do tempo em tempo real

👨‍💻 Autor
Desenvolvido theandersonn 💻
