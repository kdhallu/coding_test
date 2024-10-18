-- Create the MeterData table with tags stored as JSON
CREATE TABLE "meterdata" (
                           "id" SERIAL PRIMARY KEY,
                           "measurement" TEXT NOT NULL,
                           "timestamp" TIMESTAMPTZ(6) NOT NULL,
                           "key" TEXT NOT NULL,
                           "value" DOUBLE PRECISION NOT NULL,
                           "tags" JSONB NOT NULL -- Store tags as JSON
);
