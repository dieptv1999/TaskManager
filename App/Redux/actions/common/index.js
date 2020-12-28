import {
    LOADING,
    UNLOADING,
  } from './action_types'
  
  export default {
    unLoadingAction: () => {
      return {
        type: UNLOADING
      }
    },
    loadingAction: () => {
      return {
        type: LOADING
      }
    },
  }
  