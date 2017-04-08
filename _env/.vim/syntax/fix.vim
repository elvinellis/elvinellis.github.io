" Fix syntax file
" Language: FIX
" Author: elvin.chua
" Created on: 16 June 2015
"
if exists("b:current_syntax")
        finish
endif

let b:current_syntax = "fix"
syn match orderId "\v11\=\d+"
syn match orderId "\v41\=\d+"

syn match orderDetails "\v\|48\=\d+"
syn match orderDetails "\v44\=\d+.\d*"

syn match orderSide "\v54\=1"
syn match orderSide "\v54\=2"

syn match orderQty "\v32\=\d+"
syn match orderQty "\v38\=\d+"
syn match orderQty "\v14\=\d+"
syn match orderQty "\v151\=\d+"

syn match orderStatus "\v39\=\d+"
syn match orderStatus "\v150\=\d+"

syn match orderFill "\v150\=F"
syn match orderFill "\v39\=[1|2]"

syn match def "\v1180\=\d+"
syn match def "\v55\="
syn match def "\v1151\=\d+"
syn match def "\v1300\=\d+"
syn match def "\v264\=\d+"

highlight link orderDetails Identifier
highlight link orderId Underlined
highlight link orderStatus Type
highlight link def Type
highlight link orderQty Comment
highlight link orderSide Statement
highlight link orderFill Constant
