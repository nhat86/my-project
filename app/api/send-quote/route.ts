export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product, quote } = body

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Missing product' }),
        { status: 400 }
      )
    }

    // Build email HTML
    const html = `
      <h2>Báo giá cho sản phẩm: ${product.title}</h2>
      <p>${product.description || ''}</p>
      <ul>
        <li>Size: ${product.size || 'N/A'}</li>
        <li>Giá gốc (EUR): ${product.price_eur || 'N/A'}</li>
        <li>Phí dịch vụ: ${quote?.service ?? 'N/A'} EUR</li>
        <li>Shipping estimate: ${quote?.shipping ?? 'N/A'} EUR</li>
        <li><strong>Tổng: ${quote?.total ?? 'N/A'} EUR</strong></li>
      </ul>
      <p>Thông tin chuyển khoản sẽ được gửi khi khách xác nhận.</p>
    `

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const FROM = process.env.FROM_EMAIL || 'no-reply@example.com'
    const TO = process.env.TO_EMAIL || 'customer@example.com'

    // Nếu chưa config Resend → log ra console (không crash build)
    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY missing — logging email instead')
      console.log('TO:', TO)
      console.log('SUBJECT: Báo giá sản phẩm')
      console.log(html)

      return new Response(
        JSON.stringify({
          ok: true,
          note: 'Email logged to server console'
        })
      )
    }

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: `Báo giá: ${product.title}`,
        html,
      }),
    })

    if (!r.ok) {
      const txt = await r.text()
      return new Response(
        JSON.stringify({ error: 'Resend failed', detail: txt }),
        { status: 500 }
      )
    }

    const data = await r.json()
    return new Response(JSON.stringify({ ok: true, id: data.id }))

  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e.message || 'Unknown error' }),
      { status: 500 }
    )
  }
}
