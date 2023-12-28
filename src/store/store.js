import { writable } from "svelte/store";

const rootCAInitialized = {
  privateKey: null,
  certificate: null,
  privateKeyPem: null,
  certificatePem: null,
};

const sslInitialized = {
  privateKey: null,
  certificate: null,
  privateKeyPem: null,
  certificatePem: null,
  pkcs12: null,
};

const caOptionsInitialized = {
  commonName: "CertifyCA",
  country: "IN",
  organization: "Mobileum Inc.",
  unit: "Security",
  sans: [],
};

const sslOptionsInitialized = {
  commonName: "SEPP",
  country: "IN",
  organization: "Mobileum Inc.",
  unit: "Security",
  sans: [],
};

export const serialNumber = writable(0);
export const rootCA = writable(rootCAInitialized);
export const ssl = writable(sslInitialized);
export const caOptions = writable(caOptionsInitialized);
export const sslOptions = writable(sslOptionsInitialized);
export const existingCA = writable(false);
export const landingPage = writable(false);
export const loadingCa = writable(false);
export const loadingSsl = writable(false);
