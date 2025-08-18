import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sobre from '@/components/Sobre';
import DoencasTratadas from '@/components/DoencasTratadas';
import Horarios from '@/components/Horarios';
import Localizacao from '@/components/Localizacao';
import Agendamento from '@/components/Agendamento';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Sobre />
      <DoencasTratadas />
      <Horarios />
      <Localizacao />
      <Agendamento />
      <Footer />
    </main>
  );
}
