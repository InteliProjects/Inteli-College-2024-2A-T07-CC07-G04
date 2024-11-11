import { Navigate } from 'react-router-dom';

// Componente de rota protegida
export default function PrivateRoute({ element, allowedRoles }) {
    // Verifica se o usuário está autenticado
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const userType = localStorage.getItem('userType'); // Obtém o tipo de usuário do localStorage

    if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para a página de login
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userType)) {
        // Se o tipo de usuário não estiver permitido, redireciona para uma página de acesso negado
        return <Navigate to="/acesso-negado" />;
    }

    // Se estiver autenticado e o tipo de usuário for permitido, renderiza o elemento
    return element;
}
