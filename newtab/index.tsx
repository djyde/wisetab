import { StorageKey, storage } from '~storage'
import '../style.css'
import { useStorage } from '@plasmohq/storage/hook'
import type { DailyReview } from '~utils/readwise'
import { useEffect } from 'react'
import { QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~utils/queryclient'
import cn from 'classnames'
import { Providers } from '~components/Providers'
function NewTab() {

  const review = useQuery({
    queryKey: ['dailyReview'],
    queryFn: async () => {
      const result = await storage.get<DailyReview>(StorageKey.DailyReview)
      return result
    }
  })

  if (!review.isPending && !review.data) {
    return (
      <>
        <div className='flex justify-center mt-24'>
          <div className=''>
            Please <button onClick={_ => {
              chrome.runtime.openOptionsPage()
            }} className='btn btn-xs btn-primary'>setup</button> first
          </div>
        </div>
      </>
    )
  }
  
  const random = Math.floor(Math.random() * 10)

  const currentReview = review.data?.highlights[random]

  return (
    <div>
      {currentReview && (
        <>
          <div className={
            cn('max-w-[320px] mx-auto mt-24 relative', {
              'max-w-[520px]': currentReview.text.length > 200
            })
          }>
            <div className='text-center mb-12'>
              <img className='inline-block max-w-[100px] rounded-lg' src={currentReview.image_url} />
            </div>

            <div className='text-xl leading-relaxed text-left font-light relative'>
              <div>
                {currentReview.text}
              </div>
              <div className=' text-black/50 text-sm mt-12 italic text-left top-[12px] left-[500px] w-[320px]'>
                {currentReview.note}
              </div>
            </div>


            <div className='flex justify-center my-12'>
              <div className='bg-[#A79277] w-[100px] h-[4px]' />
            </div>



            <div className='text-center font-medium'>
              {currentReview.author} / {currentReview.title}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <Providers>
      <NewTab />
    </Providers>
  )
}