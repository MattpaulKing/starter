import { getRouteData } from '$lib/urls';
import type { modalStore as ModalStore } from '.';


export default async function <T extends { type: "close" | "save" } | undefined>({ routes, ref, modalStore }: {
  modalStore: ModalStore,
  routes: { from: string, to: string },
  ref: any,
}) {
  return new Promise<T>(async (resolve) => {
    const data = await getRouteData(routes.to)
    if (!data) throw new Error("Could not load data")
    modalStore.add({
      ref,
      type: "component",
      routes,
      props: () => {
        return { data }
      },
      response: (r) => {
        resolve(r)
      }
    })
  })
}
