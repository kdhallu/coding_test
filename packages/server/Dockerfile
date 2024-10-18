# Stage 1: Install dependencies
FROM node:20 AS builder
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Copy dependencies and run the project
FROM node:20-slim
WORKDIR /backend
COPY --from=builder /backend/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "start"]
EXPOSE 8080
