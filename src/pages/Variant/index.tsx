import { useParams } from "react-router";
import { Divider } from "antd";

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";

export default function VariantPage() {
  const { variantId } = useParams();
  return (
    <PageLayout>
      <Title title="Edit Variant" />
      <Divider />
    </PageLayout>
  );
}
