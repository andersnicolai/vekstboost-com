export interface ArticleGenerationRequest {
  tenant: string;
  industry: string;
  keywords?: string[];
  localBusiness?: {
    name: string;
    location: string;
    services: string[];
  };
  articleType?: 'blog' | 'service' | 'industry-guide' | 'local-seo';
  wordCount?: number;
}

export interface GeneratedArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  publishUrl: string;
  tenant: string;
  createdAt: Date;
}

export class AIArticleGenerator {
  private static readonly CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  private static readonly BASE_URL = process.env.ARTICLES_BASE_URL || 'https://articles.vekstboost.com';

  static async generateArticle(request: ArticleGenerationRequest): Promise<GeneratedArticle> {
    // 🎯 Phase 1 Implementation
    const prompt = this.buildPrompt(request);
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.CLAUDE_API_KEY!,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      const data = await response.json();
      const generatedContent = data.content[0].text;
      
      return this.parseAndStructureArticle(generatedContent, request);
    } catch (error) {
      console.error('AI Article Generation failed:', error);
      throw new Error('Failed to generate article');
    }
  }

  private static buildPrompt(request: ArticleGenerationRequest): string {
    const { tenant, industry, localBusiness, articleType = 'blog', wordCount = 1200 } = request;
    
    return `
Du er en ekspert SEO-skribent som lager ${wordCount} ord artikler for ${industry} bedrifter i Norge.

OPPGAVE: Lag en komplett artikkel for "${localBusiness?.name || tenant}" som driver med ${industry}.

KRAV:
✅ ${wordCount} ord (+/- 100)
✅ SEO-optimalisert for norske søk
✅ Inkluder lokale referanser (${localBusiness?.location || 'Norge'})
✅ Call-to-action for booking/kontakt
✅ Naturlig bruk av keywords: ${request.keywords?.join(', ') || industry}
✅ H1, H2, H3 struktur for lesbarhet
✅ Ekspertise og tillit (E-A-T)

STRUKTUR:
1. Fengslende tittel (H1)
2. Innledning med problem/løsning
3. Hovedinnhold med underoverskrifter
4. Praktiske tips
5. Konklusjon med CTA

TONE: Profesjonell men tilgjengelig, lokal ekspertise, tillitsskapende.

Start direkte med artikkelen - ingen forklaringer eller meta-tekst.
`;
  }

  private static parseAndStructureArticle(content: string, request: ArticleGenerationRequest): GeneratedArticle {
    // Parse the AI response and extract structured data
    const lines = content.split('\n').filter(line => line.trim());
    const title = lines.find(line => line.startsWith('#'))?.replace('#', '').trim() || 'Untitled Article';
    const slug = this.generateSlug(title);
    
    // Extract excerpt (first paragraph or first 160 chars)
    const contentWithoutTitle = content.replace(/^#.*$/m, '').trim();
    const excerpt = contentWithoutTitle.split('\n\n')[0]?.substring(0, 160) + '...' || '';
    
    // Generate SEO metadata
    const seoTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
    const seoDescription = excerpt;
    const keywords = request.keywords || [request.industry];

    return {
      id: `article_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      slug,
      content: contentWithoutTitle,
      excerpt,
      seoMetadata: {
        title: seoTitle,
        description: seoDescription,
        keywords
      },
      publishUrl: `${this.BASE_URL}/${request.tenant}/${slug}`,
      tenant: request.tenant,
      createdAt: new Date()
    };
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[æøå]/g, match => ({ 'æ': 'ae', 'ø': 'o', 'å': 'aa' }[match] || match))
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // 🚀 Phase 2: Batch generation for multiple tenants
  static async generateBatchArticles(tenants: string[], industry: string): Promise<GeneratedArticle[]> {
    const articles = await Promise.all(
      tenants.map(tenant => 
        this.generateArticle({
          tenant,
          industry,
          articleType: 'blog'
        })
      )
    );
    
    return articles;
  }

  // 📊 Cost tracking
  static calculateMonthlyCost(tenantsCount: number, articlesPerDay: number = 1): {
    tokensPerMonth: number;
    estimatedCost: number;
  } {
    const tokensPerArticle = 2000; // Estimate
    const tokensPerMonth = tenantsCount * articlesPerDay * 30 * tokensPerArticle;
    const costPerToken = 0.000003; // Claude pricing
    
    return {
      tokensPerMonth,
      estimatedCost: tokensPerMonth * costPerToken
    };
  }
} 