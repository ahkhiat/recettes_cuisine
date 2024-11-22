import { useGetCategoriesQuery } from '../../apiSlice';

const CategoriesBar = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div>
      {data?.categories.map((category) => (
        <button key={category.idCategory} className="mx-2">
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
