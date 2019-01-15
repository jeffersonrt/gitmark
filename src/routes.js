import { createAppContainer, createStackNavigator } from 'react-navigation';

import { colors } from '~/styles';

import Main from '~/pages/Main';
import Favorites from '~/pages/Favorites';

const Routes = createStackNavigator(
  {
    Main,
    Favorites,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primaryDark,
      },
      headerTintColor: colors.white,
      headerBackTitle: null,
    },
  },
);
export default createAppContainer(Routes);
