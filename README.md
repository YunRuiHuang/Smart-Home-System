# 智能家居网络框架

更新于：02/04/2023

更新于：10/25/2023

## 引言

这个项目是用于客制化智能家居系统，方便配置自制的IoT硬件，和自定义的访问界面

dev* 重写接口，使用新的页面框架（vue），并且分离代码和配置文件，以方便在网页上更新，添加身份验证

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



## 网络接口

- /
  * routers/
    * [data/...](#/routers/data/)
  * [source/](#/source/)
    * image/
    * script/
    * css/
    * html/
    * video/





### /routers/data/

#### Create Data Entry

**Endpoint**: `POST /routers/data/:machineId`

Adds a new data entry for a specific machine.

**Request**:

- **Params**:
  - `machineId` (integer, path): The ID of the machine.
- **Body**:
  - `temp` (float): Temperature data.
  - `humidity` (float): Humidity data.
  - `bright` (integer): Brightness data.

**Response**:

- `200 OK`: Data entry added successfully.
- `400 Bad Request`: Missing data or incorrect format.

**sample require**

```http
POST /routers/data/1
{
  "temp": 23.5, 
  "humidity": 60.2, 
  "bright": 800
}
```



#### Get All Data Entries

**Endpoint**: `GET /routers/data/`

Retrieves all data entries.

**Response**:

- `200 OK`: List of data entries retrieved successfully.

**sample require**

```http
GET /routers/data/
```



#### Get Data Entries by Machine ID

**Endpoint**: `GET /routers/data/:machineId`

Retrieves data entries for a specific machine.

**Request**:

- **Params:**
  - `machineId` (integer, path): The ID of the machine.

**Response**:

- `200 OK`: List of data entries for the specified machine retrieved successfully.
- `404 Not Found`: No data entries found for the specified machine.

**sample require**

```http
GET /routers/data/1
```



#### Get Last N Data Entries by Machine ID

**Endpoint**: `GET /routers/data/:machineId/:num`

Retrieves the last N data entries for a specific machine.

**Request**:

- **Params:**
  - `machineId` (integer, path): The ID of the machine.
  - `num` (integer, path): The number of data entries to retrieve.

**Response**:

- `200 OK`: List of last N data entries for the specified machine retrieved successfully.
- `404 Not Found`: No data entries found for the specified machine.

**sample require**

```http
GET /routers/data/1/10
```



#### Get Data Entries by Date and Time

**Endpoint**: `GET /routers/data/:machineId/:month/:day/:year/:hour`

**Description**: Retrieves data entries for a specific machine within a given date and time range.

**Request**:

- **Params:**
  - `machineId` (integer, path): The ID of the machine.
  - `month` (integer, path): Month (numeric, 1-12).
  - `day` (integer, path): Day (numeric, 1-31).
  - `year` (integer, path): Year (numeric).
  - `hour` (integer, path): Hour (numeric, 0-23).

**Response**:

- `200 OK`: List of data entries for the specified machine within the specified date and time range retrieved successfully.
- `400 Bad Request`: Invalid date or time format.

**sample require**

```http
GET /routers/data/1/1/1/2023/0
```



### /source/

#### Get Image by ID

**Endpoint**: `GET /source/image/:id`

This endpoint allows you to retrieve an image by providing its unique ID.

**Request**

- **Params:**
  - `id` (string): The unique ID of the image.

**Response**

- `200 OK`: The image is successfully retrieved.
- `404 Not Found`: The image with the provided ID does not exist.

**Sample Request**

```http
GET /source/image/12345.jpg
```



#### Get Script by ID

**Endpoint**: `GET /script/:id`

This endpoint allows you to retrieve a script file by providing its unique ID.

**Request**

- **Params:**
  - `id` (string): The unique ID of the script file.

**Response**

- `200 OK`: The script file is successfully retrieved.
- `404 Not Found`: The script file with the provided ID does not exist.

**Sample Request**

```http
GET /source/script/12345.js
```



#### Get CSS by ID

**Endpoint**: `GET /css/:id`

This endpoint allows you to retrieve a CSS file by providing its unique ID.

**Request**

- Params:

  - `id` (string): The unique ID of the CSS file.

**Response**

- `200 OK`: The CSS file is successfully retrieved.
- `404 Not Found`: The CSS file with the provided ID does not exist.

**Sample Request**

```http
GET /source/css/12345.css
```



#### Get HTML by ID

**Endpoint**: `GET /html/:id`

This endpoint allows you to retrieve an HTML file by providing its unique ID.

**Request**

- Params:

  - `id` (string): The unique ID of the HTML file.

**Response**

- `200 OK`: The HTML file is successfully retrieved.
- `404 Not Found`: The HTML file with the provided ID does not exist.

**Sample Request**

```http
GET /source/html/12345.html
```



#### Get Video by Name

**Endpoint**: `GET /video/:video`

This endpoint allows you to retrieve a video by providing its name.

**Request**

- **Params:**
  - `video` (string): The name of the video file.
- **Query Parameters**:
  - `path` (string, optional): An array representing the directory path. If provided, the video will be searched in the specified directory.

**Response**

- `200 OK`: The video is successfully retrieved.
- `404 Not Found`: The video with the provided name does not exist.

**Sample Request**

```http
GET /source/video/12345.mp4
```





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

| variable name                      | data type |
| ---------------------------------- | --------- |
| recode_id (PRIMARY AUTO_INCREMENT) | int       |
| item_id                            | int       |
| amount                             | float     |
| price                              | float     |
| time                               | timestamp |

table name :`foodAmount`

| variable name      | data type |
| ------------------ | --------- |
| item_id (PRIMARY ) | int       |
| amount             | float     |

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
    time TIMESTAMP
);

CREATE TABLE foodAmount (
    item_id INT PRIMARY KEY,
    amount FLOAT
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
CREATE TABLE yourTableName (
    recode_id INT PRIMARY KEY AUTO_INCREMENT,
    recode TEXT,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    archive BOOLEAN
);

```

