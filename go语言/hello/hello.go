package main

import (
	"fmt"
)

func arc() {
	var a float32 = 8
	var b float32 = 3
	var c float32 = a + b
	var d float32 = a - b
	var e float32 = a * b
	var f float32 = a / b

	var m int = 8
	var n int = 3
	var g int = m % n
	fmt.Println(c)
	fmt.Println(d)
	fmt.Println(e)
	fmt.Println(f)
	fmt.Println(g)
}

// 输出一个int32 对应的二进制表示
func BinaryFormat(n int32) string {

	return ""
}

func main() {
	arc()
	// fmt.Println("Hello World")
}
