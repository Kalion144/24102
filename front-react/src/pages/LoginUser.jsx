import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'

export default function LognUser() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('cliente')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('savedEmail')
    if (saved) { setEmail(saved); setRemember(true) }
  }, [])

  const validate = () => {
    let newErrors = {}
    if (!email.trim()) newErrors.email = 'E-mail obrigatório'
    else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) newErrors.email = 'E-mail inválido'
    if (!password) newErrors.password = 'Senha obrigatória'
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {

  if (!validate()) return

  try {

    const resposta = await loginUser({
  email,
  senha: password,
  tipo: userType === 'cliente'
    ? 'CLIENTE'
    : 'PROFISSIONAL'
})

    console.log(resposta)

      if (resposta.sucesso) {
      localStorage.setItem(
        'usuario',
        JSON.stringify(resposta.usuario)
      )
      if (remember) {
        localStorage.setItem('savedEmail', email)
      } else {
        localStorage.removeItem('savedEmail')
      }

      setToast({
        msg: resposta.mensagem,
        isError: false
      })

      setTimeout(() => {

        navigate(
          userType === 'cliente'
            ? '/home-cli.html'
            : '/home-sev.html'
        )

      }, 1500)

    } else {

      setToast({
        msg: resposta.mensagem || 'Login inválido',
        isError: true
      })
    }

  } catch (error) {

    console.log(error)

    setToast({
      msg: 'Erro ao conectar ao servidor',
      isError: true
    })
  }
}

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">Servijá<span>.</span></div>
          <h2>Entrar</h2>
          <p>Digite seu e-mail e senha para acessar sua conta</p>
        </div>
        <div className="input-icon"><i className="fas fa-envelope"></i><input type="email" placeholder="Seu e-mail" value={email} onChange={e => setEmail(e.target.value)} /></div>
        {errors.email && <div className="error-message">{errors.email}</div>}
        <div className="input-icon"><i className="fas fa-lock"></i><input type="password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} /></div>
        {errors.password && <div className="error-message">{errors.password}</div>}
        <div className="user-type-selection">
          <label className={`user-type-card ${userType === 'cliente' ? 'active' : ''}`}>
            <input type="radio" name="userType" value="cliente" checked={userType === 'cliente'} onChange={() => setUserType('cliente')} />
            <i className="fas fa-user"></i><span>Cliente</span>
          </label>
          <label className={`user-type-card ${userType === 'prestador' ? 'active' : ''}`}>
            <input type="radio" name="userType" value="prestador" checked={userType === 'prestador'} onChange={() => setUserType('prestador')} />
            <i className="fas fa-tools"></i><span>Prestador de Serviços</span>
          </label>
        </div>
        <div className="login-options">
          <label className="checkbox-label"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /><span>Lembrar de mim</span></label>
          <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setToast({ msg: '🔐 Instruções enviadas para seu e-mail', isError: false }); }}>Esqueceu a senha?</a>
        </div>
        <button className="login-btn" onClick={handleLogin}><i className="fas fa-arrow-right-to-bracket"></i> Entrar</button>
        <div className="divider"><hr /><span>ou</span><hr /></div>
        <button className="google-btn" onClick={() => setToast({ msg: 'Login com Google em breve', isError: false })}><i className="fab fa-google"></i> Continuar com Google</button>
        <div className="register-link">Não tem uma conta? <a href="/cadastro.html">Criar conta</a></div>
      </div>
      {toast && (
        <div className="success-toast" style={{ background: toast.isError ? '#dc2626' : '#f97316' }}>
          <i className={`fas ${toast.isError ? 'fa-exclamation-triangle' : 'fa-check-circle'}`}></i> {toast.msg}
        </div>
      )}
    </div>
  )
}