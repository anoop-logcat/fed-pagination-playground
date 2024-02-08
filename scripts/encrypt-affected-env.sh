#!/bin/bash

workspaceDir="$1"
passphrase="$2"
STAGE=${3:-'*'}

find "$workspaceDir" -type f -name ".env.$STAGE" -print0 | while read -d $'\0' env_file; do
  encrypted_file="$env_file.gpg"
  temp_file="$env_file.temp"
  unencrypted_file="$env_file"

  echo "$passphrase" | gpg --batch --passphrase-fd 0 --quiet --yes --decrypt "$encrypted_file" > "$temp_file"
  if cmp -s "$temp_file" "$unencrypted_file"; then
    echo
    echo "No Change Detected -> ${env_file#${workspaceDir}/}"
    echo
  else
    echo
    echo "Change Detected -> ${env_file#${workspaceDir}/}"
    echo
    find $unencrypted_file -exec gpg --passphrase "$passphrase" --quiet --yes --batch -c {} ';'
  fi

  rm "$temp_file"
done