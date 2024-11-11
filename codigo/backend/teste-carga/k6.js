import http from "k6/http";
import { sleep } from "k6";

export const options = {
    stages: [
        { duration: "10s", target: "50" },
        { duration: "20s", target: "100" },
        { duration: "20s", target: "150" },
    ],
};

const baseUrl = "http://52.90.178.224:5000";

export default function () {
    http.get(`${baseUrl}/produtos`);
    sleep(1);

    http.get(`${baseUrl}/estoques`);
    sleep(1);

    http.get(`${baseUrl}/lojas`);
    sleep(1);

    http.get(`${baseUrl}/usuarios`);
    sleep(1);

    http.get(`${baseUrl}/vendedores`);
    sleep(1);
}
