import './global'
import React from 'react'
import './App/Config/ReactotronConfig'
import RootContainer from './App/Containers/RootContainer'
import { Navigation } from 'react-native-navigation'
import createStore from './App/Redux';
import Navigator from './App/Navigation/Navigator'
import { TASK_MANAGER } from './App/Containers';
import { withTranslation } from 'react-i18next';
import { Provider } from 'react-redux'

const store = createStore();
export const withReduxProvider = (C) => (props) => {
  Comp = withTranslation('default')(C)
  return (
    <Provider store={store}>
      <Comp {...props} />
    </Provider>
  )
};

const Screens = new Map();
Screens.set(TASK_MANAGER, RootContainer)
Screens.forEach((C, key) => {
  Navigation.registerComponent(
    key,
    () => withReduxProvider(C),
    () => C,
  );
});


Navigation.events().registerAppLaunchedListener(() => {
  Navigator.setRoot()
})
