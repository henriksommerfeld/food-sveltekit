#!/usr/bin/env bash

set -eo pipefail

release=$(curl -s https://api.github.com/repos/static-web-server/static-web-server/releases/latest)
input=$(jq -r .name <<<"$release")

if [[ $input =~ v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
	version="${BASH_REMATCH[1]}"
	echo "New version of Static Web Server: $version"
else
	echo "Failed to retrieve version"
	exit 1
fi

regex="s/static-web-server:[0-9]+\.[0-9]+\.[0-9]+/static-web-server:$version/g"

file=Dockerfile

cleanup() {
	rm -f "$file.upg"
	exit
}

trap cleanup EXIT

sed -E "$regex" "$file" >"$file.upg"
mv "$file.upg" "$file"


