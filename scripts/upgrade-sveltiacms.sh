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

current_dir="$PWD"
tmp_dir=$(mktemp -d)
wget --max-redirect=1 -O "${tmp_dir}/sveltiacms.tar.gz" "https://github.com/sveltia/sveltia-cms/archive/refs/tags/v${version}.tar.gz"
tar zxvf "${tmp_dir}/sveltiacms.tar.gz" -C "${tmp_dir}/"
cd "${tmp_dir}/sveltia-cms-$version"
pnpm install
pnpm build
cp -r "${tmp_dir}/sveltia-cms-$version/package/dist/sveltia-cms.js" "$current_dir/static/admin/dist"

