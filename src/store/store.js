import { writable } from "svelte/store";

const rootCAInitialized = {
  privateKey: null,
  certificate: null,
  privateKeyPem: null,
  certificatePem: null,
};

export const serialNumber = writable(0);
export const rootCA = writable(rootCAInitialized);
