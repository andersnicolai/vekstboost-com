import { NextRequest, NextResponse } from 'next/server';
import { AIArticleGenerator, type ArticleGenerationRequest } from '@/lib/ai-article-generator';

// Configure for dynamic API route (required for POST methods)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: ArticleGenerationRequest = await request.json();
    
    // Validate required fields
    if (!body.tenant || !body.industry) {
      return NextResponse.json(
        { error: 'Missing required fields: tenant and industry' },
        { status: 400 }
      );
    }

    // Generate article using AI
    const article = await AIArticleGenerator.generateArticle(body);
    
    // TODO: Save to database
    // await saveArticleToDatabase(article);
    
    return NextResponse.json({
      success: true,
      article,
      publishUrl: article.publishUrl
    });
    
  } catch (error) {
    console.error('Article generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate article' },
      { status: 500 }
    );
  }
}

// GET endpoint for retrieving articles
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant');
  
  if (!tenant) {
    return NextResponse.json(
      { error: 'Tenant parameter required' },
      { status: 400 }
    );
  }
  
  // TODO: Get articles from database
  // const articles = await getArticlesByTenant(tenant);
  
  return NextResponse.json({
    success: true,
    articles: [], // Replace with database call
    total: 0
  });
} 