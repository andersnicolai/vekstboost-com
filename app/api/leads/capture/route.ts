import { NextRequest, NextResponse } from 'next/server';

// Configure for dynamic API route (required for POST methods)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('X-API-Key');
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API Key required' },
        { status: 401 }
      );
    }

    const leadData = await request.json();
    
    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.tenant) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, tenant' },
        { status: 400 }
      );
    }

    // Enrich lead data
    const enrichedLead = {
      ...leadData,
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      apiKey,
      userAgent: request.headers.get('User-Agent'),
      ip: request.headers.get('X-Forwarded-For') || request.headers.get('X-Real-IP'),
      referer: request.headers.get('Referer'),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    // TODO: Save to database
    // await saveLeadToDatabase(enrichedLead);
    
    // TODO: Send notification to tenant
    // await notifyTenant(enrichedLead);
    
    // TODO: Send to CRM integration
    // await sendToCRM(enrichedLead);

    // Log for now
    console.log('💰 New lead captured:', {
      tenant: enrichedLead.tenant,
      email: enrichedLead.email,
      source: enrichedLead.source
    });

    return NextResponse.json({
      success: true,
      leadId: enrichedLead.id,
      message: 'Lead captured successfully'
    });
    
  } catch (error) {
    console.error('Lead capture failed:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
} 