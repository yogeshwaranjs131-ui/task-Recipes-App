# Recipes App - Quick Start Guide

## 📚 Complete Project Structure

```
recipes-app/
├── config/
│   └── database.js              # MongoDB connection setup
├── controllers/
│   └── recipeController.js      # CRUD operation logic
├── middleware/
│   └── validation.js            # Input validation middleware
├── models/
│   └── Recipe.js               # Mongoose schema & model
├── routes/
│   └── recipeRoutes.js         # API endpoints
├── views/                       # (Reserved for UI)
├── server.js                   # Express server entry point
├── package.json                # Dependencies & scripts
├── .env.example               # Environment variables template
├── .env                       # Your local configuration (create this)
├── README.md                  # Full documentation
├── Recipes_API_Collection.json # Postman collection
└── QUICK_START.md            # This file
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Create a `.env` file in the project root:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipes_db
```

### Step 3: Start MongoDB
**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Cloud):**
Update `.env` with your connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/recipes_db
```

### Step 4: Start Server
```bash
npm run dev    # Development with auto-reload
# or
npm start      # Production
```

You'll see: `Server is running on http://localhost:5000`

## 🧪 Test with Postman

### Import the Collection
1. Open Postman
2. Click **Import** button
3. Select `Recipes_API_Collection.json`
4. All requests are pre-configured!

### Quick Test Flow
1. **Create Recipe** - Copy the returned `_id`
2. **Get All Recipes** - See your new recipe
3. **Get by ID** - Paste the `_id` you copied
4. **Update** - Change rating or difficulty
5. **Delete** - Remove the recipe

## 📡 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/recipes` | Create new recipe |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get specific recipe |
| PUT | `/api/recipes/:id` | Update recipe |
| DELETE | `/api/recipes/:id` | Delete recipe |
| GET | `/api/recipes/search` | Search by cuisine/tags |

## ✅ What's Included

- ✅ Complete CRUD operations
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ MongoDB/Mongoose integration
- ✅ Postman collection (9 pre-configured requests)
- ✅ Pagination support
- ✅ Search functionality
- ✅ Clean MVC architecture
- ✅ Comprehensive documentation

## 🔧 Technology Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Express-validator** - Input validation
- **CORS** - Cross-origin support
- **Nodemon** - Auto-reload (dev)

## 📝 Sample Recipe Data

All recipes include:
- Name & description
- Ingredients list (with quantities & units)
- Step-by-step instructions
- Prep & cook times
- Servings
- Difficulty level
- Cuisine type
- Tags & rating

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure `mongod` is running or check Atlas connection string |
| Port 5000 already in use | Change PORT in `.env` file |
| Validation error | Check request body matches schema structure |
| Recipe not found | Verify the recipe ID is correct and exists |

## 📚 Next Steps

1. Add more recipes using Postman
2. Test all validation rules
3. Explore pagination with `?page=2&limit=5`
4. Practice CRUD operations
5. Read full README.md for advanced features

## 🎯 Learning Objectives

After completing this project, you'll understand:
- Building RESTful APIs with Express.js
- MongoDB schema design with Mongoose
- Request validation and error handling
- MVC architecture implementation
- API documentation best practices
- Postman testing workflow

---

**Tip:** Keep the server running in one terminal while testing in Postman!

For detailed documentation, see **README.md**
