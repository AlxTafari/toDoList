import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'dashesOnly', // или 'camelCaseOnly', 'dashes', 'camelCase'
            generateScopedName: '[name]__[local]___[hash:base64:5]', // формат: ComponentName_className_hash
        },
    },
});