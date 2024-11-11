import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/router";
import "./assets/reset.css";
import "./assets/globals.css";

import Modal from "react-modal";

import { AppProvider } from "../context/AppContext.js"; 

Modal.setAppElement("#modal-root");

export default function App() {
    return (
        <AppProvider>
            <RouterProvider router={AppRouter} />
        </AppProvider>
    );
}
