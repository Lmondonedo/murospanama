import { getBlogArticles } from "@/app/lib/strapi.service";

export default async function ArticlesList() {
  try {
    const articles = await getBlogArticles();

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Artículos del Blog</h2>
        {articles.length > 0 ? (
          <ul className="space-y-2">
            {articles.map((article) => (
              <li key={article.documentId} className="border p-4 rounded">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description}</p>
                <p className="text-xs text-gray-400">
                  Publicado:{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay artículos disponibles.</p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        <h2>Error al cargar artículos</h2>
        <p>{error instanceof Error ? error.message : "Error desconocido"}</p>
      </div>
    );
  }
}
