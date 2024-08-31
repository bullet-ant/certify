import * as forge from "node-forge";

const ROOT_CA_KEY_SIZE = 4096;
const CERTIFICATE_KEY_SIZE = 4096;
const PKCS12_ALGORITHM = "aes256";
const PKCS12_ALIAS = "certify";

/**
 * @param {{ commonName: String; country: String; organization: String; unit: String; }} [options]
 */
export function createRootCA(options) {
  return new Promise((resolve, reject) => {
    const { commonName, country, organization, unit } = options;

    forge.pki.rsa.generateKeyPair(
      { bits: ROOT_CA_KEY_SIZE, workers: 2 },
      (err, keypair) => {
        if (err) {
          reject(err);
          return;
        }

        const caCert = forge.pki.createCertificate();

        caCert.publicKey = keypair.publicKey;
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

        const basicConstraintsExtension = {
          name: "basicConstraints",
          cA: true,
          critical: true,
        };

        const keyUsageExtension = {
          name: "keyUsage",
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true,
        };

        caCert.setExtensions([basicConstraintsExtension, keyUsageExtension]);

        caCert.sign(keypair.privateKey, forge.md.sha256.create());

        const result = {
          privateKeyPem: forge.pki.privateKeyToPem(keypair.privateKey),
          certificatePem: forge.pki.certificateToPem(caCert),
          privateKey: keypair.privateKey,
          certificate: caCert,
        };

        resolve(result);
      }
    );
  });
}

/**
 * @param {{ privateKey?: any; certificate?: any; privateKeyPem: any; certificatePem: any; }} rootCA
 * @param {{ commonName: String; country: String; organization: String; unit: String; sans: String[]}} [options]
 */
export function createCertificate(rootCA, options) {
  return new Promise((resolve, reject) => {
    const { commonName, country, organization, unit, sans } = options;

    const caPrivateKey = forge.pki.privateKeyFromPem(rootCA.privateKeyPem);
    const caCert = forge.pki.certificateFromPem(rootCA.certificatePem);

    forge.pki.rsa.generateKeyPair(
      { bits: CERTIFICATE_KEY_SIZE, workers: 2 },
      function (err, certKeys) {
        if (err) {
          console.error("Error generating keys");
          reject(err);
          return;
        }

        const cert = forge.pki.createCertificate();

        cert.publicKey = certKeys.publicKey;
        cert.serialNumber = forge.util.bytesToHex(
          forge.random.getBytesSync(16)
        );
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(
          cert.validity.notBefore.getFullYear() + 1
        );

        const attrs = [
          { name: "commonName", value: commonName },
          { name: "countryName", value: country },
          { name: "organizationName", value: organization },
          { shortName: "OU", value: unit },
        ];

        const sanExtension = {
          name: "subjectAltName",
          altNames: sans.map((dns) => ({
            type: 2,
            value: dns,
          })),
        };

        cert.setSubject(attrs);
        cert.setIssuer(caCert.subject.attributes);
        cert.setExtensions([sanExtension]);

        cert.sign(caPrivateKey, forge.md.sha256.create());
        const result = {
          privateKeyPem: forge.pki.privateKeyToPem(certKeys.privateKey),
          certificatePem: forge.pki.certificateToPem(cert),
          privateKey: certKeys.privateKey,
          certificate: cert,
        };

        resolve(result);
      }
    );
  });
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
      { algorithm: PKCS12_ALGORITHM, friendlyName: PKCS12_ALIAS }
    );
    const p12Der = forge.asn1.toDer(p12Asn1).getBytes();

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
      default:
        throw new Error("Invalid CA type");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
