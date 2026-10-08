import { initializeApp, getApps } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

export const app = isFirebaseConfigured ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig)) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

export const reviewsCollection = db ? collection(db, 'reviews') : null;

export async function getApprovedReviews() {
  if (!db) {
    return [];
  }

  const q = query(collection(db, 'reviews'), where('approved', '==', true), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

export async function getPendingReviews() {
  if (!db) {
    return [];
  }

  const q = query(collection(db, 'reviews'), where('approved', '==', false), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

export async function submitReview(reviewData) {
  if (!db) {
    throw new Error('Firebase Firestore is not configured.');
  }

  await addDoc(collection(db, 'reviews'), {
    ...reviewData,
    approved: false,
    createdAt: serverTimestamp(),
  });
}

export async function approveReview(id) {
  if (!db) {
    throw new Error('Firebase Firestore is not configured.');
  }

  const reviewRef = doc(db, 'reviews', id);
  await updateDoc(reviewRef, { approved: true });
}

export async function deleteReview(id) {
  if (!db) {
    throw new Error('Firebase Firestore is not configured.');
  }

  const reviewRef = doc(db, 'reviews', id);
  await deleteDoc(reviewRef);
}
