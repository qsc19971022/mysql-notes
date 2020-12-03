const Sequelize = require('sequelize');
const sequelize = new Sequelize('student','root','10170551',{
    host:'127.0.0.1',  // mysql服务器地址
    port:3306,  // 端口号
    dialect:'mysql', // 告诉sequelize当前要操作的数据库类型，因为他不仅仅能操作mysql还可以操作其他数据库
    pool:{
        max:5,  // 最多有多少个连接
        min:0,  // 最少有多少个连接
        idle:10000,  // 当前连接多久没有操作就断开
        acquire:30000  // 多久没有获取到连接就断开
    }
});
/*
* 1.字段说明常用属性
* type：字段类型
* primary：是否是主键
* autoincrement：是否自动增长
* allowNull: 是否允许为空
* unique：是否必须唯一
* default：默认值
*
* 2.额外配置常用属性
* timestamps：是否自动添加createAt和updateAt字段
* freezeTableName：是否禁止自动将表名修改为复用
* tableName：是否自定义表名
* indexes：[ // 指定索引
*   {
*       name:'', // 索引名称
*       fields:[''], // 索引字段名称
*   }
* ]
* */

/*
* 第一个参数：用于指定表的名称
* 第二个参数：用于指定表中有那些字段
* 第三个参数：用于配置表的一些额外信息
* */
let User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    age:{
        type:Sequelize.INTEGER,
        defaultValue:33
    },
    gender:{
        type:Sequelize.ENUM(['男','女','妖']),
        defaultValue: '男'
    }
},{
    freezeTableName:true,  // 不需要将表名变成负数
    timestamps:false,  //不需要createAt和updateAt两个字段
    indexes:[
        {
            name:'index_age',  // 索引名称
            fields:['age']   // 索引字段名称
        }
    ]
    });
/*
* 注意点:
* 默认定义好一个模型之后并不会自动创建对相应的表
* 我们需要通过调用连接对象的sync方法来执行同步
* 只有同步之后才会自动根据模型创建对应的表
* */

sequelize.sync();