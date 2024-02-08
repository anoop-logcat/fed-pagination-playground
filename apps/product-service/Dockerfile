FROM node:20

# create & set working directory
RUN mkdir -p /home/node/fed-pagination-playground
WORKDIR /home/node/fed-pagination-playground

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of product-service
RUN mkdir -p apps/product-service/dist
COPY --chown=node ./apps/product-service/package.json ./apps/product-service/
COPY --chown=node ./apps/product-service/dist ./apps/product-service/dist

# install dependencies
RUN npm install -w product-service --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "product-service", "start" ]
