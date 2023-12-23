import * as forge from "node-forge";

export async function createRootCA() {
  const caKeys = forge.pki.rsa.generateKeyPair(2048);
  const caCert = forge.pki.createCertificate();

  caCert.publicKey = caKeys.publicKey;
  caCert.serialNumber = "01";
  caCert.validity.notBefore = new Date();
  caCert.validity.notAfter = new Date();
  caCert.validity.notAfter.setFullYear(
    caCert.validity.notBefore.getFullYear() + 1
  );

  const attrs = [
    { name: "commonName", value: "Sample Root CA" },
    { name: "countryName", value: "US" },
    { shortName: "ST", value: "CA" },
    { name: "localityName", value: "City" },
    { name: "organizationName", value: "Organization" },
    { shortName: "OU", value: "Unit" },
  ];

  caCert.setSubject(attrs);
  caCert.setIssuer(attrs);
  caCert.setExtensions([
    {
      name: "basicConstraints",
      cA: true,
    },
    {
      name: "keyUsage",
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
  ]);

  caCert.sign(caKeys.privateKey);

  return {
    privateKeyPem: forge.pki.privateKeyToPem(caKeys.privateKey),
    certificatePem: forge.pki.certificateToPem(caCert),
    privateKey: caKeys.privateKey,
    certificate: caCert,
  };
}

export function createCertificate(rootCA) {
  const caPrivateKey = forge.pki.privateKeyFromPem(rootCA.privateKeyPem);
  const caCert = forge.pki.certificateFromPem(rootCA.certificatePem);

  const certKeys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();

  cert.publicKey = certKeys.publicKey;
  cert.serialNumber = "02";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [
    { name: "commonName", value: "Example Domain" },
    { name: "countryName", value: "US" },
    { shortName: "ST", value: "State" },
    { name: "localityName", value: "City" },
    { name: "organizationName", value: "Organization" },
    { shortName: "OU", value: "Unit" },
  ];

  cert.setSubject(attrs);
  cert.setIssuer(caCert.subject.attributes);

  const sanExtension = {
    name: "subjectAltName",
    altNames: [
      { type: 2, value: "www.example.com" },
      { type: 2, value: "example.com" },
    ],
  };

  cert.setExtensions([sanExtension]);

  cert.sign(caPrivateKey);

  return {
    privateKey: forge.pki.privateKeyToPem(certKeys.privateKey),
    certificate: forge.pki.certificateToPem(cert),
  };
}
