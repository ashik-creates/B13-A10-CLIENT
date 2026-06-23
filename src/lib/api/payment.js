const baseURL = process.env.NEXT_PUBLIC_SERVER_URL 

export const getPaymentsByUser = async (userId) => {
  const res = await fetch(`${baseURL}/api/transactions/user/${userId}`)

  const data = await res.json()

  return data
}

export const getTransactionOverview = async (vendorId) => {
  const res = await fetch(`${baseURL}/api/vendor/stats/${vendorId}`)

  const data = await res.json()

  return data
}