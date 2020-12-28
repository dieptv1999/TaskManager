import { Navigation } from 'react-native-navigation';
import { TASK_MANAGER } from '../Containers/index'

const Navigator = {
    setRoot: () => Navigation.setRoot({
        root: {
            stack: {
                id: 'TaskManager',
                children: [
                    {
                        component: {
                            name: TASK_MANAGER,
                            options: {
                                topBar: {
                                    visible: false,
                                },
                                statusBar: {
                                    visible: false,
                                    backgroundColor: 'transparent',
                                    style: 'light',
                                },
                            }
                        }
                    }
                ]
            }
        }
    }),

}

export default Navigator;
