import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/getSession'

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const { ticketName, totalAmount, quantity, bookingId } = await req.json()

    const user = await getUserSession()

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: ticketName,
            },
            unit_amount: Math.round((totalAmount / quantity) * 100),
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      metadata: {
        bookingId,
        userId: user?.id,
        ticketName,
        totalAmount,
        quantity,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/tickets`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}