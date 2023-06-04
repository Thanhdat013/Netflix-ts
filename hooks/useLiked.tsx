import { db } from "@/firebase"
import { Movie } from "@/models"
import { DocumentData, collection, onSnapshot } from "@firebase/firestore"
import { useEffect, useState } from "react"

const useLiked = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([])

  useEffect(() => {
    if (!uid) return
    return onSnapshot(
      collection(db, "customers", uid, "myLiked"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, uid])
  return list
}

export default useLiked
