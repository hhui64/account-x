/**
 * 数据库 Connection 配置
 * - 请根据实际情况修改以下配置
 */
const databaseConfig = {
  /**
   * 数据库类型
   * - 默认: `mysql`
   */
  type: 'mysql',
  /**
   * 数据库编码
   * - 默认: `utf8mb4_unicode_ci`
   */
  charset: 'utf8mb4_unicode_ci',
  /**
   * 数据库地址
   * - 默认: `localhost`
   */
  host: 'localhost',
  /**
   * 数据库端口
   * - 默认: `3306`
   */
  port: 3306,
  /**
   * 数据库用户名
   * - 默认: `root`
   */
  username: 'root',
  /**
   * 数据库密码
   * - 默认: `root`
   */
  password: 'Asd123456@',
  /**
   * 数据库名
   * - 默认: `ax`
   */
  database: 'ax',
}

/**
 * 数据库 Orm 配置
 * - 不要修改此处配置，除非你知道你自己在做什么！
 */
const baseConfig = {
  /**
   * 实体路径
   */
  entities: ['dist/entities/*.entity{.ts,.js}'],
  /**
   * 连接成功时是否自动建表
   * - 默认: false
   */
  synchronize: true,
}

module.exports = {
  ...databaseConfig,
  ...baseConfig,
}
