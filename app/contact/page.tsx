"use client"

import { useState } from 'react'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, Clock, Facebook, Send, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

function ContactContent() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(t('বার্তা সফলভাবে পাঠানো হয়েছে!', 'Message sent successfully!'))
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        toast.error(data.error || t('বার্তা পাঠাতে ব্যর্থ হয়েছে', 'Failed to send message'))
      }
    } catch {
      toast.error(t('একটি ত্রুটি ঘটেছে', 'An error occurred'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-gold font-medium text-sm uppercase tracking-wider mb-4">
              {t('যোগাযোগ', 'Contact')}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 text-balance">
              {t('আমাদের সাথে যোগাযোগ করুন', 'Get in Touch')}
            </h1>
            <p className="text-charcoal-light text-lg md:text-xl leading-relaxed">
              {t(
                'যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।',
                'Contact us for any questions, suggestions, or collaboration opportunities.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                {t('যোগাযোগের তথ্য', 'Contact Information')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tea-green/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-tea-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{t('ঠিকানা', 'Address')}</h3>
                    <p className="text-charcoal-light text-sm">
                      {t(
                        'সাত্তার মঞ্জিল, উকিলবাড়ী রোড(আ/এ), শ্রীমঙ্গল, মৌলভীবাজার, বাংলাদেশ',
                        'Sattar Monjil, Ukilbari Road (A/A), Sreemangal, Moulvibazar, Bangladesh'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tea-green/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-tea-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{t('ফোন', 'Phone')}</h3>
                    <p className="text-charcoal-light text-sm">+880 1791-751501</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tea-green/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-tea-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{t('ইমেইল', 'Email')}</h3>
                    <p className="text-charcoal-light text-sm">btclc.official@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-tea-green/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-tea-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{t('কার্যালয়ের সময়', 'Office Hours')}</h3>
                    <p className="text-charcoal-light text-sm">
                      {t(
                        'শনিবার - বৃহস্পতিবার: সকাল ১০টা - বিকাল ৫টা',
                        'Saturday - Thursday: 10:00 AM - 5:00 PM'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-medium text-charcoal mb-4">
                  {t('সামাজিক মাধ্যম', 'Social Media')}
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/btclc.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-tea-green/10 hover:bg-tea-green rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-tea-green group-hover:text-cream transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card p-6 md:p-8 rounded-lg border border-border">
                <h2 className="font-serif text-2xl text-charcoal mb-6">
                  {t('বার্তা পাঠান', 'Send a Message')}
                </h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-tea-green mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-charcoal mb-2">
                      {t('ধন্যবাদ!', 'Thank You!')}
                    </h3>
                    <p className="text-charcoal-light mb-6">
                      {t(
                        'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
                        'Your message has been sent successfully. We will get back to you soon.'
                      )}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-tea-green hover:underline"
                    >
                      {t('আরেকটি বার্তা পাঠান', 'Send another message')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                          {t('নাম', 'Name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                          placeholder={t('আপনার নাম', 'Your name')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                          {t('ইমেইল', 'Email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                          placeholder={t('আপনার ইমেইল', 'Your email')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                        {t('ফোন', 'Phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                        placeholder={t('আপনার ফোন নম্বর', 'Your phone number')}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                        {t('বিষয়', 'Subject')} *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors"
                        placeholder={t('আপনার বার্তার বিষয়', 'Subject of your message')}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                        {t('বার্তা', 'Message')} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-tea-green/50 focus:border-tea-green transition-colors resize-none"
                        placeholder={t('আপনার বার্তা লিখুন...', 'Write your message...')}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-tea-green text-cream font-medium rounded hover:bg-tea-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t('পাঠানো হচ্ছে...', 'Sending...')}
                        </>
                      ) : (
                        <>
                          {t('বার্তা পাঠান', 'Send Message')}
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-charcoal mb-4">
              {t('আমাদের অবস্থান', 'Our Location')}
            </h2>
            <p className="text-charcoal-light">
              {t(
                'শ্রীমঙ্গল - বাংলাদেশের চায়ের রাজধানী',
                'Sreemangal - The Tea Capital of Bangladesh'
              )}
            </p>
          </div>
          <div className="aspect-[16/9] md:aspect-[21/9] bg-card rounded-lg overflow-hidden border border-border">
            <div className="w-full h-full flex items-center justify-center text-charcoal-light">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-tea-green" />
                <p className="font-serif text-xl text-charcoal mb-2">
                  {t('শ্রীমঙ্গল, মৌলভীবাজার', 'Sreemangal, Moulvibazar')}
                </p>
                <p className="text-sm">
                  {t('সিলেট বিভাগ, বাংলাদেশ', 'Sylhet Division, Bangladesh')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ContactContent />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
