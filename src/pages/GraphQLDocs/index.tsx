import { ApolloSandbox } from "@apollo/sandbox/react";

import { PageLayout } from "@/components/PageLayout";

export default function GraphQLDocsPage() {
  return (
    <PageLayout className="max-w-full p-0!">
      <ApolloSandbox
        initialEndpoint={`${window.location.protocol}//${window.location.host}/graphql`}
        className="w-full h-(--screen-height)!"
      />
    </PageLayout>
  );
}
