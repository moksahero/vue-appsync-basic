import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import appSyncConfig from './AppSync'
import Amplify from 'aws-amplify'

const amplifyConfig = {
    'aws_appsync_graphqlEndpoint': appSyncConfig.graphqlEndpoint,
    'aws_appsync_region': appSyncConfig.region,
    'aws_appsync_authenticationType': appSyncConfig.authenticationType,
    'aws_appsync_apiKey': appSyncConfig.apiKey
}

Amplify.configure(amplifyConfig)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
