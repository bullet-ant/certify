import * as forge from "node-forge";

/**
 * @param {{ commonName: String; country: String; organization: String; unit: String; }} [options]
 */
export async function createRootCA(options) {
  const { commonName, country, organization, unit } = options;
  console.log(options);
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
    { name: "commonName", value: commonName },
    { name: "countryName", value: country },
    { name: "organizationName", value: organization },
    { shortName: "OU", value: unit },
  ];

  caCert.setSubject(attrs);
  caCert.setIssuer(attrs);
  caCert.setExtensions([
    {
      name: "basicConstraints",
      cA: true,
      critical: true,
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

/**
 * @param {{ privateKey?: any; certificate?: any; privateKeyPem: any; certificatePem: any; }} rootCA
 * @param {{ commonName: String; country: String; organization: String; unit: String; sans: String[]}} [options]
 */
export function createCertificate(rootCA, options) {
  const { commonName, country, organization, unit, sans } = options;

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
    { name: "commonName", value: commonName },
    { name: "countryName", value: country },
    { name: "organizationName", value: organization },
    { shortName: "OU", value: unit },
  ];

  const sanExtension = {
    name: "subjectAltName",
    altNames: sans.map((/** @type {String} */ dns) => ({
      type: 2,
      value: dns,
    })),
  };
  cert.setSubject(attrs);
  cert.setIssuer(caCert.subject.attributes);
  cert.setExtensions([sanExtension]);

  cert.sign(caPrivateKey);

  return {
    privateKeyPem: forge.pki.privateKeyToPem(certKeys.privateKey),
    certificatePem: forge.pki.certificateToPem(cert),
    privateKey: certKeys.privateKey,
    certificate: cert,
  };
}

export function generatePKCS12Bundle({
  privateKey,
  certificate,
  caCertificate,
  password,
}) {
  const certificateChain = [certificate, caCertificate];
  try {
    const p12Asn1 = forge.pkcs12.toPkcs12Asn1(
      privateKey,
      certificateChain,
      password,
      { algorithm: "3des" }
    );
    const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
    // const p12b64 = forge.util.encode64(p12Der);

    // return p12b64;
    return p12Der;
  } catch (error) {
    console.error("Error generating PKCS#12 bundle:", error);
    throw error;
  }
}

export function loadCA(file, type) {
  try {
    switch (type) {
      case 1:
        return forge.pki.certificateFromPem(file);
      case 2:
        return forge.pki.privateKeyFromPem(file);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
