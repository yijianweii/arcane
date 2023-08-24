### 集成Tailwind CSS
1. 初始化Tailwind CSS
```
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
2. 在生成的tailwind.config.js文件中，添加
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 用到tailwind的地方
  ],
  darkMode: "class", 
  theme: {
    extend: {},
  },
  plugins: [],
}
```
3. 在./src/index.css中添加（注意，该文件必须导入到main.tsx中）
```css 
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 使用Tailwind CSS设置夜间模式
1. 配置tailwind.config.js
```js
module.exports = {
  ...
  darkMode: "class", 
}
```
2. 使用
```js
import { useState } from 'react';

function App() {
  const [ isDark, setIsDark ] = useState(false);
  return (
    <>
      <div className={`${isDark ? 'dark': 'light'}`}>
        <div>
          <div className="dark:bg-gray-800 bg-gray-100">这是内容</div>
          <button onClick={()=>setIsDark(!isDark)} >切换</button>
        </div>
      </div>
    </>
  );
}
export default App;
```