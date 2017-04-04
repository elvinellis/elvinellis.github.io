# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

export PATH="/home/ec2-user/node/bin:/usr/local/bin:$PATH"
PS1='\t $PWD$ '

export LC_ALL=C

################## Start of alias and function helpers #####################
# Change to directory and list content
c (){
    if [ $# -eq 1 ]; then
        cd $1; ls -ltr;
    else
        cd ..; ls -ltr;
    fi
}
- (){
	cd -; ls -ltr;
}
alias c-='cd -; l'
alias c2='cd ../..; l'
alias c3='cd ../../..; l'
alias c4='cd ../../../..; l'
alias c5='cd ../../../../..; l'

alias d='du -sh *'

# find recursively into the directory
# If 2 args, then dir and file
# If 1 arg, then file in current directory
f(){
    if [ $# -eq 2 ]; then
        find $1 -name "*$2*"
    else
        find . -name "*$1*"
    fi
}
# Search through all files with this term
g (){
    grep -r $1 *
}

ga(){
	git add -u
}

gs (){
	git status
}



alias l='ls -ltr'
alias la='ls -ltra'
alias m='make clean; make'
# netstat grepping for this term
n () {
    if [ $# -eq 1 ]; then
        netstat -anp | grep $1
    else
        netstat -anp
    fi
}

# list current processes with this name
p () {
    if [ $# -eq 1 ]; then
        ps -ef | grep $1
    else
        ps -ef
    fi
}

alias rb='source ~/.bashrc'
# tar target
t(){
    tar zcvf $1.tgz $1
}
ta (){
	tmux attach;
}
# untar target
u(){
    if [[ $1 == *".zip" ]]; then
        unzip $1
    else
        tar xvf $1
    fi
}
#alias vi='vim -X'
alias v='vim'
alias vb='vim ~/.bashrc'
alias vt='vim ~/.tmux.conf'
alias vv='vim ~/.vimrc'
#alias vim='/home/echua/bin/bin/vim -X'
# allows super jump with command z
. ~/.vim/z.sh
################## End of alias and function helpers #####################

export LC_ALL=C
export TERM=xterm-256color

# don't ask for ssh pass graphically
unset SSH_ASKPASS

# show uptime upon logon
uptime
