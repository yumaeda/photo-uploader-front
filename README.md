## Installation
1. Install node.js

2. Install modules
```bash
npm install
```

3. Compile
```bash
npm run build
```

4. Run test
```bash
npm start
```

5.  Run Prettier
```bash
npx prettier --write src/**/*.*
```
In order not to apply Prettier, add `// prettier-ignore`
```javascript
// prettier-ignore
const jsx = `Long long long long long long long long long text with ${text.length} characters.`
```

## TSX Syntax Highlighting for Vim
1. Install Vundle
```bash
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

2. Prepend below to ~/.vimrc
```vim
set nocompatible
filetype off

" Set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" Let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" TSX plugins
Plugin 'leafgarland/typescript-vim'
Plugin 'peitalin/vim-jsx-typescript'

call vundle#end()

filetype plugin indent on
```

3. Run below commands in vim
```vim
:so ~/.vimrc
:PluginInstall
```
