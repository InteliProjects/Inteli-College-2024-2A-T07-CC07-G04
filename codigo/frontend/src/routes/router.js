import { createBrowserRouter } from "react-router-dom";

// Importa os componentes de página
import Home from "../pages/Home/index.js";
import Perfil from "../pages/Perfil/index.js";
import Pedidos from "../pages/Pedidos/index.js";
import Carrinho from "../pages/Carrinho/index.js";
import Login from "../pages/Login/index.js";
import Produto from "../pages/Produto/index.js";
import PrivateRoute from "./PrivateRoute";
import LojaProdutos from "../pages/LojaProdutos/index.js";
import Lojas from "../pages/Lojas/index.js";
import AcessoNegado from "../pages/Login/AcessoNegado.js";

// Configura as rotas da aplicação
const AppRouter = createBrowserRouter([
    {
        path: "/",
        // Protege a rota Home para todos os tipos de usuários autenticados
        element: <PrivateRoute element={<Home />} allowedRoles={['cliente', 'loja', 'admin']} />,
    },
    {
        path: "/perfil",
        // Apenas clientes e admins podem acessar o perfil
        element: <PrivateRoute element={<Perfil />} allowedRoles={['cliente', 'admin']} />,
    },
    {
        path: "/pedidos",
        // Apenas clientes e admins podem acessar pedidos
        element: <PrivateRoute element={<Pedidos />} allowedRoles={['cliente', 'admin']} />,
    },
    {
        path: "/carrinho",
        // Apenas clientes podem acessar o carrinho
        element: <PrivateRoute element={<Carrinho />} allowedRoles={['cliente', 'admin']} />,
    },
    {
        path: "/login",
        // Rota pública para login
        element: <Login />,
    },
    {
        path: "/produto/:id",
        // Todos os usuários autenticados podem acessar detalhes de produtos
        element: <PrivateRoute element={<Produto />} allowedRoles={['cliente', 'loja', 'admin']} />,
    },
    {
        path: "/loja/produtos",
        // Apenas lojas e admins podem acessar produtos da loja
        element: <PrivateRoute element={<LojaProdutos />} allowedRoles={['loja', 'admin']} />,
    },
    {
        path: "/lojas",
        // Apenas admins podem acessar as configurações de lojas
        element: <PrivateRoute element={<Lojas />} allowedRoles={['admin']} />,
    },
    {
        path: "/acesso-negado",
        // Página para quando o usuário tenta acessar uma rota não permitida
        element: <AcessoNegado />,
    },
]);

export default AppRouter;
