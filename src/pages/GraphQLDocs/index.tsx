import { ApolloSandbox } from "@apollo/sandbox/react";

import { PageLayout } from "@/components/PageLayout";

export default function GraphQLDocsPage() {
  return (
    <PageLayout className="max-w-full p-0!">
      <ApolloSandbox
        initialEndpoint="/graphql"
        className="w-full h-(--screen-height)!"
      />
    </PageLayout>
  );
}
