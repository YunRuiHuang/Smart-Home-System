# 智能家居网络框架

更新于：11/1/2023

## 引言

这个项目是用于客制化智能家居系统，方便配置自制的IoT硬件，和自定义的访问界面

- [x] dev* 重写接口
  - [x] 温湿度数据接口
  - [x] 文件接口
  - [x] 配置ESP32
- [ ] 添加新接口
  - [ ] 视频下载接口(端口分离`cors`)
  - [x] 笔记接口
  - [x] 物品记录接口
  - [ ] ~~身份验证接口~~
  - [ ] 后台管理接口
- [ ] 使用新的页面框架（vue）
  - [ ] 用户界面
    - [ ] 温湿度查看
    - [ ] 下载进度查看
    - [ ] 视频界面
    - [ ] 笔记
    - [ ] 物品统计
  - [ ] 后台控制面板界面
    - [ ] 数据库配置
    - [ ] 路径配置
- [ ] 安卓客户端
  - [ ] 笔记本
- [ ] ESP32开发，打印外壳
  - [ ] 温湿度传感器
  - [ ] 物品记录终端
  - [ ] 控制面板终端



## 框架

### [网络接口](#网络接口)

- NodeJs
  - Express JS
- python
  - downloader

### [数据库](#数据库)

- MySQL on linux

### 网页界面

- Vue3 

### 外部传感器

- ESP32 Dev Model



## 手动配置

以下为需要手动配置的内容，之后应该会加入脚本进行自动配置

### ubuntu服务器

- nodejs (v10.19.0) or later `sudo apt-get install nodejs`
- npm (v6.14.4) or later `sudo apt-get install npm`
- mysql (Ver 8.0.34-0ubuntu0.20.04.1 for Linux on x86_64 ((Ubuntu))) `sudo apt install mysql-server`
- python 3 (v3.8.10)

### 进程管理

`/etc/systemd/system/my_node_app.service`

```ini
[Unit]
Description=My Node.js Application
After=network.target

[Service]
ExecStart=/usr/bin/node /path/to/your/app.js
WorkingDirectory=/path/to/your/app/directory
Restart=always
User=<YOUR_USER>
Group=<YOUR_USER>
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target

```

通过systemctl启动

```shell
#Start the service:
sudo systemctl start my_node_app
#Enable it to start on boot:
sudo systemctl enable my_node_app
#Check the Status
sudo systemctl status my_node_app
```



## 网络接口

[To the interface detail](./docunment/interface.md)

- /
  * routers/
    * data/...
    * note/...
    * item/...
  * source/
    * image/
    * script/
    * css/
    * html/
    * video/




## 数据库

### 配置数据库

#### 用户

创建新用户，并允许以密码方式验证

`CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`



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

table name :`envData`

| variable name                      | data type |
| ---------------------------------- | --------- |
| recode_id (PRIMARY AUTO_INCREMENT) | int       |
| machine_id                         | int       |
| temp                               | float     |
| humidity                           | float     |
| bright                             | int       |
| time                               | timestamp |

实现

```sql
CREATE TABLE envData (
    recode_id INT PRIMARY KEY AUTO_INCREMENT,
    machine_id INT,
    temp FLOAT,
    humidity FLOAT,
    bright INT,
    time TIMESTAMP
);

```

#### 物品记录

table name :`itemName`

| variable name                    | data type   |
| -------------------------------- | ----------- |
| item_id (PRIMARY AUTO_INCREMENT) | int         |
| item_name                        | varchat(10) |
| item_class                       | varchat(10) |
| item_subclass                    | varchat(10) |
| item_unit                        | varchat(4)  |

table name :`foodRecode`

| variable name                               | data type |
| ------------------------------------------- | --------- |
| recode_id (PRIMARY AUTO_INCREMENT)          | int       |
| item_id (foreign key references `itemName`) | int       |
| amount                                      | float     |
| price                                       | float     |
| time                                        | timestamp |

table name :`foodAmount`

| variable name                                        | data type |
| ---------------------------------------------------- | --------- |
| item_id (PRIMARY, foreign key references `itemName`) | int       |
| amount                                               | float     |

实现

```sql
CREATE TABLE itemName (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(10),
    item_class VARCHAR(10),
    item_subclass VARCHAR(10),
    item_unit VARCHAR(4)
);

CREATE TABLE foodRecode (
    recode_id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT,
    amount FLOAT,
    price FLOAT,
    time TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES itemName(item_id)
);

CREATE TABLE foodAmount (
    item_id INT PRIMARY KEY,
    amount FLOAT,
    FOREIGN KEY (item_id) REFERENCES itemName(item_id)
);

```

#### 笔记

table name:`notebook`

| variable name                      | data type |
| ---------------------------------- | --------- |
| recode_id (PRIMARY AUTO_INCREMENT) | int       |
| recode                             | text      |
| create_time                        | timestamp |
| update_time                        | timestamp |
| archive                            | boolean   |

实现

```sql
CREATE TABLE notebook (
    recode_id INT PRIMARY KEY AUTO_INCREMENT,
    recode TEXT,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    archive BOOLEAN
);

```

