# **Recettes du Monde** 🌍🍴

Une application web permettant de rechercher, explorer et enregistrer des recettes du monde entier. Grâce à une interface utilisateur moderne, explorez des catégories de plats, découvrez des recettes détaillées et gérez vos propres favoris. L'application repose sur **React** pour le front-end et utilise l'API [TheMealDB](https://www.themealdb.com) pour récupérer les données des recettes.

---

## **Fonctionnalités**

### 🧑‍🍳 Fonctionnalités principales :
- **Navigation par catégories :** Accédez facilement aux recettes organisées par type de plat.
- **Barre de recherche :** Trouvez des recettes en recherchant par catégorie ou dans la barre de recherche.
- **Détails des recettes :** Découvrez les instructions, ingrédients et quantités spécifiques pour chaque recette.
- **Liste de courses :** Enregistrez des recettes avec leurs ingrédients associés, ainsi qu'une date de préparation.
- **Planning :** Les recettes sont visibles sur un calendrier, et peuvent être deplacées en glisser/déposer.

---

## **Technologies utilisées**

### **Frontend :**
- **React** : Pour la création de l'interface utilisateur.
- **Tailwind CSS** : Pour la mise en page et le design réactif.
- **Redux Toolkit** : Pour la gestion de l'état global, y compris les recettes et les ingrédients.
- **RTK Query** : Pour simplifier les appels API.

### **Backend :**
- **TheMealDB API** : Source des données des recettes et des catégories.

---

## **Installation**

1. **Cloner le dépôt** :
   ```
   git clone https://github.com/ahkhiat/recettes_cuisine
   cd recettes_cuisine_
   ```

2. **Installer les dépendances** :
```
npm install
```

3. **Lancer l'application** :

```
npm run dev
```

4. **Accéder à l'application : Ouvrez http://localhost:5173 dans votre navigateur.**


## API utilisée

### TheMealDB

- Endpoint des catégories : /categories.php
- Endpoint des recettes par catégorie : /filter.php?c={categoryName}
- Endpoint des détails de recette : /lookup.php?i={idMeal}
- Endpoint de recherche : /search.php?s={query}

## Auteur

- Développeur principal - Thierry Leung
- API - TheMealDB