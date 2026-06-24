"use server"

import { getToken } from "../getToken"

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL

export const createPayment = async (paymentInfo) => {
  const token = await getToken()
  const res = await fetch(`${baseURL}/api/save/payments/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })

  const data = await res.json()

  return data
}