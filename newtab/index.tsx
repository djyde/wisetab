import { StorageKey, storage } from '~storage'
import '../style.css'
import { useStorage } from '@plasmohq/storage/hook'
import type { DailyReview } from '~utils/readwise'
import { useEffect } from 'react'
import { QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~utils/queryclient'
import cn from 'classnames'
import { Providers } from '~components/Providers'
import { LuSettings } from 'react-icons/lu'
import { themes } from '~themes'
import { themeChange } from 'theme-change'
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

function NewTab() {
  const md = new MarkdownIt();
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('class');
    if (aIndex < 0) {
      tokens[idx].attrPush(['class', 'link link-primary']);
    } else {
      tokens[idx].attrs[aIndex][1] += ' link link-primary';
    }
    return self.renderToken(tokens, idx, options);
  };

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

  const highlightCount = review.data?.highlights.length || 0

  // random index base on highlight count
  const random = Math.floor(Math.random() * highlightCount)

  const currentReview = review.data?.highlights[random]

  const renderTextWithLinks = (text) => {
    const renderedText = md.render(text);
    const sanitizedText = DOMPurify.sanitize(renderedText);
    return sanitizedText;
  }

  return (
    <div>
      <nav className='p-3 px-6 flex justify-end'>
        <div className='flex gap-3 items-center'>

          <div>
            <select className='select select-xs' data-choose-theme>
              {themes.map(theme => {
                return (
                  <option key={theme} value={theme}>{theme}</option>
                )
              })}
            </select>
          </div>

          <div>
            <button onClick={_ => {
              chrome.runtime.openOptionsPage()
            }} className='btn btn-xs'>
              <LuSettings />
              Settings
            </button>
          </div>

        </div>
      </nav>
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

            <div className='text-xl leading-relaxed text-center font-medium relative font-serif-eng ' >
              <div dangerouslySetInnerHTML={{ __html: renderTextWithLinks(currentReview.text) }} />
              <div className=' text-base/50 text-sm mt-12 italic text-center top-[12px] left-[500px] w-[320px]'>
                {currentReview.note}
              </div>
            </div>


            <div className='flex justify-center my-12'>
              <div className='bg-[#A79277] w-[100px] h-[4px]' />
            </div>

            <div className='text-center font-bold font-serif-eng'>
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