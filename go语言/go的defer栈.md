### defer 

defer是go中一种延迟调用机制，defer后面的函数只有在当前函数执行完毕后才能执行，将延迟的语句按defer的逆序进行执行，也就是说先被defer的语句最后被执行，最后被defer的语句，最先被执行，通常用于释放资源。


```go
func func1(){
    fmt.Println("我是 func1")
}
func func2(){
    fmt.Println("我是 func2")
}
func func3(){
    fmt.Println("我是 func3")
}
func main(){
    defer func1()
    defer func2()
    defer func3()
    fmt.Println("main1")
    fmt.Println("main2")
}

/**
main1

main2

我是 func3

我是 func2

我是 func1
*/

```


#### 延迟函数的参数在defer声明时就决定了

```go
func main(){
   i:= 0
   defer func(a int) {
		fmt.Println(a)
	}(i)
    i++
}

```


此时输出的值是0，而不是1，因为defer后面的函数在入栈的时候保存的是入栈那一刻的值，而当时i的值是0，所以后期对i进行修改，并不会影响栈内函数的值。


#### defer和return的顺序




- defer是go中一种延迟调用机制，defer后面的函数只有在当前函数执行完毕后才能执行。
- 多个defer出现的时候，它会把defer之后的函数压入一个栈中延迟执行，也就是先进后出。
- defer后面的函数值在入栈的时候就决定了。
- defer 最大的功能是 panic 后依然有效,我们可以在defer中进行recover，如果defer中包含recover，则程序将不会再进行panic，实现try catch机制。

