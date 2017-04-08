execute pathogen#infect()
syntax on
filetype plugin indent on
set exrc
set secure
set tabstop=4
set softtabstop=4
set shiftwidth=4
set wmh=0
set wmw=0
set noexpandtab
set ignorecase
set splitright
set mouse=a

syntax enable
set background=dark
"set t_Co = 256
"colorscheme magellan
"colorscheme monokai
colorscheme luna-term
"colorscheme basic-dark
"let g:solarized_termtrans = 1
"colorscheme solarized

" Line numbers
set number
highlight LineNr ctermfg=darkgray

set hidden
let mapleader = "\<Space>"

" Copy to system clipboard with space p
vmap <Leader>y "+y 
vmap <Leader>d "+d 
nmap <Leader>p "+p 
nmap <Leader>P "+P 
vmap <Leader>p "+p 
vmap <Leader>P "+P 

vmap D y'>p
imap <C-n> <C-o>o

" Jump to end of line after paste
vnoremap <silent> y y`] 
vnoremap <silent> p p`] 
nnoremap <silent> p p`] 

" vim expand region
vmap v <Plug>(expand_region_expand)
vmap <C-v> <Plug>(expand_region_shrink)

" Enable the list of buffers
let g:airline_theme='luna'
let g:airline#extensions#tabline#enabled = 1 
let g:airline#extensions#tabline#fnamemod = ':t'
let g:airline#extensions#tabline#tab_nr_type = 1 

hi Pmenu ctermbg=darkgray ctermfg=gray guibg=darkgray guifg=#0DA2B3
hi PmenuSel ctermbg=gray ctermfg=black guibg=#0DA2B3 guifg=black
hi PmenuSbar ctermbg=gray guibg=#0DA2B3
hi PmenuThumb cterm=reverse gui=reverse
" Ctrl P
let g:ctrlp_prompt_mappings = {
            \ 'AcceptSelection("e")':['<c-t>'],
            \ 'AcceptSelection("t")':['<cr>','<2-LeftMouse>'],
            \ }
map <Leader>p :CtrlP<cr>

"Focus to next window
nmap <silent> <C-Up> :wincmd k<CR>
nmap <silent> <C-Down> :wincmd j<CR>
nmap <silent> <C-Left> :wincmd h<CR>
nmap <silent> <C-Right> :wincmd l<CR>

"Resize windows
map <C-h> :wincmd h<CR>
map <C-l> :wincmd l<CR>
map <C-j> :vertical resize -5<CR>
map <C-k> :vertical resize +5<CR>

"Scroll between windows
nnoremap <Leader>1 1gt
nnoremap <Leader>2 2gt
nnoremap <Leader>3 3gt
nnoremap <Leader>4 4gt
nnoremap <Leader>5 5gt
nnoremap <Leader>6 6gt
nnoremap <Leader>7 7gt
nnoremap <Leader>8 8gt
nnoremap <Leader>9 9gt
nnoremap <Leader>0 10gt
map _ :tabp<cr>
map + :tabn<cr>

set pastetoggle=<F2>

" Format source code
map <Leader>f mzgg=G`z<CR>

" Build via makefile
set makeprg=make\ -C\ ./\ -j
map <Leader>m :w <Bar> Make!<cr>

"map <F3> :silent execute ":make! > ~/.vim/cpperrors 2>&1 &" | redraw!<cr>
map <Leader>n :Copen<cr>
"map <F7> :!(cd out; ./mdp)<cr>
"
"Open file in new window
map <Leader>o :tabnew **/<cfile><cr>

map <F9> :TagbarToggle<CR>
map <F10> :UndotreeToggle<cr>
map <F12> :bdelete<cr>
map <S-q> :q<cr>
map q: :q
map :Q :q
map <S-w> :w<cr>

"inoremap <up> <nop>
vnoremap <up> <nop>
"inoremap <down> <nop>
vnoremap <down> <nop>
"inoremap <right> <nop>
vnoremap <right> <nop>
"inoremap <left> <nop>
vnoremap <left> <nop>

" Allow movement in insert mode
imap <A-h> <Left>
imap <A-j> <Down>
imap <A-k> <Up>
imap <A-l> <Right>

" Allows delete in insert mode with ctrl-d
imap <c-d> <C-o>diw

" Easy Motion Keys
nmap s <Plug>(easymotion-s)
let g:EasyMotion_smartcase = 1
"map  / <Plug>(easymotion-sn)
"omap / <Plug>(easymotion-tn)
"map  n <Plug>(easymotion-next)
"map  N <Plug>(easymotion-prev)

"ctags and cscope
set tags=./tags,./TAGS,tags,TAGS,/usr/include/tags
if has("cscope")
    set csprg=/usr/bin/cscope
    set csto=0
    set cst
    set nocsverb
    " add any database in current directory
    if filereadable("cscope.out")
        cs add cscope.out
        " else add database pointed to by environment
    elseif $CSCOPE_DB != ""
        cs add $CSCOPE_DB
    endif
    set csverb
endif

"stamp a yanked text over a word
nnoremap S "_diwP

"Persistent undo file
if has("persistent_undo")
    set undodir='~/.undodir/'
    set undofile
endif

