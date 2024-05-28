FROM node:20.3.1-alpine as dependencies
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm i -g @nestjs/cli
RUN npm install ci

FROM node:20.3.1-alpine as builder
WORKDIR /backend
COPY . .
COPY --from=dependencies /backend/node_modules ./node_modules
RUN npm run build

FROM node:20.3.1-alpine as runner
WORKDIR /backend
ENV NODE_ENV production

COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/package.json ./package.json
COPY --from=builder /backend/node_modules ./node_modules
COPY --from=builder /backend/tsconfig.json ./tsconfig.json
COPY --from=builder /backend/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /backend/nest-cli.json ./nest-cli.json
COPY --from=builder /backend/.prettierrc ./.prettierrc
COPY --from=builder /backend/.eslintrc.js ./.eslintrc.js


EXPOSE 5555
CMD ["npm", "start"]