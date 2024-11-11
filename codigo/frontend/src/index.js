import ReactDOM from "react-dom/client";
import App from "./App";

// Seleciona o elemento raiz onde a aplicação será montada
const root = document.getElementById("root");
// Cria o contêiner raiz para a aplicação
const rootContainer = ReactDOM.createRoot(root);

// Renderiza o componente principal no contêiner raiz
rootContainer.render(<App />);
