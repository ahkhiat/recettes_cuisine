import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    // Récupérer les catégories
    getCategories: builder.query({
      query: () => 'categories.php',
    }),
    // Récupérer les recettes par catégorie
    getMealsByCategory: builder.query({
      query: (category) => `filter.php?c=${category}`,
    }),
    // Rechercher des recettes par lettre
    searchMeals: builder.query({
      query: (searchTerm) => `search.php?s=${searchTerm}`,
    }),
    // Récupérer les détails d'une recette
    getMealDetails: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetMealsByCategoryQuery,
  useSearchMealsQuery,
  useGetMealDetailsQuery,
} = apiSlice;
