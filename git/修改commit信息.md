
### commit 到本地版本库
git commit --amend

### push 到远程之后
git reset -i HEAD~v // v指commit版本历史数目

然后 pick其中一条

再然后就可以 git commit --amend  进行修改了

git rebase --continute 

完成
