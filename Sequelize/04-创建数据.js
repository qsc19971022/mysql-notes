const Sequelize = require('sequelize');
(async () => {
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

    // sequelize.sync();

// 4.创建一条数据
//    let u = new User();
//    u.name = 'zs';
//    u.age = '18';
//    u.gender = '女';
//    await u.save();
    /*
    * 注意点：
    * 创建好一条数据之后，默认情况下不会立即同步到表中
    * 如果想立即同步到表中，那么必须调用save方法
    *
    * 注意点：
    * 本质上让MySQL执行sql语句是一个异步操作
    * 所以在sequelize中大部分的方法都是异步方法
    *
    * 注意点：
    * 通过模型类创建出来的对象中有一个dataValue的属性，这个属性就保存了一条记录所有的信息
    * 调用save方法保存完整数据之后，sequelize会自动更新对应的对象，将最新的数据更新进去
    *
    * */
//    下面这段代码 = 创建对象 + save()；
    let u = await User.create({
        name:'ww',
        age:19,
        gender:'男'
    });
    console.log(u);
})();