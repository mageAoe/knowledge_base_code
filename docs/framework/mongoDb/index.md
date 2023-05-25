# mongoDB

## mongoDB简介
什么是mongodb

mongodb是由c++语言编写的，是一个基于分布式文件存储的开源数据库系统

在高负荷的情况下，添加更多的节点，可以保证服务器性能

mongodb 目的是在为web应用提供可扩展的高性能数据存储方案

mobgodb是以 key：value的键值对的形式存在，与json相似






1.database 数据库

2.collection 集合或文档

>>mongod 启动mongodb

```
>show dbs
//显示mongo里有多少数据库

>db
//显示当前进入的库

>use + 库名
//切换数据库目录

```
>>数据库命名

不能是控字符串（“”）

不能含有 空格  、 $ /，\

应该全是 小写

有一些数据库名是保留的 。admin

local 数据库不能被复制 ，只能存储当前服务器的数据

>文档的键是字符串，键可以使用任意utf-8

-- 键不能含有\0 这个字符用来表示键结尾的
 
--和$有特别的意义，只有在特定环境下使用

--以下划线‘_’开头的键是保留的

Timestamp    | 时间戳。记录文档修改和添加的具体时间
---  |  ---
Object| 用于内嵌文档
Null|  用于创建空值
symbol|符号。该数据类型基本上等同于字符串类型，但不同的是，它一般采用特殊符号类型的语言
Data|日期时间。用unix时间格式来存储当前日期活时间，你可以指定自己的日期时间:创建data对象，传入年月日信息
object id|对象ID 用于创建文档ID
binary data|二进制数据

>objectid
objectid 类似一个主键，可以很快去生成：

前4个字符串表示创建unix时间戳，格林尼治时间UTC时间，比北京时间晚了8个小时

接下来的3个字符节是机器标识符

紧接着的两个字符由进程id 组成PID

最后三个字符是随机数

>objectid保存了创建的时间戳，可以通过getTimestamp函数来获取文档的创建时间

```
// 在cmd中使用
var newobject = Objectid()
>newobject

//下面三个获取格林尼治时间
newobject.getTimestamp()
ISOData()

var data = new Data()
>data
ISOdata()


var data2 = ISOData()
>data2
```
objectid转字符串
```
newobjdext.str
```

## mongodb 创建数据库

use + 要创建的数据库名

>db  查看

>db.创建的数据库名.insert（{}） 中间插入的是一个对象

//查看数据库内容
>db.aa.find()


## 配置运行环境

下载安装mongodb

配置环境变量

D:\Program Files\MongoDB\Server\4.4\bin

然后再cmd中输入mongod

需要手动再D盘的根目录下创建一个data\db文件

然后cme启动时输入：mongod --dbpath d:\data\db --port 2271 

port后面跟的是端口号，可以更改

cmd中输入mongo启动就可以在浏览器中访问了

## 陪制启动安装的时候遇到得问题

> 启动mongodb的服务，提示Windows无法启动MongoDB Server服务(位于本地计算机上)

## 配置服务开机启动

管理员运行cmd

运行如下命令

1、必须是在根目录下已经创建好了logs跟db文件

logs下有个MongoDB.log文件


sc.exe create MongoDB binpath= "\"D:\Program Files\MongoDB\Server\4.4\bin\mongod.exe\" --service --config=\"D:\Program Files\MongoDB\Server\4.4.mongod.cfg\"" DisplayName= "MongoDB" start= "auto"


[链接中有解决办法](https://blog.csdn.net/yqwang75457/article/details/84949915)

> SC] CreateService 失败 1073: 指定的服务已存在

