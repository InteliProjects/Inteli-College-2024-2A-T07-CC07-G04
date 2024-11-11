import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
    scenarios: {
        default: {
            executor: "ramping-vus",
            startVUs: 0,
            stages: [
                { duration: "30s", target: 20 }, // Ramp-up para 20 VUs
                { duration: "20s", target: 100 }, // Carga plena de 100 VUs
                { duration: "30s", target: 0 }, // Ramp-down para 0 VUs
            ],
            gracefulStop: "1m", // Aumenta o tempo de parada graciosa para 1 minuto
        },
    },
};
export default function () {
    const LoadBalancerURL = "http://web-lb-1041850123.us-east-1.elb.amazonaws.com:5000";

    let res_produtos = http.get(LoadBalancerURL + "/produtos");
    check(res, {
        "status is 200": (r) => r.status === 200,
    });
    sleep(10);

    let res_lojas = http.get(LoadBalancerURL + "/lojas");
    check(res, {
        "status is 200": (r) => r.status === 200,
    });

    sleep(10);
}
