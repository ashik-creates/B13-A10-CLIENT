"use server"
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const createPayment = async (paymentInfo) => {
  const res = await fetch(`${baseURL}/api/save/payments/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentInfo),
  })

  const data = await res.json()

  return data
}