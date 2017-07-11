# Snake

Snake是一个贪吃蛇游戏的简单实现版本。

## 游戏画布

是一个400 * 400的画布，如SIZE为40，NUM为10，那么40 * 40为一格，那么一行长10个，总共100格，坐标分别为0~99。分别通过除和余运算来获得行列的信息。

## 蛇的移动

组成蛇的坐标为数组，重复推入蛇头出栈蛇尾的方式，实现蛇的移动。蛇能够上下左右移动，移动的差值为`1, -1, NUM, -NUM`分别对应`右、左、下、上`，通过蛇头坐标和位移差值的相加，即可得出蛇头的下一个坐标。

## 游戏结束

分别判断是否碰到蛇身、是否出左右上下边界，来判断是否游戏结束。

## 进食动作

判断是否进食成功，成功则生成一个新的食物（不在蛇身中）；失败则pop出蛇尾（移动一步）。