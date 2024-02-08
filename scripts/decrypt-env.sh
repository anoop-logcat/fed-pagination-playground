STAGE=${3:-'*'}
find "$1" -name ".env.$STAGE.gpg" | sed -r 's/\.[[:alnum:]]+$//' | xargs -I{} gpg --passphrase "$2" --quiet --yes --batch -o {} -d {}.gpg