[链接中有解决办法](https://blog.csdn.net/ak739105231/article/details/106635485/)



## 插入文档

文档的数据结构和JSON基本一样

所有储存在集合中的数据都是BSON格式

BSON是一种类似json的一种二进制形式存储格式，简称Binary json

mongodb 使用insert（）或save（）方法插入数据

```
db.mydata.inert({ })

```
>查询
```
db.mydata.find()
```


## 更新文档

```
db.mydata.update({ 
    query,
    update,
    {
     upsert:
     multi:
     writConern:
    }
})

//nMatched 选择
//nUpserted  插入
//nModifind 修改
```
>使用
```
db.mydata.update({ },{$set:{ }})
//$set是保存原来的数据，并插入一条，修改，更新，不替换之前的内容

db.mydata.update({},{$set:{}},{multi:true})
//匹配多条，修改并保存，multi：允许更新多条数据

db.mydate.update({cc:123 },{$set{}},{multi:true,upsert:true})
//upsert 在更新时如果没有当前条件匹配的文档，就会创造条件去更新

```

参数说明

query ：update的查询条件，类似sql update

update：update的对象和一些更新的操作符（$in），

upsert：可选，如果不存在update的记录，是否插入objNew，true为插入，默认为false，不插入

multi：可选，mobgodb默认是false，只要更新找到的第一条记录，如果这个参数为true，就把俺条件查出来多条记录全部更新


```
#  插入单条数据

> var document = db.collection.insertOne({"a": 3})
> document
{
        "acknowledged" : true,
        "insertedId" : ObjectId("571a218011a82a1d94c02333")
}

#  插入多条数据
> var res = db.collection.insertMany([{"b": 3}, {'c': 4}])
> res
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("571a22a911a82a1d94c02337"),
                ObjectId("571a22a911a82a1d94c02338")
        ]
}
```

* 状元笔记

```
db.collection.updateOne() 向指定集合更新单个文档
db.collection.updateMany() 向指定集合更新多个文档
首先我们在test集合里插入测试数据

use test
db.test_collection.insert( [
{"name":"abc","age":"25","status":"zxc"},
{"name":"dec","age":"19","status":"qwe"},
{"name":"asd","age":"30","status":"nmn"},
] )
更新单个文档

> db.test_collection.updateOne({"name":"abc"},{$set:{"age":"28"}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.test_collection.find()
{ "_id" : ObjectId("59c8ba673b92ae498a5716af"), "name" : "abc", "age" : "28", "status" : "zxc" }
{ "_id" : ObjectId("59c8ba673b92ae498a5716b0"), "name" : "dec", "age" : "19", "status" : "qwe" }
{ "_id" : ObjectId("59c8ba673b92ae498a5716b1"), "name" : "asd", "age" : "30", "status" : "nmn" }
>
更新多个文档

> db.test_collection.updateMany({"age":{$gt:"10"}},{$set:{"status":"xyz"}})
{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
> db.test_collection.find()
{ "_id" : ObjectId("59c8ba673b92ae498a5716af"), "name" : "abc", "age" : "28", "status" : "xyz" }
{ "_id" : ObjectId("59c8ba673b92ae498a5716b0"), "name" : "dec", "age" : "19", "status" : "xyz" }
{ "_id" : ObjectId("59c8ba673b92ae498a5716b1"), "name" : "asd", "age" : "30", "status" : "xyz" }

```


## 查询


>查询数据 
```
db.mydate.find(query,option)

```

query:可选 ，使用查询操作符指定查询条件

option： 可选，查询时返回文档中所有键值

>pretty（），查询出来的数据是json格式的
```
db.mydate.find().pretty()
```

```
findOen（）
//只能查询出来一条

db.mydata.find().limit(1 ) //读一条
.skip( //忽略)
```
> 多条件查询

//这个只能使用不同条件进行查询
比如 ： name  || size
```
>db.mydate.find(key1:value1,key2:value2).pretty()
```
> 多条件查询

//可以使用相同的条件来查询不同的数据
```
>db.mydate.find(
{$or
    [{
        {key:value},{key:value}
    }]
    
})
```
>各种符号


```
$gt -- >
$gte -- >=
$lt -- <
$lte -- <=
$ne -- !=
$eq -- =

```
使用
```
>db.mydate.find({age:{$gt:20}}).pretty()
//查询年龄大于20的数据
```

> 排序
```
//升序
db.mydata.find().sort({key:+value}) // value是正值

//降序 value是负值
```


>语法

## mongodb 创建数据库

use + 要创建的数据库名

db 查看
db.创建的数据库名.insert（{}） 中间插入的是一个对象

//查看数据库内容

db.aa.find()
```
>use aaa
>db

db.dropDatabase()

//删除数据库，默认为test，可以通过db查看当前数据库名

```
>创建集合
```
db.createCollection('ai',option)

// option可选参数

option可以使如下的参数

db.createCollection('dev',{capped:true,size:1555555，max:5})
{'ok':1} //创建一个dev的数据库集合，大小，最大存5条数据


```

capped|（可选）如果是true，则会创建固定集合，固定集合是指有着固定大小的集合，当达到最大值时，他会自动覆盖最早的文档，当该值为true时，必须指定size参数
---|---
autoindexid | （可选）如果为true，自动在_id字段创建索引，默认为false
size | （可选）为固定集合指定一个最大值，如果capped为true，也需要指定该字段
max|（可选）指定固定集合中包含文档的最大数量




>删除集合

```
db.collection.drop()

```

>show tables 查询集合
```
>show tables
或者
>show collections
```


## 删除文档

```
>db.mydata.remove({key:value})

//多条件删除
>db.mydate.remove({$or[{key:value},{key:value}]})

```

只删除一条数据
```
>db.mydate.remove({key:value},{justOne:true})
```


## 复习知识


基本概念：
数据库（database）
集合（collection）
文档（document）


1. show dbs 显示所有的数据库

2. ues + 数据库名  进入数据库 ，如果没有数据库名，就会新建一个库

3. use 进入表后会提示 switched to db xxxx

4. 然后使用 show collection 查询集合

5. db 显示当前所在的数据库



数据库的（增删改查）

    插入：insert
	db.sudty.insert(name:"sun",age:18)  表示向当前数据库集合sudty中插入数据 。sudty是可以自己随便设置的
要插入多个数据需要用到数组
	db.sudty.insert([{}，{}，{}])
向文档中插入数据，数据库会自动生成一个_id
id还可以我们自己指定，如果我们指定了数据库就不会再添加了，如果自己指定id，它必须是唯一的

db.sudty.insert({_id:'hello',name:'sunchaoqun'})



集合使用show collection 查询


   查询：find（）
	db.sudty.find()
	find()里面可以接收一个对象作为条件参数
	db.sudty.find({_id:'hello'})

	db.findOne({age:'28'}) 这个方法表示，只能查询返回一个age：28的数据

	db.sudty.find({}).count()查询该集合里面有多少个数


查询内嵌的对象

db.sudty.find({"hobby.like":'apply'});



修改：update
	直接使用update更新会覆盖修改的整条数据
	$set 可以用来修改文档中的指定属性
	$unset 可以用来删除文档的指定属性

	db.sudty.updateMany()同时修改符合条件的文档

	db.sudty.updateOne()修改一个符合条件的文档

	db.sudty.replaceOne()替换一个文档
		
	db.sudty.update({name:"sun"},
	{
	$set:{age:'24'},
	{
	multi:true 是否多个
	}
	})

db.sudty.update({name:'覃敏'},{$set:{hobby:{like:["apply","sdsg"]}}})

db.sudty.update({name:'覃敏'},{$push:{"hobby.like":"ace"}})

db.sudty.update({name:'覃敏'},{$addToSet:{hobby:{like:["apply","sdsg"]}}}) 跟$set一样的



删除：

删除集合bd.sudty.drop();

清空集合

db.sudty.remove({}); 不推荐使用

如果删除一个或多个，可以第二个参数传值一个true，则只会删除一个
如果传递一个空对象，则会全部删除

db.sudty.deleteOne()
db.sudty.deleteMany()
db.dropDatabase()删除数据库


先查到name：sun；再移除age，后面属性随便填写
db.sudty.update({name:"sun"},{$unset:{age:1}})

客户端：NoSQL Manager for Mongodb freeware








vue+express +mongodb   +axsio


```js
// 报错
Warning: unable to run listCollections, 
	attempting to approximate collection names by parsing connectionStatus
```
解决方案
原因是mongo设置了用户名和密码，所以登陆的时候需要指定用户名和密码

```cmd
# mongodb://用户名:密码@localhost:27017
root@c87416afb49d:/# mongo mongodb://root@rootlocalhost:27017  

```


































