import { Divider } from "antd";

import ArchitectureSvg from "@/assets/architecture.svg?react";
import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";

export default function AboutPage() {
  return (
    <PageLayout className="space-y-21">
      <section>
        <Title title="🎯 Primary Use Cases" />
        <Divider />
        <table className="ring ring-gray-600 rounded-md overflow-hidden text-sm">
          <thead>
            <tr>
              <th className="ring ring-gray-600 p-3">Use Case</th>
              <th className="ring ring-gray-600 p-3">Description</th>
            </tr>
          </thead>
          <tbody className="text-left font-normal!">
            <tr>
              <th className="ring ring-gray-600 p-3">Omnichannel E-Commerce</th>
              <th className="ring ring-gray-600 p-3">
                Omnichannel E-Commerce Centralize product catalog, variants,
                pricing, and assets across web, mobile, in-store POS, and
                partner marketplaces.
              </th>
            </tr>
            <tr>
              <th className="ring ring-gray-600 p-3">
                Microservices Catalog Backbone
              </th>
              <th className="ring ring-gray-600 p-3">
                Serve internal ordering and inventory services over gRPC while
                exposing GraphQL to client applications.
              </th>
            </tr>
            <tr>
              <th className="ring ring-gray-600 p-3">
                High-Faceted Search Catalogs
              </th>
              <th className="ring ring-gray-600 p-3">
                High-Faceted Search Catalogs Deliver fast, complex attribute
                filtering (e.g., brand, price ranges, technical specs,
                categories) powered by Elasticsearch.
              </th>
            </tr>
            <tr>
              <th className="ring ring-gray-600 p-3">
                Digital Asset Management (DAM)
              </th>
              <th className="ring ring-gray-600 p-3">
                Digital Asset Management (DAM) Store and link high-resolution
                product photography and assets reliably via S3-compatible
                storage.
              </th>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <Title title="🏗️ Architecture Overview" />
        <Divider />
        <ArchitectureSvg />
      </section>
      <section>
        <Title title="💻 Tech Stack Summary" />
        <Divider />
        <ul className="pl-3 space-y-3">
          <li>
            <span className="font-bold">Runtime & Language</span>: Node.js,
            TypeScript
          </li>
          <li>
            <span className="font-bold">APIs</span>: Apollo Server (GraphQL),
            Express 5 (REST), @grpc/grpc-js (gRPC)
          </li>
          <li>
            <span className="font-bold">Databases</span>: PostgreSQL (Prisma
            ORM), Elasticsearch 9
          </li>
          <li>
            <span className="font-bold">Asset Storage</span>: MinIO / AWS S3
            SDK, Sharp
          </li>
          <li>
            <span className="font-bold">Validation & Security</span>: Zod
            schemas, GraphQL Shield, JWT authentication, UUIDv7 API keys
          </li>
        </ul>
      </section>
    </PageLayout>
  );
}
