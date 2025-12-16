export async function POST(req){
const { product, quote } = body
if(!product) return new Response(JSON.stringify({ error: 'Missing product' }), { status: 400 })


// Build email HTML
const html = `
<h2>Báo giá cho sản phẩm: ${product.title}</h2>
<p>${product.description || ''}</p>
<ul>
<li>Size: ${product.size || 'N/A'}</li>
<li>Giá gốc (EUR): ${product.price_eur || 'N/A'}</li>
<li>Phí dịch vụ: ${quote.service} EUR</li>
<li>Shipping estimate: ${quote.shipping} EUR</li>
<li><strong>Tổng: ${quote.total} EUR</strong></li>
</ul>
<p>Thông tin chuyển khoản sẽ được gửi khi khách xác nhận.</p>
`


// Option A: Resend (recommended)
const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM = process.env.FROM_EMAIL || 'no-reply@example.com'
const TO = process.env.TO_EMAIL || 'customer@example.com'


if(!RESEND_API_KEY) {
console.warn('RESEND_API_KEY missing — logging email to console instead')
console.log('TO:', TO)
console.log('SUBJECT: Báo giá sản phẩm')
console.log(html)
return new Response(JSON.stringify({ ok: true, note: 'Email printed to server logs (RESEND_API_KEY not configured).' }))
}


const r = await fetch('https://api.resend.com/emails', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
body: JSON.stringify({
from: FROM,
to: [TO],
subject: `Báo giá: ${product.title}`,
html
})
})


if(!r.ok){
const txt = await r.text()
return new Response(JSON.stringify({ error: 'Resend failed', detail: txt }), { status: 500 })
}


const data = await r.json()
return new Response(JSON.stringify({ ok:true, id: data.id }))
}catch(e){
return new Response(JSON.stringify({ error: e.message }), { status: 500 })
}
}