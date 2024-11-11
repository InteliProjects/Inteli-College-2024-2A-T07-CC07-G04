// Importa o RouterProvider para gerenciar as rotas da aplicação
import { RouterProvider } from "react-router-dom";
// Importa a configuração das rotas
import AppRouter from "./routes/router";
// Importa os estilos globais e de reset
import "./assets/reset.css";
import "./assets/globals.css";

import Modal from "react-modal";

Modal.setAppElement("#modal-root");

export default function App() {
    return (
        <>
            <RouterProvider router={AppRouter} />
        </>
    );
}
