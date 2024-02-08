STAGE=${3:-'*'}
find "$1" -name ".env.$STAGE" -exec gpg --passphrase "$2" --quiet --yes --batch -c {} ';'