#!/usr/bin/env bash

set -eo pipefail

version=$(curl -s https://nodejs.org/dist/index.json |
	jq -r '. | map(select(.lts != false))[0] | .version[1:]')

if [[ -z "$version" ]] || [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
	echo "Failed to retrieve version"
	exit 1
fi

echo "$version"

printf 'v%s' "$version" >.nvmrc
