#!/bin/bash
STAGE=${2:-'*'}
find "$1" -name ".env.$STAGE" | sed -r 's/\.env.*.[[:alnum:]]+$//' | xargs -I{} cp "{}.env.$STAGE" "{}.env.local"
echo "-------> Moved .env.$STAGE to .env.local"
echo "-------> ENV Created"