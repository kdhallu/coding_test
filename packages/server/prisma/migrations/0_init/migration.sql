generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Metric {
  id          Int      @id @default(autoincrement())
  measurement String   @map("measurement")
  timestamp   DateTime @map("timestamp") @db.Timestamptz(6)
  value       Float    @map("value")  // This will store the value of "0100011D00FF" (e.g., 0.0117)

  tags        Tag[]    @relation("MetricTags")

  @@map(name: "metrics")
}

model Tag {
  id       Int    @id @default(autoincrement())
  muid     String @map("muid")
  quality  String @map("quality")
  metricId Int
  metric   Metric @relation("MetricTags", fields: [metricId], references: [id])

  @@map(name: "tags")
}
