来源 https://zhuanlan.zhihu.com/p/410622552

### sourceMap

代码打包之后，面目全非，想要对代码进行跟踪非常的困难，如果压缩的代码中出现错误， 根本无从下手。而 sourceMap,提供了这么一种服务，允许我门还原打包的代码。

文章中提到的 VLQ （variable-length quantity）编码,用变长字节数组来对整形进行编码，极大提高存储效率。

### webpack 中不同的 sourcemap

> source-map

该模式会生成一份独立的.map 文件。其和我们前面讲述的一样。它是最详细，同时也是耗时最久的模式

> inline (如 inline-source-map）

该模式不会生成一份独立的.map 文件，而是用 base64 编码将 sourcemap 进行编码后附在编译后代码的末处。缺点是这样会使得编译后代码的体积变得庞大，其他方面则和 source-map 模式一样。 ​

> eval

源码以字符的形式被 eval(…) 来调用，不会生成 sourceMap 信息，只会通过一个附着在各个模块后的 sourceURL 来存储原始文件的位置，同时，我们只能在控制台中看到经过 webpack 处理的编译后代码，所以它并不能反映真实的行号：

> eval-source-map

源码以字符的形式被 eval(…) 来调用，同时生成 sourceMap 信息，sourcemap 信息（以 base64 编码的形式）和 sourceURL 被附着在各个模块后，在这个模式下，我们可以在控制台中看到原始的代码。 ​

> cheap-source-map

生成的 sourcemap 只有行信息，不会记录列信息

但是，细心的你可能发现了，cheap-source-map 模式下的 sourcemap 依然没有映射到真正的原始代码（原本的箭头函数被 babel 编译成了 function）。cheap-source-map 记录下的是与被 loader（此处是 babel-loader）转化后的代码之间的映射。

> cheap-module-source-map

使用 cheap-module-source-map 可以记录下 loader 转译前的信息：

### 开发环境应该用哪种模式？生产环境呢？

开发环境下一般使用构建速度快，同时可以看到原始信息的 eval-source-map 模式。 而在生产环境下，为了不泄露源代码，可以使用 hidden-source-map 模式。

### 为什么有时候 sourcemap 表现不准？

一个猜测：上面我们介绍了 webpack 中多种 sourcemap 模式。其中有些模式是以牺牲掉一部分信息来换取更好的构建速度的（如 eval、cheap-source-map）。如果 webpack 的 hot server 没有采用正确的 sourcemap 模式，就会出现定位不准的问题。这个时候通常更换一下 sourcemap 模式为 cheap-module-source-map 甚至 source-map 模式就 OK 了。 同时，如果打包过程的某个环节在转译代码的时候将原始信息丢失了，也可能会出现最终合并成的 sourcemap 定位不准。
