'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useMemo, useRef, useState } from 'react';

const initialMotorcycles = [
  {
    id: 1,
    model: 'Honda CB 500F',
    category: 'NAKED',
    year: 2022,
    price: 38900,
    mileage: 12800,
    condition: 'Excelente',
    location: 'Piranhas, AL',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
    seller: 'Marina',
    description: 'Revisada recentemente, pneus novos e manual do proprietário.',
  },
  {
    id: 2,
    model: 'Yamaha MT-07',
    category: 'NAKED',
    year: 2021,
    price: 42900,
    mileage: 19400,
    condition: 'Muito boa',
    location: 'Campinas, SP',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85',
    seller: 'Rafael',
    description: 'Moto de uso urbano, documentação em dia e chave reserva.',
  },
  {
    id: 3,
    model: 'BMW G 310 GS',
    category: 'ADVENTURE',
    year: 2023,
    price: 33900,
    mileage: 7600,
    condition: 'Excelente',
    location: 'Curitiba, PR',
    image:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=85',
    seller: 'Lucas',
    description: 'Baixa quilometragem, pronta para pegar a estrada.',
  },
  {
    id: 4,
    model: 'Royal Enfield Meteor 350',
    category: 'CUSTOM',
    year: 2022,
    price: 21900,
    mileage: 15300,
    condition: 'Muito boa',
    location: 'Belo Horizonte, MG',
    image:
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1000&q=85',
    seller: 'Camila',
    description: 'Confortável para viajar, revisões feitas na concessionária.',
  },
  {
    id: 5,
    model: 'Honda XRE 300',
    category: 'TRAIL',
    year: 2020,
    price: 24600,
    mileage: 28100,
    condition: 'Boa',
    location: 'Florianópolis, SC',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
    seller: 'Diego',
    description: 'Uso misto, revisada e com protetor de motor instalado.',
  },
  {
    id: 6,
    model: 'Kawasaki Ninja 400',
    category: 'ESPORTIVA',
    year: 2022,
    price: 34700,
    mileage: 9800,
    condition: 'Excelente',
    location: 'Rio de Janeiro, RJ',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=85',
    seller: 'André',
    description: 'Sempre guardada em garagem, laudo cautelar disponível.',
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);

const formatMileage = (value) =>
  `${new Intl.NumberFormat('pt-BR').format(value)} km`;

function Icon({ name, className = 'h-5 w-5' }) {
  const paths = {
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    bike: (
      <>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="m6 17 4-7h4l4 7m-8-7-2-3H6m6 3 3 3h3" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function MotorcycleCard({ motorcycle, onInterest, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      <div
        className="relative h-56 bg-stone-200 bg-cover bg-center"
        role="img"
        aria-label={`Foto da ${motorcycle.model}`}
        style={{ backgroundImage: `url("${motorcycle.image}")` }}
      >
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-stone-700">
          {motorcycle.category}
        </span>
        <button
          type="button"
          aria-label={`Demonstrar interesse na ${motorcycle.model}`}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-stone-600 transition hover:text-accent"
          onClick={() => onInterest(motorcycle)}
        >
          <Icon name="heart" className="h-[18px] w-[18px]" />
        </button>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-stone-500">
            {motorcycle.year} · {formatMileage(motorcycle.mileage)}
          </p>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
            {motorcycle.condition}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-ink">
          {motorcycle.model}
        </h3>
        <p className="mt-1.5 line-clamp-1 text-sm text-stone-500">
          {motorcycle.description}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs text-stone-500">
          <Icon name="pin" className="h-4 w-4" />
          {motorcycle.location}
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-stone-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
              Preço
            </p>
            <p className="mt-0.5 text-xl font-extrabold tracking-tight text-ink">
              {formatPrice(motorcycle.price)}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 pb-1 text-sm font-bold text-accent transition hover:gap-3"
            onClick={() => onInterest(motorcycle)}
          >
            Tenho interesse <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Reveal({ children, className }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function Field({ label, name, type = 'text', required = true, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
      </span>
      <input
        className="form-input"
        name={name}
        type={type}
        required={required}
        {...props}
      />
    </label>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', shouldReduceMotion ? '0%' : '12%']
  );

  const [motorcycles, setMotorcycles] = useState(initialMotorcycles);
  const [modelSearch, setModelSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [interest, setInterest] = useState('');
  const [notice, setNotice] = useState('');
  const [sortOrder, setSortOrder] = useState('recentes');

  const filteredMotorcycles = useMemo(() => {
    const query = modelSearch.trim().toLocaleLowerCase('pt-BR');
    const city = cityFilter.trim().toLocaleLowerCase('pt-BR');
    const results = motorcycles.filter((motorcycle) => {
      const matchesModel =
        !query || motorcycle.model.toLocaleLowerCase('pt-BR').includes(query);
      const matchesCity =
        !city || motorcycle.location.toLocaleLowerCase('pt-BR').includes(city);
      return matchesModel && matchesCity;
    });
    return [...results].sort((a, b) =>
      sortOrder === 'menor-preco' ? a.price - b.price : b.id - a.id
    );
  }, [cityFilter, modelSearch, motorcycles, sortOrder]);

  function handleListingSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const year = Number(formData.get('year'));
    const price = Number(formData.get('price'));
    const mileage = Number(formData.get('mileage'));
    const seller = {
      name: String(formData.get('name')).trim(),
      age: Number(formData.get('age')),
      cpf: String(formData.get('cpf')).trim(),
      address: String(formData.get('address')).trim(),
    };

    const newListing = {
      id: Date.now(),
      model: String(formData.get('model')).trim(),
      category: 'ANÚNCIO',
      year,
      price,
      mileage,
      condition: String(formData.get('condition')),
      location: String(formData.get('location')).trim(),
      seller,
      description: 'Anúncio publicado agora.',
      image:
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
    };

    setMotorcycles((current) => [newListing, ...current]);
    setModelSearch('');
    setCityFilter('');
    setNotice(
      `Anúncio de ${newListing.model} adicionado à vitrine. Os dados ficam apenas nesta sessão até a integração do backend.`
    );
    event.currentTarget.reset();
    document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleInterest(motorcycle) {
    setInterest(motorcycle.model);
    setNotice(
      `Você demonstrou interesse na ${motorcycle.model}. A conexão direta com o vendedor estará disponível quando o backend for integrado.`
    );
  }

  function closeNotice() {
    setNotice('');
    setInterest('');
  }

  return (
    <main>
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            className="flex items-center gap-2.5"
            href="#"
            aria-label="Giro na Moto, início"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white">
              <Icon name="bike" className="h-6 w-6" />
            </span>
            <span className="font-display text-[22px] font-extrabold tracking-tight text-white">
              giro na moto<span className="text-accent">.</span>
            </span>
          </a>
          <nav
            className="hidden items-center gap-8 text-[13px] font-medium text-white/75 md:flex"
            aria-label="Navegação principal"
          >
            <a className="transition hover:text-white" href="#vitrine">
              Explorar motos
            </a>
            <a className="transition hover:text-white" href="#como-funciona">
              Como funciona
            </a>
            <a className="transition hover:text-white" href="#anunciar">
              Para vendedores
            </a>
          </nav>
          <a
            className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-orange-50"
            href="#anunciar"
          >
            Anunciar minha moto <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section
        ref={heroRef}
        className="hero-surface relative flex min-h-[655px] items-center overflow-hidden bg-ink pb-14 pt-28 sm:min-h-[700px]"
      >
        <motion.div
          className="hero-image absolute inset-0"
          style={{ y: heroImageY }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/90 to-[#111318]/30" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.04fr_.96fr]">
          <motion.div
            className="max-w-[610px]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />A sua
              próxima história começa sobre duas rodas
            </div>
            <h1 className="font-display text-[46px] font-extrabold leading-[1.04] tracking-[-0.045em] text-white sm:text-[64px]">
              Encontre a moto
              <br />
              que tem a sua <span className="text-accent">cara.</span>
            </h1>
            <p className="mt-6 max-w-[465px] text-[15px] leading-7 text-white/65">
              Bons encontros começam com uma boa escolha. Explore motos de
              verdade, anunciadas por quem também ama estar na estrada.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#vitrine"
                className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-[#d83b30]"
              >
                Encontrar minha moto <Icon name="arrow" className="h-4 w-4" />
              </a>
              <span className="text-xs text-white/50">
                <strong className="text-white/90">
                  {motorcycles.length} motos
                </strong>{' '}
                esperando por você
              </span>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-white/15 pt-6">
              <div className="flex -space-x-2">
                {['M', 'R', 'C', 'D'].map((initial, index) => (
                  <span
                    key={initial}
                    className={`grid h-8 w-8 place-items-center rounded-full border-2 border-ink text-[10px] font-bold text-white ${
                      [
                        'bg-orange-700',
                        'bg-slate-600',
                        'bg-rose-800',
                        'bg-stone-500',
                      ][index]
                    }`}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/55">
                Feito para quem prefere{' '}
                <span className="font-semibold text-white/85">
                  ir mais longe.
                </span>
              </p>
            </div>
          </motion.div>

          <form
            className="search-card relative mx-auto w-full max-w-[430px] rounded-2xl border border-white/70 bg-white p-6 shadow-2xl shadow-black/20 sm:p-7 lg:ml-auto lg:mr-0"
            onSubmit={(event) => {
              event.preventDefault();
              document
                .getElementById('vitrine')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Seu próximo encontro
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
              Qual moto você procura?
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              A gente conecta você a quem está vendendo.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-xs font-bold text-stone-700">
                Modelo ou marca
              </span>
              <span className="relative block">
                <Icon
                  name="search"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-400"
                />
                <input
                  className="form-input pl-10"
                  type="search"
                  placeholder="Ex.: Honda CB 500, Yamaha..."
                  value={modelSearch}
                  onChange={(event) => setModelSearch(event.target.value)}
                />
              </span>
            </label>
            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-bold text-stone-700">
                Cidade ou estado
              </span>
              <span className="relative block">
                <Icon
                  name="pin"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-400"
                />
                <input
                  className="form-input pl-10"
                  type="search"
                  placeholder="Ex.: São Paulo, SP"
                  value={cityFilter}
                  onChange={(event) => setCityFilter(event.target.value)}
                />
              </span>
            </label>
            <button
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-sm font-bold text-white transition hover:bg-accent"
              type="submit"
            >
              Ver motos disponíveis <Icon name="arrow" className="h-4 w-4" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
              <Icon name="check" className="h-4 w-4 text-emerald-600" />
              Anúncios publicados por pessoas reais
            </div>
          </form>
        </div>
      </section>

      <section
        id="como-funciona"
        className="border-b border-stone-200 bg-white py-7"
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {[
            ['01', 'Você escolhe', 'Encontre o modelo que combina com você.'],
            [
              '02',
              'Vocês se conectam',
              'Ache quem tem a moto que você procura.',
            ],
            [
              '03',
              'A história continua',
              'Negocie direto com quem está vendendo.',
            ],
          ].map(([number, title, description]) => (
            <Reveal className="flex items-center gap-4" key={number}>
              <span className="font-display text-2xl font-extrabold text-accent/70">
                {number}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{title}</p>
                <p className="mt-0.5 text-xs text-stone-500">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="vitrine"
        className="bg-[#f8f7f5] px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Encontros que estão acontecendo
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-[40px]">
                Motos à procura de destino.
              </h2>
              <p className="mt-3 text-sm text-stone-500">
                {filteredMotorcycles.length
                  ? `${filteredMotorcycles.length} ${
                      filteredMotorcycles.length === 1 ? 'moto' : 'motos'
                    } para você conhecer`
                  : 'Nenhuma moto encontrada para essa busca. Tente outro modelo ou local.'}
              </p>
              </div>
            </Reveal>
            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="whitespace-nowrap text-xs font-medium text-stone-500"
              >
                Ordenar por
              </label>
              <select
                id="sort"
                className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs font-semibold text-stone-700 outline-none focus:border-accent"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
              </select>
            </div>
          </div>

          {filteredMotorcycles.length > 0 ? (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMotorcycles.map((motorcycle, index) => (
                <MotorcycleCard
                  key={motorcycle.id}
                  motorcycle={motorcycle}
                  onInterest={handleInterest}
                  delay={Math.min(index * 0.07, 0.35)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-9 rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
              <Icon name="search" className="mx-auto h-7 w-7 text-stone-400" />
              <p className="mt-3 font-semibold text-ink">
                Não encontramos motos com esses filtros.
              </p>
              <button
                className="mt-3 text-sm font-bold text-accent"
                onClick={() => {
                  setModelSearch('');
                  setCityFilter('');
                }}
                type="button"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="overflow-hidden bg-[#e9e5de]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:py-16">
          <Reveal>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Está na hora de passar o guidão?
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-[38px]">
                Sua próxima moto já está procurando por ela.
              </h2>
              <p className="mt-3 text-sm text-stone-600">
                Anuncie por aqui e encontre alguém que sonha com o mesmo modelo.
              </p>
            </div>
          </Reveal>
          <a
            href="#anunciar"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-accent"
          >
            Quero anunciar <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="anunciar" className="bg-white px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-10 lg:self-start">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Um bom negócio começa por aqui
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-[42px]">
              Tem uma moto
              <br />
              pra chamar de <span className="text-accent">sua?</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-500">
              Conte um pouco sobre ela. Seu anúncio pode ser exatamente o que
              alguém está procurando.
            </p>
            <ul className="mt-7 space-y-4 text-sm text-stone-600">
              {[
                'Encontre pessoas interessadas no modelo',
                'Apresente os detalhes da sua moto',
                'Converse diretamente com quem quer comprar',
              ].map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              Demonstração de frontend: os anúncios são mantidos apenas nesta
              sessão. Os dados ficam apenas na memória desta página durante a
              sessão: não são salvos permanentemente nem enviados a um servidor.
            </p>
          </Reveal>

          <form
            className="rounded-2xl border border-stone-200 bg-[#fcfbfa] p-5 sm:p-8"
            onSubmit={handleListingSubmit}
          >
            <div className="border-b border-stone-200 pb-5">
              <h3 className="font-display text-xl font-extrabold text-ink">
                Publique seu anúncio
              </h3>
              <p className="mt-1.5 text-xs text-stone-500">
                Os campos com * são obrigatórios.
              </p>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                Sobre você
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nome completo *"
                  name="name"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  maxLength={120}
                />
                <Field
                  label="Idade *"
                  name="age"
                  type="number"
                  min="18"
                  max="120"
                  placeholder="Ex.: 28"
                />
                <Field
                  label="CPF *"
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="000.000.000-00"
                  minLength={11}
                  maxLength={14}
                  pattern={"[0-9.\\x2d]{11,14}"}
                />
                <Field
                  label="Endereço *"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Rua, número, bairro e cidade"
                  maxLength={200}
                />
              </div>
            </fieldset>

            <fieldset className="mt-8 border-t border-stone-200 pt-6">
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                Sobre a moto
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Modelo da moto *"
                  name="model"
                  placeholder="Ex.: Honda CB 500F"
                  maxLength={100}
                />
                <Field
                  label="Ano *"
                  name="year"
                  type="number"
                  min="1900"
                  max="2035"
                  placeholder="Ex.: 2022"
                />
                <Field
                  label="Preço (R$) *"
                  name="price"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Ex.: 38900"
                />
                <Field
                  label="Quilometragem (km) *"
                  name="mileage"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Ex.: 12800"
                />
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-stone-700">
                    Estado de conservação *
                  </span>
                  <select
                    className="form-input"
                    name="condition"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    <option>Excelente</option>
                    <option>Muito boa</option>
                    <option>Boa</option>
                    <option>Regular</option>
                  </select>
                </label>
                <Field
                  label="Cidade e estado *"
                  name="location"
                  placeholder="Ex.: São Paulo, SP"
                  maxLength={100}
                />
              </div>
            </fieldset>

            <button
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#d83b30] sm:w-auto"
              type="submit"
            >
              Publicar anúncio <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-ink px-5 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <a
            className="flex items-center gap-2"
            href="#"
            aria-label="Giro na Moto, início"
          >
            <Icon name="bike" className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-extrabold">
              giro na moto<span className="text-accent">.</span>
            </span>
          </a>
          <p className="text-xs text-white/45">
            Um protótipo de marketplace de motos. Feito para a próxima jornada.
          </p>
          <a
            className="text-xs font-semibold text-white/70 hover:text-white"
            href="#anunciar"
          >
            Anunciar uma moto ↑
          </a>
        </div>
      </footer>

      {notice && (
        <div
          className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <Icon name="check" className="h-4 w-4" />
          </span>
          <div className="flex-1">
            {interest && (
              <p className="mb-1 text-sm font-bold text-ink">
                Interesse registrado
              </p>
            )}
            <p className="text-xs leading-5 text-stone-600">{notice}</p>
          </div>
          <button
            aria-label="Fechar aviso"
            className="text-stone-400 hover:text-ink"
            onClick={closeNotice}
            type="button"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      )}
    </main>
  );
}
