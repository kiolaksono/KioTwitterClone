/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
],
  theme: {
    extend: {},
    colors:{ 
      'mint':'#bee9e8',
      'moonstone':'#62b6cb',
      'indigo':'#1B4965',
      'colombia-blue':'#CAE9FF',
      'picton-blue':'#5FA8D3',
      'violet':'#4e0250',
      'magenta':'#801a86',
      'light-midnight':'#645986',
      'green':'#8FE388',
      'emerald':'#58bc82',
      'gray':'#f1f5f9'
     } 
  },
  plugins: [],
}

