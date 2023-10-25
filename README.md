# 智能家居网络框架

更新于：02/04/2023

更新于：10/25/2023

## 引言

这个项目是用于客制化智能家居系统，方便配置自制的IoT硬件，和自定义的访问界面

dev* 重写接口，使用新的页面框架（vue），并且分离代码和配置文件，以方便在网页上更新，添加身份验证

## 框架

### 外部传感器

- ESP32 Dev Model

### 中间件

- NodeJs
  - Express JS
- python
  - downloader



### 数据库

- MySQL on linux

### 网页界面

- Vue3 





## 数据库

### 连接配置文件 

`./server/conf/database.json`

```json
{
    "poolSetting" : {
        "connectionLimit" : 10,
        "host": "数据库地址",
        "user": "用户名",
        "password": "密码",
        "database": "数据库名称"
      }
}
```

### 数据表格式

#### 环境采集

table name :`envdata`

| variable name       | data type |
| ------------------- | --------- |
| recode_id (primary) | int       |
| machine_id          | int       |
| temp                | float     |
| humidity            | float     |
| bright              | int       |
| time                | timestamp |



```sql

```



