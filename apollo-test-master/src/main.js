import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

Vue.use(AmplifyPlugin, AmplifyModules);

import AWSAppSyncClient from "aws-appsync";
import VueApollo from "vue-apollo";
import Buefy from "buefy";
import "./assets/scss/app.scss";

Vue.use(Buefy);

const config = {
  disableOffline: true,
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    // type: awsmobile.authenticationType,
    // apiKey: awsmobile.apiKey,
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: async () =>
      (await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser())
        .signInUserSession.accessToken.jwtToken
  }
};
const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
};

const client = new AWSAppSyncClient(config, options);
const appsyncProvider = new VueApollo({
  defaultClient: client,
  connectToDevTools: true
});

Vue.use(VueApollo);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: appsyncProvider,
  render: h => h(App)
}).$mount("#app");
