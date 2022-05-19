import KeyScreens from './KeyScreens';
import ScreenLogin from '../ScreenLogin';
const AllScreensBeforeLogin = [
  {
    name: KeyScreens.list,
    component: ScreenLogin,
  },
  {
    name: KeyScreens.update,
    component: ScreenLogin,
  },
  {
    name: KeyScreens.login,
    component: ScreenLogin,
  },
];
export default AllScreensBeforeLogin;
