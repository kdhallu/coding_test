# Stage 1: Install dependencies
FROM node:20 AS builder
WORKDIR /client
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Copy dependencies and run the project
FROM node:20-slim
WORKDIR /client
COPY --from=builder /client/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
EXPOSE 8080
