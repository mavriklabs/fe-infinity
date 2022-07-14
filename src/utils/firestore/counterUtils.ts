import { firestoreConstants } from '@infinityxyz/lib-frontend/utils';
import { doc } from 'firebase/firestore';
import { FirestoreDistributedCounter } from './FirestoreDistributedCounter';
import { firestoreDb } from './firestoreUtils';

export async function increaseComments(userAccount: string, itemId: string) {
  const docRef = doc(firestoreDb, `${firestoreConstants.FEED_COLL}/${itemId}`);
  // eslint-disable-next-line
  const comments = new FirestoreDistributedCounter(docRef as any, 'comments');
  comments.incrementBy(1);
}
