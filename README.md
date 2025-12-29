# Recipes App - CRUD API

A complete CRUD (Create, Read, Update, Delete) application for managing recipes built with Node.js, Express.js, MongoDB, and Mongoose.

##  Features

- ✅ **Create recipes** with detailed ingredients and instructions
- ✅ **Read** all recipes with pagination support
- ✅ **Read** individual recipes by ID
- ✅ **Update** recipes with validation
- ✅ **Delete** recipes
- ✅ **Search** recipes by cuisine and tags
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ RESTful API design
- ✅ Comprehensive API documentation with Postman

##  Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM (Object Document Mapper)
- **Express-validator** - Input validation
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables management

##  Project Structure

```
recipes-app/
├── config/
│   └── database.js           # MongoDB connection configuration
├── controllers/
│   └── recipeController.js   # CRUD operations logic
├── middleware/
│   └── validation.js         # Input validation rules
├── models/
│   └── Recipe.js            # Mongoose Recipe schema
├── routes/
│   └── recipeRoutes.js      # API routes
├── views/                    # (For future UI implementation)
├── server.js                # Main Express server
├── package.json             # Project dependencies
├── .env                     # Environment variables (create this)
└── README.md               # This file
```

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas cloud)
- npm or yarn
- Postman (for testing API)

### Installation

1. **Clone or extract the project:**
   ```bash
   cd recipes-app
   ```

2. **Install dependencies:**
   ```bash
   npm install

   ```

3. **Create a `.env` file in the project root:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/recipes_db
   ```

   **For MongoDB Atlas (cloud):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/recipes_db?retryWrites=true&w=majority
   ```

4. **Make sure MongoDB is running:**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Connection string is in `.env`

5. **Start the server:**
   ```bash
   npm start          # For production
   npm run dev        # For development (with auto-reload using nodemon)
   ```

   Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api/recipes
```

### 1. Create a Recipe
- **Endpoint:** `POST /api/recipes`
- **Description:** Create a new recipe
- **Request Body:**
```json
{
  "name": "Pasta Carbonara",
  "description": "Classic Italian pasta with creamy sauce",
  "ingredients": [
    {
      "item": "Spaghetti",
      "quantity": 400,
      "unit": "g"
    },
    {
      "item": "Eggs",
      "quantity": 3,
      "unit": "pieces"
    },
    {
      "item": "Bacon",
      "quantity": 200,
      "unit": "g"
    },
    {
      "item": "Parmesan Cheese",
      "quantity": 100,
      "unit": "g"
    },
    {
      "item": "Black Pepper",
      "quantity": 1,
      "unit": "tsp"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "description": "Cook spaghetti in salted boiling water until al dente"
    },
    {
      "step": 2,
      "description": "Fry bacon until crispy"
    },
    {
      "step": 3,
      "description": "Beat eggs with grated Parmesan cheese"
    },
    {
      "step": 4,
      "description": "Drain pasta and mix with bacon and fat"
    },
    {
      "step": 5,
      "description": "Add egg mixture and toss quickly off the heat"
    }
  ],
  "prepTime": 10,
  "cookTime": 20,
  "servings": 4,
  "difficulty": "Easy",
  "cuisine": "Italian",
  "tags": ["pasta", "quick", "easy", "classic"],
  "rating": 5
}
```

- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "64f7c8a3e4b0a1b2c3d4e5f6",
    "name": "Pasta Carbonara",
    "description": "Classic Italian pasta with creamy sauce",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Easy",
    "cuisine": "Italian",
    "tags": ["pasta", "quick", "easy", "classic"],
    "rating": 5,
    "createdAt": "2024-09-04T10:00:00.000Z",
    "updatedAt": "2024-09-04T10:00:00.000Z"
  }
}
```

### 2. Get All Recipes
- **Endpoint:** `GET /api/recipes`
- **Description:** Retrieve all recipes with pagination
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of recipes per page (default: 10)

