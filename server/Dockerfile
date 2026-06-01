FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# 🔥 BUILD PLUGIN FIRST (IMPORTANT)
RUN cd src/plugins/editorjs && npm install && npm run build

# Clean Strapi cache
RUN rm -rf .cache build .strapi

# Build Strapi admin
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]