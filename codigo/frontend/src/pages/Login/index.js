import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';  

export default function Login() {
    // Estado para armazenar o email, senha e tipo de usuário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hook para redirecionar o usuário após o login
    const navigate = useNavigate();

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verifica as credenciais e tipo de usuário
        if (email === 'admin@example.com' && password === 'senha-segura') {
            // Marca o usuário como autenticado e tipo admin
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('userType', 'admin');
            navigate('/'); // Redireciona para o dashboard do admin
        } else if (email === 'loja@example.com' && password === 'senha-loja') {
            // Marca o usuário como autenticado e tipo loja
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('userType', 'loja');
            navigate('/'); // Redireciona para o dashboard da loja
        } else if (email === 'cliente@example.com' && password === 'senha-cliente') {
            // Marca o usuário como autenticado e tipo cliente
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('userType', 'cliente');
            navigate('/'); // Redireciona para o dashboard do cliente
        } else {
            alert('Credenciais inválidas ou tipo de usuário incorreto');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="form-input"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}
