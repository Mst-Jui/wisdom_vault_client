
import Button from '@/components/reusable/Button'
import { subscription } from '@/lib/api/users/payment'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaCheck } from 'react-icons/fa'
import RefreshSession from './RefreshSession'



export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // console.log("metadata", metadata);
    await subscription({ ...metadata, sessionId: session_id })


  }
  return (
    <>
      <RefreshSession />
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl shadow-lg p-8 text-center border my-7">
          <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-400">
            <FaCheck size={'20'} />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Payment Successful
          </h1>

          <p className="mt-3 text-gray-400">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>

          <div className="mt-4 p-3 rounded-lg  border">
            <p className="text-sm text-gray-500">Confirmation Email Sent To</p>
            <p className="font-medium">{customerEmail}</p>
          </div>

          <Link href={'/'} className='mt-6 flex justify-center'>
            <Button> Back Home</Button>
          </Link>
        </div>
      </section>
    </>
  )

}