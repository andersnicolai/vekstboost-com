import { NextRequest, NextResponse } from 'next/server'

// Configure for dynamic API route (required for POST methods)
export const dynamic = 'force-dynamic'

// Language-aware messages
const getMessages = (lang: string) => {
  const messages = {
    no: {
      validation: 'Navn, e-post og melding er påkrevd',
      newContact: 'Ny kontaktforespørsel:',
      discordTitle: '🎯 Ny kontaktforespørsel fra nettsiden',
      notProvided: 'Ikke oppgitt',
      noMessage: 'Ingen melding',
      source: 'VekstBoost Minimal - Kontaktskjema',
      success: 'Takk for din henvendelse! Vi kontakter deg snart.',
      error: 'Noe gikk galt. Prøv igjen senere.',
      processingError: 'Feil ved behandling av kontaktskjema:'
    },
    en: {
      validation: 'Name, email and message are required',
      newContact: 'New contact request:',
      discordTitle: '🎯 New contact request from website',
      notProvided: 'Not provided',
      noMessage: 'No message',
      source: 'VekstBoost Minimal - Contact Form',
      success: 'Thank you for your inquiry! We will contact you soon.',
      error: 'Something went wrong. Please try again later.',
      processingError: 'Error processing contact form:'
    },
    sv: {
      validation: 'Namn, e-post och meddelande krävs',
      newContact: 'Ny kontaktförfrågan:',
      discordTitle: '🎯 Ny kontaktförfrågan från webbplatsen',
      notProvided: 'Ej angivet',
      noMessage: 'Inget meddelande',
      source: 'VekstBoost Minimal - Kontaktformulär',
      success: 'Tack för din förfrågan! Vi kontaktar dig snart.',
      error: 'Något gick fel. Försök igen senare.',
      processingError: 'Fel vid behandling av kontaktformulär:'
    },
    dk: {
      validation: 'Navn, e-mail og besked er påkrævet',
      newContact: 'Ny kontaktforespørgsel:',
      discordTitle: '🎯 Ny kontaktforespørgsel fra hjemmesiden',
      notProvided: 'Ikke angivet',
      noMessage: 'Ingen besked',
      source: 'VekstBoost Minimal - Kontaktformular',
      success: 'Tak for din henvendelse! Vi kontakter dig snart.',
      error: 'Noget gik galt. Prøv igen senere.',
      processingError: 'Fejl ved behandling af kontaktformular:'
    }
  }
  
  return messages[lang as keyof typeof messages] || messages.no
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Get language from Accept-Language header or default to 'no'
    const acceptLanguage = request.headers.get('accept-language') || 'no'
    const lang = acceptLanguage.includes('en') ? 'en' : 
                acceptLanguage.includes('sv') ? 'sv' : 
                acceptLanguage.includes('da') ? 'dk' : 'no'
    
    const messages = getMessages(lang)

    // Validering
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: messages.validation },
        { status: 400 }
      )
    }

    console.log(messages.newContact, data)
    console.log('UTM Parametere:', {
      source: data.utm_source || 'direct',
      medium: data.utm_medium || 'none', 
      campaign: data.utm_campaign || 'organic',
      content: data.utm_content || 'none'
    })

    // Send to Discord webhook
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1349540758616674324/GcmArI7q6DLEWrfHuOB7hnMSIHTvFp2hLFe1iQnO_5f2sTQS2MLa0V08nvDvrBmnDGIs'
    
    if (DISCORD_WEBHOOK_URL) {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: null,
            embeds: [{
              title: messages.discordTitle,
              color: 3447003,
              fields: [
                { name: 'Navn', value: data.name, inline: true },
                { name: 'E-post', value: data.email, inline: true },
                { name: 'Telefon', value: data.phone || messages.notProvided, inline: true },
                { name: 'Bedrift', value: data.company || messages.notProvided, inline: true },
                { name: 'Tjeneste', value: data.service || messages.notProvided, inline: true },
                { name: 'Melding', value: data.message || messages.noMessage },
                { name: 'UTM Source', value: data.utm_source || 'direct', inline: true },
                { name: 'UTM Medium', value: data.utm_medium || 'none', inline: true },
                { name: 'UTM Campaign', value: data.utm_campaign || 'organic', inline: true },
                { name: 'UTM Content', value: data.utm_content || 'none', inline: true },
                { name: 'Språk', value: lang.toUpperCase(), inline: true },
                { name: 'Kilde', value: messages.source },
                { name: 'Tidspunkt', value: new Date().toLocaleString('nb-NO') }
              ],
              timestamp: new Date().toISOString()
            }]
          })
        })
        console.log('✅ Melding sendt til Discord')
      } catch (error) {
        console.error('❌ Discord webhook error:', error)
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: messages.success
      },
      { status: 200 }
    )

  } catch (error) {
    // Get language for error messages
    const acceptLanguage = request.headers.get('accept-language') || 'no'
    const lang = acceptLanguage.includes('en') ? 'en' : 
                acceptLanguage.includes('sv') ? 'sv' : 
                acceptLanguage.includes('da') ? 'dk' : 'no'
    const messages = getMessages(lang)
    
    console.error(messages.processingError, error)
    return NextResponse.json(
      { error: messages.error },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  )
}