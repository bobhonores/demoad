import { runWithAdal } from 'react-adal';
import { authContext, axiosInterceptor } from './adalConfig';

const DO_NOT_LOGIN = false;

runWithAdal(authContext, async () => {
  await axiosInterceptor(authContext);
  // eslint-disable-next-line
  require('./indexApp.js');
}, DO_NOT_LOGIN);