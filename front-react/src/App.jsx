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
      <Route path="/cadastro.html" element={<Cadastro />} />
      <Route path="/logn-user.html" element={<LoginUser />} />
      <Route path="/home-cli.html" element={<HomeCli />} />
      <Route path="/home-sev.html" element={<HomeSev />} />
      <Route path="/servicos-cli.html" element={<ServicosCliente />} />
      <Route path="/publicarServico-cli.html" element={<PublicarServico />} />
      <Route path="/propostas-cli.html" element={<PropostasCliente />} />
      <Route path="/todasPropostas-sev.html" element={<TodasPropostasSev />} />
      <Route path="/detalhe-servico/:id" element={<DetalhesServicoDinamico />} />
      <Route path="/fazer-proposta" element={<EnviarPropostaSev />} />
      <Route path="/Perfil-Sev.html" element={<PerfilSev />} />
      <Route path="/confPerfil-cli.html" element={<PerfilCliente />} />
      <Route path="/sobre.html" element={<Sobre />} />
    </Routes>
  );
}

export default App;