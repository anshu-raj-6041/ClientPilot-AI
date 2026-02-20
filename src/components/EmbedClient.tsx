'use client'
import { navigate } from 'next/dist/client/components/segment-cache/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from "motion/react"

function EmbedClient({ ownerId }: { ownerId: string }) {
  const navigate = useRouter()
  const [copied, setCopied] = useState(false)
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || '').replace(/\/$/, '')
  const embedCode = `<script 
  src="${appUrl}/chatBot.js"
  data-owner-id="${ownerId}">
</script>`
  const copyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

  }
  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900 overflow-x-hidden'>
      <div className='sticky top-0 inset-x-0 z-40 bg-white border-b border-zinc-200'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='text-lg font-semibold cursor-pointer' onClick={() => navigate.push("/")}>ClientPilot<span
            className='text-zinc-400'>AI</span></div>
          <button className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition' onClick={() => navigate.push("/dashboard")}>Back to DashBoard</button>

        </div>

      </div>


      <div className='flex justify-center px-4 py-14'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10'

        >
          <h1 className='text-2xl font-semibold mb-2'>Embed ChatBot</h1>
          <p>Copy and Paste this code before <code>&lt;/body&gt;</code></p>
          <div className='relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-medium mb-10'>
            <pre className='overflow-x-auto'>{embedCode}</pre>
            <button className='absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition' onClick={copyCode}>
              {copied ? "Copied ✓" : "Copy"}
            </button>

          </div>

          <ol className='space-y-3 text-sm text-zinc-600 list-decimal list-inside'>
            <li>Copy the embed script</li>
            <li>Paste it before the closing body tag</li>
            <li>Reload ur website</li>
          </ol>

          <div className='mt-14'>
            <h1 className='text-lg font-medium mb-2'>Live Preview</h1>
            <p className='text-sm text-zinc-500 mb-6'>This is how the chatbot will appear on ur website</p>

            <div className='rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden'>
              <div className='flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200'>
                <span className='flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200' />
                <span className='w-2.5 h-2.5 rounded-full bg-red-400' />
                <span className='w-2.5 h-2.5 rounded-full bg-yellow-400' />
                <span className='w-2.5 h-2.5 rounded-full bg-green-400' />
                <span className='ml-4 text-sm text-zinc-500'>Ur website.com</span>
              </div>

              <div className='relative h-64 sm:h-72 text-zinc-400 text-sm'>
                Ur website goes here

                <div className='absolute bottom-24 right-6 w-72 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col'>
                  <div className='bg-black text-white px-4 py-3 flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                      <span className='text-xs font-semibold'>ClientPilot AI</span>
                    </div>
                    <span className='text-[10px] opacity-70 cursor-pointer hover:opacity-100 transition'>✕</span>
                  </div>

                  <div className='p-4 space-y-4 bg-zinc-50/50 h-48'>
                    <div className='flex flex-col gap-1'>
                      <div className='bg-white border border-zinc-200 text-zinc-800 text-[11px] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]'>
                        Hi! How can I help you today?
                      </div>
                      <span className='text-[9px] text-zinc-400 ml-1'>Bot • Just now</span>
                    </div>
                    
                    <div className='flex flex-col gap-1 items-end'>
                      <div className='bg-black text-white text-[11px] px-3 py-2 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]'>
                        What is the return policy?
                      </div>
                      <span className='text-[9px] text-zinc-400 mr-1'>You • Just now</span>
                    </div>
                  </div>

                  <div className='border-t border-zinc-100 p-3 bg-white flex items-center justify-between'>
                    <span className='text-[11px] text-zinc-400'>Type a message...</span>
                    <div className='w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center'>
                      <span className='text-[10px]'>→</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className='absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl cursor-pointer'
                >
                  💬


                </motion.div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  )
}

export default EmbedClient
