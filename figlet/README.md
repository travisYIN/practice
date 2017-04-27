# FIGlet

FIGlet是一个生成由各种各样小型ASCII字符组成的字符画的电脑程序。更详细的解释清参见[维基百科](https://en.wikipedia.org/wiki/FIGlet)。

## Install

```
// 安装命令行
$ npm install -g figlet-cli 
```

## Usage

```
$ figlet travisYIN
  _                   _   __   _____ _   _
 | |_ _ __ __ ___   _(_)__\ \ / /_ _| \ | |
 | __| '__/ _` \ \ / / / __\ V / | ||  \| |
 | |_| | | (_| |\ V /| \__ \| |  | || |\  |
  \__|_|  \__,_| \_/ |_|___/|_| |___|_| \_|

$ figlet
Usage: figlet "text to print"

Options:
  -l, --list           List all the available fonts
  -f, --font           A string value that indicates the FIGlet font to use
  --horizontal-layout  A string value that indicates the horizontal layout to use
  --vertical-layout    A string value that indicates the vertical layout to use
```

可以用`figlet -f`指定字体打印，但是一共快300个字体，很难一一尝试。

于是我挑选了几个字体，可以通过下面这个命令快速生成效果图。

```
$ /bin/sh figlet.sh travis YIN
Creating 3D-ASCII.txt ...
Creating ANSI Shadow.txt ...
Creating Banner3.txt ...
Creating Basic.txt ...
Creating Big.txt ...
Creating Colossal.txt ...
Creating Doh.txt ...
Creating Georgia11.txt ...
Creating Ivrit.txt ...
Creating NScript.txt ...
Creating Roman.txt ...
Creating Slant Relief.txt ...
Creating Slant.txt ...
Creating Standard.txt ...

$ cat 3D-ASCII.txt
 _________  ________  ________  ___      ___ ___  ________            ___    ___ ___  ________
|\___   ___\\   __  \|\   __  \|\  \    /  /|\  \|\   ____\          |\  \  /  /|\  \|\   ___  \
\|___ \  \_\ \  \|\  \ \  \|\  \ \  \  /  / | \  \ \  \___|_         \ \  \/  / | \  \ \  \\ \  \
     \ \  \ \ \   _  _\ \   __  \ \  \/  / / \ \  \ \_____  \         \ \    / / \ \  \ \  \\ \  \
      \ \  \ \ \  \\  \\ \  \ \  \ \    / /   \ \  \|____|\  \         \/  /  /   \ \  \ \  \\ \  \
       \ \__\ \ \__\\ _\\ \__\ \__\ \__/ /     \ \__\____\_\  \      __/  / /      \ \__\ \__\\ \__\
        \|__|  \|__|\|__|\|__|\|__|\|__|/       \|__|\_________\    |\___/ /        \|__|\|__| \|__|
                                                    \|_________|    \|___|/

$ cat Roman.txt
    .                                   o8o                oooooo   oooo ooooo ooooo      ooo
  .o8                                   `"'                 `888.   .8'  `888' `888b.     `8'
.o888oo oooo d8b  .oooo.   oooo    ooo oooo   .oooo.o        `888. .8'    888   8 `88b.    8
  888   `888""8P `P  )88b   `88.  .8'  `888  d88(  "8         `888.8'     888   8   `88b.  8
  888    888      .oP"888    `88..8'    888  `"Y88b.           `888'      888   8     `88b.8
  888 .  888     d8(  888     `888'     888  o.  )88b           888       888   8       `888
  "888" d888b    `Y888""8o     `8'     o888o 8""888P'          o888o     o888o o8o        `8

```

