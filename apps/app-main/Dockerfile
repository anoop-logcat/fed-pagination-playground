FROM node:20

# create & set working directory
RUN mkdir -p /home/node/fed-pagination-playground
WORKDIR /home/node/fed-pagination-playground

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of app-main
RUN mkdir -p apps/app-main/dist
COPY --chown=node ./apps/app-main/package.json ./apps/app-main/
COPY --chown=node ./apps/app-main/dist ./apps/app-main/dist

# install dependencies
RUN npm install -w app-main --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "app-main", "start" ]