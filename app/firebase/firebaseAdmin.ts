import admin from "firebase-admin";

interface firebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  storageBucket: string;
}

function formatKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: firebaseAdminAppParams) {
  const privateKey = formatKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }
  const { projectId, clientEmail, storageBucket } = params;

  const credential = admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential,
    projectId,
    storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  };

  return createFirebaseAdminApp(params);
}
