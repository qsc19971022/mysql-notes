/*
* 1.什么是Sequelize？
*
* 2.什么是ORM?
* ORM(object-relational-mapping)是对象关系映射
* 对象关系映射可以把js中的类和对象，和数据库中的表和数据进行关系映射
* 映射之后我们可以通过类和对象来操作数据表和数据了，就不用表写sql语句了
* orm有效的解决了直接在node中编写sql不够直观，不够高效，容易出错等问题
*
* 3.如何映射？
* 在Sequelize中js的一个类就对应数据库中的一张表
* 在Sequelize中js的一个对象就对应表中的一条数据
* 在Sequelize中js的一个对象的属性就对应一条数据的一个字段
*
* |---------------------------|
  |  id  |   name   |   age   |
  |   1  |    zs    |    18   |
  |   2  |    ls    |    19   |
  |---------------------------|
* */
/*
// 1.创建一张表
const 模型名称 = Sequelize.define('表名',{
    id:int,
    name:varchar(20),
    age:int
});

// 2.创建一条记录
let zs = 模型名称.build({
    id:1,
    name:zs,
    age:18
});
zs.id

// 3.操作表和数据
只要是通过sequelize定义的模型(类)，那么Sequelize就会自动给这个模型添加很多操作表和数据的方法
以后我们就可以通过模型操作表，通过模型创建出啦的对象操作数据
*/