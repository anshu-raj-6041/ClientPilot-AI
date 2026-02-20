'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { handler } from 'next/dist/build/templates/app-page'
import { title } from 'process'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function HomeClient({ email }: { email: string }) {
    const [loading, setLoading] = useState(false)
    const handleLogin = () => {
        setLoading(true)
        window.location.href = "/api/auth/login"
    }
    const firstLetter = email?.[0]?.toUpperCase() ?? "";
    const [open, setOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node))
                setOpen(false)

        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)

    }, [])

    const navigate = useRouter()

    const features = [
        {
            title: "Plug & Play",
            desc: "Add the chatbot to ur site with a single script tag"
        },
        {
            title: "Admin Controlled",
            desc: "You control exactly what the AI knows ans answers."
        },
        {
            title: "Always Online",
            desc: "Your customers get instant support 24/7."
        }

    ]

    const handleLogOut = async () => {
        try {
            const result = await axios.get("/api/auth/logout")
            window.location.href = "/"

        }
        catch (error) {
            console.log(error);


        }
    }
    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
                className='fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold tracking-tight'>ClientPilot <span className='text-zinc-400'>AI</span></div>
                    {email ? <div className='relative' ref={popupRef}>
                        <button className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition' onClick={() => setOpen(!open)}>
                            {firstLetter}</button>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className='absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden'>
                                    <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100' onClick={() => navigate.push("/dashboard")}>Dashboard</button>
                                    <button className='block px-4 py-3 text-sm text-red-600 hover:bg-zinc-100' onClick={handleLogOut}>Logout</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div> :
                        <motion.button className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2'
                            onClick={handleLogin}
                            disabled={loading}
                        >{loading ? "Loading..." : "Login"}
                        </motion.button>}
                </div>

            </motion.div>
            <section className='pt-36 pb-28 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                            AI Customer Support <br />
                            Built for Modern Websites
                        </h1>
                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                            Add a powerful AI chatbot to ur website in minutes.
                            Let ur customers get instant answer using ur own busness knowledge.
                        </p>
                        <div className='mt-10 flex gap-4'>
                            {email ? <button className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60' onClick={() => navigate.push("/dashboard")}>Go to Dashboard</button> :
                                <button className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60' onClick={handleLogin}>Get Started</button>}
                            <a href='#feature' className='px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition'>
                                Learn More
                            </a>
                        </div>

                    </motion.div>
                    {/* right wla div */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className='relative'
                    >
                        <div className='rounded-3xl bg-white shadow-2xl border border-zinc-200 overflow-hidden flex flex-col w-full max-w-sm mx-auto'>
                            <div className='bg-black text-white px-5 py-4 flex justify-between items-center'>
                                <div className='flex items-center gap-2.5'>
                                    <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                                    <span className='text-sm font-semibold tracking-tight'>Live Chat Preview</span>
                                </div>
                                <div className='flex gap-1.5'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-white/20' />
                                    <div className='w-1.5 h-1.5 rounded-full bg-white/20' />
                                </div>
                            </div>

                            <div className='p-6 space-y-6 bg-zinc-50/30 h-64'>
                                <div className='flex flex-col gap-1.5 items-end'>
                                    <div className='bg-black text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm'>
                                        Do U offer COD?
                                    </div>
                                    <span className='text-[10px] text-zinc-400 mr-1'>You • Delivered</span>
                                </div>

                                <div className='flex flex-col gap-1.5'>
                                    <div className='bg-white border border-zinc-200 text-zinc-800 text-sm px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm'>
                                        Yes, COD is available on all orders!
                                    </div>
                                    <span className='text-[10px] text-zinc-400 ml-1'>AI Assistant • Just now</span>
                                </div>
                            </div>

                            <div className='border-t border-zinc-100 p-4 bg-white flex items-center gap-3'>
                                <div className='flex-1 h-10 bg-zinc-100 rounded-full px-4 flex items-center text-zinc-400 text-sm'>
                                    Type a message...
                                </div>
                                <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-lg'>
                                    <span className='text-white text-xs'>💬</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </section>
            <section id='feature' className='bg-zinc-50 py-28 px-6 border-zinc-200'>
                <div className='max-w-6xl mx-auto'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 20 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className='text-3xl font-semibold text-center'>
                        Why Businesses Choose ClientPilot AI
                    </motion.h2>
                    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {features.map((f, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: false }}
                                className='bg-white rounded-2xl p-8 shadow-lg border border-zinc-200'
                            >
                                <h1 className='text-lg font-medium'>{f.title}</h1>
                                <p className='mt-3 text-zinc-600 text-sm'>{f.desc}</p>

                            </motion.div>
                        ))}

                    </div>

                </div>

            </section>

            <footer className='py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} ClientPilot AI. All rights reserved.
            </footer>
        </div>
    )
}

export default HomeClient
