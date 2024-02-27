# Interface detail

## Structure

- /
  * routers/
    * [data/...](#Data Interface)
    * [note/...](#Notebook Interface)
    * [item/...](#Item Recode Interface)
    * [music/...](#Music Interface)
  * [source/](#Resource Interface)
    * [image/](#Get Image by ID)
    * [script/](#Get Script by ID)
    * [css/](#Get CSS by ID)
    * [html/](#Get HTML by ID)
    * [video/](#Get Video by Name)



### Data Interface

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





### Notebook Interface

#### GET All Notebooks

**Endpoint**: `GET /`

Retrieves all records from the `notebook` table.

**Response**: 
- `200 OK`: Returns a JSON array of all records with formatted date strings.



#### GET Notebook by ID

**Endpoint**: `GET /:recode_id`

**Request**:

- **Params:**

     - `recode_id` (integer): The ID of the record to be archived.

Retrieves a specific record from the `notebook` table by `recode_id`.

**Response**: 
- `200 OK`: Returns a JSON object with the record's details and formatted date strings.



#### POST New Notebook Entry

**Endpoint**: `POST /`

Adds a new record to the `notebook` table with the provided `recode`.

**Request**:

- **Body:**
- `recode` (string): The content of the notebook entry.

**Response**: 
- `200 OK`: Returns the newly created record as a JSON object with formatted date strings.



#### POST Archive Notebook Entry

**Endpoint**: `POST /:recode_id`

 Archives a specific record by setting its `archive` flag to `true`.

**Request**:

- **Params:**

     - `recode_id` (integer): The ID of the record to be archived.

**Response**: 
- `200 OK`: Returns a JSON object indicating the operation's success.



#### DELETE Archive Notebook Entry

**Endpoint**: `DELETE /:recode_id`

Deletes a specific record by setting its `archive` flag to `true`.

**Request**:

- **Params:**

     - `recode_id` (integer): The ID of the record to be deleted.

**Response**: 
- `200 OK`: Returns a JSON object indicating the operation's success.



#### PUT Update Notebook Entry

**Endpoint**: `PUT /:recode_id`

Updates the content of a specific record.

**Request**:

- **Params:**

     - `recode_id` (integer): The ID of the record to be updated.
- **Body:**
     - `recode` (string): The updated content of the notebook entry.

   - **Response**: Returns a JSON object indicating the operation's success.



### Item Recode Interface



#### Create a New Item

**Endpoint**: `POST /newitem`

This endpoint allows you to add a new item to the inventory.

**Request**

- **Body**:

  - `name` (string): The name of the new item.
  - `class` (string): The class/category of the new item.
  - `subclass` (string): The subclass/subcategory of the new item.
  - `unit` (string): The unit of measurement for the new item.

**Response**

- `200 OK`: The new item is added successfully.
- `500 Internal Server Error`: Database error.

**Sample Request**

```http
POST /newitem
{
  "name": "New Item",
  "class": "Category",
  "subclass": "Subcategory",
  "unit": "Each"
}
```





#### Record a New Entry

**Endpoint**: `POST /recode`

This endpoint allows you to record a new entry in the food inventory.

**Request**

- **Body**:
- `id` (integer): The ID of the item.
  - `amount` (float): The amount/quantity of the item.
- `price` (float): The price of the item.

 **Response**

- `200 OK`: The new entry is recorded successfully, and the total amount is updated.
- `500 Internal Server Error`: Database error.

**Sample Request**

```http
POST /recode
{
  "id": 1,
  "amount": 10.5,
  "price": 25.99
}
```



#### Delete a Recorded Entry

**Endpoint**: `DELETE /recode/:id`

This endpoint allows you to delete a recorded entry in the food inventory.

 **Params**

- `id` (integer): The ID of the recorded entry.

 **Response**

- `200 OK`: The entry is deleted successfully.
- `404 Not Found`: No such recorded entry.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
DELETE /recode/123
```



#### Get All Items

**Endpoint**: `GET /`

This endpoint retrieves information about all items in the inventory.

 **Response**

- `200 OK`: Returns an array of items.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /
```



#### Get Item by Name

**Endpoint**: `GET /name/:name`

This endpoint retrieves information about an item by its name.

 **Params**

- `name` (string): The name of the item.

 **Response**

- `200 OK`: Returns information about the item.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /name/New%20Item
```



#### Get Item by ID

**Endpoint**: `GET /id/:id`

This endpoint retrieves information about an item by its ID.

 **Params**

- `id` (integer): The ID of the item.

 **Response**

- `200 OK`: Returns information about the item.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /id/1
```



#### Get All Recorded Entries

**Endpoint**: `GET /recode`

This endpoint retrieves information about all recorded entries in the food inventory.

 **Response**

- `200 OK`: Returns an array of recorded entries.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /recode
```



#### Get Last N Recorded Entries

**Endpoint**: `GET /recode/:last_n`

This endpoint retrieves information about the last N recorded entries in the food inventory.

 **Params**

- `last_n` (integer): The number of last entries to retrieve.

 **Response**

- `200 OK`: Returns an array of last N recorded entries.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /recode/5
```



#### Get Recorded Entries by Item ID

**Endpoint**: `GET /recode/id/:id`

This endpoint retrieves information about recorded entries for a specific item by its ID.

 **Params**

- `id` (integer): The ID of the item.

 **Response**

- `200 OK`: Returns an array of recorded entries for the item.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /recode/id/1
```



#### Get Amount of All Items

**Endpoint**: `GET /amount`

This endpoint retrieves information about the amounts of all items in the inventory.

 **Response**

- `200 OK`: Returns an array of amounts for all items.
- `500 Internal Server Error`: Database error.

**Sample Request**

```http
GET /amount
```



#### Get Amount of an Item by ID

**Endpoint**: `GET /amount/:id`

This endpoint retrieves information about the amount of a specific item by its ID.

 **Params**

- `id` (integer): The ID of the item.

 **Response**

- `200 OK`: Returns information about the amount of the item.
- `500 Internal Server Error`: Database error.

 **Sample Request**

```http
GET /amount/1
```





### Resource Interface

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





### Music Interface

#### Get Music Playing state
**Endpoint**: `GET /music/state`

This endpoint allows you to check the music playing state.

**Response**

- `200 OK`: Successfully get the music state.

**Sample Request**

```http
GET /router/music/state
```



#### Change Music Playing state
**Endpoint**: `PUT /music/state`

This endpoint allows you to change the music playing state.

**Response**

- `200 OK`: Successfully change the music state.

**Sample Request**

```http
PUT /router/music/state
```



#### Get Playing Music
**Endpoint**: `GET /music/playing`

This endpoint allows you to check the name of playing music.

**Response**

- `200 OK`: Successfully get the music name.

**Sample Request**

```http
GET /router/music/playing
```



#### Change Playing Music
**Endpoint**: `POST /music/playing

This endpoint allows you to change the name of playing music.

**Request**

- Body:

  - `playing` (string): The name of playing m.

**Response**

- `200 OK`: Successfully get the music state.

**Sample Request**

```http
POST /router/music/playing
```

