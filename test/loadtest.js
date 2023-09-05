import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const rnd = Math.floor(Math.random() * 1000011) + 1;
  const response = http.get(`http://localhost:3000/products/${rnd}/styles`);
  check(response, {
      "is status 200": (r) => r.status === 200
  });
  // sleep(1);
}

export let options = {
  vus: 100,
  duration: '10s',
}