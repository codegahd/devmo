/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js,ts,tsx}", "./src/main.jsx"],
  theme: {
    extend: {},
  },
  plugins: [
    import('@tailwindcss/forms')
  ],
}

