import { sveltekit } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import { defineConfig } from 'vitest/config'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.md'],
      preprocess: [
        mdsvex({
          extensions: ['.md']
        }),
        vitePreprocess()
      ],
      adapter: adapter({
        // default options are shown. On some platforms
        // these options are set automatically — see below
        pages: 'build',
        assets: 'build',
        fallback: undefined,
        precompress: false,
        strict: true
      }),
      prerender: {
        entries: ['*', '/search.json']
      },
      onwarn: (warning, handler) => {
        // supress a11y warnings in markdown files
        if (warning.code.startsWith('a11y_') && warning.filename?.endsWith('.md')) return
        handler(warning)
      }
    }),
    imagetools({
      cache: {
        enabled: true,
        dir: './node_modules/.cache/imagetools'
      }
    })
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
