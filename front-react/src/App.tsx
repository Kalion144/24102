import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Cadastro from './pages/Cadastro';
import LoginUser from './pages/LoginUser';
import HomeCli from './pages/HomeCli';
import HomeSev from './pages/HomeSev';
import ServicosCliente from './pages/ServicosCli';
import PublicarServico from './pages/PublicarServicoCli';
import PropostasCliente from './pages/PropostasCli';
import TodasPropostasSev from './pages/TodasPropostasSev';
import DetalhesServicoDinamico from './pages/DetalhesServicoSev';
import EnviarPropostaSev from './pages/EmviarPropostaSev';
import PerfilSev from './pages/PerfilSev';
import PerfilCliente from './pages/ConfPerfilCli';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/home-cli" element={<HomeCli />} />
      <Route path="/home-sev" element={<HomeSev />} />
      <Route path="/servicos-cli" element={<ServicosCliente />} />
      <Route path="/publicar-servico" element={<PublicarServico />} />
      <Route path="/propostas-cli" element={<PropostasCliente />} />
      <Route path="/todas-propostas-sev" element={<TodasPropostasSev />} />
      <Route
        path="/detalhe-servico/:id"
        element={<DetalhesServicoDinamico />}
      />
      <Route path="/fazer-proposta" element={<EnviarPropostaSev />} />
      <Route path="/perfil-sev" element={<PerfilSev />} />
      <Route path="/perfil-cli" element={<PerfilCliente />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;
