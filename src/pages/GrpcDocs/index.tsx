import { PageLayout } from "@/components/PageLayout";

export default function GrpcDocsPage() {
  return (
    <PageLayout className="py-0!">
      <iframe
        src="/grpc-docs.html"
        className="w-full min-h-(--screen-height) scrollbar-auto!"
      />
    </PageLayout>
  );
}
