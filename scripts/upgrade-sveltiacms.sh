#!/usr/bin/env bash

set -eo pipefail

release=$(curl -s https://api.github.com/repos/sveltia/sveltia-cms/releases/latest)
input=$(jq -r .name <<<"$release")

if [[ $input =~ v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
	version="${BASH_REMATCH[1]}"
	echo "New version of Sveltia CMS: $version"
else
	echo "Failed to retrieve version"
	exit 1
fi

regex="s|https://unpkg.com/@sveltia/cms@v[0-9]*\.[0-9]*\.[0-9]*/dist/sveltia-cms.js|https://unpkg.com/@sveltia/cms@v$version/dist/sveltia-cms.js|g"

files=(
	./static/admin/index.html
)

cleanup() {
	for x in "${files[@]}"; do
		rm -f "$x.upg"
	done
	exit
}

trap cleanup EXIT

for x in "${files[@]}"; do
	sed -E "$regex" "$x" >"$x.upg"
	mv "$x.upg" "$x"
done

