import { ApolloProvider } from "@apollo/client/react";
import { I18nextProvider } from "react-i18next";

import { apolloClient } from "@/libs/apollo";
import { AntConfigProvider } from "@/components/AntConfigProvider";
import { Router } from "@/router";
import i18n from "@/libs/i18n";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <AntConfigProvider>
          <Router />
        </AntConfigProvider>
      </I18nextProvider>
    </ApolloProvider>
  );
}

export default App;
