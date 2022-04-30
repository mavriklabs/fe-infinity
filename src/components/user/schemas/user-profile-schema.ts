import * as Yup from 'yup';
import { apiGet } from 'src/utils';

export const UserProfileSchema = Yup.object().shape({
  bio: Yup.string().max(250, 'Too Long!'),
  displayName: Yup.string(),
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(14, 'Too Long!')
    .matches(/[a-zA-Z0-9_]+$/, 'a-z, A-Z, 0-9, _ can be used')
    .test(
      'Unique username',
      'Username already in use', // <- key, message
      (value, context) => {
        const userAddress = context?.parent?.address;

        if (!!value && userAddress) {
          return new Promise((resolve, reject) => {
            apiGet(`/user/${userAddress}/checkUserName`, { query: { username: value } })
              .then(({ result, error }) => {
                if (error) {
                  resolve(false);
                }
                if (!result.valid) {
                  resolve(false);
                }
                resolve(true);
              })
              .catch(() => {
                reject(false);
              });
          });
        }
        return true;
      }
    )
});
