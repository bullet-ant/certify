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
  commonName: "certify.amancodes.me",
  country: "IN",
  organization: "Certify Inc.",
  unit: "Security",
  sans: [],
};

const sslOptionsInitialized = {
  commonName: "amancodes.me",
  country: "IN",
  organization: "Certify Inc.",
  unit: "Security",
  sans: [],
  alias: "certify",
  password: "catonkeyboard",
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