- **Example:** `GET /api/recipes?page=1&limit=10`

- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipes retrieved successfully",
  "totalRecipes": 5,
  "currentPage": 1,
  "totalPages": 1,
  "data": [
    {
      "_id": "64f7c8a3e4b0a1b2c3d4e5f6",
      "name": "Pasta Carbonara",
      "description": "Classic Italian pasta with creamy sauce",
      "ingredients": [...],
      "instructions": [...],
      "prepTime": 10,
      "cookTime": 20,
      "servings": 4,
      "difficulty": "Easy",
      "cuisine": "Italian",
      "tags": ["pasta", "quick", "easy", "classic"],
      "rating": 5,
      "createdAt": "2024-09-04T10:00:00.000Z",
      "updatedAt": "2024-09-04T10:00:00.000Z"
    }
  ]
}
```

### 3. Get Recipe by ID
- **Endpoint:** `GET /api/recipes/:id`
- **Description:** Retrieve a single recipe by its ID
- **Path Parameter:**
  - `id`: Recipe ID (MongoDB ObjectId)

- **Example:** `GET /api/recipes/64f7c8a3e4b0a1b2c3d4e5f6`

- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipe retrieved successfully",
  "data": {
    "_id": "64f7c8a3e4b0a1b2c3d4e5f6",
    "name": "Pasta Carbonara",
    "description": "Classic Italian pasta with creamy sauce",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Easy",
    "cuisine": "Italian",
    "tags": ["pasta", "quick", "easy", "classic"],
    "rating": 5,
    "createdAt": "2024-09-04T10:00:00.000Z",
    "updatedAt": "2024-09-04T10:00:00.000Z"
  }
}
```

### 4. Update Recipe
- **Endpoint:** `PUT /api/recipes/:id`
- **Description:** Update a recipe by ID
- **Path Parameter:**
  - `id`: Recipe ID (MongoDB ObjectId)

- **Request Body:** (Send only fields you want to update)
```json
{
  "rating": 4.5,
  "difficulty": "Medium"
}
```

- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {
    "_id": "64f7c8a3e4b0a1b2c3d4e5f6",
    "name": "Pasta Carbonara",
    "description": "Classic Italian pasta with creamy sauce",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Medium",
    "cuisine": "Italian",
    "tags": ["pasta", "quick", "easy", "classic"],
    "rating": 4.5,
    "createdAt": "2024-09-04T10:00:00.000Z",
    "updatedAt": "2024-09-04T10:00:01.000Z"
  }
}
```

### 5. Delete Recipe
- **Endpoint:** `DELETE /api/recipes/:id`
- **Description:** Delete a recipe by ID
- **Path Parameter:**
  - `id`: Recipe ID (MongoDB ObjectId)

- **Example:** `DELETE /api/recipes/64f7c8a3e4b0a1b2c3d4e5f6`

- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipe deleted successfully",
  "data": {
    "_id": "64f7c8a3e4b0a1b2c3d4e5f6",
    "name": "Pasta Carbonara",
    "description": "Classic Italian pasta with creamy sauce",
    "ingredients": [...],
    "instructions": [...],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Easy",
    "cuisine": "Italian",
    "tags": ["pasta", "quick", "easy", "classic"],
    "rating": 5,
    "createdAt": "2024-09-04T10:00:00.000Z",
    "updatedAt": "2024-09-04T10:00:00.000Z"
  }
}
```

### 6. Search Recipes (Bonus)
- **Endpoint:** `GET /api/recipes/search`
- **Description:** Search recipes by cuisine or tags
- **Query Parameters:**
  - `cuisine` (optional): Filter by cuisine type
  - `tags` (optional): Filter by tag

- **Example:** `GET /api/recipes/search?cuisine=Italian&tags=pasta`

- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipes searched successfully",
  "data": [
    {
      "_id": "64f7c8a3e4b0a1b2c3d4e5f6",
      "name": "Pasta Carbonara",
      "description": "Classic Italian pasta with creamy sauce",
      "ingredients": [...],
      "instructions": [...],
      "prepTime": 10,
      "cookTime": 20,
      "servings": 4,
      "difficulty": "Easy",
      "cuisine": "Italian",
      "tags": ["pasta", "quick", "easy", "classic"],
      "rating": 5,
      "createdAt": "2024-09-04T10:00:00.000Z",
      "updatedAt": "2024-09-04T10:00:00.000Z"
    }
  ]
}
```

## 🧪 Testing with Postman

### Import Postman Collection

1. **Using the collection file:**
   - Open Postman
   - Click `Import` button
   - Select the `Recipes_API_Collection.json` file
   - The collection will be imported with all pre-configured requests

2. **Manual setup:**
   - Open Postman
   - Create requests for each endpoint as documented above
   - Set the base URL as environment variable for easier switching

### Setting up Environment in Postman

1. Click on the gear icon (Settings) → Manage Environments
2. Create a new environment named "Recipes App"
3. Add variable:
   - **Variable:** `base_url`
   - **Initial Value:** `http://localhost:5000`
   - **Current Value:** `http://localhost:5000`
4. Click Save
5. Select the "Recipes App" environment from the dropdown

### Testing Flow

1. **Create a recipe:** Use POST request with recipe data
2. **Copy the returned `_id`** from the response
3. **Test GET all:** Verify recipes appear in the list
4. **Test GET by ID:** Paste the `_id` in the URL parameter
5. **Test UPDATE:** Use PUT request with partial data
6. **Test DELETE:** Remove the recipe with DELETE request
7. **Test SEARCH:** Filter recipes by cuisine or tags

## ✅ Validation Rules

### Recipe Creation & Update Validation

- **name:** Required, 3-100 characters
- **ingredients:** Array of objects (item, quantity, unit)
  - Minimum 1 ingredient required
  - Valid units: `g`, `kg`, `ml`, `l`, `tbsp`, `tsp`, `cup`, `piece`, `pieces`
- **instructions:** Array of objects (step, description)
  - Minimum 1 instruction required
- **prepTime:** Positive integer (minutes)
- **cookTime:** Positive integer (minutes)
- **servings:** Positive integer (minimum 1)
- **difficulty:** Easy | Medium | Hard
- **rating:** Float between 0-5

## 🔍 Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request:** Invalid input or validation error
- **404 Not Found:** Recipe not found
- **500 Internal Server Error:** Server error

### Example Error Response
```json
{
  "success": false,
  "message": "Error creating recipe",
  "error": "Validation error message"
}
```

## 📝 Sample Data

You can use the provided Postman collection which includes sample data for quick testing.

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **express-validator**: Input validation
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variables
- **nodemon**: Auto-reload (dev only)

## 🔗 Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Postman Documentation](https://learning.postman.com/)
- [Express-validator Documentation](https://express-validator.github.io/docs/)

## 💡 Tips for Testing

1. Ensure MongoDB is running before starting the server
2. Check MongoDB connection string in `.env` file
3. Use Postman's "Pre-request Script" to automate ID handling
4. Test with invalid data to see validation in action
5. Monitor server logs to debug issues

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created for learning Node.js, Express.js, and MongoDB.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running: `mongod` (for local)
- Check connection string in `.env`
- Ensure database credentials are correct (for MongoDB Atlas)

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### Validation Errors
- Check request body structure matches schema
- Verify all required fields are provided
- Check data types (ingredients/instructions must be arrays)

## ⚡ Next Steps

1. Add authentication (JWT)
2. Implement role-based access control
3. Add image upload for recipes
4. Create frontend UI with React
5. Deploy to production (Heroku, AWS, etc.)
6. Add unit tests with Jest
7. Implement caching for better performance

---

**Happy Cooking! 🍳**



