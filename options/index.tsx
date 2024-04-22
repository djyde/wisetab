import { useForm } from "react-hook-form";
import { Providers } from "~components/Providers";
import { StorageKey, storage } from "~storage";

export default function Options() {


  const form = useForm({
    defaultValues: async () => {
      return {
        readwiseToken: await storage.get(StorageKey.ReadwiseToken)
      }
    }
  })

  return (
    <Providers>
      <div className="max-w-[640px] mx-auto mt-24">
        <div>
          <h1 className="font-bold mb-6">Options</h1>
          <form onSubmit={form.handleSubmit(async values => {
            await storage.set(StorageKey.ReadwiseToken, values.readwiseToken)
            alert("Saved!")
          })}>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                Readwise Token
                <input {...form.register("readwiseToken")} required type="text" className="grow" placeholder="" />
              </label>
              <div>
                <a className="text-sm inline-block mt-2 ml-1 font-medium underline" href="https://readwise.io/access_token" target="_blank">Get token</a>
              </div>
            </div>

            <div className="mt-12">
              <button type="submit" className="btn btn-sm">Save</button>
            </div>
          </form>

        </div>
      </div>
    </Providers>
  )
}