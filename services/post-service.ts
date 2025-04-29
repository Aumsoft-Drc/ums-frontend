interface Post {
  id: string
  title: string
  content: string
  slug: string
  excerpt: string
  author: {
    id: string
    name: string
  }
  categories: {
    id: string
    name: string
  }[]
  tags: {
    id: string
    name: string
  }[]
  featuredImage?: string
  status: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

class PostService {
  async getAll(): Promise<Post[]> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get('/posts');

      // Données simulées pour le développement
      return [
        {
          id: "1",
          title: "Inauguration du nouveau bâtiment de recherche",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
          slug: "inauguration-nouveau-batiment-recherche",
          excerpt: "L'université inaugure son nouveau bâtiment dédié à la recherche scientifique.",
          author: {
            id: "101",
            name: "Prof. Martin Dubois",
          },
          categories: [
            {
              id: "1",
              name: "Actualités",
            },
          ],
          tags: [
            {
              id: "1",
              name: "Recherche",
            },
            {
              id: "5",
              name: "Innovation",
            },
          ],
          featuredImage: "/images/new-building.jpg",
          status: "published",
          publishedAt: "2023-05-15T09:00:00Z",
          createdAt: "2023-05-10T14:30:00Z",
          updatedAt: "2023-05-15T08:45:00Z",
        },
        {
          id: "2",
          title: "Conférence internationale sur l'intelligence artificielle",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
          slug: "conference-internationale-intelligence-artificielle",
          excerpt: "L'université accueillera une conférence internationale sur l'IA le mois prochain.",
          author: {
            id: "102",
            name: "Dr. Sophie Laurent",
          },
          categories: [
            {
              id: "2",
              name: "Événements",
            },
            {
              id: "4",
              name: "Conférences",
            },
          ],
          tags: [
            {
              id: "1",
              name: "Recherche",
            },
            {
              id: "5",
              name: "Innovation",
            },
            {
              id: "4",
              name: "International",
            },
          ],
          featuredImage: "/images/ai-conference.jpg",
          status: "published",
          publishedAt: "2023-06-01T10:00:00Z",
          createdAt: "2023-05-20T11:15:00Z",
          updatedAt: "2023-05-25T09:30:00Z",
        },
        {
          id: "3",
          title: "Nouveaux programmes d'échange international",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
          slug: "nouveaux-programmes-echange-international",
          excerpt: "Découvrez les nouveaux programmes d'échange avec des universités partenaires.",
          author: {
            id: "103",
            name: "Prof. Jean Moreau",
          },
          categories: [
            {
              id: "1",
              name: "Actualités",
            },
          ],
          tags: [
            {
              id: "2",
              name: "Étudiants",
            },
            {
              id: "4",
              name: "International",
            },
          ],
          status: "draft",
          createdAt: "2023-05-28T15:45:00Z",
          updatedAt: "2023-05-28T15:45:00Z",
        },
      ]
    } catch (error) {
      console.error("Error fetching posts:", error)
      throw error
    }
  }

  async getById(id: string): Promise<Post> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.get(`/posts/${id}`);

      // Données simulées pour le développement
      const posts = await this.getAll()
      const post = posts.find((p) => p.id === id)

      if (!post) {
        throw new Error(`Post with ID ${id} not found`)
      }

      return post
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error)
      throw error
    }
  }

  async create(data: Partial<Post>): Promise<Post> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.post('/posts', data);

      // Simulation pour le développement
      const now = new Date().toISOString()
      const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || "",
        content: data.content || "",
        slug: data.slug || this.generateSlug(data.title || ""),
        excerpt: data.excerpt || "",
        author: data.author || { id: "", name: "" },
        categories: data.categories || [],
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        status: data.status || "draft",
        publishedAt: data.status === "published" ? now : undefined,
        createdAt: now,
        updatedAt: now,
      }

      return newPost
    } catch (error) {
      console.error("Error creating post:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<Post>): Promise<Post> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // return await api.put(`/posts/${id}`, data);

      // Simulation pour le développement
      const post = await this.getById(id)
      const now = new Date().toISOString()

      const updatedPost: Post = {
        ...post,
        ...data,
        slug: data.slug || (data.title ? this.generateSlug(data.title) : post.slug),
        author: data.author || post.author,
        categories: data.categories || post.categories,
        tags: data.tags || post.tags,
        publishedAt: data.status === "published" && !post.publishedAt ? now : post.publishedAt,
        updatedAt: now,
      }

      return updatedPost
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error)
      throw error
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // Dans un environnement réel, ceci ferait un appel API
      // await api.delete(`/posts/${id}`);

      // Simulation pour le développement
      // Vérifier si l'article existe
      await this.getById(id)

      // Dans un environnement réel, l'élément serait supprimé de la base de données
      console.log(`Post with ID ${id} has been removed`)

      return
    } catch (error) {
      console.error(`Error removing post with ID ${id}:`, error)
      throw error
    }
  }

  // Utilitaire pour générer un slug à partir d'un titre
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }
}

export const postService = new PostService()
