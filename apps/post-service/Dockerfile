FROM node:20

# create & set working directory
RUN mkdir -p /home/node/fed-pagination-playground
WORKDIR /home/node/fed-pagination-playground

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of post-service
RUN mkdir -p apps/post-service/dist
COPY --chown=node ./apps/post-service/package.json ./apps/post-service/
COPY --chown=node ./apps/post-service/dist ./apps/post-service/dist

# install dependencies
RUN npm install -w post-service --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "post-service", "start" ]
