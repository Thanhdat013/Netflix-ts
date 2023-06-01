import payments from "@/lib/stripe"
import { User } from "@firebase/auth"
import {
  Subscription,
  onCurrentUserPaymentUpdate,
  onCurrentUserSubscriptionUpdate,
} from "@stripe/firestore-stripe-payments"
import { useEffect, useState } from "react"

const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    if (!user) return
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (sub) => sub.status === "active" || sub.status === "trialing"
        )[0]
      )
    })
  }, [user])
  return subscription
}

export default useSubscription
