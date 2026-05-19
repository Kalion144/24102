import { useNavigate } from 'react-router-dom'

export function BottomNav({ active, onNavigate }) {
  const navigate = useNavigate()
  const items = [
    { id: 'home', label: 'Home', icon: 'fa-home', path: '/home-cli.html' },
    { id: 'propostas', label: 'Propostas', icon: 'fa-file-signature', path: '/propostas-cli.html' },
    { id: 'perfil', label: 'Perfil', icon: 'fa-user', path: '/confPerfil-cli.html' },
    { id: 'servicos', label: 'Meus serviços', icon: 'fa-clipboard-list', path: '/servicos-cli.html' }
  ]
  const handleClick = (item) => {
    if (onNavigate) onNavigate(item.id)
    navigate(item.path)
  }
  return (
    <div className="bottom-nav">
      {items.map(item => (
        <div key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => handleClick(item)}>
          <i className={`fas ${item.icon}`}></i><span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}